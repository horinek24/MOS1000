'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/data/courses';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getTotalPrice } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    paymentMethod: 'qr',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại!');
      return;
    }

    setIsSuccess(true);
    clearCart();
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      <Breadcrumb items={[{ label: 'Giỏ hàng', href: '/cart' }, { label: 'Thanh toán & Nhập học' }]} />

      <section className="courses-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          {!isSuccess ? (
            <div>
              <h1 className="section-title" style={{ marginBottom: '2rem' }}>
                Xác Nhận Đăng Ký & Thanh Toán
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem' }}>
                {/* Left Form */}
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Thông Tin Học Viên</h3>

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
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem' }}>Phương thức thanh toán</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                          <input type="radio" name="payment" value="qr" checked={formData.paymentMethod === 'qr'} onChange={() => setFormData({ ...formData, paymentMethod: 'qr' })} />
                          <span>Quét mã VietQR Ngân hàng (Tự động kích hoạt)</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                          <input type="radio" name="payment" value="momo" checked={formData.paymentMethod === 'momo'} onChange={() => setFormData({ ...formData, paymentMethod: 'momo' })} />
                          <span>Ví MoMo / VNPay</span>
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', marginTop: '1rem' }}>
                      Xác nhận đăng ký học ({formatVND(totalPrice)})
                    </button>
                  </div>
                </form>

                {/* Right Summary */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Đơn Hàng Đăng Ký</h3>
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
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3.5rem', textAlign: 'center' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="36" height="36">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Đăng Ký Khóa Học Thành Công!</h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
                Cảm ơn học viên <strong>{formData.fullName}</strong>. Thông tin tài khoản khóa học và mã kích hoạt đã được gửi tới email <strong>{formData.email}</strong>.
              </p>

              <button className="btn btn-primary" onClick={() => router.push('/')}>
                Trở về Trang chủ
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
