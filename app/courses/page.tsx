'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CourseCard } from '@/components/CourseCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useCourses } from '@/context/CoursesContext';

function CoursesContent() {
  const { courses, categories, enrolledCourseIds } = useCourses();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  // Sync searchParams from URL to state
  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');

    if (s !== null) {
      setSearchQuery(s);
      // Reset category to 'all' when user performs a search unless explicit category was requested
      if (!c) {
        setSelectedCategory('all');
      }
    }
    if (c !== null) {
      setSelectedCategory(c);
    }
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses
      .filter((course) => {
        // Exclude courses already enrolled/purchased by the user
        if (enrolledCourseIds.includes(course.id)) {
          return false;
        }

        // Category filter: If text search is active, do not block results from other categories unless user manually selected a specific category pill
        if (selectedCategory !== 'all' && !query) {
          if (course.category !== selectedCategory) return false;
        }

        // Level filter
        if (selectedLevel !== 'all' && course.level !== selectedLevel) {
          return false;
        }

        // Comprehensive Text Search Matching
        if (query) {
          const matchTitle = (course.title || '').toLowerCase().includes(query);
          const matchDesc = (course.desc || course.description || '').toLowerCase().includes(query);
          const matchFullDesc = (course.fullDescription || '').toLowerCase().includes(query);
          const matchCat = (course.categoryLabel || '').toLowerCase().includes(query) || (course.category || '').toLowerCase().includes(query);
          const matchLevel = (course.level || '').toLowerCase().includes(query);
          const matchSlug = (course.slug || course.id || '').toLowerCase().includes(query);
          const matchBadge = (course.badge || '').toLowerCase().includes(query);

          if (!matchTitle && !matchDesc && !matchFullDesc && !matchCat && !matchLevel && !matchSlug && !matchBadge) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [courses, selectedCategory, selectedLevel, searchQuery, sortBy]);

  return (
    <>
      <Breadcrumb items={[{ label: 'Danh sách Khóa học' }]} />

      <section className="courses-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h1 className="section-title">Danh Sách Khóa Học Tin Học Văn Phòng</h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Các khóa học Word, Excel, PowerPoint & Luyện thi chứng chỉ MOS từ cơ bản đến nâng cao
              </p>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
              Hiển thị <strong>{filteredCourses.length}</strong> khóa học
            </div>
          </div>

          {/* Real-time Search Input Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" style={{ color: 'var(--color-primary)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm (VD: 365, Word, Excel, Nâng cao, MOS 2019...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.98rem',
                  fontFamily: 'inherit',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    border: 'none',
                    background: 'none',
                    color: 'var(--color-muted)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                  }}
                >
                  ✕ Xóa từ khóa
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              marginBottom: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className={`cat-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tất cả môn
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort & Level Controls */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-dark-subtle)' }}>
                  Trình độ:
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                >
                  <option value="all">Tất cả trình độ</option>
                  <option value="Cơ bản">Cơ bản</option>
                  <option value="Nâng cao">Nâng cao</option>
                  <option value="Mở rộng">Mở rộng</option>
                  <option value="Mọi cấp độ">Mọi cấp độ</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-dark-subtle)' }}>
                  Sắp xếp:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Search Result Banner */}
          {searchQuery.trim() && (
            <div style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', border: '1px solid var(--color-border)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              🔎 Kết quả tìm kiếm cho từ khóa: &quot;{searchQuery}&quot; — Tìm thấy {filteredCourses.length} khóa học
            </div>
          )}

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Khóa học bạn tìm kiếm không có sẵn</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Không tìm thấy khóa học nào phù hợp với từ khóa &quot;{searchQuery}&quot;. Vui lòng thử từ khóa khác (VD: 365, Word, Excel, PowerPoint, MOS 2019).
              </p>
              <button
                type="button"
                className="btn btn-outline-navy"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
              >
                🔄 Xóa bộ lọc & xem tất cả khóa học
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Đang tải danh sách khóa học...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
