'use client';

import { useState } from 'react';
import useAuth from '@/hooks/useAuth';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, message, loading } = useAuth();

  const handleSubmit = async () => {
    const payload: Record<string, string> =
      mode === 'register' ? { name, email, password } : { email, password };

    await auth(mode, payload);
    setPassword('');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="flex mb-4">
        <button
          className={`flex-1 p-2 ${mode === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={`flex-1 p-2 ${mode === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>

      {mode === 'register' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {mode === 'login' ? 'Login' : 'Create Account'}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
