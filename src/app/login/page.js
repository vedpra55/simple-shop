"use client"

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      if (!email || !password) {
        setError('Please fill in both fields.');
        return;
      }

        await signInWithEmailAndPassword(auth, email, password);

        setLoading(false)
        router.push("/")
    } catch (error) {
      setError('Invalid email or password.');
      console.error("Error signing in: ", error);

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Wait.." : "Login"}
          </button>
        </div>
        <div className=' underline text-center mt-5 w-full'>
          <Link className='' href={"/signup"}>Create Account</Link>
        </div>
      </form>
    </div>
  </div>
  );
}