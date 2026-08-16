'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { getTotalCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { wishlist } = useWishlist();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = getTotalCount();
  const wishlistCount = wishlist.length;

  const handlePerformSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}&category=all`);
    } else {
      router.push('/courses');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePerformSearch();
    }
  };

  const firstName = user?.name ? user.name.split(' ').pop() : 'Học viên';

  return (
    <header id="site-header" className={`site-header ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="brand-logo" title="MOS 1000 - Nền Tảng Luyện Thi Chứng Chỉ MOS Quốc Tế">
            <img
              src="/MOS1000_Assets/assets/images/logo/logo-MOS1000.png"
              alt="MOS 1000 Logo"
              className="brand-logo-img"
            />
            <span className="brand-title">MOS<span className="brand-title-accent">1000</span></span>
          </Link>

          {/* Navigation Menu */}
          <ul className="nav-menu">
            <li>
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className={`nav-link ${pathname.startsWith('/courses') ? 'active' : ''}`}
              >
                Khóa Học
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
              >
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
              >
                Liên Hệ
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="header-search">
            <input
              type="text"
              id="global-search-input"
              placeholder="Tìm khóa học 365, Word, Excel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              type="button"
              className="search-icon"
              onClick={handlePerformSearch}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Click để tìm kiếm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Cart, Wishlist Buttons & User Actions */}
          <div className="header-actions">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className={`header-cart-link ${pathname === '/wishlist' ? 'active' : ''}`}
              title="Khóa học yêu thích"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ color: 'var(--color-word)' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="cart-badge" style={{ backgroundColor: 'var(--color-word)' }}>
                {wishlistCount}
              </span>
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className={`header-cart-link ${pathname === '/cart' ? 'active' : ''}`}
              title="Đăng ký khóa học"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span className="cart-badge" id="cart-badge-count">
                {cartCount}
              </span>
            </Link>

            {!user ? (
              <>
                <Link href="/login" className="btn btn-outline-navy">
                  Đăng nhập
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Đăng ký học
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link href="/admin" className="btn btn-outline-cyan">
                    Quản trị
                  </Link>
                )}
                <div className="header-user-menu" style={{ position: 'relative' }}>
                  <button
                    className="btn btn-outline-navy header-user-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {firstName}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="header-user-dropdown open" id="user-dropdown">
                      <div className="user-dropdown-info">
                        <div className="user-dropdown-name">{user.name}</div>
                        <div className="user-dropdown-role">{isAdmin ? 'Quản trị viên' : 'Học viên MOS1000'}</div>
                      </div>
                      <Link href="/" className="user-dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Trang chủ
                      </Link>
                      <Link href="/my-courses" className="user-dropdown-item" onClick={() => setDropdownOpen(false)}>
                        🎓 Khóa học của tôi
                      </Link>
                      <Link href="/wishlist" className="user-dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Khóa học yêu thích ({wishlistCount})
                      </Link>
                      <Link href="/cart" className="user-dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Khóa học đã đăng ký ({cartCount})
                      </Link>
                      <Link href="/quizzes" className="user-dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Thi thử trực tuyến
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" className="user-dropdown-item" onClick={() => setDropdownOpen(false)}>
                          Khu quản trị
                        </Link>
                      )}
                      <button
                        className="user-dropdown-item user-dropdown-logout"
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                          router.push('/');
                        }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
