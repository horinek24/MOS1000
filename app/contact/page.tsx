'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Toast } from '@/components/Toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Tư vấn khóa học MOS Word/Excel/PowerPoint',
    message: '',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert('Vui lòng điền đầy đủ Họ tên, Email và Nội dung tin nhắn!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage(`Cảm ơn học viên ${formData.fullName}! Tin nhắn tư vấn của bạn đã được gửi thành công. Đội ngũ MOS1000 Master sẽ phản hồi qua Zalo/Email trong 30 phút.`);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Tư vấn khóa học MOS Word/Excel/PowerPoint',
        message: '',
      });
    }, 600);
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <Breadcrumb items={[{ label: 'Liên hệ tư vấn' }]} />

      <section className="courses-section">
        <div className="container" style={{ maxWidth: '1050px' }}>
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h1 className="section-title">Liên Hệ & Gửi Tin Nhắn Tư Vấn</h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Đội ngũ cố vấn đào tạo MOS1000 luôn sẵn sàng giải đáp mọi thắc mắc của bạn về lộ trình học & thi chứng chỉ.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left Contact & Message Form */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-dark)' }}>
                ✉️ Gửi Tin Nhắn Cho Trung Tâm
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
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
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email nhận tư vấn *</label>
                  <input
                    type="email"
                    required
                    placeholder="hocvien@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Chủ đề cần hỗ trợ</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  >
                    <option value="Tư vấn khóa học MOS Word/Excel/PowerPoint">Tư vấn khóa học MOS Word/Excel/PowerPoint</option>
                    <option value="Đăng ký lịch thi Certiport">Đăng ký lịch thi Certiport</option>
                    <option value="Tài liệu & Đề thi thử">Tài liệu & Đề thi thử 1000 điểm</option>
                    <option value="Vấn đề kỹ thuật khác">Vấn đề kỹ thuật khác</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Nội dung tin nhắn *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Nhập câu hỏi hoặc nội dung bạn cần hỗ trợ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Đang gửi tin nhắn...' : '🚀 Gửi tin nhắn ngay'}
                </button>
              </form>
            </div>

            {/* Right Information Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-dark)' }}>📍 Thông Tin Liên Hệ</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.9rem', color: 'var(--color-dark-subtle)' }}>
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      📞
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--color-dark)' }}>Hotline / Zalo Tư Vấn:</strong>
                      <span>0912 345 678 - 0987 654 321</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-word-bg)', color: 'var(--color-word)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      ✉️
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--color-dark)' }}>Email Hỗ Trợ:</strong>
                      <span>hotro@mos1000.vn</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-excel-bg)', color: 'var(--color-excel)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      🏢
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--color-dark)' }}>Trụ Sở Chính:</strong>
                      <span>Tầng 5, Tòa nhà Công Nghệ MOS Master, Hà Nội / TP. Hồ Chí Minh</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      🕒
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--color-dark)' }}>Giờ Làm Việc:</strong>
                      <span>08:00 - 21:30 (Từ Thứ 2 đến Chủ Nhật)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner Card */}
              <div style={{ backgroundColor: 'var(--color-primary-dark)', color: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Thi Thử MOS Online Miễn Phí</h4>
                <p style={{ fontSize: '0.88rem', color: '#93c5fd', marginBottom: '1.25rem' }}>Mô phỏng 100% cấu trúc đề thi thật Certiport 50 phút có bấm giờ & chấm điểm.</p>
                <a href="/quizzes" className="btn btn-hero-gold" style={{ width: '100%' }}>
                  Thi thử ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
