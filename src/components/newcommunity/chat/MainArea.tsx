import CustomText from '@/components/general/Text';
import { Box, HStack, Spinner, VStack, Image, useColorMode, Flex, Text } from '@chakra-ui/react';
import React, { useRef } from 'react'
import CommunityChatHeader from './Header';
import TextArea from './TextArea';
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import { URLS } from '@/services/urls';
import { IMediaContent, IMediaPost } from '@/models/MediaPost';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';
import MessageCard from './MessageCard';
import { IComment } from '@/models/Comment';
import { useCommunityPageState } from '@/components/Community/chat/state';
import { FiCalendar } from 'react-icons/fi';
import { THEME } from '@/theme';
import EventCard from './EventCard';
import AddEventsModal from '@/components/modals/community/AddEventsModal';
import Link from 'next/link';
import useCustomTheme from "@/hooks/useTheme";
import CommunityTextArea from './TextArea';
import { IoClose, IoCloseCircle } from 'react-icons/io5';
import { useCommunity } from '..';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import useCommunityEvent from '../hooks/communityEvent';

interface IProps {
    setShow: any,
}

function MainArea({ setShow }: IProps) {
    const { activeCommunity, setAll, messages, pageNumber, hasNext, showEvents, events } = useCommunityPageState((state) => state);

    const [posts, setPosts] = React.useState<IMediaContent[]>([]);
    const [showEventModal, setShowEventModal] = React.useState(false);
    const [len, setLen] = React.useState(messages?.length);

    const ref: any = useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    const { communityEvent } = useCommunityEvent()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const intObserver = React.useRef<IntersectionObserver>(null);


    const { userId: myId } = useDetails((state) => state)

    // queries
    const { isLoading, isRefetching, refetch } = useQuery([`getMessage-${activeCommunity?.id}`, activeCommunity?.id, pageNumber], () => httpService.get(`${URLS.GET_GROUP_MESSAGES}`, {
        params: {
            groupID: activeCommunity?.id,
            page: pageNumber
        }
    }), {
        enabled: activeCommunity !== null,
        refetchOnMount: true,
        onSuccess: (data) => {
            const item: PaginatedResponse<IMediaContent> = data.data;
            if (item?.content?.length > 0) {
                if (item.content[0].sourceId !== activeCommunity?.id) {
                    setAll({ messages: item.content });
                } else {
                    if (messages.length > 0) {
                        const arr = [...messages];
                        arr?.unshift(...item?.content)
                        setAll({ messages: uniqBy(arr, 'id'), hasNext: item.last ? false : true });

                    } else {
                        setAll({ messages: uniqBy(item?.content, 'id'), hasNext: item.last ? false : true });
                    }
                }
            }

        },
        onError: (error: any) => { }
    });

    const lastChildRef = React.useCallback((post: any) => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && hasNext) {
                setAll({ pageNumber: pageNumber + 1 });
                //setPageNumber(prev => prev + 1);
            }
        });
        if (post) intObserver.current.observe(post);
    }, [isLoading, setAll, pageNumber, hasNext]);

    if (activeCommunity === null) {
        return (
            <Flex width='100%' height={'100%'} flexDirection={"column"} justifyContent={'center'} alignItems={'center'}>
                {/* <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'DM-Medium'} color='brand.chasescrollButtonBlue'>Start conversations</CustomText>

                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'DM-Medium'} color='brand.chasescrollButtonBlue'>Gist with friends</CustomText> */}
                <Flex width={"full"} flexDir={"column"} bg={mainBackgroundColor} alignItems={"center"} py={"4"}  >
                    <Image src={"/images/folder.png"} alt="folder" width={"350px"} />
                    <Text>Start conversations with your community</Text>
                </Flex>
            </Flex>
        )
    }
    return (
        <Flex w={"full"} h={"100%"} pos={"relative"}  overflowY={"hidden"} flexDirection={"column"} >
            <Flex w={"full"} bgColor={mainBackgroundColor} pos={"relative"} zIndex={"10"} h={"fit-content"} >
                <CommunityChatHeader />
                <AddEventsModal isOpen={showEventModal} onClose={() => setShowEventModal(false)} />
            </Flex>
            <Box width={'fit-content'} bgColor={"#fcfcfc"} pos={"absolute"} top={"80px"} left={"2"} zIndex={"10"} height={'fit-content'} >
                {activeCommunity.creator.userId === myId && (
                    <Box bg={mainBackgroundColor} >
                        <Image onClick={() => setShowEventModal(true)} src='/assets/images/note-add.png' alt='logo' width={'30px'} height={'30px'} />
                    </Box>
                )}
            </Box>
            {showEvents && communityEvent.length > 0 && (
                <Flex width='100%' height={'115px'} pos={"absolute"} top={"72px"} zIndex={"10"} bg={secondaryBackgroundColor}  >
                    <Flex as={"button"} display={[communityEvent.length > 3 ? "flex" : "none", communityEvent.length > 4 ? "flex" : "none", communityEvent.length > 6 ? "flex" : "none"]} bgColor={secondaryBackgroundColor} rounded={"full"} onClick={() => scroll(-400)} left={"2"} justifyContent={"center"} alignItems={"center"} h={"fit-content"} zIndex={"20"} ml={"2"} my={"auto"} >
                        <BsArrowLeftCircle size="25px" />
                    </Flex>
                    <Box px='2' ref={ref} position={"relative"} paddingTop={'20px'} w={"full"} maxWidth='full' height='100%' overflowX={'auto'} display={"flex"} overflowY={"hidden"} scrollBehavior={"smooth"} sx={
                        {
                            '::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }
                    }>

                        <Flex w={"auto"}  >
                            {communityEvent.map((item: any, i: number) => (
                                <EventCard event={item} userId={activeCommunity?.creator?.userId} communityId={activeCommunity?.id} key={i.toString()} index={i} />
                            ))}
                        </Flex>
                    </Box>
                    <Flex as={"button"} display={[communityEvent.length > 3 ? "flex" : "none", communityEvent.length > 4 ? "flex" : "none", communityEvent.length > 6 ? "flex" : "none"]} bgColor={secondaryBackgroundColor} rounded={"full"} onClick={() => scroll(400)} right={"2"} justifyContent={"center"} alignItems={"center"} mr={"2"} h={"fit-content"} zIndex={"20"} my={"auto"} >
                        <BsArrowRightCircle size="25px" />
                    </Flex>
                </Flex>
            )}
            <Box pos={"absolute"} inset={"0px"} pt={"72px"} pb={"150px"} >
                <Flex w={"full"} h={"full"} flexDir={"column-reverse"} gap={"5"} paddingX={['10px', '30px']} paddingY='4' overflowY={"auto"} pos={"relative"} >
                    <LoadingAnimation loading={isLoading} >
                        {activeCommunity !== null && messages.length > 0 && messages.map((item, index) => {
                            return (
                                <>
                                    {index === messages.length - 1 ? (
                                        <MessageCard refetch={refetch} index={index} id='lastMsg' ref={lastChildRef} key={index.toString()} message={item} />
                                    ) : (
                                        <MessageCard refetch={refetch} index={index} id={undefined} key={index.toString()} message={item} />
                                    )}
                                </>
                            )
                        })}
                        {isLoading && (
                            <VStack width='100%' height='50px' justifyContent={'center'} alignItems={'center'}>
                                <Spinner size={'sm'} />
                            </VStack>
                        )}
                    </LoadingAnimation>
                </Flex>
            </Box>
            <Flex width={"full"} height={"fit-content"}  bgColor={mainBackgroundColor} marginTop={"auto"} px={"3"} bottom={"0px"} >
                <CommunityTextArea />
            </Flex>
        </Flex>
    )
}

export default MainArea
