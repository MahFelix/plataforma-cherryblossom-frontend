import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Layout as LayoutIcon, Users, Video, LogOut, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = true; // This will come from auth context later
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: BookOpen, label: 'Cursos', path: '/courses' },
    { icon: Video, label: 'Aulas', path: '/lessons' },
    ...(isAdmin ? [{ icon: Users, label: 'Alunos', path: '/students' }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header (only on mobile) */}
      <header className="md:hidden bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutIcon className="h-6 w-6 text-gray-800" />
            <span className="text-lg font-bold text-gray-800">Cherry Blossom Academy</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay (only on mobile) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div className="relative bg-white w-4/5 max-w-xs h-full ml-auto shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <LayoutIcon className="h-6 w-6 text-gray-800" />
                <span className="text-lg font-bold text-gray-800">Menu</span>
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (unchanged from original) */}
      <div className="hidden md:flex md:w-64 bg-white shadow-lg flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <LayoutIcon className="h-8 w-8 text-gray-800" />
            <span className="text-xl font-bold text-gray-800">Cherry Blossom Academy</span>
          </div>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-2 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                  location.pathname === item.path ? 'bg-gray-50 text-gray-900' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={() => navigate('/logout')}
            className="w-full flex items-center space-x-2 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Desktop Header (unchanged from original) */}
        <header className="hidden md:block bg-white shadow">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {location.pathname === '/courses' && 'Cursos'}
              {location.pathname === '/lessons' && 'Aulas'}
              {location.pathname === '/students' && 'Alunos'}
            </h1>
          </div>
        </header>

        {/* Mobile Page Title (only on mobile) */}
        {!mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-sm px-4 py-3">
            <h1 className="text-lg font-semibold text-gray-800">
              {location.pathname === '/courses' && 'Cursos'}
              {location.pathname === '/lessons' && 'Aulas'}
              {location.pathname === '/students' && 'Alunos'}
            </h1>
          </div>
        )}

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}