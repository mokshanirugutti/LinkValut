import type  { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  email: string | null; 
  login: (user: User, token: string) => void;
  logout: () => void;
  setEmail: (email: string) => void; 
  clearEmail: () => void;
  getToken: () => string | null;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      email: null, 
      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, email: null }),
      setEmail: (email) => set({ email }), 
      clearEmail: () => set({ email: null }),
      getToken: () => get().token,
    }),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;
