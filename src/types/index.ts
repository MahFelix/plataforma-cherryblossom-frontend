export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  totalLessons: number;
  duration: string;
  progress?: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  completed?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  role: 'student';
  created_at: string;
  updated_at: string;
}