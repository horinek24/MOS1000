'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/data/courses';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();

  const totalPrice = getTotalPrice();

  return (
    <>
      <Breadcrumb items={[{ label: 'Danh sách đăng ký khóa học' }]} />

      <section className="courses-section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '2rem' }}>
            Danh Sách Khóa Học Đăng Ký ({cart.length})
          </h1>

          {cart.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2.5rem', alignItems: 'start' }}>
              {/* Left List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.course.id}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      display: 'flex',
                      gap: '1.25rem',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.course.image}
                      alt={item.course.title}
                      style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                    />

                    <div style={{ flex: 1 }}>
                      <span className="category-tag cat-badge-word" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                        {item.course.categoryLabel}
                      </span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.35rem 0' }}>
                        <Link href={`/courses/${item.course.id}`}>{item.course.title}</Link>
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        Giảng viên: {item.course.instructor.name}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                        {formatVND(item.course.price)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.course.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginTop: '0.5rem',
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  style={{
                    alignSelf: 'flex-start',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-muted)',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                >
                  Xóa tất cả khỏi danh sách
                </button>
              </div>

              {/* Right Summary */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Tóm Tắt Đơn Đăng Ký</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.95rem' }}>
                  <span>Tạm tính:</span>
                  <span>{formatVND(totalPrice)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.95rem', color: '#10b981' }}>
                  <span>Giảm giá ưu đãi:</span>
                  <span>- 0 VNĐ</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)',
                    marginBottom: '1.75rem',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                  }}
                >
                  <span>Tổng tiền:</span>
                  <span style={{ color: 'var(--color-primary)' }}>{formatVND(totalPrice)}</span>
                </div>

                <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}>
                  Tiến hành thanh toán
                </Link>
              </div>
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
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Danh sách đăng ký đang trống</h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>Bạn chưa chọn khóa học luyện thi MOS nào.</p>
              <Link href="/courses" className="btn btn-primary">
                Xem danh sách khóa học
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
