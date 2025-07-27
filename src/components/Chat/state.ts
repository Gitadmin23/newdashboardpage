import { Chat } from '@/models/Chat';
import { ChatMessage } from '@/models/ChatMessage';
import { IComment } from '@/models/Comment';
import { ICommunity } from '@/models/Communitty';
import { IEvent } from '@/models/Events';
import { IMediaContent } from '@/models/MediaPost';
import { create } from 'zustand';

type IChatPageState = {
    activeChat: Chat | null;
    messages: ChatMessage[] | [];
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
    showEmoji: boolean;
    chatsIds: string[];
    removeMessage: (index: number) => void,
    setAll: (data: Partial<IChatPageState>) => void
}

export const useChatPageState = create<IChatPageState>((set) => ({
    activeChat: null,
    drawerOpen: false,
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
    showEmoji: false,
    chatsIds: [],
    removeMessage: (index) => set((state) => ({
        ...state,
        messages: state.messages.filter((_, i) => i !== index),
    })),
    setAll: (data) => set((state) => ({ ...state, ...data })),
}))