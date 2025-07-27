import CustomText from '@/components/general/Text'
import {
    HStack,
    VStack,
    Button,
    InputGroup,
    InputLeftElement,
    Input,
    Box,
    useToast,
    Image,
    Flex,
    useColorMode
} from '@chakra-ui/react'
import { IoMdSearch } from 'react-icons/io'
import React from 'react'
import { THEME } from '@/theme'
import SidebarCard from './SidebarCard'
import { useDetails } from '@/global-state/useUserDetails'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { ICommunity } from '@/models/Communitty'
import { uniqBy } from 'lodash';
import { PaginatedResponse } from '@/models/PaginatedResponse'
import useDebounce from '@/hooks/useDebounce'
import Link from 'next/link'
import { SearchNormal1 } from 'iconsax-react'
import useCustomTheme from "@/hooks/useTheme";


function Sidebar() {
    const [page, setPage] = React.useState(0);
    const [search, setSearch] = React.useState('');
    const [last, setLast] = React.useState(false);
    const [communitiies, setCommunities] = React.useState<ICommunity[]>([]);
    const intObserver = React.useRef<IntersectionObserver>();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const toast = useToast();
    const debounceValue = useDebounce(search);
    const { userId } = useDetails((state) => state);
    console.log(userId);
    const { isLoading, isError, } = useQuery(['getJoinedGroups', debounceValue, userId], () => httpService.get(`${URLS.JOINED_GROUPS}`, {
        params: {
            page: 0,
            searchText: debounceValue,
            // size: 20,
            userID: userId,
        }
    }), {
        onSuccess: (data) => {
            const response: PaginatedResponse<ICommunity> = data.data;
            console.log(response.content[0]);
            setLast(response.last);
            setCommunities(response.content);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: 'An error occured while getting communiity list',
                status: 'error',
                position: 'top-right'
            })
        }
    });

    const lastChildRef = React.useCallback((post: any) => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && last) {
                setPage(prev => prev + 1);
            }
        });
        if (post) intObserver.current.observe(post);
    }, [isLoading, last, setPage]);
    return (
        <VStack width='100%' height={'100%'} spacing={0} alignItems={'flex-start'} >

            <VStack width={'100%'} paddingX={'10px'} borderBottomWidth={'0.5px'} paddingBottom={'20px'} borderBottomColor={borderColor}>
                <HStack width={'100%'} height={'60px'} justifyContent={'space-between'}>

                    <HStack alignItems={'center'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'20px'}>Community</CustomText>
                        {/* <Button height={'16px'} width='42px' borderRadius={15} bg='#5D70F9' color='white' fontFamily={'Satoshi-Light'} variant={'solid'} fontSize='12px' >5 New</Button> */}
                    </HStack>

                    <Link href='/dashboard/community/create'>

                        <Flex as={"button"} width={"fit-content"} fontWeight={"semibold"} border={"1px solid #3C41F0"} px={"10px"} color={"brand.chasescrollBlue"} fontSize={"12px"} height={"25px"} rounded={"32px"} alignItems={"center"} gap={"2"} >
                            New Community
                        </Flex>
                        {/* <Button variant={'unstyled'}   height={'30px'} width='150px' borderRadius={'20px'} borderWidth={'1px'} borderColor={'brand.chasescrollButtonBlue'} color='brand.chasescrollButtonBlue' fontFamily={'DM-Regular'}>New Community</Button> */}
                    </Link>

                </HStack>

                {/* SEARCH BAR */}
                <InputGroup>
                    <InputLeftElement>
                        <SearchNormal1 size='25px' color={THEME.COLORS.chasescrollButtonBlue} />
                    </InputLeftElement>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} width='100%' height={'45px'} placeholder='search message' borderRadius={'12px'} borderWidth={'1px'} borderColor={borderColor} bg={secondaryBackgroundColor} />
                </InputGroup>
            </VStack>

            {/* CHATS */}
            {
                !isLoading && !isError && communitiies.length > 0 && (
                    <Box width={'100%'} height={'100%'} overflowY={'auto'} paddingBottom={'300px'}>
                        {
                            !isLoading && !isError && communitiies.length > 0 && communitiies.map((item, index) => {
                                if (index === communitiies.length - 1) {
                                    return <SidebarCard ref={lastChildRef} key={index.toString()} community={item} />
                                } else {
                                    return <SidebarCard key={index.toString()} community={item} />
                                }
                            })
                        }
                    </Box>
                )
            }

            {
                !isLoading && !isError && communitiies.length < 1 && (
                    <HStack width={'100%'} height='50px' justifyContent={'center'} alignItems={'center'}>
                        <CustomText fontFamily={'Satoshi-Medium'} fontSize={'18'} textAlign={'center'}>You have not joined any group</CustomText>
                    </HStack>
                )
            }

        </VStack>
    )
}

export default Sidebar