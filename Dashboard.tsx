
import React, { useState, useEffect } from 'react';
import { Key, CheckCircle, Clock, ShieldAlert, Users, Zap, Search } from 'lucide-react';
import { mockStats, mockLicenses } from '../mockData';
// Added LicenseType to the imports from '../types'
import { LicenseStatus, LicenseType } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalLicenses: 0,
    activeLicenses: 0,
    expiredLicenses: 0,
    suspendedLicenses: 0,
    totalUsers: 0,
    checkOperations: 0
  });

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  const statCards = [
    { title: 'إجمالي التراخيص', value: stats.totalLicenses, icon: <Key size={24} />, color: 'bg-purple-600', trend: '↑ إجمالي التراخيص' },
    { title: 'التراخيص النشطة', value: stats.activeLicenses, icon: <CheckCircle size={24} />, color: 'bg-emerald-600', trend: '✓ تعمل بشكل صحيح' },
    { title: 'تراخيص موقوفة', value: stats.suspendedLicenses, icon: <Clock size={24} />, color: 'bg-orange-500', trend: '⚠ موقوفة مؤقتاً' },
    { title: 'تراخيص منتهية', value: stats.expiredLicenses, icon: <ShieldAlert size={24} />, color: 'bg-rose-600', trend: 'تم حظرها ∅' },
  ];

  const secondaryStats = [
    { title: 'إجمالي المستخدمين', value: stats.totalUsers, icon: <Users className="text-indigo-600" />, subtitle: 'المستخدمين النشطين' },
    { title: 'عمليات التحقق', value: stats.checkOperations, icon: <Zap className="text-emerald-500" />, subtitle: 'نجاح التفعيل' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-indigo-700 via-indigo-600 to-indigo-500 p-8 text-white shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">لوحة التحكم 🚀</h2>
          <p className="text-indigo-100 text-lg opacity-90">مرحباً بك في نظام إدارة التراخيص المركزية.</p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-400 opacity-10 translate-x-1/4 translate-y-1/4 rounded-full"></div>

        {/* User Quick Info */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-4 hidden md:block border border-white/20">
          <div className="text-xs font-medium text-indigo-200 mb-1">مرحباً</div>
          <div className="text-xl font-bold">Super Admin</div>
          <div className="mt-2 inline-block px-3 py-1 bg-indigo-500 text-xs rounded-lg font-bold">سوبر أدمن</div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-gray-800">{stat.value}</div>
              </div>
              <div className="text-sm font-bold text-gray-500 mb-1">{stat.title}</div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                {stat.trend}
              </div>
            </div>
            <div className={`h-1 w-full ${stat.color} opacity-20`}></div>
          </div>
        ))}
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {secondaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 hover:border-indigo-200 transition-colors">
            <div className="p-3 bg-gray-50 rounded-xl">
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-400 font-medium">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Section: Recent Licenses & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:col-span-3">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Clock className="text-indigo-600" size={20} />
              الأنشطة الأخيرة
            </h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400 space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <Zap size={32} className="opacity-20" />
            </div>
            <p className="text-sm font-medium">لا توجد أنشطة جديدة لعرضها حالياً</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
