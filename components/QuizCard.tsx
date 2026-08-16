'use client';

import React from 'react';
import Link from 'next/link';
import { Quiz } from '@/data/quizzes';

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const getSubjectBadge = (subject: string) => {
    switch (subject) {
      case 'word':
        return 'cat-badge-word';
      case 'excel':
        return 'cat-badge-excel';
      default:
        return 'cat-badge-powerpoint';
    }
  };

  return (
    <article className="quiz-card">
      <div className="quiz-card-header">
        <span className={`category-tag ${getSubjectBadge(quiz.subject)}`}>
          {quiz.subjectLabel}
        </span>
        <span className="quiz-badge">{quiz.badge}</span>
      </div>

      <h3 className="quiz-title">
        <Link href={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
      </h3>

      <p className="quiz-desc">{quiz.description}</p>

      <div className="quiz-meta-grid">
        <div className="meta-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Thời gian: <strong>{quiz.durationMins} phút</strong>
        </div>

        <div className="meta-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Số câu: <strong>{quiz.totalQuestions} câu</strong>
        </div>

        <div className="meta-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Điểm đậu: <strong>{quiz.passScore}/1000</strong>
        </div>
      </div>

      <Link href={`/quizzes/${quiz.id}`} className="btn btn-primary btn-start-quiz">
        Bắt đầu thi thử ngay
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </article>
  );
};
