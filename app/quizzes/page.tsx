'use client';

import React from 'react';
import { QUIZZES_DATA } from '@/data/quizzes';
import { QuizCard } from '@/components/QuizCard';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function QuizzesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Hệ thống Thi Thử MOS Online' }]} />

      <section className="courses-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h1 className="section-title">Hệ Thống Luyện Thi Trắc Nghiệm MOS Online</h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Mô phỏng 100% cấu trúc đề thi thật Certiport (Word, Excel, PowerPoint) có bấm giờ & chấm điểm tự động.
              </p>
            </div>
          </div>

          <div className="quizzes-grid">
            {QUIZZES_DATA.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
