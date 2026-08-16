'use client';

import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function WarrantyReturnsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Bảo hành & Hỗ trợ kỹ thuật' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Chính Sách Bảo Hành & Hỗ Trợ Kỹ Thuật
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Cam kết hỗ trợ học viên 24/7 trong suốt quá trình học tập và làm bài thi thử MOS
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155', fontSize: '0.95rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  1. Phạm Vi Bảo Hành & Hỗ Trợ Kỹ Thuật
                </h2>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Tài khoản không truy cập được khóa học:</strong> Đội ngũ Kỹ thuật hỗ trợ reset mật khẩu hoặc khắc phục lỗi phiên đăng nhập ngay trong ngày.</li>
                  <li><strong>File bài tập thực hành bị lỗi download:</strong> Cung cấp link thay thế hoặc gửi file nén (.zip) trực tiếp qua Email/Zalo hỗ trợ.</li>
                  <li><strong>Lỗi giao diện phần mềm thi thử:</strong> Hướng dẫn sửa lỗi hiển thị trình duyệt hoặc nâng cấp tài khoản thi thử miễn phí.</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  2. Quy Trình Gửi Yêu Cầu Hỗ Trợ
                </h2>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem' }}>
                  <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><strong>Cách 1:</strong> Gửi Email cho bộ phận Dịch vụ Khách hàng kèm ảnh chụp màn hình bị lỗi.</li>
                    <li><strong>Cách 2:</strong> Gọi trực tiếp đến Hotline chăm sóc học viên trong khung giờ 08:00 - 21:00 (Thứ 2 đến Chủ Nhật).</li>
                    <li><strong>Thời gian phản hồi:</strong> Yêu cầu kỹ thuật sẽ được xử lý trong vòng 1 - 4 giờ làm việc.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
