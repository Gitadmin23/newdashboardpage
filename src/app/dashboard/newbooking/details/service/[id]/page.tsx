'use client';
import CreateBookingModal from "@/components/modals/booking/CreateBookingModal";
import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import { IService } from "@/models/Service";
import { IUser } from "@/models/User";
import { IMAGE_URL, URLS } from "@/services/urls";
import httpService from "@/utils/httpService";
import { Box, Flex, Text, Button, HStack, VStack, useToast, Spinner, Image } from "@chakra-ui/react";
import { ArrowLeft2, Star1 } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useMutation, useQuery } from "react-query";

export default function ServiceDetailsPage() {

    const [service, setService] = React.useState<IService | null>(null);
    const [show, setShow] = React.useState(false);
    const { userId } = useDetails((state) => state);
    const [vendor, setVendor] = React.useState<IUser | null>(null);
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    const param = useParams();
    const router = useRouter();
    const id = param?.id;
    const toast = useToast();

    const {
        primaryColor,
        borderColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor
    } = useCustomTheme();

    React.useEffect(() => {
        if ((service?.images as Array<string>)?.length > 1) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => {
                    if (prev === (service?.images as Array<string>).length - 1) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [service?.images]);

    const { mutate, isLoading: friendRequestLoading } = useMutation({
        mutationFn: (data: { toUserID: string }) => httpService.post(`${URLS.SEND_FRIEND_REQUEST}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Message',
                description: data?.data?.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',

            });
        },
        onError: (error: any) => {
            toast({
                title: 'An error occured',
                description: error?.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
        }
    })


    // query
    const getUserProfile = useQuery(['get-public-profile', service?.vendor?.userId], () => httpService.get(`/user/publicprofile/${service?.vendor?.userId}`), {
        onSuccess: (data) => {
            
            setVendor(data?.data as IUser);
        }
    })
    const { isLoading } = useQuery([`get-service-by-id-${id}`, id], () => httpService.get(`/business-service/search`, {
        params: {
            id,
        }
    }), {
        refetchOnMount: true,
        onSuccess: (data) => {
            console.log(data?.data);
            if (data?.data?.content?.length < 1) {
                toast({
                    title: 'No service found',
                    description: 'Service not found',
                    status: 'warning',
                    position: 'top-right',
                    isClosable: true,
                });

                // router.back();
                return;
            }
            const content: Array<IService> = data?.data?.content;
            setService(content.filter((item) => item.id === id)[0]);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
            // router.back();
        }
    });


    if (isLoading) {
        return (
            <VStack w='full' h='120px' justifyContent={'center'}>
                <Spinner />
                <Text>Loading Services Details</Text>
            </VStack>
        )
    } else {
        return (
            <Box w='full' h='full' p={['10px', '20px']} overflowY={'auto'} pb={"100px"}>

                <CreateBookingModal show={show} onClose={() => setShow(false)} service={service as IService} />

                <Flex w='full' h='30px' justifyContent={'flex-start'} alignItems={'center'} mb='20px'>
                    <ArrowLeft2 size={30} onClick={() => router.back()} color={headerTextColor} />
                    <Text fontSize='16px' fontWeight={600}>{service?.name}</Text>
                </Flex>

                {/* IMAGES */}
                {/*<Flex display={['flex', 'none']} bg={mainBackgroundColor} w={"full"} h={"240px"} bgColor={secondaryBackgroundColor} rounded={"8px"} overflowX='auto' gap={3}>*/}
                {/*    {service?.images.map((item, index) => (*/}
                {/*        <Box flexShrink={0} w='300px' h='full' borderRadius={'10px'} overflow='hidden' key={index.toString()}>*/}
                {/*            <Image src={item.startsWith('https:') ? item : (IMAGE_URL as string) + item} alt='banner image' w='full' h='full' objectFit={'cover'} />*/}
                {/*        </Box>*/}
                {/*    ))}*/}
                {/*</Flex>*/}

                <Box cursor='pointer' w='full' h='344px' borderRadius={'10px'} overflow={'hidden'} bg="lightgrey" position={'relative'} >
                    {/* <BlurredImage forEvent={false} image={service?.images[0].startsWith('https://') ? service?.images[0] : (IMAGE_URL as string) + service?.images[0]} height={'100%'} /> */}
                    {(service?.images as Array<string>)?.length > 1 && (
                        <HStack position={"absolute"} bottom={"10px"} height={"15px"} width={'full'} justifyContent={"center"} spacing={1}>
                            {service?.images.map((image, index) => (
                                <Box cursor={'pointer'} onClick={() => setActiveImageIndex(index)} key={index.toString()} width={activeImageIndex === index ? "10px" : "5px"} height={activeImageIndex === index ? "10px" : "5px"} borderRadius={activeImageIndex === index ? "10px" : "5px"} bg={activeImageIndex === index ? "white":"white"} scale={activeImageIndex === index ? 1:1} ></Box>
                            ))}
                        </HStack>
                    )}

                    <Image onClick={() => router.push(`/dashboard/newbooking/details/service/${service?.id}`)} cursor='pointer' src={service?.images[activeImageIndex].startsWith('https://') ? service?.images[activeImageIndex] : (IMAGE_URL as string) + service?.images[activeImageIndex]} alt="banner image" w='full' h='full' objectFit={'cover'} />
                </Box>

                <Flex w='full' h='auto' flexDir={['column', 'row']} mt='20px' justifyContent={['flex-start', 'space-between']} alignItems={['flex-start', 'flex-start']}>
                    <VStack w={['full', '60%']} spacing={1} alignItems='flex-start'>
                        <Text fontWeight={600} color={headerTextColor} fontSize={'16px'}>Details</Text>
                        <Text fontWeight={400} fontSize={'14px'}>{service?.description}</Text>
                    </VStack>
                    <Flex w={['full', '413px']} height={'168px'} mt={['30px', '0px']} flexDir={'column'} px='30px' justifyContent={'center'} borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                        <HStack justifyContent={'flex-start'}>
                            <Text fontWeight={600} fontSize={"14px"} color={bodyTextColor}>Starting price</Text>
                            <Text fontSize={'24px'} fontWeight={600} color={headerTextColor}>NGN {(service?.discount) && service?.discount > 0 ? service?.discount.toLocaleString() : service?.price?.toLocaleString()}</Text>
                        </HStack>

                        {userId !== service?.vendor?.userId && (
                            <Button onClick={() => setShow(true)} w='full' h='54px' borderRadius={'full'} bgColor={primaryColor} mt='40px'>
                                <Text fontWeight={500} color='white'>Get Qoute</Text>
                            </Button>
                        )}
                    </Flex>
                </Flex>

                <Flex w='full' flexDir={['column', 'row']} mt='20px' justifyContent={['flex-start', 'space-between']}>

                    <VStack w={['full', '60%']} alignItems='flex-start' spacing={4} >
                        <Text fontWeight={600} color={headerTextColor} fontSize={'16px'} textDecoration={'underline'}>Vendor Details</Text>
                        <HStack spacing={[10, 20]}>
                            <Box w='auto' h='auto' overflow={'visible'} position="relative">
                                <Box zIndex={1} w='60px' h='60px' borderRadius={'full'} overflow='hidden' bgColor='lightgrey'>
                                    <Image zIndex={1} w='60px' h='60px' borderRadius={'full'} alt="user image" objectFit={'cover'} src={service?.vendor?.data?.imgMain?.value ? (service?.vendor?.data?.imgMain?.value.startsWith('http') ? service?.vendor?.data?.imgMain?.value : IMAGE_URL + service?.vendor?.data?.imgMain?.value) : `https://ui-avatars.com/api/?name=${service?.vendor?.firstName}${service?.vendor?.lastName}&background=random`} />
                                </Box>

                                <HStack zIndex={2} justifyContent={'center'} position='absolute' top={1} right={-6} width='54px' height={'27px'} borderRadius={'35px'} bg='white' borderWidth={'1px'} borderColor={'#E8E8E8'} >
                                    <Star1 size={25} color='gold' variant="Bold" />
                                    <Text fontSize={'16px'} fontWeight={800}>{service?.rating}</Text>
                                </HStack>
                            </Box>
                            <VStack alignItems='flex-start' spacing={-2}>
                                <Text fontWeight={600} fontSize={'16px'}>Service from {service?.name}</Text>
                                <Text color={bodyTextColor} fontSize={'14px'} fontWeight={400}>Joined {new Date(service?.createdDate as number).toDateString()}  ( {service?.totalBooking === 0 ? 0 : service?.totalBooking} clients served)</Text>
                            </VStack>
                        </HStack>
                        {
                            !getUserProfile.isLoading && userId !== service?.vendor?.userId && vendor?.joinStatus !== 'CONNECTED' && (
                                <Button onClick={() => mutate({ toUserID: service?.vendor?.userId as string })} isLoading={friendRequestLoading} width={'100px'} height={'35px'} borderRadius="45px" backgroundColor={primaryColor} mt='5px'>
                                    <Text color='white' fontSize={'16px'}>Follow</Text>
                                </Button>
                            )
                        }
                    </VStack>

                    {/* CATEGORIES SECTION */}

                        <Flex w={['full', '413px']} mt={['30px', '0px']} flexDir={'column'} py='5px' borderRadius={'10px'}>
                            <Text fontWeight={600} color={headerTextColor}>Service Category</Text>

                            <Flex w='full' h='auto' overflowX={'auto'} gap={3} mt='10px'>
                                <VStack w='auto' h='34px' px='10px' borderRadius={'full'} borderWidth={'1px'} borderColor={borderColor} justifyContent={'center'} alignItems={'center'}>
                                    <Text fontWeight={300} fontSize='14px'>{service?.category}</Text>
                                </VStack>
                            </Flex>
                        </Flex>

                </Flex>

                <Flex flexDir="column" mt='20px'>
                    <HStack spacing={4}>
                        <Star1 size={25} color='gold' variant="Bold" />
                        <Text>{service?.rating ?? 0}</Text>
                        <Box w='5px' h='5px' bgColor='lightgrey' borderRadius={'full'} />
                        <Text>No Reviews Yet!</Text>
                    </HStack>
                </Flex>

            </Box>
        )
    }

}