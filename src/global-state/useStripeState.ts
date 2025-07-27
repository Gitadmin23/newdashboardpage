import { create } from 'zustand';

type State = {
    configData: object, 
} 
type Key = { 
    clientSecret: string,  
} 
type Tab = { 
    modalTab: number
} 

type Action = {
    setConfigData: (data: State['configData']) => void,
    setClientSecret: (data: Key['clientSecret']) => void 
    setModalTab: (data: Tab['modalTab']) => void 
}

const useStripeStore: any = create<State & Action & Key & Tab>((set) => ({
    configData: {} as any, 
    clientSecret: "",
    modalTab: 1,
    setConfigData: (data) => set(() => ({ configData: data })),
    setClientSecret: (data) => set(() => ({ clientSecret: data })),
    setModalTab: (data) => set(() => ({ modalTab: data })),
}));



export default useStripeStore