'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/data/courses';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createClient } from '@/utils/supabase/client';
import { useCourses } from '@/context/CoursesContext';
import { VIETNAM_PROVINCES } from '@/data/vietnamLocations';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getTotalPrice } = useCart();
  const { courses, refreshFromSupabase } = useCourses();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    paymentMethod: 'qr',
  });

  // Location Selector States for Vietnam 63 Provinces & Districts
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('hanoi');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Quận Cầu Giấy');
  const [detailAddress, setDetailAddress] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const totalPrice = getTotalPrice();

  // Get Districts for selected Province
  const currentProvince = useMemo(() => {
    return VIETNAM_PROVINCES.find((p) => p.id === selectedProvinceId) || VIETNAM_PROVINCES[0];
  }, [selectedProvinceId]);

  const currentDistricts = currentProvince.districts;

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

    const fullAddress = [
      detailAddress.trim(),
      selectedDistrict,
      currentProvince.name,
    ]
      .filter(Boolean)
      .join(', ');

    try {
      // 1. Insert order record into Supabase 'orders' table
      const orderPayload = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: fullAddress || 'Chưa cung cấp',
        payment_method: formData.paymentMethod,
        payment_status: 'pending',
        status: 'Mới',
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

  if (isSuccess) {
    return (
      <>
        <Breadcrumb items={[{ label: 'Giỏ hàng', href: '/cart' }, { label: 'Thanh toán thành công' }]} />
        <section className="courses-section" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
          <div className="container" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>
                ✓
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                Đăng Ký Khóa Học Thành Công!
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.98rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Cảm ơn học viên <strong>{formData.fullName}</strong>. Thông tin tài khoản và hướng dẫn vào lớp đã được gửi đến email <strong>{formData.email}</strong>.
              </p>
              {createdOrderId && (
                <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'inline-block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '2rem' }}>
                  Mã đơn hàng: #{createdOrderId.substring(0, 8)}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link href="/my-courses" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                  🎓 Vào Khóa Học Của Tôi
                </Link>
                <Link href="/courses" className="btn btn-outline-navy" style={{ padding: '0.75rem 1.75rem' }}>
                  Khám phá thêm khóa học
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'Giỏ hàng', href: '/cart' }, { label: 'Thanh toán & Đăng ký' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '2rem' }}>Thông Tin Đăng Ký & Thanh Toán</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem', alignItems: 'start' }}>
            {/* Form Column */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-dark)' }}>
                Thông Tin Học Viên
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

                {/* Vietnam 63 Provinces & District Dropdown Selectors */}
                <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    📍 Địa chỉ liên hệ / Nhận chứng chỉ cứng (63 Tỉnh Thành Việt Nam)
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#475569' }}>
                        Tỉnh / Thành phố *
                      </label>
                      <select
                        value={selectedProvinceId}
                        onChange={(e) => {
                          const newProvId = e.target.value;
                          setSelectedProvinceId(newProvId);
                          const newProv = VIETNAM_PROVINCES.find((p) => p.id === newProvId);
                          if (newProv && newProv.districts.length > 0) {
                            setSelectedDistrict(newProv.districts[0]);
                          } else {
                            setSelectedDistrict('');
                          }
                        }}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#ffffff', fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}
                      >
                        {VIETNAM_PROVINCES.map((prov) => (
                          <option key={prov.id} value={prov.id}>
                            {prov.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#475569' }}>
                        Quận / Huyện / Thị xã *
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#ffffff', fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}
                      >
                        {currentDistricts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#475569' }}>
                      Địa chỉ chi tiết (Số nhà, tên đường, phường/xã)
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Số 123 Đường Cầu Giấy, Phường Dịch Vọng"
                      value={detailAddress}
                      onChange={(e) => setDetailAddress(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>
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
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>💳 Quét mã VietQR Ngân hàng (Kích hoạt tức thì)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', backgroundColor: formData.paymentMethod === 'momo' ? 'var(--color-primary-light)' : '#ffffff' }}>
                      <input type="radio" name="payment" value="momo" checked={formData.paymentMethod === 'momo'} onChange={() => setFormData({ ...formData, paymentMethod: 'momo' })} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>📱 Ví MoMo / VNPay</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', fontWeight: 800, marginTop: '0.5rem' }}
                >
                  {isSubmitting ? 'Đang Xử Lý Đơn Hàng...' : `🚀 XÁC NHẬN ĐĂNG KÝ HỌC (${formatVND(totalPrice)})`}
                </button>
              </form>
            </div>

            {/* Summary & VietQR Card Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Cart Summary Card */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-dark)' }}>
                  Đơn Hàng Đăng Ký ({cart.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  {cart.map((item) => (
                    <div key={item.course.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-dark)', flex: 1, paddingRight: '0.5rem' }}>{item.course.title}</span>
                      <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{formatVND(item.course.price)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)' }}>Tổng cộng:</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>{formatVND(totalPrice)}</span>
                </div>
              </div>

              {/* VietQR Dynamic Card */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  💳 MÃ QR THANH TOÁN VIETQR TỰ ĐỘNG
                </div>

                <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'inline-block', marginBottom: '1.25rem' }}>
                  <img
                    src={vietQrUrl}
                    alt="VietQR Thanh Toán Tự Động MOS1000 MASTER"
                    style={{ width: '220px', height: 'auto', borderRadius: '4px', margin: '0 auto' }}
                  />
                </div>

                <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', textAlign: 'left', lineHeight: '1.7' }}>
                  <div>🏦 <strong>Ngân hàng:</strong> MBBank (Quân Đội)</div>
                  <div>🔢 <strong>Số tài khoản:</strong> 0912 345 678</div>
                  <div>👤 <strong>Chủ TK:</strong> MOS1000 MASTER</div>
                  <div>💸 <strong>Số tiền:</strong> {formatVND(totalPrice)}</div>
                  <div>📝 <strong>Cú pháp:</strong> MOS1000 {formData.phone || 'SĐT'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
