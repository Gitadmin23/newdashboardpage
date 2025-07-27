import useDebounce from '@/hooks/useDebounce';
import { ICommunity } from '@/models/Communitty';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, HStack, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import CustomText from '../general/Text';
import CommunityCard from './CommunityCard';

function FindCommunities() {
    const [page, setPage] = React.useState(0);
    const [searchText, setSearchText] = React.useState('');
    const [communites, setCommunites] = React.useState<ICommunity[]>([]);
    const [isLastPage, setIsLastPage] = React.useState(false);

    const debounceValue = useDebounce(searchText, 500);

    const { isLoading, isError } = useQuery(['findCommunities', page, debounceValue], () => httpService.get(`${URLS.FIND_GROUPS}`, {
        params: {
            page,
            searchText: debounceValue,
            // size: 20,
        }
    }), {
        onSuccess: (data) => {
            console.log(data.data);
            const contents: PaginatedResponse<ICommunity> = data.data;
            setIsLastPage(contents.last);
            setCommunites(contents.content);
        },
        onError: () => {},
    });
  return (
    <VStack width='100%' height='100%' alignItems={'center'}>
        {
            !isLoading && isError && (
                <HStack paddingX='20px' width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                    <CustomText textAlign={'center'} fontFamily={'Satoshi-Bold'} fontSize='30px' color='grey'>An error occured while getting communities</CustomText>
                </HStack>
            )
        }
        { isLoading && (
            <Spinner size='md' color='brand.chasescrollButtonBlue' />
        )}
        { !isLoading && !isError && communites.length < 1 && (
            <HStack paddingX='20px' width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                <CustomText textAlign={'center'} fontFamily={'Satoshi-Bold'} fontSize='30px' color='grey'>There are no communities to join.</CustomText>
            </HStack>
        )}
        { !isLoading && !isError  && communites.length > 0 && (
            <Box paddingX='20px' width='100%' height='100%' overflowX={'hidden'} overflowY={'auto'} >
               <VStack width={'100%'} alignItems={'center'} paddingY='50px'>
               { communites.map((item, index) => (
                <CommunityCard key={index.toString()} community={item} hasJoined={false} />
               ))}
               </VStack>
            </Box>
        )}
    </VStack>
  )
}

export default FindCommunities