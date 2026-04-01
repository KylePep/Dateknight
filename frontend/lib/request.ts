// lib/request.ts
import api from './api';
import { ensureCsrf } from './csrf';

export async function post<T>(url: string, data?: any) {
  await ensureCsrf();
  return api.post<T>(url, data);
}

export async function get<T>(url: string) {
  return api.get<T>(url);
}
