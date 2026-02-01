
import React from 'react';
import { ShieldCheck, Clock, Check, X, Eye, Copy } from 'lucide-react';

const Activations: React.FC = () => {
  const pendingActivations = [
    {
      id: "#6",
      key: "FLCN-23YR-ZP5R-BGPC-PGDF",
      user: "بدون مستخدم",
      hwid: "6DC4C9EC-F904-7...",
      fullHwid: "6DC4C9EC-F904-7123-B1C2-887766AABBCC",
      date: "2026-01-25 23:20",
      type: "سنوي",
      status: "معلق"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck size={32} />
            <h2 className="text-3xl font-bold">طلبات التفعيل</h2>
          </div>
          <p className="text-emerald-50 opacity-90">مراجعة واعتماد طلبات ربط الهاردوير بالتراخيص الصادرة.</p>
        </div>
        <div className="absolute top-1/2 left-8 -translate-y-1/2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 hidden md:block">
          <span className="font-bold">طلب قيد الانتظار: ١</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">طلبات التفعيل المعلقة ⏳</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase">
                <th className="px-6 py-4">الرقم #</th>
                <th className="px-6 py-4">مفتاح الترخيص</th>
                <th className="px-6 py-4">المستخدم</th>
                <th className="px-6 py-4">HWID</th>
                <th className="px-6 py-4">تاريخ الطلب</th>
                <th className="px-6 py-4">النوع</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingActivations.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-400 text-sm">{req.id}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100">
                      {req.key}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">−</div>
                      <span className="text-xs text-gray-500">{req.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 group">
                      <span className="text-xs font-mono bg-gray-100 text-gray-600 px-3 py-1 rounded-lg border">
                        {req.hwid}
                      </span>
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500">{req.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-blue-100 text-blue-600">{req.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-600 flex items-center gap-1 w-fit">
                      <Clock size={12} />
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 bg-emerald-500 text-white rounded-lg shadow-sm hover:bg-emerald-600">
                        <Check size={16} />
                      </button>
                      <button className="p-2 bg-rose-500 text-white rounded-lg shadow-sm hover:bg-rose-600">
                        <X size={16} />
                      </button>
                      <button className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activations;
