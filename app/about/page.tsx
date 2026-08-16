'use client';

import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Về chúng tôi - MOS1000 Master' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '1rem', textAlign: 'center' }}>
              Về Chúng Tôi - MOS1000 Master
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-primary)', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem' }}>
              Nền tảng đào tạo & Luyện thi chứng chỉ tin học văn phòng MOS 1000/1000 hàng đầu Việt Nam
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155', fontSize: '0.98rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🎯 Sứ Mệnh Và Mục Tiêu
                </h2>
                <p>
                  <strong>MOS1000 Master</strong> ra đời với sứ mệnh đồng hành cùng hàng ngàn học viên, sinh viên và người đi làm trên toàn quốc trong việc nâng cao thành thạo kỹ năng tin học văn phòng chuẩn quốc tế. Chúng tôi tập trung tối đa vào lộ trình huấn luyện bài bản, giúp học viên không chỉ thi đạt chứng chỉ <strong>MOS (Microsoft Office Specialist)</strong> mà còn chinh phục mức điểm tối đa <strong>1000/1000 điểm</strong>.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📚 Chương Trình Đào Tạo Chuyên Sâu
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  MOS1000 Master cung cấp đầy đủ các chương trình đào tạo từ cơ bản đến nâng cao cho cả 3 môn học trọng tâm:
                </p>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong>Microsoft Word:</strong> Xử lý văn bản chuyên nghiệp, soạn thảo hợp đồng, báo cáo chuẩn mực và tự động hóa mục lục, mẫu biểu.</li>
                  <li><strong>Microsoft Excel:</strong> Quản trị dữ liệu, thành thạo các hàm tính toán phức tạp, PivotTable, biểu đồ động và phân tích số liệu kinh doanh.</li>
                  <li><strong>Microsoft PowerPoint:</strong> Thiết kế bài thuyết trình ấn tượng, tư duy bố cục slide đỉnh cao, hiệu ứng chuyển động chuyên nghiệp.</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  💡 Phương Pháp Đào Tạo Đột Phá
                </h2>
                <p>
                  Phương pháp đào tạo tại MOS1000 Master là sự kết hợp giữa <strong>Lý thuyết thực chiến</strong> và <strong>Hệ thống thi thử trực tuyến</strong> bám sát cấu trúc đề thi Certiport quốc tế mới nhất. Học viên được luyện tập trên phần mềm giả lập, thao tác trực tiếp trên các bộ đề chuẩn hóa, nhận phản hồi ngay lập tức để khắc phục các lỗi sai thường gặp.
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🛡️ Giá Trị Và Cam Kết Với Học Viên
                </h2>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li>✅ <strong>Chất lượng nội dung:</strong> Bài giảng hệ thống, cập nhật liên tục bám sát phần mềm Office 2019 và Microsoft 365.</li>
                    <li>✅ <strong>Hỗ trợ tận tâm:</strong> Đội ngũ tư vấn và giảng viên giải đáp thắc mắc bài tập trong suốt quá trình học tập.</li>
                    <li>✅ <strong>Hệ thống đề thi phong phú:</strong> Cung cấp ngân hàng câu hỏi thực hành đa dạng để học viên rèn luyện phản xạ làm bài thi nhanh chóng.</li>
                  </ul>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link href="/courses" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem' }}>
                  🚀 Khám Phá Các Khóa Học MOS Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
