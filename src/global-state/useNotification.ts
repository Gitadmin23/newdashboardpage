import { INotification } from '@/models/Notifications';
import { create } from 'zustand';

type NotificationState = {
    count: number;
    notifications: Array<INotification>;
    setAllCount: (data: Partial<NotificationState>) => void;
}

export const useNotification = create<NotificationState>((set) => ({
    count: 0,
    notifications: [],
    setAllCount: (data) => set((state) => ({ ...state, ...data})),
}))