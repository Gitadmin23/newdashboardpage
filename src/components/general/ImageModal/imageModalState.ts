import { create } from 'zustand';

type ImageModalStateType = {
    images: string[];
    isOpen: boolean;
    setAll: (data: Partial<ImageModalStateType>) => void;
}

export const useImageModalState = create<ImageModalStateType>((set) => ({
    images: [],
    isOpen: false,
    setAll: (data: Partial<ImageModalStateType>) => set((state) => ({ ... state, ...data })),
}))