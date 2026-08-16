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
  total_amount?: number;
  total_price?: number;
  status?: string;
  payment_status?: string;
  items: any[];
  created_at: string;
}

interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
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

  // Active Tab: 'dashboard' | 'courses' | 'categories' | 'orders' | 'messages'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'categories' | 'orders' | 'messages'>('dashboard');

  // Form State for Adding New Category
  const [newCatName, setNewCatName] = useState('');
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);

  // Search & Filter State for Courses
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Real Orders State from Supabase DB
  const [realOrders, setRealOrders] = useState<RealOrder[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(false);

  // Contact Messages State from Supabase DB
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);

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

  // Fetch live contact messages from Supabase DB
  const fetchContactMessages = async () => {
    setIsMessagesLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setContactMessages(data);
      }
    } catch (err) {
      console.error('Error fetching contact messages:', err);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchRealOrders();
      fetchContactMessages();
    }
  }, [isAdmin]);

  // Handle Order Status Update Live in Supabase DB
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, payment_status: newStatus === 'Đã giao' ? 'completed' : 'pending' })
        .eq('id', orderId);

      if (error) {
        console.error('Lỗi cập nhật trạng thái đơn:', error);
        alert('Cập nhật trạng thái thất bại!');
      } else {
        setRealOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Lỗi kết nối khi cập nhật đơn:', err);
    }
  };

  // Handle Contact Message Status Update
  const handleUpdateMessageStatus = async (msgId: string, newStatus: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', msgId);

      if (!error) {
        setContactMessages((prev) =>
          prev.map((msg) => (msg.id === msgId ? { ...msg, status: newStatus } : msg))
        );
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái tin nhắn:', err);
    }
  };

  // Handle Contact Message Deletion
  const handleDeleteMessage = async (msgId: string, name: string) => {
    if (window.confirm(`⚠️ Bạn có chắc chắn muốn xóa tin nhắn từ "${name}" khỏi Supabase DB?`)) {
      try {
        const supabase = createClient();
        const { error } = await supabase.from('contact_messages').delete().eq('id', msgId);
        if (!error) {
          setContactMessages((prev) => prev.filter((msg) => msg.id !== msgId));
          alert(`✅ Đã xóa vĩnh viễn tin nhắn từ "${name}"!`);
        }
      } catch (err) {
        console.error('Lỗi khi xóa tin nhắn:', err);
      }
    }
  };

  // Open Form for Adding New Course
  const handleOpenAdd = () => {
    setEditingCourseId(null);
    setFormData({
      title: '',
      category: 'word',
      categoryLabel: 'Khóa học Word',
      level: 'Cơ bản',
      price: 490000,
      originalPrice: 850000,
      image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg',
      description: '',
    });
    setIsFormOpen(true);
  };

  // Open Form for Editing Existing Course
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

  // Submit Form (Add or Edit) to Supabase DB
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên khóa học!');
      return;
    }

    const categoryObj = categoriesList.find((c) => c.id === formData.category);
    const categoryLabel = categoryObj ? categoryObj.name : 'Khóa học MOS';

    if (editingCourseId) {
      // Update
      await updateCourse(editingCourseId, {
        title: formData.title,
        category: formData.category as any,
        categoryLabel: categoryLabel,
        level: formData.level,
        price: formData.price,
        originalPrice: formData.originalPrice,
        image: formData.image,
        desc: formData.description,
        description: formData.description,
      });
      alert(`🎉 Đã cập nhật thành công khóa học "${formData.title}" trên Supabase DB!`);
    } else {
      // Add New
      await addCourse({
        id: 'course-' + Date.now(),
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formData.category as any,
        categoryLabel: categoryLabel,
        level: formData.level,
        price: formData.price,
        originalPrice: formData.originalPrice,
        image: formData.image,
        desc: formData.description,
        description: formData.description,
        fullDescription: formData.description,
        duration: '15 Giờ học',
        lessonsCount: 30,
        rating: 5.0,
        reviewsCount: 1,
        studentsCount: 1,
        instructor: {
          name: 'Đội ngũ MOS Master',
          title: 'Certiport Master Instructors',
          avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        },
        modules: [],
      });
      alert(`🎉 Đã thêm mới thành công khóa học "${formData.title}" vào Supabase DB!`);
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

  const presetImages = [
    { label: 'Word Cơ bản', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg' },
    { label: 'Word Nâng cao', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao.jpg' },
    { label: 'Excel Cơ bản', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-co-ban.jpg' },
    { label: 'Excel Nâng cao', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao.jpg' },
    { label: 'PowerPoint Cơ bản', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-co-ban.jpg' },
    { label: 'MOS 2019', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-2019/MOS-2019.jpg' },
    { label: 'MOS 365', path: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-365/MOS-365.jpg' },
  ];

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
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="36" height="36">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.75rem' }}>
                Từ Chối Truy Cập Admin
              </h2>
              <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Khu vực Quản trị viên chỉ dành cho tài khoản Admin. Hệ thống sẽ tự động chuyển hướng bạn về trang Đăng nhập...
              </p>
              <Link href="/login" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                Chuyển đến Đăng Nhập Admin
              </Link>
            </div>
          ) : (
            /* Full Admin Dashboard Layout */
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
              {/* Left Admin Navigation Sidebar */}
              <aside style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-light)' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    👑
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>{user?.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>● Admin Quản Trị</span>
                  </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                    className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-outline-navy'}`}
                    onClick={() => setActiveTab('messages')}
                    style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    💬 Quản lý Tin nhắn ({contactMessages.length})
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
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Khóa học Supabase</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>{coursesList.length}</div>
                        <div style={{ fontSize: '0.75rem', color: '#15803d', marginTop: '0.25rem' }}>● Đã đồng bộ DB</div>
                      </div>

                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Danh mục Môn học</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-cyan)' }}>{categoriesList.length}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>Chương trình đào tạo</div>
                      </div>

                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Tổng Đơn hàng Kho</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)' }}>{realOrders.length}</div>
                        <div style={{ fontSize: '0.75rem', color: '#15803d', marginTop: '0.25rem' }}>● Table orders</div>
                      </div>

                      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>Tin nhắn Khách hàng</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#8b5cf6' }}>{contactMessages.length}</div>
                        <div style={{ fontSize: '0.75rem', color: '#8b5cf6', marginTop: '0.25rem' }}>● Table contact_messages</div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
                        ⚡ Thao tác nhanh hệ thống
                      </h3>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn btn-primary" onClick={handleOpenAdd}>
                          ➕ Thêm khóa học mới
                        </button>
                        <button className="btn btn-outline-navy" onClick={() => setIsAddCatOpen(true)}>
                          📂 Thêm danh mục môn
                        </button>
                        <button className="btn btn-outline-cyan" onClick={() => setActiveTab('messages')}>
                          💬 Xem tin nhắn mới ({contactMessages.filter(m => m.status === 'Mới').length})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: COURSES MANAGEMENT */}
                {activeTab === 'courses' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Add / Edit Course Form Drawer/Box */}
                    {isFormOpen && (
                      <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-dark)' }}>
                          {editingCourseId ? '✏️ Cập Nhật Thông Tin Khóa Học (Supabase DB)' : '➕ Thêm Mới Khóa Học (Vào Supabase DB)'}
                        </h3>

                        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Tên khóa học *</label>
                              <input
                                type="text"
                                required
                                placeholder="Tên khóa học (VD: Khóa học Access 2019)"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Danh mục môn học</label>
                              <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Trình độ</label>
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

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Học phí khuyến mãi (VNĐ) *</label>
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
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Học phí gốc (VNĐ)</label>
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
                              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Ảnh Sản Phẩm (Tải lên từ máy tính hoặc chọn mẫu)</label>
                              
                              {/* File Upload from PC */}
                              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id="admin-image-file-input"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        if (event.target?.result) {
                                          setFormData({ ...formData, image: event.target.result as string });
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  style={{ fontSize: '0.85rem' }}
                                />
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>hoặc dán đường dẫn URL:</span>
                              </div>

                              <input
                                type="text"
                                placeholder="Đường dẫn URL ảnh: /MOS1000_Assets/assets/images/... hoặc http://"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '0.5rem' }}
                              />

                              {/* Preset Images Gallery Selectors */}
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
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

                              {/* Live Image Preview Box */}
                              {formData.image && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                                  <img
                                    src={formData.image}
                                    alt="Preview"
                                    style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                                  />
                                  <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                                    ✓ Xem trước ảnh trực tiếp thành công!
                                  </span>
                                </div>
                              )}
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
                          Danh Mục Môn Học Đào Tạo ({categoriesList.length})
                        </h3>
                        <button className="btn btn-primary" onClick={() => setIsAddCatOpen(true)}>
                          📂 Thêm danh mục mới
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                        {categoriesList.map((cat) => (
                          <div
                            key={cat.id}
                            style={{
                              backgroundColor: '#f8fafc',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-md)',
                              padding: '1.25rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 800, color: 'var(--color-dark)', fontSize: '1rem' }}>{cat.name}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>ID: {cat.id}</div>
                            </div>
                            <button
                              style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '1.1rem' }}
                              title="Xóa danh mục"
                              onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            >
                              🗑️
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: REAL ORDERS MANAGEMENT */}
                {activeTab === 'orders' && (
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
                          📦 Danh Sách Đơn Đặt Hàng Thực Kho (Supabase DB)
                        </h3>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>Tự động ghi lại khi khách bấm Đặt hàng tại trang Checkout</span>
                      </div>
                      <button className="btn btn-outline-cyan" onClick={fetchRealOrders}>
                        🔄 Tải lại đơn hàng ({realOrders.length})
                      </button>
                    </div>

                    {isOrdersLoading ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)' }}>Đang tải đơn hàng...</div>
                    ) : realOrders.length === 0 ? (
                      <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--color-muted)' }}>
                        Chưa có đơn hàng nào trong CSDL Supabase. Hãy thử đặt hàng từ trang Checkout!
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
                                  {formatVND(o.total_amount || o.total_price || 0)}
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

                {/* TAB 5: CONTACT MESSAGES MANAGEMENT */}
                {activeTab === 'messages' && (
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
                          💬 Quản Lý Tin Nhắn Liên Hệ Từ Khách Hàng (Supabase DB)
                        </h3>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>Lưu vết toàn bộ câu hỏi/tin nhắn gửi từ trang /contact</span>
                      </div>
                      <button className="btn btn-outline-cyan" onClick={fetchContactMessages}>
                        🔄 Tải lại tin nhắn ({contactMessages.length})
                      </button>
                    </div>

                    {isMessagesLoading ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)' }}>Đang tải tin nhắn...</div>
                    ) : contactMessages.length === 0 ? (
                      <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--color-muted)' }}>
                        Chưa có tin nhắn liên hệ nào trong kho Supabase DB `contact_messages`.
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-dark-subtle)' }}>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Thời gian</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Khách hàng / SĐT / Email</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Chủ đề</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Nội dung tin nhắn</th>
                              <th style={{ padding: '0.85rem 0.5rem' }}>Trạng thái</th>
                              <th style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contactMessages.map((msg) => (
                              <tr key={msg.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                                  {new Date(msg.created_at).toLocaleString('vi-VN')}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <div style={{ fontWeight: 700, color: 'var(--color-dark)' }}>{msg.full_name}</div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>✉️ {msg.email}</div>
                                  {msg.phone && <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>📞 {msg.phone}</div>}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                                  {msg.subject}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', maxWidth: '280px', color: '#334155', lineHeight: '1.5' }}>
                                  {msg.message}
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem' }}>
                                  <select
                                    value={msg.status || 'Mới'}
                                    onChange={(e) => handleUpdateMessageStatus(msg.id, e.target.value)}
                                    style={{
                                      padding: '0.4rem 0.65rem',
                                      borderRadius: 'var(--radius-sm)',
                                      fontWeight: 700,
                                      fontSize: '0.8rem',
                                      cursor: 'pointer',
                                      border: '1px solid var(--color-border)',
                                      backgroundColor:
                                        msg.status === 'Đã phản hồi'
                                          ? '#dcfce7'
                                          : msg.status === 'Đang xử lý'
                                          ? '#e0f2fe'
                                          : '#fef3c7',
                                      color:
                                        msg.status === 'Đã phản hồi'
                                          ? '#15803d'
                                          : msg.status === 'Đang xử lý'
                                          ? '#0369a1'
                                          : '#b45309',
                                    }}
                                  >
                                    <option value="Mới">🟡 Mới</option>
                                    <option value="Đang xử lý">🔵 Đang xử lý</option>
                                    <option value="Đã phản hồi">🟢 Đã phản hồi</option>
                                  </select>
                                </td>
                                <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                                  <button
                                    style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                                    onClick={() => handleDeleteMessage(msg.id, msg.full_name)}
                                  >
                                    🗑️ Xóa
                                  </button>
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
