import { create } from 'zustand'

type State = {
    typeID: string|null;
    open: boolean;
    setAll: (data: Partial<State>) => void
}

export const useLocalModalState = create<State>((set) => ({
    typeID: null,
    open: false,
    setAll: (data) => set((state) => ({ ...state, ...data })),
}));