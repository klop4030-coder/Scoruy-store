
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Licenses from './pages/Licenses';
import Activations from './pages/Activations';
import Login from './pages/Login';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check initial auth state
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Token is set by Login component
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    window.location.hash = '#';
  };

  const renderContent = () => {
    switch (currentPath) {
      case '#':
      case '#dashboard':
        return <Dashboard />;
      case '#licenses':
        return <Licenses />;
      case '#activations':
        return <Activations />;
      case '#users':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-400 space-y-4">
            <div className="p-8 bg-white rounded-full shadow-sm">
              <span className="text-6xl">👥</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h2>
            <p>هذه الصفحة قيد التطوير حالياً.</p>
          </div>
        );
      case '#files':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-400 space-y-4">
            <div className="p-8 bg-white rounded-full shadow-sm">
              <span className="text-6xl">📁</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">مركز الملفات</h2>
            <p>هذه الصفحة قيد التطوير حالياً.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
