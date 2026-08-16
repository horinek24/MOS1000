'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        const msg = error.message === 'Invalid login credentials' 
          ? 'Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!'
          : error.message;
        setErrorMessage(msg);
      } else {
        const isUserAdmin = email.toLowerCase() === 'phatwibuu@gmail.com' || email.toLowerCase() === 'admin@mos1000.vn';
        router.push(isUserAdmin ? '/admin' : '/courses');
      }
    } catch (err: any) {
      setErrorMessage('Có lỗi xảy ra trong quá trình đăng nhập.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillAdminPhat = () => {
    setEmail('phatwibuu@gmail.com');
    setPassword('admin123');
  };

  const handleFillAdminMain = () => {
    setEmail('admin@mos1000.vn');
    setPassword('admin123');
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Đăng nhập hệ thống' }]} />

      <section className="courses-section">
        <div className="container" style={{ maxWidth: '520px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>Đăng Nhập Tài Khoản</h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              Xác thực bảo mật 100% qua Supabase Auth
            </p>

            {/* Admin Notice Box */}
            <div style={{ backgroundColor: 'var(--color-bg-body)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                🔑 Tài Khoản Admin Đã Đăng Ký Hệ Thống:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'var(--color-dark-subtle)', marginBottom: '0.75rem' }}>
                <span>• Admin Email: <strong>phatwibuu@gmail.com</strong></span>
                <span>• Mật khẩu Admin: <strong>admin123</strong></span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline-cyan"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  onClick={handleFillAdminPhat}
                >
                  Điền phatwibuu@gmail.com
                </button>
                <button
                  type="button"
                  className="btn btn-outline-navy"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  onClick={handleFillAdminMain}
                >
                  Điền admin@mos1000.vn
                </button>
              </div>
            </div>

            {errorMessage && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email đăng nhập *</label>
                <input
                  type="email"
                  required
                  placeholder="phatwibuu@gmail.com hoặc hocvien@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Mật khẩu *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Đang xác thực Supabase Auth...' : 'Đăng nhập ngay'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-muted)' }}>
              Chưa có tài khoản?{' '}
              <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                Đăng ký tài khoản mới
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
