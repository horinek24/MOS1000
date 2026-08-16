'use client';

import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export default function BuyingGuidePage() {
  const steps = [
    { title: '1. Tìm kiếm & Lựa chọn Khóa học', desc: 'Truy cập trang Khóa học MOS1000 Master, tìm kiếm theo môn học (Word, Excel, PowerPoint, MOS 2019/365) hoặc trình độ mong muốn.' },
    { title: '2. Xem chi tiết Chương trình Đào tạo', desc: 'Click vào khóa học để xem lộ trình bài giảng, danh sách chương học, file bài tập đính kèm và thông tin giảng viên.' },
    { title: '3. Thêm vào Giỏ hàng hoặc Đăng ký', desc: 'Bấm nút "Thêm vào giỏ hàng" hoặc "Đăng ký ngay" để sẵn sàng hoàn tất đăng ký khóa học.' },
    { title: '4. Kiểm tra Giỏ hàng', desc: 'Mở biểu tượng Giỏ hàng trên thanh Menu để rà soát danh sách môn học và tổng học phí.' },
    { title: '5. Nhập Thông tin Học viên', desc: 'Điền đầy đủ Họ tên, Số điện thoại và Email để hệ thống tạo tài khoản và gửi xác nhận đơn đặt hàng.' },
    { title: '6. Chọn Phương thức Thanh toán', desc: 'Lựa chọn hình thức Chuyển khoản ngân hàng hoặc ví điện tử thuận tiện nhất đối với bạn.' },
    { title: '7. Xác nhận Đơn hàng', desc: 'Bấm "Hoàn tất Đặt hàng" để gửi yêu cầu đăng ký lên hệ thống lưu trữ trực tuyến MOS1000 Master.' },
    { title: '8. Nhận Truy cập Khóa học Tức thì', desc: 'Hệ thống kích hoạt quyền học và mở đề thi thử trên tài khoản của bạn ngay sau khi xác thực thành công!' },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: 'Hướng dẫn mua hàng' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Hướng Dẫn Đăng Ký & Mua Khóa Học
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              8 bước đơn giản giúp bạn nhanh chóng sở hữu khóa học MOS 1000/1000 điểm
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
              {steps.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: '1.6' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/courses" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem' }}>
                🛒 Bắt Đầu Chọn Khóa Học Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
