'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Vui lòng nhập Email!');
      return;
    }

    const name = email.toLowerCase().includes('admin') ? 'Quản Trị Viên (Admin)' : email.split('@')[0];
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'student';

    login(name, email, role);
    router.push(role === 'admin' ? '/admin' : '/courses');
  };

  const handleQuickAdmin = () => {
    setEmail('admin@mos1000.vn');
    setPassword('admin123');
    login('Quản Trị Viên (Admin)', 'admin@mos1000.vn', 'admin');
    router.push('/admin');
  };

  const handleQuickStudent = () => {
    setEmail('hocvien@gmail.com');
    setPassword('123456');
    login('Học Viên Demo', 'hocvien@gmail.com', 'student');
    router.push('/courses');
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Đăng nhập hệ thống' }]} />

      <section className="courses-section">
        <div className="container" style={{ maxWidth: '520px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>Đăng Nhập Tài Khoản</h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '1.75rem' }}>
              Truy cập tài khoản học viên hoặc khu vực quản trị Admin
            </p>

            {/* Admin Credential Notice Box */}
            <div style={{ backgroundColor: 'var(--color-bg-body)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                🔑 Tài Khoản Quản Trị Hệ Thống (Admin):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: 'var(--color-dark-subtle)' }}>
                <span>• Email Admin: <strong>admin@mos1000.vn</strong></span>
                <span>• Mật khẩu Admin: <strong>admin123</strong></span>
              </div>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email đăng nhập</label>
                <input
                  type="email"
                  required
                  placeholder="admin@mos1000.vn hoặc hocvien@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Mật khẩu</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}>
                Đăng nhập ngay
              </button>
            </form>

            <div style={{ textAlign: 'center', margin: '1.5rem 0 1rem 0', position: 'relative' }}>
              <span style={{ backgroundColor: '#ffffff', padding: '0 0.75rem', color: 'var(--color-muted)', fontSize: '0.82rem', position: 'relative', zIndex: 1 }}>
                Hoặc đăng nhập nhanh 1-Click
              </span>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--color-border)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <button
                type="button"
                className="btn btn-outline-cyan"
                style={{ fontSize: '0.82rem', padding: '0.75rem 0.5rem' }}
                onClick={handleQuickAdmin}
              >
                🔑 Vào Trang Admin
              </button>

              <button
                type="button"
                className="btn btn-outline-navy"
                style={{ fontSize: '0.82rem', padding: '0.75rem 0.5rem' }}
                onClick={handleQuickStudent}
              >
                🎓 Vào Học Viên Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
