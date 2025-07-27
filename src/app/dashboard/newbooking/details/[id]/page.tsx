'use client';
import CreateBookingModal from '@/components/modals/booking/CreateBookingModal';
import { useDetails } from '@/global-state/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { IBuisness } from '@/models/Business';
import { IService } from '@/models/Service';
import httpService from '@/utils/httpService';
import { useToast, Flex, Text, HStack, VStack, Button } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5';
import { useQuery } from 'react-query';

const ServiceListCard = ({ service }: { service: IService }) => {
    const {
        primaryColor,
        borderColor
    } = useCustomTheme();
    const router = useRouter();


    // states
    const [show, setShow] = useState(false);
    const { userId } = useDetails((state) => state);

    return (
        <HStack w={['100%', '50%']} justifyContent={'space-between'} marginBottom={'20px'} minH={'100px'} maxH={'150px'} alignItems={'center'} borderWidth={'0.4px'} borderColor={'#EAEBEDCC'} px={['10px']} borderBottomLeftRadius={'10px'} borderBottomRightRadius={'10px'}>
            <CreateBookingModal show={show} onClose={() => setShow(false)} service={service} />
            <VStack alignItems={'flex-start'}>
                <Flex flexDirection={['column', 'row']}>
                    <Text fontSize={'18px'} fontWeight={600}>{service?.service?.category.toUpperCase() ?? 'DJ'} - </Text>
                     <Text color={primaryColor} fontSize={'16px'} fontWeight={600}> {service?.price && 'NGN'} {service?.price?.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'Contact Vendor'}</Text>
                </Flex>
                <Text cursor={'pointer'} color={primaryColor} fontSize={'14px'} fontWeight={600} onClick={() => router.push(`/dashboard/newbooking/details/service/${service?.id}`)}>View Service</Text>
            </VStack>

            {userId !== service?.vendor?.userID && (
                <Button w='120px' h='36px' onClick={() => setShow(true)} borderRadius={'full'} backgroundColor={primaryColor} color='white'>
                    <Text fontSize={'12px'}>{service?.hasFixedPrice ? 'Place Order' : 'Place Order'}</Text>
                </Button>
            )}
        </HStack>
    )
}

function BusinessDetailsPage() {

    const {
        primaryColor,
        borderColor
    } = useCustomTheme();

    const param = useParams();
    const toast = useToast();
    const router = useRouter();
    const id = param?.id;

    const { userId } = useDetails((state) => state);


    console.log(`BUSINES ID IN SERVICE -> ${id}`);
    const [services, setServices] = useState<IService[]>([]);
    const [business, setBusiness] = useState<IBuisness|null>(null);

    const getBusiness = useQuery([`get-business-by-id-${id}`, id], () => httpService.get(`/business/search`, {
        params: {
            id,
        }
    }), {
        onSuccess: (data) => {
            console.log(data?.data);
            setBusiness(data?.data?.content[0]);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
        }
    })


    const { isLoading, data } = useQuery([`get-business-service-by-id-${id}`, id], () => httpService.get(`/business-service/search`, {
        params: {
            vendorID: id,
        }
    }), {
        refetchOnMount: true,
        onSuccess: (data) => {
            console.log(data?.data);
            setServices(data?.data?.content);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
        }
    });
    return (
        <Flex flexDirection="column" w='full' h='full'>
            {userId === business?.createdBy?.userId && (
                <Flex gap={"2"} mt={"2"} as={"button"} alignItems={"center"} onClick={() => router.push(`/dashboard/newbooking/create/${id}/services`)} borderBottomColor={borderColor} borderBottomWidth={'0px'} marginBottom={'20px'} pb='10px'>
                    <IoAdd size={"25px"} color={primaryColor} />
                    <Text fontSize={'14px'} color={primaryColor}>Add Service </Text>
                </Flex>
            )}
            <VStack alignItems={['flex-start', 'center']}>
                {!isLoading && services.length > 0 && services.map((item, index) => (
                    <ServiceListCard key={index.toString()} service={item} />
                ))}
            </VStack>
        </Flex>
    )
}

export default BusinessDetailsPage
