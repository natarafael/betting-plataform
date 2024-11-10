import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LoginResponse } from "@/types/api";

interface User {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  updateUser: (user: Partial<User>) => void;
  clearAuth: () => void;
}

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        set(initialState);
      },

      updateBalance: (newBalance: number) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              balance: newBalance,
            },
          });
        }
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              ...userData,
            },
          });
        }
      },

      clearAuth: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
