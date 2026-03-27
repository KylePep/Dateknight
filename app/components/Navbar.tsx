'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <button
        onClick={() => router.push('/')}
      >DateKnight</button>

      {user ? (
        <div>
          <span className="mr-4">Hi, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => router.push('/login')}
        >Login / Create Account</button>
      )}
    </nav>
  );
}
