'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CourseCard } from '@/components/CourseCard';
import { useCourses } from '@/context/CoursesContext';
import { createClient } from '@/utils/supabase/client';
import { formatVND } from '@/data/courses';

interface RecentOrderActivity {
  id: string;
  customer_name: string;
  created_at: string;
  items: any[];
}

export default function HomePage() {
  const { courses, categories: dynamicCategories, enrolledCourseIds } = useCourses();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const [recentOrders, setRecentOrders] = useState<RecentOrderActivity[]>([]);
  const [totalOrdersCount, setTotalOrdersCount] = useState<number>(0);

  const supabase = createClient();

  // Fetch real-time live registration activity from Supabase DB
  useEffect(() => {
    async function fetchLiveOrderStats() {
      try {
        const { data, count, error } = await supabase
          .from('orders')
          .select('id, customer_name, created_at, items', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(4);

        if (!error && data) {
          setRecentOrders(data);
          if (count !== null) setTotalOrdersCount(count);
        }
      } catch (err) {
        console.error('Error fetching live order stats for homepage:', err);
      }
    }

    fetchLiveOrderStats();
    const interval = setInterval(fetchLiveOrderStats, 5000); // Polling every 5s for live updates
    return () => clearInterval(interval);
  }, []);

  const categoryFilterList = [
    { id: 'all', label: 'Tất cả môn' },
    ...dynamicCategories.map((c) => ({ id: c.id, label: c.name })),
  ];

  const levels = [
    { id: 'all', label: 'Tất cả cấp độ' },
    { id: 'Cơ bản', label: 'Cơ bản' },
    { id: 'Nâng cao', label: 'Nâng cao' },
    { id: 'Mở rộng', label: 'Mở rộng' },
  ];

  const filteredCourses = courses.filter((course) => {
    if (enrolledCourseIds.includes(course.id)) {
      return false;
    }
    if (selectedCategory !== 'all' && course.category !== selectedCategory) {
      return false;
    }
    if (selectedLevel !== 'all' && course.level !== selectedLevel) {
      return false;
    }
    return true;
  });

  const totalStudentsCombined = courses.reduce((sum, c) => sum + (c.studentsCount || 0), 0);

  return (
    <>
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-card">
            {/* Left Content Column */}
            <div className="hero-content">
              <div className="hero-badge-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Chứng Chỉ Tin Học Văn Phòng Quốc Tế</span>
              </div>

              <h1 className="hero-title">
                Chinh Phục Chứng Chỉ <br />
                <span className="text-gold-gradient">MOS 1000+ Điểm</span> Cùng MOS Master
              </h1>

              <p className="hero-subtitle">
                Lộ trình luyện thi MOS Word, Excel, PowerPoint bám sát đề thi thật Certiport 1000 điểm. Cam kết đầu ra, tự tin sở hữu bằng quốc tế giá trị trọn đời.
              </p>

              <div className="hero-cta">
                <Link href="/courses" className="btn btn-hero-gold">
                  Khám phá khóa học
                </Link>
                <Link href="/quizzes" className="btn btn-hero-outline">
                  Thi thử trực tuyến
                </Link>
              </div>

              {/* 3 Commitment Feature Cards */}
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="feature-text">
                    <span className="feature-title">Cam kết đậu 100%</span>
                    <span className="feature-desc">Học lại miễn phí</span>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="feature-text">
                    <span className="feature-title">Đề thi sát 100%</span>
                    <span className="feature-desc">Cập nhật 2026</span>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="feature-text">
                    <span className="feature-title">Học & Thi thử 24/7</span>
                    <span className="feature-desc">Mô phỏng Certiport</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Banner Image */}
            <div className="hero-image-wrapper">
              <img
                src="/MOS1000_Assets/assets/images/banner/banner-trang-chu-MOS-1000.png"
                alt="MOS1000 Master Banner Luyện thi chứng chỉ tin học văn phòng quốc tế"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Supabase Orders & Registration Activity Bar */}
      <section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '1.75rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '2rem', alignItems: 'center' }}>
            {/* Stat Counters */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                ⚡ Cập nhật theo thời gian thực (Supabase Live)
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-dark)' }}>{totalStudentsCombined.toLocaleString('vi-VN')}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Học viên đã đăng ký</div>
                </div>
                <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} />
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>{totalOrdersCount}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Đơn đăng ký mới</div>
                </div>
              </div>
            </div>

            {/* Recent Live Orders Activity Feed */}
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                Hoạt động đăng ký vừa diễn ra từ học viên:
              </div>

              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => {
                    const firstCourseTitle = Array.isArray(order.items) && order.items.length > 0 ? (order.items[0].course_title || order.items[0].title || 'Khóa học MOS') : 'Khóa học MOS';
                    return (
                      <div
                        key={order.id}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.65rem 1rem',
                          fontSize: '0.82rem',
                          whiteSpace: 'nowrap',
                          boxShadow: 'var(--shadow-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <span>🎉</span>
                        <div>
                          <strong style={{ color: '#0f172a' }}>{order.customer_name}</strong> vừa đăng ký <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{firstCourseTitle}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Đang cập nhật lượt đăng ký mới...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category & Level Filter Section */}
      <section className="category-section">
        <div className="container">
          <div className="filter-panel-card">
            {/* Môn Học Filter Pills */}
            <div className="filter-group">
              <span className="filter-label">Môn học:</span>
              <div className="category-pills">
                {categoryFilterList.map((cat) => (
                  <button
                    key={cat.id}
                    className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trình Độ Filter Pills */}
            <div className="filter-group filter-group-level">
              <span className="filter-label">Trình độ:</span>
              <div className="category-pills">
                {levels.map((lvl) => (
                  <button
                    key={lvl.id}
                    className={`cat-pill cat-pill-level ${selectedLevel === lvl.id ? 'active' : ''}`}
                    onClick={() => setSelectedLevel(lvl.id)}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Grid Section */}
      <section className="courses-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Danh Sách Khóa Học Nổi Bật</h2>
              <p className="section-subtitle">
                Các khóa học tin học văn phòng từ cơ bản đến nâng cao được biên soạn chuẩn quốc tế
              </p>
            </div>

            <Link href="/courses" className="view-all-link">
              <span>Xem tất cả khóa học</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="empty-filter-state">
              <div className="empty-icon">🔍</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-dark)' }}>
                Không tìm thấy khóa học phù hợp
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                Vui lòng thử chọn môn học hoặc trình độ khác để xem bài giảng.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Certiport Certification Benefits Section */}
      <section className="courses-section benefits-section">
        <div className="container">
          <div className="benefits-header">
            <span className="category-tag cat-badge-combo" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              Bằng Cấp Quốc Tế Giá Trị Trọn Đời
            </span>
            <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
              Vì Sao Nên Sở Hữu Chứng Chỉ MOS (Microsoft Office Specialist)?
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1rem', maxWidth: '720px', margin: '0 auto' }}>
              Chứng chỉ tin học văn phòng quốc tế do Microsoft cấp trực tiếp qua tập đoàn Certiport (Hoa Kỳ) khẳng định năng lực làm việc chuyên nghiệp.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-wrapper benefit-icon-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="benefit-title">Miễn Học & Miễn Thi Tin Học Đại Học</h3>
              <p className="benefit-desc">
                Hầu hết các trường Đại học/Cao đẳng tại Việt Nam công nhận và miễn học phần tin học đại cương khi bạn sở hữu chứng chỉ MOS.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper benefit-icon-word">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="benefit-title">Ưu Thế Khi Đột Phá CV Đi Làm</h3>
              <p className="benefit-desc">
                Gây ấn tượng mạnh mẽ với nhà tuyển dụng tại các tập đoàn Đa quốc gia, Ngân hàng và Doanh nghiệp lớn nhờ chứng chỉ chuẩn Microsoft.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper benefit-icon-excel">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <h3 className="benefit-title">Tăng 300% Năng Suất Làm Việc</h3>
              <p className="benefit-desc">
                Làm chủ phím tắt, tự động hóa xử lý văn bản, hàm tính toán Excel và slide PowerPoint giúp bạn hoàn thành công việc nhanh chóng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
