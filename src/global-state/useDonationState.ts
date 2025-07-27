import { IDonation } from '@/models/donation';
import { create } from 'zustand';

type State = {
    data: Array<IDonation>
    image: Array<any>
}

type Action = {
    updateDontion: (data: State['data']) => void
    updateImage: (data: State['image']) => void
}

const user_id = localStorage.getItem("user_id") + ""

const useDonationStore = create<State & Action>((set) => ({
    data: [{
        "visibility": "PUBLIC",
        creatorID: user_id,
        name: "",
        bannerImage: "",
        description: "",
        endDate: "",
        goal: "",
        purpose: ""
    }],
    image: [],
    updateDontion: (data) => set(() => ({ data: data })),
    updateImage: (data) => set(() => ({ image: data })),
}));



export default useDonationStore