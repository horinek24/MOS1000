'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Course, formatVND } from '@/data/courses';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading, isAdmin, logout } = useAuth();
  const {
    courses: coursesList,
    categories: categoriesList,
    addCourse,
    updateCourse,
    deleteCourse,
    addCategory,
    deleteCategory,
    resetToDefault,
  } = useCourses();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user, isLoading, isAdmin, router]);

  // Active Tab: 'dashboard' | 'courses' | 'categories' | 'orders' | 'users' | 'settings'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'categories' | 'orders' | 'users' | 'settings'>('dashboard');

  // Form State for Adding New Category
  const [newCatName, setNewCatName] = useState('');
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);

  // Search & Filter State for Courses
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Form State for Add / Edit Course
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    categoryLabel: string;
    level: 'Cơ bản' | 'Nâng cao' | 'Mở rộng' | 'Mọi cấp độ';
    price: number;
    originalPrice: number;
    image: string;
    description: string;
  }>({
    title: '',
    category: 'word',
    categoryLabel: 'Khóa học Word',
    level: 'Cơ bản',
    price: 490000,
    originalPrice: 850000,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg',
    description: '',
  });

  // Local Image Upload Handler (Reads file from computer as Data URL)
  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn tập tin hình ảnh (PNG, JPG, JPEG, WEBP, SVG)!');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            image: event.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler to Add New Category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      alert('Vui lòng nhập tên danh mục môn học mới!');
      return;
    }

    addCategory(newCatName.trim());
    setNewCatName('');
    setIsAddCatOpen(false);
    alert(`Đã thêm danh mục mới thành công! Bây giờ danh mục này sẽ xuất hiện trên toàn bộ website và trang chủ.`);
  };

  // Delete Category
  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}"?`)) {
      deleteCategory(id);
    }
  };

  // Delete Course
  const handleDeleteCourse = (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa khóa học "${title}" khỏi hệ thống?`)) {
      deleteCourse(id);
    }
  };

  // Orders Mock Data
  const [orders] = useState([
    { id: 'ORD-1089', student: 'Nguyễn Văn Hải', email: 'hai.nguyen@gmail.com', course: 'Khóa học Word Cơ Bản', price: 490000, date: '2026-08-16', status: 'Hoàn thành' },
    { id: 'ORD-1088', student: 'Trần Thị Mai', email: 'mai.tran@gmail.com', course: 'Khóa học Excel Nâng Cao', price: 550000, date: '2026-08-16', status: 'Hoàn thành' },
    { id: 'ORD-1087', student: 'Phạm Quốc Bảo', email: 'bao.pham@gmail.com', course: 'Khóa học MOS 365', price: 990000, date: '2026-08-15', status: 'Chờ xử lý' },
    { id: 'ORD-1086', student: 'Lê Thu Thảo', email: 'thao.le@gmail.com', course: 'Khóa học PowerPoint Nâng Cao', price: 550000, date: '2026-08-15', status: 'Hoàn thành' },
    { id: 'ORD-1085', student: 'Vũ Đức Anh', email: 'anh.vu@gmail.com', course: 'Khóa học MOS 2019', price: 890000, date: '2026-08-14', status: 'Hoàn thành' },
  ]);

  // Users Mock Data
  const [users] = useState([
    { id: 'USR-01', name: 'Nguyễn Văn Hải', email: 'hai.nguyen@gmail.com', role: 'Học viên', coursesCount: 2, joinDate: '2026-05-10' },
    { id: 'USR-02', name: 'Trần Thị Mai', email: 'mai.tran@gmail.com', role: 'Học viên', coursesCount: 3, joinDate: '2026-06-12' },
    { id: 'USR-03', name: 'Quản Trị Viên (Admin)', email: 'admin@mos1000.vn', role: 'Quản trị viên', coursesCount: 13, joinDate: '2026-01-01' },
    { id: 'USR-04', name: 'Phạm Quốc Bảo', email: 'bao.pham@gmail.com', role: 'Học viên', coursesCount: 1, joinDate: '2026-07-20' },
    { id: 'USR-05', name: 'Lê Thu Thảo', email: 'thao.le@gmail.com', role: 'Học viên', coursesCount: 2, joinDate: '2026-08-01' },
  ]);

  // Preset Sample Images for Quick Selection
  const sampleImages = [
    { label: 'Word Cơ Bản', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg' },
    { label: 'Word Nâng Cao', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao.jpg' },
    { label: 'Word Nâng Cao 2', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao-2.jpg' },
    { label: 'Word Mở Rộng', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-mo-rong.jpg' },
    { label: 'Excel Cơ Bản', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-co-ban.jpg' },
    { label: 'Excel Nâng Cao', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao.jpg' },
    { label: 'Excel Nâng Cao 2', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao-2.jpg' },
    { label: 'Excel Mở Rộng', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-mo-rong.jpg' },
    { label: 'PowerPoint Cơ Bản', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-co-ban.jpg' },
    { label: 'PowerPoint Nâng Cao', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-nang-cao.jpg' },
    { label: 'PowerPoint Mở Rộng', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-mo-rong.jpg' },
    { label: 'MOS 2019', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-2019/MOS-2019.jpg' },
    { label: 'MOS 365', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-365/MOS-365.jpg' },
  ];

  const handleEnableAdmin = () => {
    window.location.href = '/login';
  };

  // Open Form to Add New Course
  const handleOpenAdd = () => {
    setEditingCourseId(null);
    const defaultCat = categoriesList[0]?.id || 'word';
    const defaultCatLabel = categoriesList[0]?.name || 'Khóa học Word';
    setFormData({
      title: '',
      category: defaultCat,
      categoryLabel: defaultCatLabel,
      level: 'Cơ bản',
      price: 490000,
      originalPrice: 850000,
      image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg',
      description: '',
    });
    setIsFormOpen(true);
  };

  // Open Form to Edit Course
  const handleOpenEdit = (course: Course) => {
    setEditingCourseId(course.id);
    setFormData({
      title: course.title,
      category: course.category,
      categoryLabel: course.categoryLabel,
      level: course.level,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      description: course.desc || course.description || '',
    });
    setIsFormOpen(true);
  };

  // Save Course (Add / Update)
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên khóa học!');
      return;
    }

    // Determine category label dynamically
    const foundCat = categoriesList.find((c) => c.id === formData.category);
    const catLabel = foundCat ? foundCat.name : formData.categoryLabel || 'Khóa học mới';

    if (editingCourseId) {
      // Update existing course in global context
      updateCourse(editingCourseId, {
        title: formData.title,
        category: formData.category as any,
        categoryLabel: catLabel,
        level: formData.level,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        image: formData.image,
        desc: formData.description,
        description: formData.description,
      });
      alert('Đã cập nhật thông tin khóa học thành công! Cập nhật đã được đồng bộ lên website.');
    } else {
      // Add new course in global context
      const newCourse: Course = {
        id: 'c_' + Date.now(),
        title: formData.title,
        category: formData.category as any,
        categoryLabel: catLabel,
        level: formData.level,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        image: formData.image,
        badge: 'Mới',
        rating: 5.0,
        reviewsCount: 1,
        studentsCount: 1,
        duration: '15 Giờ học',
        lessonsCount: 30,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        desc: formData.description || 'Khóa học vừa được khởi tạo bởi Admin.',
        description: formData.description || 'Khóa học vừa được khởi tạo bởi Admin.',
        fullDescription: formData.description || 'Khóa học vừa được khởi tạo bởi Admin.',
        instructor: {
          name: 'Chuyên Gia MOS1000 Master',
          title: 'Master Instructor 1000/1000',
          avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        },
        modules: [
          {
            id: 'm1',
            title: 'Chương 1: Giới thiệu & Thao tác cơ bản',
            lessons: [
              { id: 'l1', title: 'Bài 1: Giao diện và thiết lập ban đầu', duration: '15:00', isPreview: true },
            ],
          },
        ],
      };
      addCourse(newCourse);
      alert(`🎉 Đã đăng khóa học "${newCourse.title}" thành công! Khóa học đã xuất hiện trực tiếp trên trang chủ và danh mục học viên.`);
    }

    setIsFormOpen(false);
  };

  // Filter Courses List
  const filteredCourses = coursesList.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || c.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <Breadcrumb items={[{ label: 'Khu quản trị Admin' }]} />

      <section className="courses-section" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <div className="container" style={{ maxWidth: '1280px' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-muted)' }}>
              Đang kiểm tra quyền truy cập hệ thống...
            </div>
          ) : !isAdmin ? (
            /* Admin Access Authorization Block Notice */
            <div
              style={{
                maxWidth: '560px',
                margin: '3rem auto',
                backgroundColor: '#ffffff',
                border: '1px solid #fca5a5',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem 2.5rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  fontSize: '2rem',
                }}
              >
                🚫
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', color: '#991b1b' }}>
                Quyền Truy Cập Bị Từ Chối (Access Denied)
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                Khu vực quản trị chỉ dành riêng cho tài khoản có vai trò <strong>Admin</strong>. Tài khoản khách/học viên không có quyền truy cập.
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '1.75rem' }}>
                Đang tự động chuyển hướng bạn về trang Đăng nhập...
              </p>

              <Link href="/login" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                Đăng nhập tài khoản Admin
              </Link>
            </div>
          ) : (
            /* Full Admin Dashboard & Management Interface */
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.75rem', alignItems: 'start' }}>
              {/* Left Admin Navigation Sidebar */}
              <aside style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem 1rem', boxShadow: 'var(--shadow-sm)' }}>
                {/* Brand Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border-light)' }}>
                  <img src="/MOS1000_Assets/assets/images/logo/logo-MOS1000.png" alt="MOS 1000 Logo" style={{ height: '32px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-dark)' }}>MOS1000</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>Admin Panel</div>
                  </div>
                </div>

                {/* Nav Links List */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-navy'}`}
                    style={{ justifyContent: 'flex-start', border: activeTab === 'dashboard' ? 'none' : '1px solid transparent', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    📊 Dashboard (Tổng quan)
                  </button>

                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`btn ${activeTab === 'courses' ? 'btn-primary' : 'btn-outline-navy'}`}
                    style={{ justifyContent: 'flex-start', border: activeTab === 'courses' ? 'none' : '1px solid transparent', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    🎓 Quản lý khóa học ({coursesList.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('categories')}
                    className={`btn ${activeTab === 'categories' ? 'btn-primary' : 'btn-outline-navy'}`}
                    style={{ justifyContent: 'flex-start', border: activeTab === 'categories' ? 'none' : '1px solid transparent', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    📂 Danh mục môn học ({categoriesList.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline-navy'}`}
                    style={{ justifyContent: 'flex-start', border: activeTab === 'orders' ? 'none' : '1px solid transparent', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    🛒 Đơn đăng ký học ({orders.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('users')}
                    className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-navy'}`}
                    style={{ justifyContent: 'flex-start', border: activeTab === 'users' ? 'none' : '1px solid transparent', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    👥 Quản lý học viên ({users.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline-navy'}`}
                    style={{ justifyContent: 'flex-start', border: activeTab === 'settings' ? 'none' : '1px solid transparent', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    ⚙️ Cấu hình hệ thống
                  </button>
                </nav>

                {/* Quick Summary Card */}
                <div style={{ backgroundColor: 'var(--color-bg-body)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginTop: '1.75rem', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-dark)' }}>Thống Kê Nhanh</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--color-muted)' }}>Khóa học:</span>
                    <strong>{coursesList.length}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--color-muted)' }}>Danh mục môn:</span>
                    <strong>{categoriesList.length} môn</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--color-muted)' }}>Đơn học:</span>
                    <strong>{orders.length} đơn</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-muted)' }}>Học viên:</span>
                    <strong>7,650+</strong>
                  </div>
                </div>

                {/* Admin Logout */}
                <button
                  onClick={logout}
                  style={{ width: '100%', marginTop: '1.5rem', padding: '0.6rem', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  🚪 Đăng xuất Admin
                </button>
              </aside>

              {/* Main Content Area */}
              <main style={{ minWidth: 0 }}>
                {/* Header Welcome Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                      {activeTab === 'dashboard' && '📊 Dashboard Tổng Quan Hệ Thống'}
                      {activeTab === 'courses' && '🎓 Quản Lý Danh Sách Khóa Học'}
                      {activeTab === 'categories' && '📂 Quản Lý Danh Mục Môn Học'}
                      {activeTab === 'orders' && '🛒 Quản Lý Đơn Đăng Ký Học'}
                      {activeTab === 'users' && '👥 Danh Sách Học Viên & Tài Khoản'}
                      {activeTab === 'settings' && '⚙️ Cấu Hình Hệ Thống'}
                    </h1>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
                      Xin chào, <strong>{user?.name || 'Admin'}</strong>! Bạn có toàn quyền mở rộng danh mục môn học và đăng ảnh từ máy tính.
                    </p>
                  </div>

                  {activeTab === 'courses' && (
                    <button className="btn btn-primary" onClick={handleOpenAdd}>
                      ➕ Thêm khóa học mới
                    </button>
                  )}

                  {activeTab === 'categories' && (
                    <button className="btn btn-primary" onClick={() => setIsAddCatOpen(true)}>
                      ➕ Thêm danh mục môn học mới
                    </button>
                  )}
                </div>

                {/* TAB 1: DASHBOARD OVERVIEW */}
                {activeTab === 'dashboard' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Top 4 KPI Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                      <div className="quiz-card" style={{ padding: '1.25rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 600 }}>Tổng Số Khóa Học</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.25rem' }}>{coursesList.length}</div>
                        <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>↑ 100% Hiển thị active</div>
                      </div>

                      <div className="quiz-card" style={{ padding: '1.25rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 600 }}>Tổng Danh Mục Môn</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-cyan)', marginTop: '0.25rem' }}>{categoriesList.length}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>Tự do tạo danh mục mới</div>
                      </div>

                      <div className="quiz-card" style={{ padding: '1.25rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 600 }}>Học Viên Đã Đăng Ký</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem' }}>7,650+</div>
                        <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>↑ 18.6% so với tháng trước</div>
                      </div>

                      <div className="quiz-card" style={{ padding: '1.25rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 600 }}>Tỷ Lệ Đậu Certiport</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', marginTop: '0.25rem' }}>99.5%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', marginTop: '0.25rem' }}>Thi đạt 1000 điểm</div>
                      </div>
                    </div>

                    {/* Chart & Category Distribution */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
                      {/* Revenue Line Chart */}
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Biểu Đồ Đăng Ký Khóa Học (7 ngày gần nhất)</h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Doanh thu: 42,580,000 đ</span>
                        </div>

                        {/* SVG Revenue Line Graph */}
                        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                          <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <path d="M 0 140 Q 80 80, 160 110 T 320 60 T 500 40 L 500 180 L 0 180 Z" fill="rgba(10, 37, 64, 0.08)" />
                            <path d="M 0 140 Q 80 80, 160 110 T 320 60 T 500 40" fill="none" stroke="var(--color-primary)" strokeWidth="3" />
                            <circle cx="0" cy="140" r="4" fill="var(--color-primary)" />
                            <circle cx="80" cy="90" r="4" fill="var(--color-primary)" />
                            <circle cx="160" cy="110" r="4" fill="var(--color-primary)" />
                            <circle cx="240" cy="70" r="5" fill="var(--color-gold)" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="320" cy="60" r="4" fill="var(--color-primary)" />
                            <circle cx="400" cy="80" r="4" fill="var(--color-primary)" />
                            <circle cx="500" cy="40" r="5" fill="var(--color-cyan)" />
                          </svg>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '0.5rem' }}>
                          <span>Thứ 2</span>
                          <span>Thứ 3</span>
                          <span>Thứ 4</span>
                          <span>Thứ 5</span>
                          <span>Thứ 6</span>
                          <span>Thứ 7</span>
                          <span>Chủ Nhật</span>
                        </div>
                      </div>

                      {/* Top Categories Breakdown */}
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Phân Bộ Đăng Ký Môn Học</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {categoriesList.map((cat, i) => {
                            const count = coursesList.filter((c) => c.category === cat.id).length;
                            const pct = Math.round((count / (coursesList.length || 1)) * 100);
                            const colors = ['var(--color-word)', 'var(--color-excel)', 'var(--color-gold)', 'var(--color-primary)', 'var(--color-cyan)'];
                            const catColor = colors[i % colors.length];

                            return (
                              <div key={cat.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                  <span>{cat.name}</span>
                                  <strong>{pct}% ({count} khóa)</strong>
                                </div>
                                <div style={{ height: '8px', backgroundColor: 'var(--color-bg-body)', borderRadius: '4px', overflow: 'hidden' }}>
                                  <div style={{ width: `${pct}%`, height: '100%', backgroundColor: catColor }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: COURSES MANAGEMENT */}
                {activeTab === 'courses' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Add / Edit Form Panel */}
                    {isFormOpen && (
                      <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-light)' }}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                            {editingCourseId ? '✏️ Chỉnh Sửa Khóa Học' : '➕ Thêm Khóa Học Mới'}
                          </h3>
                          <button className="btn btn-outline-navy" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setIsFormOpen(false)}>
                            ✕ Đóng form
                          </button>
                        </div>

                        <form onSubmit={handleSaveCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1.25rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Tên khóa học *</label>
                              <input
                                type="text"
                                required
                                placeholder="VD: Khóa học Access Nâng Cao / Power BI..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Danh mục môn học *</label>
                              <select
                                value={formData.category}
                                onChange={(e) => {
                                  const catId = e.target.value;
                                  const found = categoriesList.find((c) => c.id === catId);
                                  setFormData({
                                    ...formData,
                                    category: catId,
                                    categoryLabel: found ? found.name : 'Khóa học',
                                  });
                                }}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              >
                                {categoriesList.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Trình độ *</label>
                              <select
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              >
                                <option value="Cơ bản">Cơ bản</option>
                                <option value="Nâng cao">Nâng cao</option>
                                <option value="Mở rộng">Mở rộng</option>
                                <option value="Mọi cấp độ">Mọi cấp độ</option>
                              </select>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Học phí khuyến mãi (VNĐ) *</label>
                              <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Giá gốc trước giảm (VNĐ)</label>
                              <input
                                type="number"
                                value={formData.originalPrice}
                                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              />
                            </div>
                          </div>

                          {/* Image Selection & Direct Computer File Upload */}
                          <div style={{ backgroundColor: 'var(--color-bg-body)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                              🖼️ Tải Ảnh Từ Máy Tính Hoặc Chọn Ảnh Mẫu
                            </label>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 140px', gap: '1.25rem', alignItems: 'start' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {/* Direct Local File Upload Input */}
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                                    💻 Tải ảnh từ máy tính (PNG, JPG, WEBP):
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLocalImageUpload}
                                    style={{
                                      width: '100%',
                                      padding: '0.5rem',
                                      backgroundColor: '#ffffff',
                                      borderRadius: 'var(--radius-sm)',
                                      border: '1px dashed var(--color-primary)',
                                      cursor: 'pointer',
                                      fontSize: '0.85rem',
                                    }}
                                  />
                                </div>

                                {/* URL Text Input Option */}
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                                    🔗 Hoặc nhập đường dẫn ảnh (URL / Assets path):
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}
                                  />
                                </div>

                                {/* Quick Image Selector Grid */}
                                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>Mẫu ảnh sẵn trong kho:</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                  {sampleImages.map((img) => (
                                    <button
                                      key={img.path}
                                      type="button"
                                      onClick={() => setFormData({ ...formData, image: img.path })}
                                      style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.55rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: formData.image === img.path ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                                        backgroundColor: formData.image === img.path ? 'var(--color-primary-light)' : '#ffffff',
                                        color: formData.image === img.path ? 'var(--color-primary)' : 'inherit',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {img.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Live Thumbnail Preview Box */}
                              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Xem trước ảnh:</div>
                                <img
                                  src={formData.image}
                                  alt="Preview"
                                  style={{ width: '100%', height: '85px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                  onError={(e) => {
                                    (e.target as HTMLElement).setAttribute('src', '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg');
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Mô tả khóa học</label>
                            <textarea
                              rows={3}
                              placeholder="Nhập nội dung tóm tắt chương trình học..."
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                            />
                          </div>

                          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                            <button type="button" className="btn btn-outline-navy" onClick={() => setIsFormOpen(false)}>
                              Hủy bỏ
                            </button>
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                              💾 {editingCourseId ? 'Lưu cập nhật' : 'Thêm mới khóa học'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Filter & Search Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, maxWidth: '650px' }}>
                        <input
                          type="text"
                          placeholder="🔍 Tìm khóa học theo tên..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />

                        <select
                          value={selectedCategoryFilter}
                          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                          style={{ padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        >
                          <option value="all">Tất cả danh mục ({categoriesList.length})</option>
                          {categoriesList.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        Tổng số: <strong>{filteredCourses.length}</strong> / {coursesList.length} khóa học
                      </div>
                    </div>

                    {/* Courses Table */}
                    <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-dark-subtle)' }}>
                              <th style={{ padding: '0.85rem 0.5rem' }}>STT</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Ảnh khóa học</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Tên khóa học</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Danh mục</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Trình độ</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Học phí</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Trạng thái</th>
                              <th style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCourses.map((c, index) => (
                              <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                <td style={{ padding: '0.85rem 0.5rem', color: 'var(--color-muted)' }}>{index + 1}</td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <img
                                    src={c.image}
                                    alt={c.title}
                                    style={{ width: '64px', height: '42px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                  />
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                                  {c.title}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <span className="category-tag cat-badge-word" style={{ fontSize: '0.75rem' }}>{c.categoryLabel}</span>
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                                  {c.level}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                  {formatVND(c.price)}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: '#dcfce7', color: '#15803d' }}>
                                    ● Hiển thị
                                  </span>
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button
                                      className="btn btn-outline-cyan"
                                      style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}
                                      onClick={() => handleOpenEdit(c)}
                                    >
                                      ✏️ Sửa
                                    </button>
                                    <button
                                      style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                                      onClick={() => handleDeleteCourse(c.id, c.title)}
                                    >
                                      🗑️ Xóa
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CATEGORIES MANAGEMENT (Dynamic Category Addition) */}
                {activeTab === 'categories' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Add Category Form Box */}
                    {isAddCatOpen && (
                      <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cyan)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-dark)' }}>
                          ➕ Thêm Danh Mục Môn Học Mới
                        </h4>

                        <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            required
                            placeholder="Nhập tên danh mục (VD: Khóa học Access, Power BI, IC3...)"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                          />
                          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                            Thêm danh mục
                          </button>
                          <button type="button" className="btn btn-outline-navy" onClick={() => setIsAddCatOpen(false)}>
                            Hủy
                          </button>
                        </form>
                      </div>
                    )}

                    <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Quản Lý Danh Mục Môn Học ({categoriesList.length})</h3>
                        <button className="btn btn-primary" onClick={() => setIsAddCatOpen(true)}>
                          ➕ Thêm danh mục mới
                        </button>
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                            <th style={{ padding: '0.85rem' }}>STT</th>
                            <th style={{ padding: '0.85rem' }}>Tên Danh Mục Môn</th>
                            <th style={{ padding: '0.85rem' }}>Mã Định Danh (ID)</th>
                            <th style={{ padding: '0.85rem' }}>Số Lượng Khóa Học</th>
                            <th style={{ padding: '0.85rem' }}>Trạng Thái</th>
                            <th style={{ padding: '0.85rem', textAlign: 'right' }}>Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoriesList.map((cat, index) => {
                            const count = coursesList.filter((c) => c.category === cat.id).length;

                            return (
                              <tr key={cat.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                <td style={{ padding: '0.85rem', color: 'var(--color-muted)' }}>{index + 1}</td>
                                <td style={{ padding: '0.85rem', fontWeight: 700 }}>{cat.name}</td>
                                <td style={{ padding: '0.85rem', color: 'var(--color-muted)' }}>{cat.id}</td>
                                <td style={{ padding: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>{count} khóa học</td>
                                <td style={{ padding: '0.85rem' }}><span style={{ color: '#15803d', fontWeight: 600 }}>● {cat.status}</span></td>
                                <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                                  <button
                                    style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                  >
                                    🗑️ Xóa
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 4: ORDERS MANAGEMENT */}
                {activeTab === 'orders' && (
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Đơn Đăng Ký Học Viên Gần Đây</h3>

                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                          <th style={{ padding: '0.85rem' }}>Mã Đơn</th>
                          <th style={{ padding: '0.85rem' }}>Học Viên</th>
                          <th style={{ padding: '0.85rem' }}>Email</th>
                          <th style={{ padding: '0.85rem' }}>Khóa Đăng Ký</th>
                          <th style={{ padding: '0.85rem' }}>Học Phí</th>
                          <th style={{ padding: '0.85rem' }}>Trạng Thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                            <td style={{ padding: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>{o.id}</td>
                            <td style={{ padding: '0.85rem', fontWeight: 600 }}>{o.student}</td>
                            <td style={{ padding: '0.85rem', color: 'var(--color-muted)' }}>{o.email}</td>
                            <td style={{ padding: '0.85rem' }}>{o.course}</td>
                            <td style={{ padding: '0.85rem', fontWeight: 800 }}>{formatVND(o.price)}</td>
                            <td style={{ padding: '0.85rem' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: o.status === 'Hoàn thành' ? '#dcfce7' : '#fef3c7', color: o.status === 'Hoàn thành' ? '#15803d' : '#d97706' }}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* TAB 5: USERS MANAGEMENT */}
                {activeTab === 'users' && (
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Danh Sách Học Viên & Quản Trị Viên</h3>

                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                          <th style={{ padding: '0.85rem' }}>Mã Người Dùng</th>
                          <th style={{ padding: '0.85rem' }}>Họ Và Tên</th>
                          <th style={{ padding: '0.85rem' }}>Email</th>
                          <th style={{ padding: '0.85rem' }}>Vai Trò</th>
                          <th style={{ padding: '0.85rem' }}>Khóa Học Đã Đăng Ký</th>
                          <th style={{ padding: '0.85rem' }}>Ngày Tham Gia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                            <td style={{ padding: '0.85rem', color: 'var(--color-muted)' }}>{u.id}</td>
                            <td style={{ padding: '0.85rem', fontWeight: 700 }}>{u.name}</td>
                            <td style={{ padding: '0.85rem' }}>{u.email}</td>
                            <td style={{ padding: '0.85rem' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: u.role === 'Quản trị viên' ? 'var(--color-primary-light)' : 'var(--color-bg-body)', color: u.role === 'Quản trị viên' ? 'var(--color-primary)' : 'inherit' }}>
                                {u.role}
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem', fontWeight: 700 }}>{u.coursesCount} khóa</td>
                            <td style={{ padding: '0.85rem', color: 'var(--color-muted)' }}>{u.joinDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* TAB 6: SETTINGS */}
                {activeTab === 'settings' && (
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', maxWidth: '700px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Cấu Hình Hệ Thống MOS1000 Master</h3>

                    <form onSubmit={(e) => { e.preventDefault(); alert('Đã lưu cấu hình hệ thống!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Tên Website System</label>
                        <input type="text" defaultValue="MOS1000 Master - Nền Tảng Luyện Thi Chứng Chỉ Tin Học Văn Phòng" style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Hotline Hỗ Trợ</label>
                        <input type="text" defaultValue="0912 345 678 - 0987 654 321" style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email Hệ Thống</label>
                        <input type="email" defaultValue="admin@mos1000.vn" style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', alignSelf: 'flex-start' }}>
                        💾 Lưu cấu hình
                      </button>
                    </form>
                  </div>
                )}
              </main>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
