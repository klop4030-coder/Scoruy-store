
import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Key, Users, FileText, Settings, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'لوحة التحكم', icon: <LayoutDashboard size={20} />, path: '#' },
    { name: 'التراخيص', icon: <Key size={20} />, path: '#licenses' },
    { name: 'التفعيلات', icon: <ShieldCheck size={20} />, path: '#activations' },
    { name: 'المستخدمين', icon: <Users size={20} />, path: '#users' },
    { name: 'الملفات', icon: <FileText size={20} />, path: '#files' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-['Tajawal']" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xl font-bold text-indigo-900">نظام التراخيص</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group"
              >
                <span className="text-gray-400 group-hover:text-indigo-600">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="bg-indigo-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                  S
                </div>
                <div>
                  <div className="text-sm font-bold text-indigo-900">Super Admin</div>
                  <div className="text-xs text-indigo-500">سوبر أدمن</div>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-500 p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>

          <div className="flex-1 lg:pr-0 pr-4">
            <h1 className="text-lg font-bold text-gray-800">مرحباً بك في لوحة الإدارة</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold">Super Admin</span>
              <span className="text-xs text-gray-500">متصل الآن</span>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white ring-2 ring-indigo-100">
              <Users size={20} />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
