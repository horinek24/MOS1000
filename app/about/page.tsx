'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Giới thiệu về MOS1000 Master' }]} />

      <section className="courses-section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          {/* Header Banner */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2.5rem',
              marginBottom: '2.5rem',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center',
            }}
          >
            <span className="category-tag cat-badge-combo" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              Về Chúng Tôi
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '1rem' }}>
              MOS1000 Master - Nền Tảng Luyện Thi Chứng Chỉ MOS Hàng Đầu Việt Nam
            </h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto' }}>
              MOS1000 Master là trung tâm đào tạo và luyện thi chứng chỉ tin học văn phòng quốc tế MOS (Microsoft Office Specialist) Word, Excel, PowerPoint chuẩn Certiport 1000 điểm. Với đội ngũ giảng viên giàu kinh nghiệm và hệ thống thi thử trực tuyến thông minh.
            </p>
          </div>

          {/* Core Values Grid */}
          <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '2.5rem' }}>
            <div className="quiz-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Sứ Mệnh</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Nâng cao năng lực sử dụng tin học văn phòng cho hơn 100,000+ sinh viên & người đi làm Việt Nam đạt chuẩn quốc tế.
              </p>
            </div>

            <div className="quiz-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-word-bg)', color: 'var(--color-word)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Tầm Nhìn</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Trở thành hệ thống luyện thi chứng chỉ tin học trực tuyến hàng đầu với tỷ lệ đậu ngay lần đầu đạt 99.5%.
              </p>
            </div>

            <div className="quiz-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-excel-bg)', color: 'var(--color-excel)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Cam Kết</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Hỗ trợ học lại miễn phí 100% nếu học viên chưa đạt điểm thi mong muốn trong kỳ thi chính thức Certiport.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>Sẵn Sàng Chinh Phục Chứng Chỉ MOS 1000 Điểm?</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Bắt đầu học thử và làm đề thi mô phỏng Certiport ngay hôm nay.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/courses" className="btn btn-primary">
                Khám phá khóa học
              </Link>
              <Link href="/contact" className="btn btn-outline-navy">
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
