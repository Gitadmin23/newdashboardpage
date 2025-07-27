import { IDonation } from '@/models/donation';
import { create } from 'zustand';

type State = {
    selectedFilter: {
        state: string,
        category: string,
        name: string
    },
    initialFilter: {
        state: string,
        category: string,
        name: string
    }
}

type Action = {
    setSelectedFilter: (data: State['selectedFilter']) => void
    setInitialFilter: (data: State['initialFilter']) => void
}

const useKioskStore = create<State & Action>((set) => ({
    selectedFilter: {
        state: "",
        category: "",
        name: ""
    },
    initialFilter: {
        state: "",
        category: "",
        name: ""
    },
    setSelectedFilter: (data) => set(() => ({ selectedFilter: data })),
    setInitialFilter: (data) => set(() => ({ initialFilter: data })),
}));



export default useKioskStore