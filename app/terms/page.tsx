'use client';

import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function TermsOfServicePage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Điều khoản sử dụng' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Điều Khoản Sử Dụng MOS1000 Master
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Quy định và điều khoản áp dụng đối với tất cả học viên và người dùng hệ thống
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155', fontSize: '0.95rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  1. Quy Định Chung
                </h2>
                <p>
                  Khi truy cập và sử dụng website <strong>MOS1000 Master</strong>, đồng nghĩa với việc bạn chấp thuận tuân thủ tất cả các điều khoản quy định dưới đây. Nếu không đồng ý với bất kỳ phần nào, vui lòng ngừng truy cập dịch vụ.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  2. Tài Khoản Học Viên
                </h2>
                <p>
                  Học viên chịu trách nhiệm tự bảo mật thông tin tài khoản và mật khẩu cá nhân. Mỗi tài khoản học tập chỉ dành riêng cho 01 học viên duy nhất. Bạn tuyệt đối không được chia sẻ tài khoản cho người khác cùng đăng nhập.
                </p>
              </div>

              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', color: '#991b1b' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.5rem' }}>
                  🔒 3. Quyền Sở Hữu Trí Tuệ & Bảo Vệ Tài Liệu Số (Rất Quan Trọng)
                </h2>
                <p>
                  Tất cả các tài liệu bài giảng, video hướng dẫn, đề thi thử giả lập, file bài tập thực hành (.docx, .xlsx, .pptx) và nội dung trên website đều thuộc quyền sở hữu trí tuệ độc quyền của <strong>MOS1000 Master</strong>.
                </p>
                <p style={{ fontWeight: 700, marginTop: '0.5rem' }}>
                  🚫 TỰ Ý SAO CHÉP, TẢI VỀ PHÁT TÁN, BÁN LẠI, CHIA SẺ TRONG CÁC HỘI NHÓM HOẶC PHÂN PHỐI TRÁI PHÉP BẤT KỲ TÀI NGUYÊN NÀO CỦA MOS1000 MASTER LÀ HÀNH VI VI PHẠM PHÁP LUẬT VÀ SẼ BỊ KHÓA TÀI KHOẢN VĨNH VIỄN MÀ KHÔNG HOÀN TIỀN.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  4. Đăng Ký Khóa Học Và Thanh Toán
                </h2>
                <p>
                  Học viên đăng ký mua khóa học theo học phí niêm yết trên website. Sau khi xác nhận thanh toán thành công, hệ thống sẽ tự động kích hoạt khóa học và quyền truy cập thi thử vào tài khoản của học viên.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  5. Các Hành Vi Bị Nghiêm Cấm
                </h2>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Sử dụng các công cụ tự động, robot để cào dữ liệu hoặc tấn công hệ thống website.</li>
                  <li>Phát tán thông tin sai sự thật, xúc phạm hoặc gây ảnh hưởng uy tín của MOS1000 Master.</li>
                  <li>Gian lận khi sử dụng phần mềm đề thi thử hoặc can thiệp mã nguồn website.</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  6. Giới Hạn Trách Nhiệm & Thay Đổi Điều Khoản
                </h2>
                <p>
                  MOS1000 Master có quyền cập nhật, bổ sung hoặc sửa đổi các Điều khoản sử dụng này bất kỳ lúc nào để phù hợp với quy định pháp luật và hoạt động thực tế của website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
