
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import {
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import useDebounce from '@/hooks/useDebounce';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { useChatPageState } from '../state';
import { useSearchParams } from 'next/navigation';


const useChat = () => {


  const queryClient = useQueryClient()

  const [search, setSearch] = React.useState(''); 

  const query = useSearchParams();
  const type = query?.get('activeID');
  const debounceValue = useDebounce(search);
  const { results, isLoading, ref: chatref, isRefetching, refetch } = InfiniteScrollerComponent({ url: `${URLS.GET_CHATS}?searchText=${debounceValue ?? ""}`, limit: 15, filter: "id", newdata: debounceValue, name: "getSingleDataMessages" })


  const { results: chatList, isLoading: loadingChatList, ref: ref, isRefetching: refetchingChatList, refetch: refechChatList } = InfiniteScrollerComponent({ url: `${URLS.CHAT_MESSGAE}?chatID=${type}`, limit: 15, filter: "id", name: "getMessages", refetchInterval: 1000 })
 
  const toast = useToast();


  const createPost = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CHAT_MESSGAE}`, data),
    onSuccess: () => { 
      refechChatList()
      refetch()
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An errorr occured',
        status: 'error',
        position: 'top-right'
      })
    }
  });


  const deleteMutation = useMutation({
    mutationFn: (data: any) => httpService.delete(`${URLS.DELETE_MESSAGE}`, {
      params: {
        messageID: data,
      },
    }),
    onSuccess: () => {
      refetch() 
      refechChatList() 
    },
    onError: () => {
      // alert('An error occurred');
    }
  });

  return {
    results,
    isLoading,
    chatref,
    isRefetching,
    refetch,
    createPost,
    deleteMutation,
    chatList,
    loadingChatList,
    ref,
    refechChatList,
    refetchingChatList
  };
}

export default useChat