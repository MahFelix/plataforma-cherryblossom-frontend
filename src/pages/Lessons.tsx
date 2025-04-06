import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, CheckCircle, Lock } from 'lucide-react';
import type { Lesson } from '../types';

const mockLessons: Lesson[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Introdução ao Curso de Bolsa Vintage',
    description: 'Apresentação dos materiais necessários e visão geral do projeto',
    videoUrl: 'https://example.com/video1',
    duration: '15min',
    order: 1,
    completed: true,
    created_at: '',
    updated_at: ''
  },
  {
    id: '2',
    courseId: '1',
    title: 'Pontos Básicos de Crochê',
    description: 'Aprenda os pontos fundamentais que serão utilizados no projeto',
    videoUrl: 'https://example.com/video2',
    duration: '45min',
    order: 2,
    completed: true,
    created_at: '',
    updated_at: ''
  },
  {
    id: '3',
    courseId: '1',
    title: 'Iniciando a Base da Bolsa',
    description: 'Técnicas para criar uma base firme e bem estruturada',
    videoUrl: 'https://example.com/video3',
    duration: '1h',
    order: 3,
    completed: false,
    created_at: '',
    updated_at: ''
  },
  {
    id: '4',
    courseId: '1',
    title: 'Desenvolvendo as Laterais',
    description: 'Aprenda a técnica especial para as laterais vintage',
    videoUrl: 'https://example.com/video4',
    duration: '1h 30min',
    order: 4,
    completed: false,
    created_at: '',
    updated_at: ''
  },
  {
    id: '5',
    courseId: '1',
    title: 'Acabamento e Detalhes',
    description: 'Finalizando com acabamentos profissionais',
    videoUrl: 'https://example.com/video5',
    duration: '50min',
    order: 5,
    completed: false,
    created_at: '',
    updated_at: ''
  }
];

export default function Lessons() {
  const { courseId } = useParams();
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);

  const courseLessons = mockLessons.filter(lesson => lesson.courseId === courseId);

  React.useEffect(() => {
    if (!selectedLesson && courseLessons.length > 0) {
      setSelectedLesson(courseLessons[0]);
    }
  }, [courseLessons]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Lesson List Sidebar */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Aulas do Curso</h2>
        </div>
        <div className="divide-y">
          {courseLessons.map((lesson, index) => {
            const isLocked = !lesson.completed && index > 0 && !courseLessons[index - 1].completed;
            
            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && setSelectedLesson(lesson)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedLesson?.id === lesson.id ? 'bg-gray-50' : ''
                } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Aula {lesson.order}
                  </span>
                  {lesson.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isLocked ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Play className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <h3 className="mt-1 text-sm font-medium text-gray-700">{lesson.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{lesson.duration}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Player and Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        {selectedLesson ? (
          <div>
            <div className="aspect-video bg-black rounded-lg shadow-lg flex items-center justify-center">
              <Play className="h-16 w-16 text-white opacity-50" />
            </div>
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h1>
              <p className="mt-2 text-gray-600">{selectedLesson.description}</p>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Marcar como concluída
              </button>
              <span className="text-sm text-gray-500">Duração: {selectedLesson.duration}</span>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Selecione uma aula para começar</p>
          </div>
        )}
      </div>
    </div>
  );
}