"use client"
import { Button, Flex, Spinner, Text, useToast, Image, VStack, Avatar } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import useCustomTheme from '@/hooks/useTheme';
import { AiOutlineMore } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { IoBookmarkOutline } from 'react-icons/io5';
import { LuShare } from 'react-icons/lu';
import { FiAlertOctagon, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useParams, usePathname } from 'next/navigation'
import { IBuisness } from '@/models/Business';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, RESOURCE_BASE_URL } from '@/services/urls';
import { Calendar, Location } from 'iconsax-react';
import ShareEvent from '@/components/sharedComponent/share_event';
import { useDetails } from '@/global-state/useUserDetails';
import BlurredImage from '@/components/sharedComponent/blurred_image';
import ModalLayout from '@/components/sharedComponent/modal_layout';



export default function Layout({ children }: {
    children: ReactNode
}) {

    const {
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme()

    const param = useParams();
    const toast = useToast();
    const path = usePathname();
    const id = param?.id;
    const { userId } = useDetails((state) => state);
    const queryClient = useQueryClient();

    const [tab, setTab] = useState(0)

    const [business, setBusiness] = useState<IBuisness|null>(null);
    const [modal, setModal] = useState(false)


    React.useEffect(() => {
        if ((path as string)?.split("/")[5]) {
            setTab(1);
        } else { 
            setTab(0);
        }
    }, [path]);


    const { isLoading, data } = useQuery([`get-business-by-id-${id}`, id], () => httpService.get(`/business/search`, {
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
    });

    const createChatMutation = useMutation({
        mutationFn: () => httpService.post(`/chat/chat`, {
            image: business?.createdBy?.data?.imgMain?.value,
            name: business?.createdBy?.username,
            type: "ONE_TO_ONE",
            typeID: userId,
            users: [
                business?.createdBy?.userId,
            ]
        }),
        onSuccess: (data) => {
            console.log(data?.data);
            router.push(`/dashboard/chats?activeID=${data?.data?.id}`);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                position: 'top-right',
                status: 'error',
                isClosable: true,

            })
        }
    });

    const deleteBusiness = useMutation({
        mutationFn: (data: string) => httpService.delete(`/business/delete/${data}`),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                position: 'top-right',
                status: 'success',
                isClosable: true,
            });
            queryClient.invalidateQueries(['get-businesses']);
            queryClient.invalidateQueries(['get-my-businesses'])
            router.push(`/dashboard/newbooking`);
        },
        onError: (error:any) => {
            toast({
                title: 'Error',
                description: error?.message,
                position: 'top-right',
                status: 'error',
                isClosable: true,

            })
        }
    })

    const router = useRouter();

    if (isLoading) {
        return (
            <Flex w='full' h='full' flexDir={"column"} justifyContent={'center'} alignItems={'center'}>
                <Spinner />
                <Text>Loading Business Details</Text>
            </Flex>
        )
    }

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} px={["10px", "8"]} pt='15px' gap={"8"} overflowY={"auto"} >
            <Flex w={"full"} h={"fit-content"} justifyContent={"space-between"} alignItems={"center"} >
                {/* <IoArrowBack size="25px" /> */}
                <Flex as={"button"} onClick={() => router?.back()} >
                    <BsChevronLeft size="25px" />
                </Flex>
                <Text fontSize={"24px"} fontWeight={"600"} >{business?.businessName}</Text>
                { !isLoading && userId === business?.createdBy?.userId ? (
                   <>
                    {!deleteBusiness.isLoading &&  <FiTrash2 size='25px' color='red' onClick={() => setModal(true)} cursor={'pointer'}  />}
                    {deleteBusiness.isLoading && <Spinner colorScheme='blue' /> }
                   </>
                ): (
                    <Text></Text>
                )}
            </Flex>
            <Flex w={"full"} h={"fit-content"} > 
                <Flex w={"full"} h={"340px"} bgColor={"lightgrey"} rounded={"8px"} overflow='hidden' >
                    {/* <Image src={business?.bannerImage.startsWith('https://') ? business?.bannerImage : (IMAGE_URL as string) + business?.bannerImage} alt='banner image' w='full' h='full' objectFit={'cover'} /> */}

                    <BlurredImage forEvent={false} image={business?.bannerImage.startsWith('https://') ? business?.bannerImage : (IMAGE_URL as string) + business?.bannerImage}  height={'100%'}/>
                </Flex>
            </Flex>
            <Flex w={"full"} h={"fit-content"} gap={"10"} flexDir={['column', 'row']} >
                <Flex w={"full"} flexDir={"column"} gap={"5"} >
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"14px"} >Business Name</Text>
                        <Text fontSize={"24px"} fontWeight={"700"} >{business?.businessName}</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"14px"} fontWeight={"600"}  >Description</Text>
                        <Text fontSize={"14px"} >{business?.description}</Text>
                    </Flex>
                    <Flex w={"full"} gap={"6"} >
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Business Opening Days & Time</Text>
                            <Flex alignItems={"center"} gap={"3"} >
                                <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} alignItems={'center'} justifyContent={'center'} >
                                    <Calendar size={'20px'} color={primaryColor} variant='Linear' />
                                </Flex>
                                <Text fontWeight={"600"} fontSize={"14px"} color={primaryColor} >View Oppening Hours</Text>
                            </Flex>
                        </Flex>
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Location</Text>
                            <Flex alignItems={"center"} gap={"3"} >
                                <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} alignItems={'center'} justifyContent={'center'} >
                                    <Location size={'20px'} color={primaryColor} variant='Linear' />
                                </Flex>
                                <Text fontWeight={"400"} fontSize={"14px"} >{business?.address ?? 'Online'}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} flexDirection={"column"} gap={"8"} >
                    <Flex justifyContent={["flex-start", "end"]} gap={"4"} >
                        {/* <IoBookmarkOutline size={"25px"} /> */}
                        {!isLoading && business && userId === business?.createdBy?.userId && <FiEdit2 size={'25px'} color={primaryColor} onClick={() => router.push(`/dashboard/newbooking/edit/${id}`)} /> }
                        <ShareEvent type='BUSINESS' newbtn id={business?.id} data={business} showText={false}  />
                    </Flex>
                    {business?.socialMediaHandles && (
                        <Flex w={"full"} gap={"4"} >
                            {business?.socialMediaHandles.map((item, index) => (
                                <Flex alignItems={"center"} gap={"3"} key={index.toString()} >
                                    {/* <Flex w={"10"} h={"10"} rounded={"8px"} bg={"#F7FBFE"} /> */}
                                    <VStack alignItems={'flex-start'}>
                                        <Text fontSize={'16px'} color={primaryColor}>{item?.platform}</Text>
                                        <Text fontWeight={"400"} fontSize={"14px"} >{item?.details}</Text>
                                    </VStack>
                                </Flex>
                            ))}
                        </Flex>
                    )}
                    <Flex w={"full"} bgColor={secondaryBackgroundColor} rounded={"64px"} px={"21px"} py={"19px"} >
                        <Flex alignItems={"center"} w={"full"} gap={"3"} >
                            <Flex w={"48px"} h={"48px"} rounded={"36px"} roundedTopRight={"0px"} bg={"purple"} overflow='hidden' >
                                <Avatar color={"white"} name={`${business?.createdBy.firstName} ${business?.createdBy.lastName}`} onClick={() => router.push(`/dashboard/profile/${business?.createdBy?.userId}`)}  src={business?.createdBy?.data?.imgMain?.value ? (business?.createdBy?.data?.imgMain?.value?.startsWith('https://') ? business?.createdBy?.data?.imgMain?.value : `${RESOURCE_BASE_URL}${business?.createdBy?.data?.imgMain?.value}`) : null} w='full' h='full' />
                            </Flex>
                            <Flex flexDir={"column"} >
                                <Text fontSize={"12px"} fontWeight={"500"} >Business Owner</Text>
                                <Text onClick={() => router.push(`/dashboard/profile/${business?.createdBy?.userId}`)}  fontWeight={"600"} >{business?.createdBy?.firstName} {business?.createdBy?.lastName}</Text>
                            </Flex>
                           {userId !== business?.createdBy?.userId && (
                             <Flex gap={"18px"} p={"5px"} bg={mainBackgroundColor} rounded={"64px"} ml={"auto"} >
                                <Button onClick={() => createChatMutation.mutate()} h={"23px"} w={"68px"} rounded={"32px"} fontSize={"10px"} fontWeight={"500"} color={"white"} bg={primaryColor} isLoading={createChatMutation.isLoading} >Message</Button>
                                {/* <Button h={"23px"} w={"68px"} rounded={"32px"} fontSize={"10px"} fontWeight={"500"} color={primaryColor} bg={secondaryBackgroundColor} >Follow</Button> */}
                            </Flex>
                           )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"full"} mt={"10"} borderBottomColor={borderColor} borderBottomWidth={["1px", '0px']} py={"4"} justifyContent={"flex-start"} gap={3}>
                <Text onClick={() => {
                    router.push(`/dashboard/newbooking/details/${id}`);;
                    setTab(0)}} as={"button"} color={tab === 0 ? primaryColor : headerTextColor} textDecoration={tab === 0 ? "underline" : ""} >MY SERVICES</Text>
                {userId === business?.createdBy?.userId && (
                     <Text onClick={() => {
                        router.push(`/dashboard/newbooking/details/${id}/bookings`);
                        setTab(1)}} as={"button"} color={tab === 1 ? primaryColor : headerTextColor} textDecoration={tab === 1 ? "underline" : ""} >BOOKINGS</Text>
                )}
                {/* <Text onClick={() => setTab(2)} as={"button"} color={tab === 2 ? primaryColor : headerTextColor} textDecoration={tab === 2 ? "underline" : ""} >DETAILS</Text>
                <Text onClick={() => setTab(3)} as={"button"} color={tab === 3 ? primaryColor : headerTextColor} textDecoration={tab === 3 ? "underline" : ""} >REVIEWS</Text> */}
            </Flex>
            <Flex w={"full"} h={"fit-content"}  >
                {children}
            </Flex>

            <ModalLayout open={modal} close={setModal} closeIcon={true} onOverLay={false}>
                <Flex w={"full"} flexDir={"column"} alignItems={"center"} py={"5"} >
                    <FiAlertOctagon size={"100px"} color={"red"} />
                    <Text fontWeight={"600"} fontSize={"24px"} >Confirm your action</Text>
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} >Are you sure you want to delete this business</Text>

                    <Button onClick={()=> deleteBusiness.mutate(id as string)} isLoading={deleteBusiness.isLoading} height={"50px"} mt={"4"} borderWidth={"1px"} w={"90%"} rounded={"full"} borderColor={"red"} bgColor={'red'} color={"white"} >Delete Business</Button>

                    <Button onClick={()=> setModal(false)} height={"50px"} mt={"4"} borderWidth={"1px"} w={"90%"} rounded={"full"} borderColor={primaryColor} bgColor={mainBackgroundColor} color={primaryColor} _hover={{ backgroundColor: primaryColor, color: 'white' }} >Cancel</Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
