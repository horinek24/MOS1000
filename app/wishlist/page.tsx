'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { COURSES_DATA } from '@/data/courses';
import { CourseCard } from '@/components/CourseCard';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const favoriteCourses = COURSES_DATA.filter((c) => wishlist.includes(c.id));

  return (
    <>
      <Breadcrumb items={[{ label: 'Khóa học yêu thích' }]} />

      <section className="courses-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h1 className="section-title">Khóa Học Yêu Thích Của Bạn ({favoriteCourses.length})</h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Danh sách các khóa học tin học văn phòng bạn đã bấm lưu yêu thích
              </p>
            </div>
          </div>

          {favoriteCourses.length > 0 ? (
            <div className="courses-grid">
              {favoriteCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--color-border)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48" style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Chưa có khóa học yêu thích nào</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Hãy nhấn vào biểu tượng trái tim ❤️ ở các thẻ khóa học để lưu vào danh sách yêu thích nhé!
              </p>
              <Link href="/courses" className="btn btn-primary">
                Khám phá khóa học ngay
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
