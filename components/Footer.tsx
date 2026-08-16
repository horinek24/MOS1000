'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col footer-col-brand">
            <Link href="/" className="brand-logo" title="MOS 1000 Master">
              <img
                src="/MOS1000_Assets/assets/images/logo/logo-MOS1000.png"
                alt="MOS1000 Logo"
                className="brand-logo-img"
              />
              <span className="brand-title">MOS<span className="brand-title-accent">1000</span></span>
            </Link>

            <p className="footer-tagline">
              Nền tảng đào tạo & Luyện thi chứng chỉ tin học văn phòng quốc tế MOS (Microsoft Office Specialist) hàng đầu Việt Nam. Cung cấp lộ trình đạt điểm tuyệt đối 1000 điểm.
            </p>

            <div className="certiport-badge-box">
              <div className="badge-title">Chứng nhận Đào tạo Quốc tế</div>
              <div className="badge-tags">
                <span className="cert-tag">Certiport Authorized</span>
                <span className="cert-tag">Microsoft Specialist</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Chương Trình MOS</h4>
            <ul className="footer-links">
              <li>
                <Link href="/courses?category=word">Luyện Thi MOS Word 2019/365</Link>
              </li>
              <li>
                <Link href="/courses?category=excel">Luyện Thi MOS Excel 2019/365</Link>
              </li>
              <li>
                <Link href="/courses?category=powerpoint">Luyện Thi MOS PowerPoint</Link>
              </li>
              <li>
                <Link href="/courses?category=combo">Gói Combo 3 Môn Tiết Kiệm</Link>
              </li>
              <li>
                <Link href="/quizzes">Hệ Thống Thi Thử Trực Tuyến</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support Policies */}
          <div className="footer-col">
            <h4 className="footer-heading">Hỗ Trợ Học Viên</h4>
            <ul className="footer-links">
              <li>
                <Link href="/#certiport">Hướng dẫn Đăng ký Thi Certiport</Link>
              </li>
              <li>
                <Link href="/courses">Tải File Bài Tập Thực Hành (.docx/.xlsx)</Link>
              </li>
              <li>
                <Link href="/#faq">Câu hỏi Thường gặp (FAQ)</Link>
              </li>
              <li>
                <Link href="/login">Tra cứu Chứng chỉ & Điểm thi</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Thông Tin Liên Hệ</h4>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
              </li>
              <li className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Hotline: 1900 1000 (Hỗ trợ 24/7)</span>
              </li>
              <li className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email: hotro@mos1000.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 MOS1000 Master. Tất cả quyền được bảo lưu. Thiết kế giao diện cao cấp bởi Antigravity.</p>
        </div>
      </div>
    </footer>
  );
};
