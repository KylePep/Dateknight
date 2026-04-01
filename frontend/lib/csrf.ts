// lib/csrf.ts
import api from './api';

let csrfInitialized = false;

export async function ensureCsrf() {
  if (!csrfInitialized) {
    await api.get('/sanctum/csrf-cookie');
    csrfInitialized = true;
  }
}
