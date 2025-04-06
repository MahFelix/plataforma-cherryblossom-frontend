import React, { useEffect, useState } from 'react';
import { UserPlus, Trash2, Mail } from 'lucide-react';

interface Student {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({ email: '', name: '' });
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  useEffect(() => {
    // Simula o carregamento inicial dos alunos
    const fakeStudents: Student[] = [
      {
        id: '1',
        email: 'ana@crochet.com',
        name: 'Ana Paula',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        email: 'joao@crochet.com',
        name: 'João Lima',
        created_at: new Date().toISOString(),
      },
    ];

    setStudents(fakeStudents);
    setLoading(false);
  }, []);

  function addStudent(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!newStudent.name || !newStudent.email) {
      setError('Preencha todos os campos');
      return;
    }

    const newEntry: Student = {
      id: Date.now().toString(),
      email: newStudent.email,
      name: newStudent.name,
      created_at: new Date().toISOString(),
    };

    setStudents([newEntry, ...students]);
    setNewStudent({ email: '', name: '' });
    setIsAddingStudent(false);
  }

  function removeStudent(id: string) {
    setStudents(students.filter((s) => s.id !== id));
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Alunos</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={() => setIsAddingStudent(!isAddingStudent)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <UserPlus size={18} /> Adicionar Aluno
      </button>

      {isAddingStudent && (
        <form onSubmit={addStudent} className="mb-6 space-y-2">
          <input
            type="text"
            placeholder="Nome"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </form>
      )}

      {loading ? (
        <p>Carregando alunos...</p>
      ) : (
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center border p-4 rounded-md"
            >
              <div>
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Mail size={14} /> {student.email}
                </p>
              </div>
              <button
                onClick={() => removeStudent(student.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
