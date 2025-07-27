'use client';
import { FiChevronLeft } from 'react-icons/fi'
import { Box, VStack, HStack, Text, useToast, Spinner } from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation';

import React from 'react'
import { IBooking } from '@/models/Booking';
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import BookingCard from '@/components/booking_component/BookingCard';
import { useDetails } from '@/global-state/useUserDetails';

function BookingDetails() {

    const [business, setBusiness] = React.useState<IBooking | null>(null);
    const { userId } = useDetails((state) => state);


    const param = useParams();
    const toast = useToast();
    const router = useRouter();
    const id = param?.id;


    const { isLoading, } = useQuery(['get-my-businesses', id], () => httpService.get('/booking/search', {
        params: {
            id: id,
        }
    }), {
        onSuccess: (data) => {
            console.log(data?.data?.content)
            const item: PaginatedResponse<IBooking> = data.data;
            setBusiness(item.content[0]);

        }
    })
    return (
        <Box flex={1} w='full' overflowY={'auto'}>
            <VStack w='full' px={['20px', '0px']} overflowY={'auto'}>
                <VStack w={['100%', '30%']} overflowY={'auto'} pb='30px'>
                    <HStack w='full' h='60px' justifyContent={'space-between'}>
                        <FiChevronLeft size={'30px'} color={'black'} onClick={() => router.back()} />
                        <Text fontWeight={600} fontSize='20px'>Booking</Text>
                        <Box />
                    </HStack>

                    {isLoading && (
                        <VStack w='100%' h='70px' alignItems={'center'} justifyContent={'center'}>
                            <Spinner />
                            <Text>Loading Booking</Text>
                        </VStack>
                    )}

                    {!isLoading && business === null && (
                        <VStack w='100%' h='70px' alignItems={'center'} justifyContent={'center'}>

                            <Text>Booking not found</Text>
                        </VStack>
                    )}

                    {!isLoading && business !== null && (
                        <BookingCard booking={business as any} business={business?.service as any} isVendor={userId === business?.service.vendorID} shouldNavigate={false} showBorder={false} />
                    )}
                </VStack>
            </VStack>
        </Box>
    )
}

export default BookingDetails
