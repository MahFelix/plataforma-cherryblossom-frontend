import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthGuard from './components/AuthGuard';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Lessons from './pages/Lessons';
import Students from './pages/Students';
import AdminCourses from './pages/AdminCourses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Layout>
                <Routes>
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:courseId/lessons" element={<Lessons />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/admin/courses" element={<AdminCourses />} />
                  <Route path="/" element={<Navigate to="/courses" replace />} />
                </Routes>
              </Layout>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;