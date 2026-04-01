'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

type AuthMode = 'login' | 'register';

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch authenticated user
  const getUser = async () => {
    try {
      const { data } = await api.get('/api/auth/user', { withCredentials: true });
      setUser(data);
      return data;
    } catch {
      setUser(null);
      return null;
    }
  };

  // Ensure CSRF cookie
  const ensureCsrf = async () => {
    await api.get('/sanctum/csrf-cookie', { withCredentials: true });
  };

  // Login or register
  const auth = async (mode: AuthMode, payload: Record<string, any>) => {
    setLoading(true);
    setMessage('');

    try {
      await ensureCsrf();

      const postData =
        mode === 'register'
          ? { ...payload, password_confirmation: payload.password }
          : payload;

      const { data } = await api.post(`/${mode}`, postData, { withCredentials: true });

      const userData = await getUser();

      setMessage(
        mode === 'login'
          ? `Welcome back, ${userData?.name}!`
          : `Account created! Hello, ${userData?.name}!`
      );

      return userData;
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Network error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setMessage('');

    try {
      await ensureCsrf();
      await api.post('/logout', {}, { withCredentials: true });

      setUser(null);
      setMessage('Logged out');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  // Load user on mount
  useEffect(() => {
    ensureCsrf().then(getUser);
  }, []);

  return { user, loading, message, auth, logout };
}
