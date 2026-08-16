'use client';

import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Chính sách bảo mật' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Chính Sách Bảo Mật Thông Tin
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Cập nhật gần nhất: Năm 2026 | Hệ thống đào tạo MOS1000 Master
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155', fontSize: '0.95rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  1. Thu Thập Thông Tin Cá Nhân
                </h2>
                <p>
                  MOS1000 Master thu thập thông tin khi bạn đăng ký tài khoản, đăng ký khóa học hoặc liên hệ hỗ trợ. Thông tin thu thập bao gồm: Họ tên, địa chỉ email, số điện thoại, địa chỉ nhận tài liệu và lịch sử đăng ký khóa học.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  2. Mục Đích Sử Dụng Thông Tin
                </h2>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Cấp quyền truy cập hệ thống học tập và đề thi thử trực tuyến cho học viên.</li>
                  <li>Xác nhận đơn đăng ký, gửi thông báo khóa học và hỗ trợ kỹ thuật khi học viên gặp sự cố.</li>
                  <li>Gửi thông tin cập nhật tài liệu học tập, chương trình ưu đãi học phí (nếu học viên đồng ý nhận).</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  3. Bảo Vệ Và Lưu Trữ Dữ Liệu
                </h2>
                <p>
                  Mọi thông tin cá nhân của bạn được lưu trữ an toàn trên hạ tầng đám mây mã hóa (Supabase Auth & PostgreSQL DB). Mật khẩu tài khoản được mã hóa bằng thuật toán Bcrypt tiêu chuẩn bảo mật cao nhất, tuyệt đối không ai kể cả quản trị viên có thể xem mật khẩu gốc của bạn.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  4. Cookie Và Dữ Liệu Truy Cập
                </h2>
                <p>
                  Chúng tôi sử dụng Cookie và LocalStorage nhằm duy trì phiên đăng nhập của học viên trên trình duyệt, lưu trữ tiến trình bài tập và tùy chỉnh trải nghiệm cá nhân hóa. Bạn có thể tự vô hiệu hóa Cookie trên trình duyệt của mình nếu muốn.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  5. Cam Kết Không Chia Sẻ Cho Bên Thứ Ba
                </h2>
                <p>
                  MOS1000 Master cam kết <strong>không bán, trao đổi hoặc chia sẻ</strong> thông tin cá nhân của học viên cho bất kỳ bên thứ ba nào vì mục đích thương mại, ngoại trừ trường hợp có yêu cầu chính thức từ cơ quan pháp luật có thẩm quyền.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  6. Quyền Của Học Viên Và Thời Gian Lưu Trữ
                </h2>
                <p>
                  Dữ liệu được lưu trữ trong suốt thời gian học viên sử dụng tài khoản. Học viên có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ với bộ phận dịch vụ khách hàng.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  7. Liên Hệ Vấn Đề Bảo Mật
                </h2>
                <p>
                  Nếu bạn có bất kỳ thắc mắc nào liên quan đến bảo mật thông tin cá nhân, vui lòng liên hệ bộ phận hỗ trợ khách hàng qua email hoặc hotline tại mục <strong>Liên hệ</strong> ở chân trang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
