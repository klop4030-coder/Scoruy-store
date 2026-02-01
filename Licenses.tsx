import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, Key, ChevronLeft, ChevronRight, X, AlertCircle, RefreshCw, Power } from 'lucide-react';
import { License, LicenseStatus, LicenseType } from '../types';

const Licenses: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create Modal State
  const [newLicenseType, setNewLicenseType] = useState<string>('TRIAL');
  const [newProgramName, setNewProgramName] = useState<string>('My App');
  const [newDuration, setNewDuration] = useState<string>('');
  const [createError, setCreateError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchLicenses = async () => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${API_URL}/api/licenses`);
      if (res.ok) {
        const data = await res.json();
        setLicenses(data);
      }
    } catch (error) {
      console.error('Failed to fetch licenses', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const handleCreateLicense = async () => {
    setIsCreating(true);
    setCreateError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${API_URL}/api/licenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: newLicenseType,
          programName: newProgramName,
          duration: newDuration
        })
      });

      if (!res.ok) throw new Error('Failed to create license');

      await fetchLicenses();
      setShowCreateModal(false);
    } catch (error) {
      setCreateError('حدث خطأ أثناء إنشاء الترخيص');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الترخيص؟')) return;
    try {
      await fetch(`/api/licenses/${id}`, { method: 'DELETE' });
      fetchLicenses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async (id: number) => {
    if (!confirm('هل أنت متأكد من فك ارتباط هذا الترخيص؟')) return;
    try {
      await fetch(`/api/licenses/${id}/reset`, { method: 'PUT' });
      fetchLicenses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === LicenseStatus.ACTIVE ? LicenseStatus.SUSPENDED : LicenseStatus.ACTIVE;
    try {
      await fetch(`/api/licenses/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchLicenses();
    } catch (error) {
      console.error(error);
    }
  };


  const getStatusBadge = (status: LicenseStatus) => {
    switch (status) {
      case LicenseStatus.ACTIVE:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">نشط</span>;
      case LicenseStatus.WAITING:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700">في انتظار التفعيل</span>;
      case LicenseStatus.EXPIRED:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-700">منتهي</span>;
      case LicenseStatus.SUSPENDED:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-700">موقوف</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getLicenseTypeLabel = (typeKey: string) => {
    // If typeKey matches one of our keys, return the Enum value, else return key
    // This is a simple mapping based on what backend sends (e.g. 'TRIAL') vs what we show
    switch (typeKey) {
      case 'TRIAL': return LicenseType.TRIAL;
      case 'MONTHLY': return LicenseType.MONTHLY;
      case 'YEARLY': return LicenseType.YEARLY;
      case 'LIFETIME': return LicenseType.LIFETIME;
      case 'CUSTOM': return LicenseType.CUSTOM;
      default: return typeKey;
    }
  };

  const filteredLicenses = licenses.filter(lic => lic.key.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Key size={32} className="text-indigo-200" />
              <h2 className="text-3xl font-bold">إدارة التراخيص</h2>
            </div>
            <p className="text-indigo-100 opacity-90">إدارة وإنشاء مفاتيح التراخيص والتحكم في صلاحيات الأجهزة.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold shadow-xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1"
          >
            <Plus size={20} />
            ترخيص جديد
          </button>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Filter size={18} />
          <span className="font-bold text-sm">البحث والتصفية</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="...ابحث بمفتاح الترخيص"
              className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
            <option>جميع الحالات</option>
            <option>نشط</option>
            <option>منتهي</option>
            <option>في انتظار التفعيل</option>
          </select>
          <div className="flex gap-2">
            <button className="flex-1 bg-indigo-600 text-white font-bold rounded-xl py-3 hover:bg-indigo-700 transition-all">بحث 🔍</button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">جميع التراخيص 📋</h3>
          <span className="text-xs font-bold text-gray-400">إجمالي التراخيص: {filteredLicenses.length}</span>
        </div>

        {isLoading ? (
          <div className="p-10 text-center text-gray-400">جاري التحميل...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase">
                  <th className="px-6 py-4">الرقم #</th>
                  <th className="px-6 py-4">النوع</th>
                  <th className="px-6 py-4">مفتاح الترخيص</th>
                  <th className="px-6 py-4">معرف الجهاز (HWID)</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">تاريخ الانتهاء</th>
                  <th className="px-6 py-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLicenses.map((lic) => (
                  <tr key={lic.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-400 text-sm">#{lic.id}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-blue-100 text-blue-600">
                        {getLicenseTypeLabel(lic.type as any)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs font-mono bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600 group-hover:bg-white border group-hover:border-indigo-200 transition-all">
                        {lic.key}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-500">{lic.hwid ? lic.hwid.substring(0, 15) + '...' : '−'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(lic.status)}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600">
                      {lic.expiryDate ? new Date(lic.expiryDate).toLocaleDateString('en-GB') : <span className="text-emerald-500">مدى الحياة</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          title="تغيير الحالة"
                          onClick={() => handleToggleStatus(lic.id, lic.status)}
                          className={`p-2 text-white rounded-lg shadow-md ${lic.status === LicenseStatus.ACTIVE ? 'bg-amber-400 hover:bg-amber-500' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                        >
                          <Power size={16} />
                        </button>
                        <button
                          title="إعادة تعيين الجهاز"
                          onClick={() => handleReset(lic.id)}
                          className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                        >
                          <RefreshCw size={16} />
                        </button>
                        <button
                          title="حذف"
                          onClick={() => handleDelete(lic.id)}
                          className="p-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredLicenses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-gray-400">لا توجد تراخيص لعرضها</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-indigo-600 p-8 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Plus className="bg-white/20 p-1 rounded-lg" size={32} />
                  إنشاء ترخيص جديد
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <p className="text-indigo-100">قم بتعبئة البيانات أدناه لإصدار مفتاح ترخيص جديد.</p>
            </div>

            <div className="p-8 space-y-6">
              {createError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle size={20} />
                  {createError}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">اسم البرنامج</label>
                <input
                  type="text"
                  value={newProgramName}
                  onChange={(e) => setNewProgramName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">نوع الترخيص *</label>
                <select
                  value={newLicenseType}
                  onChange={(e) => setNewLicenseType(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-indigo-900"
                >
                  <option value="TRIAL">{LicenseType.TRIAL}</option>
                  <option value="MONTHLY">{LicenseType.MONTHLY}</option>
                  <option value="YEARLY">{LicenseType.YEARLY}</option>
                  <option value="LIFETIME">{LicenseType.LIFETIME}</option>
                  <option value="CUSTOM">مدة مخصصة</option>
                </select>
              </div>

              {newLicenseType === 'CUSTOM' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المدة (بالأيام)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="30"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  إلغاء ✕
                </button>
                <button
                  onClick={handleCreateLicense}
                  disabled={isCreating}
                  className="flex-[2] bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  {isCreating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'إنشاء الترخيص ✓'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Licenses;
