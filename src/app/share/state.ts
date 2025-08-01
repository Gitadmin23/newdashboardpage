import { create } from 'zustand';

type State = {
    type: string;
    typeID: string;
    setAll: (data: Partial<State>) => void
}

export const useShareState = create<State>((set) => ({
    type: '',
    typeID: '',
    setAll: (data) => set((state) => ({ ...state, ...data })),
}));