import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email || !password) {
            setError('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দিন।');
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // On successful login, the onAuthStateChanged listener in App.tsx will handle the redirect.
        } catch (err: any) {
            console.error(err);
             setError('ভুল ইমেইল অথবা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5 text-gray-800">এডমিন প্যানেল লগইন</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form onSubmit={handleLogin} className="px-5 py-7">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">ইমেইল</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">পাসওয়ার্ড</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-blue-500" 
                            required
                        />
                         {error && (
                            <div className="text-red-600 text-sm mb-4 text-center p-2 bg-red-100 rounded-md">
                                {error}
                            </div>
                        )}
                        <button 
                            type="submit" 
                            className="transition duration-200 bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            disabled={loading}
                        >
                            <span className="inline-block mr-2">{loading ? 'প্রসেসিং...' : 'লগইন করুন'}</span>
                        </button>
                    </form>
                </div>
                 <div className="py-5 text-center">
                    <p className="text-sm text-gray-500">
                       শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;