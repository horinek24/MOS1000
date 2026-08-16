'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="custom-image2-footer" id="contact">
      <div className="container">
        <div className="custom-footer-grid">
          {/* Col 1: Brand Logo, Tagline & Socials */}
          <div className="custom-footer-col brand-col">
            <Link href="/" className="custom-footer-brand">
              <span className="brand-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </span>
              <span className="brand-text">MOS1000 Master</span>
            </Link>

            <p className="custom-footer-desc">
              Khóa học & chứng chỉ tin học văn phòng MOS 1000/1000 hàng đầu Việt Nam.
            </p>

            <div className="social-icon-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.78V16a7 7 0 1 1-7-7c.34 0 .67.03 1 .08V12z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Thông tin */}
          <div className="custom-footer-col">
            <h4 className="custom-col-title">Thông tin</h4>
            <ul className="custom-footer-links">
              <li><Link href="/about">Về chúng tôi</Link></li>
              <li><Link href="/about">Chính sách bảo mật</Link></li>
              <li><Link href="/about">Điều khoản sử dụng</Link></li>
              <li><Link href="/about">Chính sách đổi trả</Link></li>
            </ul>
          </div>

          {/* Col 3: Hỗ trợ khách hàng */}
          <div className="custom-footer-col">
            <h4 className="custom-col-title">Hỗ trợ khách hàng</h4>
            <ul className="custom-footer-links">
              <li><Link href="/courses">Hướng dẫn mua hàng</Link></li>
              <li><Link href="/checkout">Thanh toán & giao hàng</Link></li>
              <li><Link href="/about">Bảo hành & đổi trả</Link></li>
              <li><Link href="/about">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Col 4: Liên hệ */}
          <div className="custom-footer-col">
            <h4 className="custom-col-title">Liên hệ</h4>
            <ul className="custom-contact-info">
              <li>
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Hà Nội, Việt Nam</span>
              </li>
              <li>
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Hotline hỗ trợ khách hàng</span>
              </li>
              <li>
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email dịch vụ khách hàng</span>
              </li>
              <li>
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>08:00 - 21:00 (T2 - CN)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
