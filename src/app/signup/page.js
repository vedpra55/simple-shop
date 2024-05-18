"use client"

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setdisplayName] = useState("")
  const router = useRouter()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!email || !password || !displayName) {
      setError('Please fill in both fields.');
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {

        const { email } = user;
        const virtualBalance = 100;
        await setDoc(userDocRef, { userId: user.uid, displayName, email, virtualBalance, });
      }

      router.push("/")
    } catch (error) {
      setError('Invalid email or password.');
      console.error('Login error:', error)
    }

    setLoading(false)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
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
            {loading ? "Wait.." : "Signup"}
          </button>
        </div>
        <div className=' underline text-center mt-5 w-full'>
          <Link className='' href={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  </div>
  );
}