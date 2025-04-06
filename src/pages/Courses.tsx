import { Play, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../types';
import Bag1 from '../assets/BagVier1.webp'
import Bag2 from '../assets/BagOrang.webp'

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Bolsa Vintage de Crochê',
    description: 'Aprenda a criar uma bolsa elegante com técnicas tradicionais de crochê',
    thumbnail: Bag1,
    instructor: 'Maria Silva',
    totalLessons: 12,
    duration: '6h 30min',
    progress: 45,
    created_at: '',
    updated_at: ''
  },
  {
    id: '2',
    title: 'Bolsa Moderna de Crochê',
    description: 'Técnicas contemporâneas para criar bolsas modernas e estilosas',
    thumbnail: Bag2,
    instructor: 'Ana Santos',
    totalLessons: 8,
    duration: '4h 15min',
    progress: 0,
    created_at: '',
    updated_at: ''
  },
];

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockCourses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{course.description}</p>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
              <span className="mx-2">•</span>
              <span>{course.totalLessons} aulas</span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Progresso: {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-800 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => navigate(`/course/${course.id}/lessons`)}
              className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 flex items-center justify-center"
            >
              <Play className="h-4 w-4 mr-2" />
              Continuar Curso
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
