'use client';

import React, { useEffect, useState } from 'react';
import { QUIZZES_DATA } from '@/data/quizzes';
import { QuizCard } from '@/components/QuizCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createClient } from '@/utils/supabase/client';

export default function QuizzesPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('id, user_name, quiz_title, score, time_spent, created_at')
          .order('score', { ascending: false })
          .limit(5);

        if (!error && data) {
          setLeaderboard(data);
        }
      } catch (err) {
        console.error('Error fetching quiz leaderboard:', err);
      } finally {
        setLoadingLeaderboard(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <>
      <Breadcrumb items={[{ label: 'Hệ thống Thi Thử MOS Online' }]} />

      <section className="courses-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h1 className="section-title">Hệ Thống Luyện Thi Trắc Nghiệm MOS Online</h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Mô phỏng 100% cấu trúc đề thi thật Certiport (Word, Excel, PowerPoint) có bấm giờ & chấm điểm tự động.
              </p>
            </div>
          </div>

          {/* Quiz Cards Grid */}
          <div className="quizzes-grid" style={{ marginBottom: '3.5rem' }}>
            {QUIZZES_DATA.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>

          {/* Live Supabase Leaderboard Section */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  🏆 Bảng Thành Tích Điểm Cao Thi Thử MOS (Supabase Live)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', margin: 0 }}>
                  Vinh danh các học viên có điểm số thi thử cao nhất toàn hệ thống
                </p>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 700, backgroundColor: 'var(--color-primary-light)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                ⚡ Cập nhật tự động 24/7
              </span>
            </div>

            {leaderboard.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Thứ hạng</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Học viên</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Đề thi thử</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Điểm số</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Thời gian thi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((item, index) => (
                      <tr key={item.id || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: index === 0 ? '#eab308' : index === 1 ? '#94a3b8' : index === 2 ? '#b45309' : '#64748b' }}>
                          {index === 0 ? '🥇 Hạng 1' : index === 1 ? '🥈 Hạng 2' : index === 2 ? '🥉 Hạng 3' : `#${index + 1}`}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>{item.user_name}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>{item.quiz_title}</td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{item.score} / 1000</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>{new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                Chưa có dữ liệu thành tích. Hãy là người đầu tiên làm bài thi thử để ghi danh bảng vàng!
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
