'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES_DATA, Course } from '@/data/courses';

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
  addCourse: (newCourse: Course) => void;
  updateCourse: (id: string, updatedCourse: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  resetToDefault: () => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);

  useEffect(() => {
    const savedCourses = localStorage.getItem('mos1000_courses');
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (e) {
        console.error('Failed to load courses from localStorage', e);
      }
    }

    const savedCategories = localStorage.getItem('mos1000_categories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error('Failed to load categories from localStorage', e);
      }
    }
  }, []);

  const saveCoursesToStorage = (updated: Course[]) => {
    setCourses(updated);
    localStorage.setItem('mos1000_courses', JSON.stringify(updated));
  };

  const saveCategoriesToStorage = (updated: CategoryItem[]) => {
    setCategories(updated);
    localStorage.setItem('mos1000_categories', JSON.stringify(updated));
  };

  const addCourse = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    saveCoursesToStorage(updated);
  };

  const updateCourse = (id: string, updatedCourse: Partial<Course>) => {
    const updated = courses.map((c) => (c.id === id ? { ...c, ...updatedCourse } : c));
    saveCoursesToStorage(updated);
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    saveCoursesToStorage(updated);
  };

  const addCategory = (name: string) => {
    const catId = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const existing = categories.find((c) => c.id === catId);
    if (existing) return;
    const newCat: CategoryItem = { id: catId, name, status: 'Hoạt động' };
    const updated = [...categories, newCat];
    saveCategoriesToStorage(updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    saveCategoriesToStorage(updated);
  };

  const getCourseById = (id: string) => {
    return courses.find((c) => c.id === id || c.slug === id);
  };

  const resetToDefault = () => {
    setCourses(COURSES_DATA);
    setCategories(INITIAL_CATEGORIES);
    localStorage.removeItem('mos1000_courses');
    localStorage.removeItem('mos1000_categories');
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        categories,
        addCourse,
        updateCourse,
        deleteCourse,
        addCategory,
        deleteCategory,
        getCourseById,
        resetToDefault,
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
