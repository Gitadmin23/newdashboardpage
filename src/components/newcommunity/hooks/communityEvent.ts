import InfiniteScrollerComponent from "@/hooks/infiniteScrollerComponent";

import { useCommunityPageState } from '@/components/Community/chat/state';

const useCommunityEvent = () => {
    const { setAll, activeCommunity, activeMessageId, commentHasNext, commentPage, comments } = useCommunityPageState((state: any) => state);

const { results: communityEvent, isLoading: loadingCommunityEvent, ref: refCommunityEvent, isRefetching: refectingCommunityEvent, refetch: refectEvent } = InfiniteScrollerComponent({ url: `/events/get-saved-events?typeID=${activeCommunity?.id}`, limit: 15, filter: "id" })


return { 
    communityEvent,
    loadingCommunityEvent,
    refectEvent,  
};
}

export default useCommunityEvent 
