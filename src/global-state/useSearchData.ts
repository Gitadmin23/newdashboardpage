import { create } from 'zustand';

type State = {
    search: string,
    event_category: string,
} 

type Action = {
    setSearchValue: (data: State['search']) => void 
    setEventCategory: (data: State['event_category']) => void 
}

const useSearchStore = create<State & Action>((set) => ({
    search: "", 
    event_category: "",
    setSearchValue: (data) => set(() => ({ search: data })),
    setEventCategory: (data) => set(() => ({ event_category: data })),
}));



export default useSearchStore