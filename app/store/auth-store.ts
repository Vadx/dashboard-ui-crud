import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthUser {
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
  user: IAuthUser | null;
  setAuth: (token: string, refreshToken: string, user: IAuthUser) => void;
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
