'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatVND } from '@/data/courses';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCourses } from '@/context/CoursesContext';
import { Toast } from '@/components/Toast';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const { getCourseById, courses } = useCourses();
  const course = getCourseById(courseId) || courses[0];
  const { addToCart, isInCart } = useCart();
  const { isInWishlist } = useWishlist();

  const [activeLesson, setActiveLesson] = useState<{ title: string; videoUrl?: string } | null>({
    title: '1.1 Cấu trúc đề thi MOS 2019/365 chuẩn Certiport',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample embedded educational stream
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inCart = isInCart(course.id);

  const handleAddToCart = () => {
    addToCart(course);
    setToastMessage(`Đã thêm khóa học "${course.title}" vào danh sách đăng ký!`);
  };

  const handleEnrollNow = () => {
    if (!inCart) addToCart(course);
    router.push('/checkout');
  };

  const handleSelectLesson = (lessonTitle: string) => {
    setActiveLesson({
      title: lessonTitle,
    });
    setToastMessage(`Đang phát bài giảng: ${lessonTitle}`);
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <Breadcrumb
        items={[
          { label: 'Khóa học', href: '/courses' },
          { label: course.title },
        ]}
      />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left Main Content Column */}
            <div>
              {/* Category & Badge */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                <span className="tag-stock" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                  Trình độ: {course.level}
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  ★ {course.rating} ({course.reviewsCount} đánh giá)
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: '1.25', marginBottom: '1.25rem' }}>
                {course.title}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
                {course.fullDescription}
              </p>

              {/* Video Player Box */}
              <div
                style={{
                  backgroundColor: '#0f172a',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  marginBottom: '2.5rem',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ padding: '1rem 1.5rem', background: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>🎬 Trình Phát Bài Giảng Trực Tuyến Full HD</span>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>{activeLesson ? activeLesson.title : 'Chọn bài học bên dưới'}</span>
                </div>

                <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative', background: '#000000' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textAlign: 'center', padding: '2rem', backgroundColor: '#020617' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '2px solid #38bdf8', cursor: 'pointer' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36" style={{ color: '#38bdf8', marginLeft: '4px' }}>
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#f8fafc' }}>
                      {activeLesson ? activeLesson.title : 'Bài giảng video hướng dẫn thực hành MOS 1000/1000 điểm'}
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '500px' }}>
                      Video chuẩn định dạng Full HD có giáo trình thực hành đi kèm. Bạn có thể nhấn chọn bài học bên dưới để chuyển video!
                    </p>
                  </div>
                </div>
              </div>

              {/* Curriculum Breakdown */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-dark)' }}>
                  Nội Dung Chương Trình Học ({course.lessonsCount} Bài giảng)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {course.modules && course.modules.length > 0 ? (
                    course.modules.map((mod) => (
                      <div key={mod.id} style={{ border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        <div style={{ backgroundColor: 'var(--color-bg-body)', padding: '1rem 1.25rem', fontWeight: 700, fontSize: '1rem', color: 'var(--color-dark)' }}>
                          {mod.title}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {mod.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              style={{
                                padding: '0.85rem 1.25rem',
                                borderTop: '1px solid var(--color-border-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '0.9rem',
                                backgroundColor: activeLesson?.title === lesson.title ? 'var(--color-primary-light)' : '#ffffff',
                              }}
                            >
                              <div
                                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flex: 1 }}
                                onClick={() => handleSelectLesson(lesson.title)}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ color: 'var(--color-primary)' }}>
                                  <circle cx="12" cy="12" r="10" />
                                  <polygon points="10 8 16 12 10 16 10 8" />
                                </svg>
                                <span style={{ fontWeight: 600, color: '#0f172a' }}>{lesson.title}</span>
                                {lesson.isPreview && (
                                  <span style={{ fontSize: '0.72rem', fontWeight: 700, backgroundColor: '#ecfdf5', color: '#10b981', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                                    Học thử
                                  </span>
                                )}
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {lesson.fileName ? (
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setToastMessage(`📥 Đã tải file bài tập thực hành: ${lesson.fileName}`);
                                    }}
                                    style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: 'rgba(6, 182, 212, 0.1)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)' }}
                                  >
                                    📥 Tải file thực hành
                                  </a>
                                ) : (
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setToastMessage(`📥 Đã tải bộ file mẫu đính kèm bài học (${lesson.title})`);
                                    }}
                                    style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                  >
                                    📥 File thực hành
                                  </a>
                                )}
                                <span style={{ color: 'var(--color-muted)', fontSize: '0.82rem' }}>{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                      Đang cập nhật lộ trình bài giảng cho khóa học này.
                    </div>
                  )}
                </div>
              </div>

              {/* Instructor Section */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>Giảng Viên Đồng Hành</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <img src={course.instructor.avatar} alt={course.instructor.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)' }}>{course.instructor.name}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 600 }}>{course.instructor.title}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>Hơn 10 năm kinh nghiệm luyện thi chứng chỉ MOS quốc tế cho hơn 10,000+ sinh viên và người đi làm.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar Enrollment Box */}
            <div style={{ position: 'sticky', top: '90px' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{formatVND(course.price)}</span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--color-light-muted)', textDecoration: 'line-through' }}>{formatVND(course.originalPrice)}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                  <button className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }} onClick={handleEnrollNow}>
                    🚀 Đăng Ký Học Ngay
                  </button>

                  <button
                    className="btn btn-outline-navy"
                    style={{ width: '100%', padding: '0.85rem' }}
                    onClick={handleAddToCart}
                  >
                    {inCart ? '✓ Đã có trong danh sách' : 'Thêm vào giỏ hàng'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-light)', fontSize: '0.88rem', color: 'var(--color-dark-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ✔ Quyền truy cập: <strong>Trọn đời (Lifetime)</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ✔ Thiết bị học: <strong>Máy tính, Điện thoại, Tablet</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ✔ Tài liệu đính kèm: <strong>File mẫu .docx/.xlsx/.pptx</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ✔ Hỗ trợ đáp án: <strong>Giải đáp 24/7 từ Giảng viên</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
