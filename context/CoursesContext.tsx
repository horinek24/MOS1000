'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES_DATA, Course } from '@/data/courses';
import { createClient } from '@/utils/supabase/client';

export interface CategoryItem {
  id: string;
  name: string;
  status: string;
}

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'word', name: 'Khóa học Word', status: 'Hoạt động' },
  { id: 'excel', name: 'Khóa học Excel', status: 'Hoạt động' },
  { id: 'powerpoint', name: 'Khóa học PowerPoint', status: 'Hoạt động' },
  { id: 'mos2019', name: 'Khóa MOS 2019', status: 'Hoạt động' },
  { id: 'mos365', name: 'Khóa MOS 365', status: 'Hoạt động' },
];

interface CoursesContextType {
  courses: Course[];
  categories: CategoryItem[];
  enrolledCourseIds: string[];
  isLoading: boolean;
  addCourse: (newCourse: Course) => Promise<void>;
  updateCourse: (id: string, updatedCourse: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
  resetToDefault: () => Promise<void>;
  refreshFromSupabase: () => Promise<void>;
  refreshEnrolledCourses: () => Promise<void>;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

function mapRowToCourse(row: any): Course {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug || row.id,
    category: row.category_id || 'word',
    categoryLabel: row.category_label || 'Khóa học',
    price: Number(row.price || 0),
    originalPrice: Number(row.original_price || 0),
    badge: row.badge,
    badgeType: row.badge_type,
    level: row.level || 'Cơ bản',
    duration: row.duration || '',
    lessonsCount: Number(row.lessons_count || 0),
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count || 0),
    studentsCount: Number(row.students_count || 0),
    image: row.image,
    desc: row.desc_short || '',
    description: row.desc_short || '',
    fullDescription: row.full_description || '',
    instructor: {
      name: row.instructor_name || 'Đội ngũ Giảng viên MOS Master',
      title: row.instructor_title || 'Certiport Master Instructors Team',
      avatar: row.instructor_avatar || '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: typeof row.modules === 'string' ? JSON.parse(row.modules || '[]') : (row.modules || []),
  };
}

function mapCourseToRow(course: Course): any {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug || course.id,
    category_id: course.category,
    category_label: course.categoryLabel || 'Khóa học',
    price: course.price,
    original_price: course.originalPrice,
    badge: course.badge || null,
    badge_type: course.badgeType || null,
    level: course.level,
    duration: course.duration,
    lessons_count: course.lessonsCount,
    rating: course.rating,
    reviews_count: course.reviewsCount,
    students_count: course.studentsCount,
    image: course.image,
    desc_short: course.desc || course.description || '',
    full_description: course.fullDescription || '',
    instructor_name: course.instructor?.name || 'Đội ngũ Giảng viên MOS Master',
    instructor_title: course.instructor?.title || 'Certiport Master Instructors Team',
    instructor_avatar: course.instructor?.avatar || '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    modules: course.modules || [],
  };
}

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClient();

  const fetchEnrolledCourses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.email) {
        setEnrolledCourseIds([]);
        return;
      }

      const { data: orders, error } = await supabase
        .from('orders')
        .select('items')
        .eq('customer_email', user.email);

      if (!error && orders) {
        const idsSet = new Set<string>();
        orders.forEach((ord: any) => {
          if (Array.isArray(ord.items)) {
            ord.items.forEach((item: any) => {
              if (item.course_id) idsSet.add(item.course_id);
            });
          }
        });
        setEnrolledCourseIds(Array.from(idsSet));
      }
    } catch (err) {
      console.error('Error fetching enrolled courses:', err);
    }
  };

  const fetchFromSupabase = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Categories from Supabase
      const { data: catData, error: catErr } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (!catErr && catData && catData.length > 0) {
        setCategories(
          catData.map((c) => ({
            id: c.id,
            name: c.name,
            status: 'Hoạt động',
          }))
        );
      }

      // 2. Fetch Courses from Supabase
      const { data: courseData, error: courseErr } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (!courseErr && courseData && courseData.length > 0) {
        setCourses(courseData.map(mapRowToCourse));
      }

      // 3. Fetch Enrolled Courses for logged in user
      await fetchEnrolledCourses();
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFromSupabase();

    // Listen to Auth state changes to refresh enrolled course IDs
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchEnrolledCourses();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addCourse = async (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    setCourses(updated);

    try {
      const row = mapCourseToRow(newCourse);
      const { error } = await supabase.from('courses').upsert(row);
      if (error) {
        console.error('Supabase insert course error:', error);
      }
    } catch (e) {
      console.error('Failed to sync course to Supabase', e);
    }
  };

  const updateCourse = async (id: string, updatedCourse: Partial<Course>) => {
    const target = courses.find((c) => c.id === id);
    if (!target) return;
    const merged = { ...target, ...updatedCourse };

    setCourses(courses.map((c) => (c.id === id ? merged : c)));

    try {
      const row = mapCourseToRow(merged);
      const { error } = await supabase.from('courses').update(row).eq('id', id);
      if (error) {
        console.error('Supabase update course error:', error);
      }
    } catch (e) {
      console.error('Failed to update course in Supabase', e);
    }
  };

  const deleteCourse = async (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));

    try {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) {
        console.error('Supabase delete course error:', error);
      }
    } catch (e) {
      console.error('Failed to delete course from Supabase', e);
    }
  };

  const addCategory = async (name: string) => {
    const catId = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const existing = categories.find((c) => c.id === catId);
    if (existing) return;
    const newCat: CategoryItem = { id: catId, name, status: 'Hoạt động' };
    
    setCategories([...categories, newCat]);

    try {
      const { error } = await supabase.from('categories').upsert({
        id: catId,
        name: name,
        slug: catId,
        description: `Danh mục ${name}`,
      });
      if (error) {
        console.error('Supabase insert category error:', error);
      }
    } catch (e) {
      console.error('Failed to sync category to Supabase', e);
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));

    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) {
        console.error('Supabase delete category error:', error);
      }
    } catch (e) {
      console.error('Failed to delete category from Supabase', e);
    }
  };

  const getCourseById = (id: string) => {
    return courses.find((c) => c.id === id || c.slug === id);
  };

  const resetToDefault = async () => {
    setCourses(COURSES_DATA);
    setCategories(INITIAL_CATEGORIES);
    await fetchFromSupabase();
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        categories,
        enrolledCourseIds,
        isLoading,
        addCourse,
        updateCourse,
        deleteCourse,
        addCategory,
        deleteCategory,
        getCourseById,
        resetToDefault,
        refreshFromSupabase: fetchFromSupabase,
        refreshEnrolledCourses: fetchEnrolledCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};
