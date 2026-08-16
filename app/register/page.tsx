'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ Họ tên, Email và Mật khẩu!');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await signUp(email, password, name);

      if (error) {
        setErrorMessage(error.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại!');
      } else {
        alert('Đăng ký tài khoản thành công qua Supabase Auth!');
        router.push('/courses');
      }
    } catch (err: any) {
      setErrorMessage('Có lỗi xảy ra trong quá trình đăng ký.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Tạo tài khoản học viên' }]} />

      <section className="courses-section">
        <div className="container" style={{ maxWidth: '480px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>Tạo Tài Khoản Mới</h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '1.75rem' }}>
              Đăng ký tài khoản thật với Supabase Auth bảo mật 100%
            </p>

            {errorMessage && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email đăng ký *</label>
                <input
                  type="email"
                  required
                  placeholder="hocvien@gmail.com"
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
                  placeholder="Mật khẩu tối thiểu 6 ký tự"
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
                {isSubmitting ? 'Đang tạo tài khoản...' : 'Đăng ký tài khoản'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-muted)' }}>
              Đã có tài khoản?{' '}
              <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
