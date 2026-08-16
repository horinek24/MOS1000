'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';

export default function MyCoursesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { courses, enrolledCourseIds, isLoading: coursesLoading } = useCourses();

  if (authLoading || coursesLoading) {
    return <div style={{ padding: '5rem', textAlign: 'center', fontSize: '1.1rem' }}>Đang tải danh sách khóa học của bạn...</div>;
  }

  if (!user) {
    return (
      <>
        <Breadcrumb items={[{ label: 'Khóa học của tôi' }]} />
        <section className="courses-section" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                Vui Lòng Đăng Nhập
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                Bạn cần đăng nhập tài khoản MOS1000 Master để xem danh sách các khóa học đã đăng ký và theo dõi tiến trình học tập.
              </p>
              <Link href="/login" className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem' }}>
                Đăng Nhập Ngay
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Strictly filter only courses that match enrolledCourseIds (no fallback demo courses)
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  return (
    <>
      <Breadcrumb items={[{ label: 'Khóa học của tôi' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h1 className="section-title">Khóa Học Đã Đăng Ký Của Tôi</h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Chào mừng học viên <strong>{user.name}</strong> ({user.email}). Quản lý các khóa học và bắt đầu luyện thi ngay!
              </p>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 700, backgroundColor: 'var(--color-primary-light)', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
              🎓 Tổng số: {enrolledCourses.length} Khóa học
            </div>
          </div>

          {enrolledCourses.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'var(--color-word)', color: '#ffffff', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 700 }}>
                      {course.categoryLabel}
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                        {course.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                        {course.desc}
                      </p>

                      {/* Progress Bar set to 0% because no lessons are completed yet */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                          <span>Tiến trình hoàn thành:</span>
                          <span style={{ color: 'var(--color-primary)' }}>0%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: '0%', height: '100%', backgroundColor: 'var(--color-primary)' }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <Link
                        href={`/courses/${course.id}`}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '0.7rem', fontSize: '0.9rem', textAlign: 'center' }}
                      >
                        ▶️ Vào Học Ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bạn chưa đăng ký khóa học nào</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Khám phá ngay danh mục các khóa học MOS Word, Excel, PowerPoint 1000 điểm để bắt đầu học nhé!
              </p>
              <Link href="/courses" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                🛒 Xem Danh Sách Khóa Học
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
