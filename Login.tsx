import React, { useState } from 'react';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Use environment variable for API URL or fallback to localhost
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // If response is not JSON (likely HTML error page or 404 fallback)
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('فشل الاتصال بالخادم. تأكد من تشغيل الخادم (API).');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'حدث خطأ أثناء تسجيل الدخول');
            }

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
            onLogin();
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-['Tajawal']" dir="rtl">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <ShieldCheck size={40} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">نظام التراخيص</h1>
                    <p className="text-indigo-200">تسجيل الدخول للوحة التحكم</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">البريد الإلكتروني</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                    placeholder="name@example.com"
                                    required
                                />
                                <User size={20} className="absolute right-3 top-3.5 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">كلمة المرور</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                                <Lock size={20} className="absolute right-3 top-3.5 text-gray-400" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'تسجيل الدخول'
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
                    جميع الحقوق محفوظة © 2026
                </div>
            </div>
        </div>
    );
};

export default Login;
