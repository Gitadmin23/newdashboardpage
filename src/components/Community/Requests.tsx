import useDebounce from '@/hooks/useDebounce';
import { ICommunityRequest } from '@/models/Communitty';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Grid, HStack, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import CustomText from '../general/Text';
import CommunityCard from './CommunityCard';
import { useDetails } from '@/global-state/useUserDetails';
import RequestCard from './RequestCard';
import LoadingAnimation from '../sharedComponent/loading_animation';



function Requests() {
    const [page, setPage] = React.useState(0);
    const [communites, setCommunites] = React.useState<ICommunityRequest[]>([]);
    const [isLastPage, setIsLastPage] = React.useState(false);

    const { userId } = useDetails((state) => state)

    const { isLoading, isRefetching } = useQuery(['getMyCommunities', page], () => httpService.get(`${URLS.GET_GROUP_REQUESTS}/${userId}`, {
        params: {
            page,
            // size: 20,
        }
    }), {
        onSuccess: (data) => {
            const contents: PaginatedResponse<ICommunityRequest> = data.data;
            setIsLastPage(contents.last);
            console.log(contents.content);

            setCommunites(contents.content);
        },
        onError: () => { },
    });

    return (
        // <Flex width='100%' height='100%' px={"6"} paddingTop={'20px'}>
        //     {
        //         !isLoading && isError && (
        //             <HStack paddingX='20px' width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
        //                 <CustomText textAlign={'center'} fontFamily={'Satoshi-Bold'} fontSize='30px' color='grey'>An error occured while getting your communities</CustomText>
        //             </HStack>
        //         )
        //     }
        //     { isLoading && (
        //         <Spinner size='md' color='brand.chasescrollButtonBlue' />
        //     )}
        //     { !isLoading && !isError && communites.length < 1 && (
        //         <HStack paddingX='20px' width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
        //             <CustomText textAlign={'center'} fontFamily={'Satoshi-Bold'} fontSize='30px' color='grey'>You have no community request.</CustomText>
        //         </HStack>
        //     )}
        //     { !isLoading && !isError && communites.length > 0 && (

        //     )}
        // </Flex>
        (<LoadingAnimation loading={isLoading} refeching={isRefetching} length={communites?.length} >
            <Flex px={"6"} paddingTop={'20px'} flexWrap={"wrap"} height={"fit-content"} gap={"6"} overflowX={'hidden'} >
                {communites.map((item, index) => (
                    <RequestCard key={index.toString()} community={item} />
                ))}
            </Flex>
        </LoadingAnimation>)
    );
}

export default Requests;