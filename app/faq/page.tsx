'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'MOS là gì?',
      answer: 'MOS (Microsoft Office Specialist) là bài thi đánh giá kỹ năng tin học văn phòng quốc tế do Tập đoàn Microsoft cấp trực tiếp có giá trị vô thời hạn trên toàn thế giới. Chứng chỉ MOS chứng nhận khả năng sử dụng thành thạo các ứng dụng Microsoft Office như Word, Excel, PowerPoint.',
    },
    {
      question: 'MOS1000 là gì?',
      answer: 'MOS1000 Master là hệ thống luyện thi bài bản hướng tới mục tiêu điểm tuyệt đối 1000/1000 điểm trong kỳ thi chứng chỉ MOS. Chương trình tích hợp lý thuyết thực chiến và hệ thống phần mềm đề thi thử giả lập chuẩn mực.',
    },
    {
      question: 'Tôi có thể học MOS online không?',
      answer: 'Hoàn toàn được! Bạn có thể chủ động học online 100% mọi lúc mọi nơi trên máy tính hoặc điện thoại. Bài giảng video sắc nét kết hợp hệ thống bài tập thực hành giúp bạn ôn luyện cực kỳ hiệu quả.',
    },
    {
      question: 'Khóa học có phù hợp với người mới bắt đầu không?',
      answer: 'Có! Lộ trình khóa học được thiết kế từ cơ bản đến nâng cao. Ngay cả khi bạn chưa từng sử dụng phần mềm Office hoặc mất gốc tin học, giáo trình MOS1000 Master sẽ hướng dẫn tỉ mỉ từng thao tác click chuột.',
    },
    {
      question: 'Tôi có thể học Word, Excel và PowerPoint không?',
      answer: 'Có, MOS1000 Master cung cấp trọn bộ khóa học cho cả 3 môn trọng tâm: MOS Word, MOS Excel và MOS PowerPoint với đầy đủ các phiên bản Office 2019 và Microsoft 365.',
    },
    {
      question: 'Sau khi đăng ký khóa học tôi nhận được gì?',
      answer: 'Bạn sẽ nhận được quyền truy cập trọn đời hệ thống video bài giảng chất lượng cao, file bài tập thực hành đính kèm (.docx, .xlsx, .pptx), tài khoản luyện đề thi thử trực tuyến và sự hỗ trợ giải đáp từ đội ngũ giảng viên.',
    },
    {
      question: 'Làm thế nào để thanh toán?',
      answer: 'Bạn có thể thanh toán trực tuyến qua Chuyển khoản ngân hàng (quét mã VietQR tự động) hoặc ví điện tử. Hệ thống sẽ xác nhận và kích hoạt khóa học tự động ngay sau khi hoàn tất giao dịch.',
    },
    {
      question: 'Làm thế nào để truy cập khóa học?',
      answer: 'Sau khi đăng ký thành công, bạn chỉ cần đăng nhập tài khoản tại website MOS1000 Master và bấm vào danh mục "Khóa học của tôi" hoặc truy cập trực tiếp bài học để bắt đầu học ngay.',
    },
    {
      question: 'Tôi quên tài khoản / mật khẩu thì phải làm gì?',
      answer: 'Bạn có thể bấm vào liên kết "Quên mật khẩu" tại trang Đăng nhập để nhận link đặt lại mật khẩu mới qua Email, hoặc nhắn tin cho bộ phận chăm sóc học viên để được hỗ trợ cấp lại tức thì.',
    },
    {
      question: 'Tôi gặp lỗi khi truy cập khóa học thì liên hệ ở đâu?',
      answer: 'Bạn có thể liên hệ ngay bộ phận Kỹ thuật qua Hotline hỗ trợ khách hàng hoặc nhắn tin qua Fanpage/Email hỗ trợ được đính kèm ở chân trang website.',
    },
    {
      question: 'Có được hỗ trợ trong quá trình học không?',
      answer: 'Có! Bạn luôn có sự đồng hành của đội ngũ Giảng viên và Trợ giảng MOS Master. Bất kỳ câu hỏi nào trong bài học hoặc đề thi thử đều được giải đáp chi tiết.',
    },
    {
      question: 'Có được chia sẻ tài liệu khóa học cho người khác không?',
      answer: 'Không. Theo Điều khoản sử dụng, toàn bộ tài liệu và nội dung khóa học thuộc bản quyền độc quyền của MOS1000 Master và chỉ dành cho cá nhân học viên đăng ký. Việc tự ý chia sẻ hoặc thương mại hóa trái phép sẽ bị khóa tài khoản vĩnh viễn.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Câu hỏi thường gặp (FAQ)' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Câu Hỏi Thường Gặp (FAQ)
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Giải đáp nhanh tất cả thắc mắc về khóa học, chứng chỉ MOS và hệ thống thi thử
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      backgroundColor: isOpen ? '#f8fafc' : '#ffffff',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      style={{
                        width: '100%',
                        padding: '1.1rem 1.5rem',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '1.02rem',
                        color: isOpen ? 'var(--color-primary)' : '#0f172a',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ fontSize: '1.2rem', marginLeft: '1rem', transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        ▼
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', borderTop: '1px solid var(--color-border-light)', paddingTop: '0.85rem' }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Bạn vẫn còn thắc mắc cần tư vấn thêm?</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>Đội ngũ chăm sóc học viên MOS1000 Master luôn sẵn sàng hỗ trợ bạn 24/7</p>
              <Link href="/contact" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                💬 Liên Hệ Hỗ Trợ Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
