'use client';

import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function PaymentDeliveryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Thanh toán & Giao hàng' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Phương Thức Thanh Toán & Kích Hoạt Khóa Học
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Hệ thống xử lý kích hoạt tự động 24/7 cho sản phẩm số và tài khoản học tập trực tuyến
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155', fontSize: '0.95rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  1. Các Hình Thức Thanh Toán Được Hỗ Trợ
                </h2>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Chuyển khoản Ngân hàng (QR Code Auto Check):</strong> Quét mã VietQR tiện lợi, cú pháp tự động điền sẵn mã đơn hàng.</li>
                  <li><strong>Thanh toán trực tiếp qua ví điện tử:</strong> Hỗ trợ xác nhận giao dịch tức thì.</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  2. Thời Gian Xử Lý & Kích Hoạt Đơn Hàng
                </h2>
                <p>
                  Vì đây là <strong>sản phẩm số & khóa học trực tuyến</strong>, ngay sau khi bạn hoàn tất giao dịch thanh toán, hệ thống sẽ xác minh tự động trong vòng 5 - 15 phút. Bạn có thể vào xem bài giảng và mở đề thi thử trực tuyến ngay lập tức.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  3. Hướng Dẫn Nhận Tài Liệu & Tài Khoản Học
                </h2>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <li>📲 <strong>Truy cập Khóa học Online:</strong> Đăng nhập tài khoản tại website MOS1000 Master để xem video bài giảng.</li>
                    <li>📥 <strong>Tải File Bài Tập Thực Hành:</strong> Các file đính kèm dạng (.docx, .xlsx, .pptx) được tích hợp nút tải ngay bên trong từng bài học.</li>
                    <li>✉️ <strong>Thông báo qua Email:</strong> Email xác nhận kèm hóa đơn chi tiết sẽ được gửi tự động về hòm thư điện tử của bạn.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  4. Các Lưu Ý Quan Trọng Khi Thanh Toán
                </h2>
                <p>
                  Vui lòng ghi đúng <strong>Nội dung chuyển khoản / Mã đơn hàng</strong> được cung cấp tại màn hình Checkout để hệ thống kích hoạt tự động nhanh nhất. Nếu ghi sai nội dung, vui lòng nhắn tin cho bộ phận hỗ trợ chăm sóc học viên để được xử lý thủ công.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
