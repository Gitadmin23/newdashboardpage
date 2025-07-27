'use client';
import MainArea from '@/components/Community/chat/MainArea';
import Sidebar from '@/components/Community/chat/Sidebar';
import CustomText from '@/components/general/Text';
import {
    Box, HStack, VStack, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Textarea,
    Spinner, Image, useColorMode
} from '@chakra-ui/react';
import React from 'react'
import { useCommunityPageState } from './state';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { IComment } from '@/models/Comment';
import { FiSend, FiSmile, FiX } from 'react-icons/fi';
import { THEME } from '@/theme';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import CommentCard from '@/components/Community/chat/CommentCard';
import EmojiPicker from 'emoji-picker-react';
import useCustomTheme from "@/hooks/useTheme";

function CommunityChat() {
  const [comment, setComment] = React.useState<string>('');
  const [showEmoji, setShowEmoi] = React.useState(false);
  const intObserver = React.useRef<IntersectionObserver>();
  const queryClient = useQueryClient();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

  const { drawerOpen, setAll, activeCommunity, activeMessageId, commentHasNext, commentPage, comments } = useCommunityPageState((state) => state);

  

  const getComments = useQuery(['getMessageComments', activeMessageId, commentPage], () => httpService.get(`${URLS.GET_ALL_COMMENTS}`, {
    params: {
        postID: activeMessageId,
        page: commentPage,
    }
}), {
    enabled: activeMessageId !== null,
    onSuccess: (data) => {
        const item: PaginatedResponse<IComment> = data.data;
        if (item.content.length > 0) {
            if (item.content[0].id !== activeMessageId) {
                setAll({ comments: item.content });
            } else {
                if (comments.length > 0) {
                    const arr = [...comments, ...item?.content];
                    setAll({ comments: uniqBy(arr, 'id'), commentHasNext: item.last ? false:true})
                } else {
                    setAll({ comments: uniqBy(item?.content, 'id'), commentHasNext: item.last ? false:true })
                }
            }
        }
    },
    onError: () => {}
});

// muatation
const createComment = useMutation({
  mutationFn: (data: {
    postID: string,
    comment: string
  })=> httpService.post(`${URLS.ADD_COMMENT}`, data),
  onSuccess: () => {
    queryClient.invalidateQueries(['getMessageComments']);
    queryClient.invalidateQueries([`getSinglePost-${activeMessageId}`]);
    setComment('');
  },
});

  const commentlastChildRef = React.useCallback((post: any) => {
    if (getComments.isLoading) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && commentHasNext) {
        setAll({ commentPage: commentPage + 1});
      }
    });
    if (post) intObserver.current.observe(post);
   }, [getComments.isLoading, commentHasNext, setAll, commentPage]);


   // functioons

   const handleCreateComment = () => {
    if (comment === '') return;
    const data = {
      postID: activeMessageId,
      comment,
    }
    createComment.mutate(data);
   }

  return (
    <HStack flex={1} height='100%' spacing={0} padding='5px' alignItems={'flex-start'}>

        {/* DRAWER */}
          <Drawer isOpen={drawerOpen} onClose={() => { setAll({ drawerOpen: false, activeMessageId: undefined, comments: []  }); setShowEmoi(false) }} placement='right' size={showEmoji ? 'sm':'xs'}>
            <DrawerOverlay />
            <DrawerContent bg={secondaryBackgroundColor}>
              <DrawerHeader borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                <HStack justifyContent={'space-between'}>
                  <CustomText>Replies</CustomText>
                  <FiX fontSize='25px' color={THEME.COLORS.chasescrollButtonBlue} onClick={() => setAll({ drawerOpen: false })} />
                </HStack>
              </DrawerHeader>

              <DrawerBody>

                <VStack flex={1} width='100%' height='100%'>

                  <Box flex={1} width='100%' height={'100%'} overflowX={'hidden'} overflowY={'auto'}>
                    {
                      getComments.isLoading && (
                        <HStack justifyContent={'center'}>
                          <Spinner />
                        </HStack>
                      )
                    }
                    {
                      !getComments.isLoading && comments.length < 1 && (
                        <CustomText fontFamily={'DM-Regular'} textAlign={'center'}>No comments yet, be the first too comment on the post</CustomText>
                      )
                    }
                    { comments.length > 0 && comments.map((item, index) => {
                      if (index === comments.length -1) {
                        return (
                          <CommentCard ref={commentlastChildRef} key={index.toString()} comment={item} />
                        )
                      } else {
                        return (
                          <CommentCard key={index.toString()} comment={item} />
                        )
                      }
                    })}
                  </Box>

                  <VStack position={'relative'} width={'100%'} height={'100px'} borderWidth={'1px'} borderColor={THEME.COLORS.chasescrollButtonBlue} borderRadius={'10px'} paddingX='10px'>

                  { showEmoji && (
                      <Box position={'absolute'} height={'400px'} top='-450px' left={'0px'}>
                          <EmojiPicker  onEmojiClick={(e) => setComment(prev => prev + e.emoji)} />
                      </Box>
                  )}

                      <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{ height: '50px', width: '100%', resize: 'none', backgroundColor:'transparent', outline: 'none', padding: '5px' }} />
                      <HStack  mt={"2"} alignItems={"center"} justifyContent={'space-between'} width='100%'>
                        <HStack>
                        <Image src='/assets/images/Smiley.svg' onClick={() => setShowEmoi(prev => !prev)}  alt='smile' width={'24px'} height={'24px'} />
                        </HStack>
                        { !createComment.isLoading && <Image onClick={() => handleCreateComment()} src='/assets/images/send.svg' alt='smile' width={'24px'} height={'24px'} /> }
                        { createComment.isLoading && <Spinner /> }
                      </HStack>
                  </VStack>

                </VStack>

              </DrawerBody>

            </DrawerContent>
          </Drawer>
        {/* END OF DRAWER */}

        {/* BIG SCREEN */}
        <HStack width='100%' height='100%' display={['none', 'flex']} spacing={0} alignItems={'flex-start'}>

          <Box width='30%' height='100%' borderRightColor={'lightgrey'} borderRightWidth={activeCommunity !== null ?'1px':'0px'} >
            <Sidebar />
          </Box>
          <Box flex={1} height='100%' bg={secondaryBackgroundColor} borderWidth={activeCommunity !== null ? 0:1}  borderColor={ colorMode  === 'light' ? 'brand.chasescrollButtonBlue': borderColor}  borderRadius={activeCommunity !== null ? '0px':'20px'}>
            <MainArea />
          </Box>

        </HStack>
        
        {/* SMALL SCREEN */}
        <HStack flex={1} width='100%' height='100%' display={['flex', 'none']} alignItems={'flex-start'}>
          { activeCommunity === null && (
            <Box width={'100%'} height={'100%'} borderRightColor={'lightgrey'} borderRightWidth={activeCommunity !== null ?'1px':'0px'} >
              <Sidebar />
          </Box>
          )}
        {
          activeCommunity !== null && (
            <VStack spacing={0} flex={1} height='100%' bg={secondaryBackgroundColor} borderWidth={activeCommunity !== null ? 0:1}  borderColor={ colorMode  === 'light' ? 'brand.chasescrollButtonBlue': borderColor} borderRadius={activeCommunity !== null ? '0px':'20px'}>
                <MainArea />
            </VStack>
          )
        }
        </HStack>
    </HStack>
  )
}

export default CommunityChat