'use client';

import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Chính sách đổi trả' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Chính Sách Đổi Trả & Hoàn Tiền
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Áp dụng cho các sản phẩm khóa học, tài liệu số và tài khoản thi thử tại MOS1000 Master
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155', fontSize: '0.95rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  1. Điều Kuyện Được Hỗ Trợ Đổi/Trả Dịch Vụ
                </h2>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Thanh toán nhầm lẫn hoặc trùng lặp nhiều lần cho cùng 01 khóa học.</li>
                  <li>Tài khoản không kích hoạt được nội dung khóa học do lỗi hệ thống từ phía MOS1000 Master và không thể khắc phục sau 48h.</li>
                  <li>Nội dung khóa học nhận được không đúng với mô tả danh mục đã đăng ký.</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  2. Các Trường Hợp Không Được Hỗ Trợ Đổi Trả / Hoàn Tiền
                </h2>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Học viên đã mở xem và học hơn 30% tổng số bài giảng video hoặc đã tải về bộ tài liệu số đi kèm.</li>
                  <li>Thay đổi ý định cá nhân sau khi tài khoản đã được kích hoạt sử dụng bình thường.</li>
                  <li>Tài khoản vi phạm Điều khoản sử dụng (chia sẻ tài khoản, sao chép phát tán tài liệu trái phép).</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  3. Quy Trình Xử Lý & Hoàn Tiền
                </h2>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem' }}>
                  <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><strong>Bước 1:</strong> Gửi yêu cầu hỗ trợ qua Email hoặc Hotline chăm sóc học viên kèm Mã đơn hàng.</li>
                    <li><strong>Bước 2:</strong> Bộ phận kỹ thuật xác minh lịch sử truy cập tài khoản và tình trạng đơn đặt hàng.</li>
                    <li><strong>Bước 3:</strong> Nếu đủ điều kiện, tiến trình đổi khóa học hoặc hoàn tiền chuyển khoản sẽ được hoàn tất trong vòng 3 - 5 ngày làm việc.</li>
                  </ol>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link href="/contact" className="btn btn-outline-cyan" style={{ padding: '0.75rem 2rem' }}>
                  📞 Liên Hệ Bộ Phận Hỗ Trợ Đơn Hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
