import { create } from 'zustand';

type UtilState = {
    isDarkMode: boolean;
    setAll: (data: Partial<UtilState>) => void
}

export const useUtilState = create<UtilState>((set) => ({
    isDarkMode: false,
    setAll: (data) => set((state) => ({ ...state, ...data }))
}));