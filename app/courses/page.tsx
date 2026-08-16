'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CourseCard } from '@/components/CourseCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useCourses } from '@/context/CoursesContext';

function CoursesContent() {
  const { courses, categories } = useCourses();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Category filter
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }
      // Level filter
      if (selectedLevel !== 'all' && course.level !== selectedLevel) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = course.title.toLowerCase().includes(query);
        const matchDesc = (course.desc || course.description || '').toLowerCase().includes(query);
        if (!matchTitle && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
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

          {/* Filter Controls Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
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

            {/* Sort & Search Controls */}
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Không tìm thấy khóa học phù hợp</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                Thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn bộ lọc để xem các khóa học khác.
              </p>
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
