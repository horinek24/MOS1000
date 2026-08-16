'use client';

import React from 'react';
import Link from 'next/link';
import { Course, formatVND } from '@/data/courses';
import { useWishlist } from '@/context/WishlistContext';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const liked = isInWishlist(course.id);

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'word':
        return 'cat-badge-word';
      case 'excel':
        return 'cat-badge-excel';
      case 'powerpoint':
        return 'cat-badge-powerpoint';
      default:
        return 'cat-badge-combo';
    }
  };

  return (
    <article className="course-card">
      <div className="course-img-wrapper">
        {course.badge && (
          <span className={`course-badge badge-${course.badgeType || 'hot'}`}>
            {course.badge}
          </span>
        )}

        <button
          className={`wishlist-btn ${liked ? 'active' : ''}`}
          title={liked ? 'Bỏ lưu khóa học' : 'Lưu khóa học'}
          aria-label="Yêu thích"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(course.id);
          }}
        >
          <svg viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <Link href={`/courses/${course.id}`}>
          <img src={course.image} alt={course.title} />
        </Link>
      </div>

      <div className="course-info">
        <div className="course-meta-top">
          <span className="course-rating">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {course.rating} ({course.reviewsCount})
          </span>
          <span className="course-students">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {course.studentsCount} Học viên
          </span>
        </div>

        <h3 className="course-title">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <p className="course-desc">{course.desc}</p>

        <div className="course-features-summary">
          <span className="summary-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {course.duration}
          </span>
          <span className="summary-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            {course.lessonsCount} bài giảng
          </span>
        </div>

        <div className="course-card-bottom">
          <div className="price-box">
            <span className="current-price">{formatVND(course.price)}</span>
            <span className="original-price">{formatVND(course.originalPrice)}</span>
          </div>

          <Link href={`/courses/${course.id}`} className="btn-detail">
            Chi tiết
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};
