import { create } from 'zustand';

type AuthState = {
    token: string;
    isLoggedIn: boolean;
    setAll: (data: Partial<AuthState>) => void       
}

export const useAuthState = create<AuthState>((set) => ({
    token: '',
    isLoggedIn: false,
    setAll: (data) => set((state) => ({ ...state, ...data }))
}));