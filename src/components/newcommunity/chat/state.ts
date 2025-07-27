import { IComment } from '@/models/Comment';
import { ICommunity } from '@/models/Communitty';
import { IEvent } from '@/models/Events';
import { IMediaContent } from '@/models/MediaPost';
import { create } from 'zustand';

type ICommunityPageState = {
    activeCommunity: ICommunity | null;
    messages: IMediaContent[] | [];
    pageNumber: number;
    hasNext: boolean;
    drawerOpen: boolean;
    activeMessageId: string;
    commentHasNext: boolean;
    commentPage: number;
    comments: IComment[];
    events: IEvent[];
    eventHasNext: boolean;
    eventPageNumber: number;
    showEvents: boolean;
    removeEvent: (index: number) => void;
    removeMessage: (index: number) => void;
    setAll: (data: Partial<ICommunityPageState>) => void
}

export const useCommunityPageState = create<ICommunityPageState>((set) => ({
    activeCommunity: null,
    drawerOpen: true,
    messages: [],
    pageNumber: 0,
    hasNext: false,
    activeMessageId: '',
    commentHasNext: false,
    commentPage: 0,
    comments: [],
    events: [],
    eventHasNext: false,
    eventPageNumber: 0,
    showEvents: false,
    removeEvent: (index) => set((state) => ({
        ...state,
        events: state.events.filter((_, i) => i !== index),
    })),
    removeMessage: (index) => set((state) => ({
        ...state,
        messages: state.messages.filter((_, i) => i !== index),
    })),
    setAll: (data) => set((state) => ({ ...state, ...data })),
}))