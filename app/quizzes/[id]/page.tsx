'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QUIZZES_DATA, Quiz, Question } from '@/data/quizzes';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';

export default function QuizExamPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  const { user } = useAuth();
  const supabase = createClient();

  const quiz = QUIZZES_DATA.find((q) => q.id === quizId) || QUIZZES_DATA[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.durationMins * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Timer Countdown Effect
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const currentQuestion = quiz.questions[currentIndex];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const handleSubmitExam = async () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOption) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 1000);
    const passed = calculatedScore >= quiz.passScore;
    const timeSpentSeconds = quiz.durationMins * 60 - timeLeft;

    setScore(calculatedScore);
    setIsSubmitted(true);

    // Save exam result to Supabase DB 'quiz_results'
    try {
      const payload = {
        user_id: user?.id || null,
        user_email: user?.email || 'GuestLearner@mos1000.vn',
        user_name: user?.name || 'Học viên Ẩn danh',
        quiz_id: quiz.id,
        quiz_title: quiz.title,
        score: calculatedScore,
        total_questions: quiz.questions.length,
        correct_answers: correctCount,
        time_spent: timeSpentSeconds,
        passed,
      };

      const { error } = await supabase.from('quiz_results').insert(payload);
      if (error) {
        console.error('Lỗi khi lưu kết quả thi thử vào Supabase:', error);
      } else {
        console.log('Đã lưu kết quả thi thử thành công vào Supabase!');
      }
    } catch (err) {
      console.error('Lỗi kết nối Supabase khi lưu điểm thi:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Thi Thử MOS', href: '/quizzes' },
          { label: quiz.title },
        ]}
      />

      <section className="quiz-exam-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {!isSubmitted ? (
            /* Live Exam Mode */
            <div className="quiz-exam-card">
              {/* Header Bar */}
              <div className="exam-top-bar">
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{quiz.title}</h2>
                  <span className="question-progress">
                    Câu hỏi {currentIndex + 1} / {quiz.questions.length}
                  </span>
                </div>

                <div className="timer-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Question Box */}
              <div className="question-text-box">
                Câu {currentIndex + 1}: {currentQuestion.questionText}
              </div>

              {/* Options */}
              <div className="options-list">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      className={`option-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(opt.key)}
                    >
                      <span className="option-key">{opt.key}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div className="exam-footer-bar">
                <button
                  className="btn btn-outline-navy"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
                >
                  ← Câu trước
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {quiz.questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        backgroundColor:
                          idx === currentIndex
                            ? 'var(--color-primary)'
                            : selectedAnswers[q.id]
                            ? 'var(--color-primary-light)'
                            : '#ffffff',
                        color: idx === currentIndex ? '#ffffff' : 'var(--color-dark)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                      }}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {currentIndex < quiz.questions.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setCurrentIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
                  >
                    Câu tiếp theo →
                  </button>
                ) : (
                  <button className="btn btn-hero-gold" onClick={handleSubmitExam}>
                    Nộp Bài Thi
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen Mode */
            <div className="quiz-exam-card" style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: (score || 0) >= quiz.passScore ? '#ecfdf5' : '#fef2f2',
                  color: (score || 0) >= quiz.passScore ? '#10b981' : '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  border: `3px solid ${(score || 0) >= quiz.passScore ? '#10b981' : '#ef4444'}`,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="40" height="40">
                  {(score || 0) >= quiz.passScore ? (
                    <polyline points="20 6 9 17 4 12" />
                  ) : (
                    <line x1="18" y1="6" x2="6" y2="18" />
                  )}
                </svg>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                {(score || 0) >= quiz.passScore ? '🎉 CHÚC MỪNG BẠN ĐÃ ĐẠT!' : '❌ CHƯA ĐẠT ĐIỂM SÀN'}
              </h2>

              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                {score} <span style={{ fontSize: '1.2rem', color: 'var(--color-muted)' }}>/ 1000 Điểm</span>
              </div>

              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Điểm sàn đậu chứng chỉ Certiport: <strong>{quiz.passScore}/1000</strong>
              </p>
              <div style={{ fontSize: '0.88rem', color: '#10b981', fontWeight: 600, backgroundColor: '#ecfdf5', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', display: 'inline-block', marginBottom: '2rem' }}>
                ✓ Kết quả thi đã được lưu thành công vào cơ sở dữ liệu Supabase DB!
              </div>

              {/* Review Answers & Explanations */}
              <div style={{ textAlign: 'left', marginTop: '2.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Xem Chi Tiết Đáp Án & Giải Thích:</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {quiz.questions.map((q, idx) => {
                    const userAns = selectedAnswers[q.id];
                    const isCorrect = userAns === q.correctOption;
                    return (
                      <div
                        key={q.id}
                        style={{
                          border: `1px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem',
                          backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', color: '#0f172a' }}>
                          Câu {idx + 1}: {q.questionText}
                        </div>

                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          Đáp án bạn chọn: <strong>{userAns || 'Chưa chọn'}</strong> | Đáp án đúng: <strong style={{ color: '#10b981' }}>{q.correctOption}</strong>
                        </div>

                        <div style={{ fontSize: '0.88rem', color: 'var(--color-dark-subtle)', background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                          💡 <strong>Giải thích:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => { setIsSubmitted(false); setScore(null); setSelectedAnswers({}); setTimeLeft(quiz.durationMins * 60); }}>
                  🔄 Làm lại bài thi này
                </button>
                <button className="btn btn-outline-navy" onClick={() => router.push('/quizzes')}>
                  🏆 Xem Bảng Xếp Hạng & Đề Khác
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
