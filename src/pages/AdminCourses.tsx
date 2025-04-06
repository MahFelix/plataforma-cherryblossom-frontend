/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import type { Course } from '../types';

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({});

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      // Substitua isso com sua chamada real à API
      // const response = await fetch('/api/courses');
      // const data = await response.json();
      // setCourses(data);

      throw new Error('Backend não implementado');
    } catch (err) {
      setError('Erro ao carregar cursos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (currentCourse.id) {
        // Atualizar curso
        // await fetch(`/api/courses/${currentCourse.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(currentCourse),
        // });
      } else {
        // Criar novo curso
        // await fetch('/api/courses', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(currentCourse),
        // });
      }

      setCurrentCourse({});
      setIsEditing(false);
      await fetchCourses();
    } catch (err) {
      setError('Erro ao salvar curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCourse(id: string) {
    if (!confirm('Tem certeza que deseja remover este curso?')) return;

    setLoading(true);
    setError(null);

    try {
      // await fetch(`/api/courses/${id}`, {
      //   method: 'DELETE',
      // });

      await fetchCourses();
    } catch (err) {
      setError('Erro ao deletar curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  // Aqui você pode adicionar o JSX da interface de administração dos cursos

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administração de Cursos</h1>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="flex items-center justify-between mb-2">
              <span>{course.title}</span>
              <div className="flex gap-2">
                <button onClick={() => { setIsEditing(true); setCurrentCourse(course); }}>
                  <Edit2 size={18} />
                </button>
                <button onClick={() => deleteCourse(course.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          placeholder="Título do curso"
          value={currentCourse.title || ''}
          onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded">
          <PlusCircle size={16} />
          {currentCourse.id ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
}
