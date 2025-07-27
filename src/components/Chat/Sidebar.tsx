import CustomText from '@/components/general/Text'
import { HStack, VStack, Button, InputGroup, InputLeftElement, Input, Box, Avatar, useToast, Spinner, Image, useColorMode } from '@chakra-ui/react'
import { IoMdSearch } from 'react-icons/io'
import React from 'react'
import { THEME } from '@/theme'
import SidebarCard from './SidebarCard'
import { useDetails } from '@/global-state/useUserDetails'
import { useMutation, useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IMAGE_URL, URLS } from '@/services/urls'
import { Chat } from '@/models/Chat'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import useDebounce from '@/hooks/useDebounce'
import { useChatPageState } from './state'
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchNormal1 } from 'iconsax-react'
import { IUser } from '@/models/User'
import { uniq } from 'lodash'
import UserImage from '../sharedComponent/userimage'
import useCustomTheme from '@/hooks/useTheme'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import LoadingAnimation from '../sharedComponent/loading_animation'
import useChat from './hooks/chat'


const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const OnlineUser = ({ id, index }: { id: string, index: number }) => {
    const { setAll } = useChatPageState((state) => state)
    const [user, setUser] = React.useState<IUser | null>(null);
    const { isLoading, isError } = useQuery(['getOnlineUserProfile', id], () => httpService.get(`${URLS.GET_PUBLIC_PROIFLE}/${id}`), {
        onSuccess: (data) => {
            setUser(data?.data);
            console.log(data.data);
        },
        onError: () => { },
    })

    // mutations
    const createChat = useMutation({
        mutationFn: () => httpService.post(`${URLS.CREATE_CHAT}`, {
            "type": "ONE_TO_ONE",
            "typeID": user?.userId,
            users: [
                user?.userId
            ]
        }),
        onSuccess: (data) => {
            setAll({ activeChat: data?.data, messages: [], pageNumber: 0, activeMessageId: undefined });
        },
        onError: () => { }
    });

    return (
        <Box onClick={() => createChat.isLoading ? null : createChat.mutate()} cursor='pointer' width={'45px'} height='45px' position={'relative'} >
            <Box width={'10px'} height={'10px'} borderRadius={'5px'} bg='brand.chasescrollButtonBlue' position={'absolute'} right='0px' top="-2px" />
            {isLoading && (
                <HStack justifyContent={'center'} alignItems={'center'} width='45px' height='45px' >
                    <Spinner />
                </HStack>
            )}
            {!isLoading && (
                <HStack spacing={0} justifyContent={'center'} alignItems={'center'} width='45px' height='45px' >
                    <UserImage size={"40px"} border={"2px"} font={"16px"} data={user} image={user?.data?.imgMain?.value} />
                </HStack>
            )}
        </Box>
    )
}

function Sidebar() {
    const [chats, setChats] = React.useState<Chat[]>([])
    const [onlineUsers, setOnlineUsers] = React.useState<string[]>([])
    const [search, setSearch] = React.useState('');
    const [last, setLast] = React.useState(false);
    const [page, setPage] = React.useState(0);

    const intObserver = React.useRef<IntersectionObserver>(null);
    const query = useSearchParams();

    const router = useRouter();
    const toast = useToast();
    const debounceValue = useDebounce(search);
    const { userId } = useDetails((state) => state);
    const { setAll, chatsIds } = useChatPageState((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const getonlineUsers = useQuery(['onlineUser', userId], () => httpService.get(`${URLS.ONLINE_USERS}`), {

        onSuccess: (data) => {
            const item: string[] = data.data;
            setOnlineUsers(prev => uniq(item.filter((item) => !chatsIds.includes(item))));
        },
        onError: (error) => { },
    }) 

  const { results, isLoading, isRefetching, chatref } = useChat()
    

    return (
        <VStack width='100%' height={'100%'} paddingX={'0px'} overflow={'hidden'}>

            <VStack width={'100%'} paddingX={'10px'}> 

                <HStack width={'100%'} height={'60px'} justifyContent={'space-between'}>

                    <HStack alignItems={'center'}>
                        <CustomText fontSize={'3xl'}>Chats</CustomText>
                    </HStack> 

                </HStack>

                {/* SEARCH BAR */}
                <InputGroup>
                    <InputLeftElement>
                        <SearchNormal1 size='25px' color={colorMode === 'light' ? THEME.COLORS.chasescrollButtonBlue : bodyTextColor} />
                    </InputLeftElement>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} width='100%' height={'45px'} placeholder='search message' borderRadius={'10'} borderWidth={'0.5px'} borderColor={borderColor} bg={secondaryBackgroundColor} />
                </InputGroup>
            </VStack>

            {/* CHATS */}
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} > 
                <Box width={'100%'} height={'100%'} overflowY={'auto'} paddingBottom={'100px'}>
                    {results.map((item: any, index: any) => {
                        if (index === chats.length - 1) {
                            return <SidebarCard ref={chatref} key={index.toString()} chat={item} />
                        } else {
                            return <SidebarCard key={index.toString()} chat={item} />
                        }
                    })
                    }
                </Box>
            </LoadingAnimation>
        </VStack>
    )
}

export default Sidebar