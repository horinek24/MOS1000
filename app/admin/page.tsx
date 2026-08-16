'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Course, formatVND } from '@/data/courses';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { createClient } from '@/utils/supabase/client';

interface RealOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  total_price: number;
  status: string;
  items: any[];
  created_at: string;
}

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

  // Real Orders State from Supabase DB
  const [realOrders, setRealOrders] = useState<RealOrder[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(false);

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

  // Fetch real live orders from Supabase DB
  const fetchRealOrders = async () => {
    setIsOrdersLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setRealOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders from Supabase:', err);
    } finally {
      setIsOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'dashboard') {
      fetchRealOrders();
    }
  }, [activeTab]);

  // Update order status directly in Supabase DB
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        alert('⚠️ Lỗi cập nhật trạng thái đơn hàng: ' + error.message);
      } else {
        setRealOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        alert(`🎉 Đã đổi trạng thái đơn hàng sang "${newStatus}" thành công!`);
      }
    } catch (err: any) {
      alert('⚠️ Lỗi kết nối Supabase: ' + err.message);
    }
  };

  // Preset Image Assets Gallery for New Products
  const presetImages = [
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

  // Save Course (Add / Update) to Supabase DB
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên khóa học!');
      return;
    }

    const foundCat = categoriesList.find((c) => c.id === formData.category);
    const catLabel = foundCat ? foundCat.name : formData.categoryLabel || 'Khóa học';

    if (editingCourseId) {
      await updateCourse(editingCourseId, {
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
      alert('🎉 Đã cập nhật sản phẩm/khóa học thành công trên Supabase DB!');
    } else {
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
      await addCourse(newCourse);
      alert(`🎉 Đã thêm mới sản phẩm/khóa học "${newCourse.title}" thành công lên Supabase DB!`);
    }

    setIsFormOpen(false);
  };

  // Delete Course with Confirmation
  const handleDeleteCourse = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `⚠️ BẠN CÓ CHẮC CHẮN MUỐN XÓA KHÓA HỌC?\n\nTên khóa học: "${title}"\n\nHành động này sẽ xóa vĩnh viễn sản phẩm khỏi kho dữ liệu Supabase!`
    );

    if (confirmed) {
      await deleteCourse(id);
      alert(`✅ Đã xóa thành công sản phẩm "${title}" khỏi Supabase DB!`);
    }
  };

  // Add Category to Supabase DB
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      alert('Vui lòng nhập tên danh mục môn học!');
      return;
    }
    await addCategory(newCatName.trim());
    setNewCatName('');
    setIsAddCatOpen(false);
    alert(`🎉 Đã thêm danh mục mới "${newCatName}" thành công lên Supabase DB!`);
  };

  // Delete Category with Confirmation
  const handleDeleteCategory = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `⚠️ BẠN CÓ CHẮC CHẮN MUỐN XÓA DANH MỤC?\n\nTên danh mục: "${name}"\n\nHành động này sẽ xóa danh mục khỏi kho dữ liệu Supabase!`
    );

    if (confirmed) {
      await deleteCategory(id);
      alert(`✅ Đã xóa danh mục "${name}" khỏi Supabase DB!`);
    }
  };

  // Filter Courses List
  const filteredCourses = coursesList.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || c.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalRevenue = realOrders.reduce((sum, o) => sum + (o.total_price || 0), 0);

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border-light)' }}>
                  <img src="/MOS1000_Assets/assets/images/logo/logo-MOS1000.png" alt="MOS 1000 Logo" style={{ height: '32px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-primary)' }}>MOS1000 Admin</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Supabase Live DB</div>
                  </div>
                </div>

                {/* User Info Card */}
                <div style={{ backgroundColor: 'var(--color-bg-body)', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '1.25rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>Đang đăng nhập:</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-dark)', wordBreak: 'break-all' }}>
                    {user?.name || user?.email}
                  </div>
                  <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', marginTop: '0.35rem' }}>
                    Quản trị viên (Admin)
                  </div>
                </div>

                {/* Navigation Menu Links */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <button
                    className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-navy'}`}
                    onClick={() => setActiveTab('dashboard')}
                    style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    📊 Tổng quan hệ thống
                  </button>
                  <button
                    className={`btn ${activeTab === 'courses' ? 'btn-primary' : 'btn-outline-navy'}`}
                    onClick={() => setActiveTab('courses')}
                    style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    📚 Quản lý Khóa học ({coursesList.length})
                  </button>
                  <button
                    className={`btn ${activeTab === 'categories' ? 'btn-primary' : 'btn-outline-navy'}`}
                    onClick={() => setActiveTab('categories')}
                    style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    🗂️ Quản lý Danh mục ({categoriesList.length})
                  </button>
                  <button
                    className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline-navy'}`}
                    onClick={() => setActiveTab('orders')}
                    style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    📦 Quản lý Đơn hàng ({realOrders.length})
                  </button>
                  <button
                    className="btn btn-outline-navy"
                    onClick={() => {
                      logout();
                      router.push('/login');
                    }}
                    style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.88rem', color: '#dc2626', borderColor: '#fca5a5', marginTop: '1rem' }}
                  >
                    🚪 Đăng xuất khỏi Admin
                  </button>
                </nav>
              </aside>

              {/* Right Admin Content Panel */}
              <main style={{ minWidth: 0 }}>
                {/* TAB 1: OVERVIEW DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Stat Cards Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Tổng số Khóa học Supabase</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>{coursesList.length}</div>
                        <div style={{ fontSize: '0.75rem', color: '#15803d', marginTop: '0.25rem' }}>● Đã đồng bộ Supabase DB</div>
                      </div>

                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Danh mục Môn học</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-cyan)' }}>{categoriesList.length}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>Chương trình đào tạo</div>
                      </div>

                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Tổng Đơn hàng Thực Kho</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)' }}>{realOrders.length}</div>
                        <div style={{ fontSize: '0.75rem', color: '#15803d', marginTop: '0.25rem' }}>● Đã lưu vào table orders</div>
                      </div>

                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Tổng Doanh thu Đơn hàng</div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#15803d' }}>{formatVND(totalRevenue)}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>Cập nhật tự động</div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Truy Cập Nhanh Quản Lý</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Cập nhật tức thì dữ liệu cửa hàng hiển thị cho khách hàng</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn btn-primary" onClick={handleOpenAdd}>
                          ➕ Thêm Khóa học Mới
                        </button>
                        <button className="btn btn-outline-cyan" onClick={() => setIsAddCatOpen(true)}>
                          ➕ Thêm Danh mục Mới
                        </button>
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

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1.25rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Giá bán thực tế (VNĐ) *</label>
                              <input
                                type="number"
                                required
                                min="0"
                                step="10000"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Giá gốc niêm yết (VNĐ)</label>
                              <input
                                type="number"
                                min="0"
                                step="10000"
                                value={formData.originalPrice}
                                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Chọn Ảnh sản phẩm từ thư mục Assets</label>
                              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <input
                                  type="text"
                                  placeholder="Đường dẫn ảnh: /MOS1000_Assets/assets/images/..."
                                  value={formData.image}
                                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                  style={{ flex: 1, padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                />
                              </div>

                              {/* Preset Images Gallery Selectors */}
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {presetImages.map((img) => (
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

                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className="btn btn-primary" onClick={handleOpenAdd}>
                          ➕ Thêm khóa học mới
                        </button>
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
                              <th style={{ padding: '0.85rem 0.5rem' }}>Trạng thái Supabase</th>
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
                                    ● Khóa sống (Supabase)
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

                {/* TAB 3: CATEGORIES MANAGEMENT */}
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

                {/* TAB 4: ORDERS MANAGEMENT (Real Live Supabase Orders) */}
                {activeTab === 'orders' && (
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📦 Danh Sách Đơn Hàng Thực Từ Kho Supabase ({realOrders.length})</h3>
                      <button className="btn btn-outline-cyan" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }} onClick={fetchRealOrders}>
                        🔄 Cập nhật đơn mới
                      </button>
                    </div>

                    {isOrdersLoading ? (
                      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                        Đang tải danh sách đơn hàng từ kho Supabase...
                      </div>
                    ) : realOrders.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                        Chưa có đơn hàng nào trong kho dữ liệu. Khi khách đặt hàng tại trang Checkout, đơn sẽ tự động xuất hiện ở đây!
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-dark-subtle)' }}>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Mã đơn</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Thời gian</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Khách hàng / SĐT / Địa chỉ</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Món đăng ký</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Tổng tiền</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Trạng thái đơn (Đổi trực tiếp)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {realOrders.map((o) => (
                              <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'monospace' }}>
                                  #{o.id.substring(0, 8)}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                                  {new Date(o.created_at).toLocaleString('vi-VN')}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <div style={{ fontWeight: 700, color: 'var(--color-dark)' }}>{o.customer_name}</div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>📞 {o.customer_phone}</div>
                                  <div style={{ fontSize: '0.78rem', color: 'var(--color-dark-subtle)' }}>📍 {o.customer_address || 'Địa chỉ tiêu chuẩn'}</div>
                                  {o.customer_email && <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>✉️ {o.customer_email}</div>}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {Array.isArray(o.items) && o.items.length > 0 ? (
                                      o.items.map((item: any, idx: number) => (
                                        <div key={idx} style={{ fontSize: '0.82rem' }}>
                                          • <strong>{item.course_title || item.title || 'Khóa học MOS'}</strong> ({formatVND(item.price || 0)})
                                        </div>
                                      ))
                                    ) : (
                                      <span style={{ color: 'var(--color-muted)' }}>Chi tiết trong kho</span>
                                    )}
                                  </div>
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
                                  {formatVND(o.total_price || 0)}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <select
                                    value={o.status || 'Mới'}
                                    onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                    style={{
                                      padding: '0.45rem 0.75rem',
                                      borderRadius: 'var(--radius-sm)',
                                      fontWeight: 700,
                                      fontSize: '0.82rem',
                                      cursor: 'pointer',
                                      border: '1px solid var(--color-border)',
                                      backgroundColor:
                                        o.status === 'Đã giao'
                                          ? '#dcfce7'
                                          : o.status === 'Đang giao'
                                          ? '#e0f2fe'
                                          : o.status === 'Đã hủy'
                                          ? '#fef2f2'
                                          : '#fef3c7',
                                      color:
                                        o.status === 'Đã giao'
                                          ? '#15803d'
                                          : o.status === 'Đang giao'
                                          ? '#0369a1'
                                          : o.status === 'Đã hủy'
                                          ? '#b91c1c'
                                          : '#b45309',
                                    }}
                                  >
                                    <option value="Mới">🟡 Mới</option>
                                    <option value="Đang giao">🔵 Đang giao</option>
                                    <option value="Đã giao">🟢 Đã giao</option>
                                    <option value="Đã hủy">🔴 Đã hủy</option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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
