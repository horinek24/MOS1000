'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/data/courses';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createClient } from '@/utils/supabase/client';

import { useCourses } from '@/context/CoursesContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getTotalPrice } = useCart();
  const { courses, refreshFromSupabase } = useCourses();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'qr',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const totalPrice = getTotalPrice();

  // VietQR Dynamic Image URL Generator
  const vietQrUrl = `https://img.vietqr.io/image/MB-0912345678-compact2.png?amount=${totalPrice}&addInfo=${encodeURIComponent(
    `MOS1000 ${formData.phone || 'HOCVIEN'}`
  )}&accountName=MOS1000%20MASTER`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại!');
      return;
    }

    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống. Vui lòng chọn khóa học trước khi thanh toán!');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Insert order record into Supabase 'orders' table
      const orderPayload = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address || 'Chưa cung cấp',
        payment_method: formData.paymentMethod,
        payment_status: 'pending',
        total_amount: totalPrice,
        notes: formData.notes || null,
        items: cart.map((item) => ({
          course_id: item.course.id,
          course_title: item.course.title,
          price: item.course.price,
          quantity: 1,
        })),
      };

      const { data: newOrder, error: orderErr } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .single();

      if (orderErr) {
        console.error('Lỗi khi ghi đơn hàng vào Supabase:', orderErr);
      } else if (newOrder) {
        setCreatedOrderId(newOrder.id);

        // 2. Insert detail items into 'order_items' table
        const orderItemsPayload = cart.map((item) => ({
          order_id: newOrder.id,
          course_id: item.course.id,
          course_title: item.course.title,
          price: item.course.price,
          quantity: 1,
        }));

        const { error: itemsErr } = await supabase.from('order_items').insert(orderItemsPayload);
        if (itemsErr) {
          console.error('Lỗi khi ghi chi tiết đơn hàng order_items:', itemsErr);
        }

        // 3. Increment students_count for each ordered course & refresh global state
        for (const item of cart) {
          const matchingCourse = courses.find((c) => c.id === item.course.id);
          const newCount = (matchingCourse?.studentsCount || 0) + 1;
          await supabase
            .from('courses')
            .update({ students_count: newCount })
            .eq('id', item.course.id);
        }
        await refreshFromSupabase();
      }

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Lỗi quá trình thanh toán:', error);
      alert('Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Giỏ hàng', href: '/cart' }, { label: 'Thanh toán & Nhập học' }]} />

      <section className="courses-section">
        <div className="container" style={{ maxWidth: '960px' }}>
          {!isSuccess ? (
            <div>
              <h1 className="section-title" style={{ marginBottom: '2rem' }}>
                Xác Nhận Đăng Ký & Thanh Toán
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem' }}>
                {/* Left Form */}
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Thông Tin Học Viên</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email nhận tài khoản học *</label>
                      <input
                        type="email"
                        required
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Số điện thoại / Zalo *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Địa chỉ liên hệ / Nhận chứng chỉ</label>
                      <input
                        type="text"
                        placeholder="123 Đường Cầu Giấy, Hà Nội"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Ghi chú đơn hàng (Tùy chọn)</label>
                      <input
                        type="text"
                        placeholder="Ghi chú về thời gian học hoặc yêu cầu khác"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem' }}>Phương thức thanh toán</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', backgroundColor: formData.paymentMethod === 'qr' ? 'var(--color-primary-light)' : '#ffffff' }}>
                          <input type="radio" name="payment" value="qr" checked={formData.paymentMethod === 'qr'} onChange={() => setFormData({ ...formData, paymentMethod: 'qr' })} />
                          <strong>Quét mã VietQR Ngân hàng (Kích hoạt tức thì)</strong>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', backgroundColor: formData.paymentMethod === 'momo' ? 'var(--color-primary-light)' : '#ffffff' }}>
                          <input type="radio" name="payment" value="momo" checked={formData.paymentMethod === 'momo'} onChange={() => setFormData({ ...formData, paymentMethod: 'momo' })} />
                          <strong>Ví MoMo / VNPay</strong>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.9rem', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1, fontSize: '1rem' }}
                    >
                      {isSubmitting ? 'Đang xử lý đơn hàng...' : `🚀 XÁC NHẬN ĐĂNG KÝ HỌC (${formatVND(totalPrice)})`}
                    </button>
                  </div>
                </form>

                {/* Right Summary & VietQR Live Banner */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>Đơn Hàng Đăng Ký</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                      {cart.map((item) => (
                        <div key={item.course.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                          <span>{item.course.title}</span>
                          <strong>{formatVND(item.course.price)}</strong>
                        </div>
                      ))}
                    </div>
                    <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
                      <span>Tổng cộng:</span>
                      <span style={{ color: 'var(--color-primary)' }}>{formatVND(totalPrice)}</span>
                    </div>
                  </div>

                  {/* VietQR Live QR Code Card */}
                  {formData.paymentMethod === 'qr' && (
                    <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        💳 Mã QR Thanh Toán VietQR Tự Động
                      </div>
                      <img
                        src={vietQrUrl}
                        alt="Mã VietQR Thanh Toán MOS1000 Master"
                        style={{ width: '100%', maxWidth: '240px', borderRadius: 'var(--radius-md)', margin: '0.5rem auto 1rem auto', border: '1px solid #e2e8f0' }}
                      />
                      <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', textAlign: 'left', backgroundColor: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                        <div>🏦 <strong>Ngân hàng:</strong> MBBank (Quân Đội)</div>
                        <div>🔢 <strong>Số tài khoản:</strong> <code>0912 345 678</code></div>
                        <div>👤 <strong>Chủ TK:</strong> MOS1000 MASTER</div>
                        <div>💸 <strong>Số tiền:</strong> {formatVND(totalPrice)}</div>
                        <div>📝 <strong>Cú pháp:</strong> <code>MOS1000 {formData.phone || 'SĐT'}</code></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3.5rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="36" height="36">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                Đăng Ký Khóa Học Thành Công!
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '1rem', marginBottom: '1rem' }}>
                Cảm ơn học viên <strong>{formData.fullName}</strong>. Đơn hàng của bạn đã được ghi nhận trên kho Supabase!
              </p>
              {createdOrderId && (
                <p style={{ fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '2rem' }}>
                  Mã đơn hàng Supabase ID: <code>{createdOrderId}</code>
                </p>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/my-courses" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
                  🎓 Đến Trang "Khóa Học Của Tôi"
                </Link>
                <Link href="/" className="btn btn-outline-navy" style={{ padding: '0.8rem 2rem' }}>
                  Trở về Trang Chủ
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
