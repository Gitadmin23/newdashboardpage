import React from 'react'
import { Box, Flex, Grid, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';
import { IBooking } from '@/models/Booking';
import BookingCard from '@/components/booking_component/BookingCard';
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import usePaystackStore from '@/global-state/usePaystack';

function BookingsRequest() {
    const [businesses, setBusinesses] = React.useState<IBooking[]>([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const userId = localStorage.getItem('user_id');
    const { configPaystack, setPaystackConfig, message, dataID } = usePaystackStore((state) => state);

    const { isLoading, } = useQuery(['get-my-request', page], () => httpService.get('/booking/search', {
        params: {
            vendorID: userId,
            page,
            size: 20,
        }
    }), {
        onSuccess: (data) => {
            console.log(data?.data?.content)
            const item: PaginatedResponse<IBooking> = data.data;
            setBusinesses((prev) => uniqBy([...prev, ...item?.content], 'id'));
            if (item?.last) {
                setHasMore(false);
            }
        }
    })
    return (
        <Flex w='full' h='full' flexDir={"column"} pos={"relative"} >
            {!isLoading && businesses.length > 0 && (
                <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["4", "4", "6"]} pb={"10"} >
                    {businesses.map((item: any, index) => (
                        <BookingCard key={index} booking={item} business={item?.vendor} isVendor={true} />
                    ))}
                </Grid>
            )}

            {!isLoading && businesses.length < 1 && (
                <VStack w='full' h='40px' borderRadius={'20px'} justifyContent={'center'} >
                    <Text>There are currently no bookings, you can start by creating one!</Text>
                </VStack>
            )}

            {isLoading && (
                <VStack w='full' h='80px' borderRadius={'20px'} justifyContent={'center'} >
                    <Spinner />
                    <Text>Loading Your Booking</Text>
                </VStack>
            )} 
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} message={message} /> 
        </Flex>
    )
}

export default BookingsRequest
