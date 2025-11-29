import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: IUser | null;
  setAuth: (token: string, refreshToken: string, user: IUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      setAuth: (token, refreshToken, user) =>
        set({ token, refreshToken, user }),
      clearAuth: () => set({ token: null, refreshToken: null, user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
