'use client';

import { use, useEffect, useState } from 'react';
import api from '@/lib/api';

type AuthMode = 'login' | 'register';

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
}

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      const { data } = await api.get('/api/user', {
        withCredentials: true,
      });
      setUser(data);
      return data;
    } catch {
      setUser(null);
      return null;
    }
  };

  const auth = async (mode: AuthMode, payload: Record<string, any>) => {
    setLoading(true);
    setMessage('');

    try {
      await api.get('/sanctum/csrf-cookie', { withCredentials: true });

      const xsrfToken = getCookie('XSRF-TOKEN');
      const { data } = await api.post(`/api/${mode}`, payload, {
        withCredentials: true,
        headers: { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || '') },
      });

      await getUser();

      setMessage(
        mode === 'login'
          ? `Welcome back, ${data.name}!`
          : `Account created! Hello, ${data.name}!`
      );

      return data;
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Network error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.get('/sanctum/csrf-cookie', { withCredentials: true });

      const xsrfToken = getCookie('XSRF-TOKEN');
      await api.post('/api/logout', {}, { 
        withCredentials: true,
        headers: { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || '') },
      });
      setMessage('Logged out');
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Network error');
    }
  };

  useEffect(()=> {
    getUser();
  }, []);

  return { user, auth, logout, message, loading };
}

