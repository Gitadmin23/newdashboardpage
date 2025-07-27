"use client"
import { IService } from "@/models/Service"
import { IMAGE_URL } from "@/services/urls"
import { capitalizeFLetter } from "@/utils/capitalLetter"
import { dateFormat, timeFormat } from "@/utils/dateFormat"
import { Flex, Grid, Button, HStack, Text, useToast, Image } from "@chakra-ui/react"
import { IoIosArrowForward } from "react-icons/io"
import EventMap from "../event_details_component/event_map_info"
import CreateBookingModal from "../modals/booking/CreateBookingModal" 
import DescriptionPage from "../sharedComponent/descriptionPage"
import LoadingAnimation from "../sharedComponent/loading_animation"
import { CalendarIcon } from "../svg"
import GetCreatorData from "./getCreatorData"
import ProductRating from "./productRating" 
import ServiceTermAndCondition from "./ServiceTermAndCondition"
import { useQuery } from "react-query"
import { useDetails } from "@/global-state/useUserDetails"
import useCustomTheme from "@/hooks/useTheme"
import { IUser } from "@/models/User"
import httpService from "@/utils/httpService"
import { useParams, useRouter } from "next/navigation" 
import React, { useState } from "react"
import { IReview } from "@/models/product"
import { textLimit } from "@/utils/textlimit"
import ShareEvent from "../sharedComponent/share_event"
import ShareLoginModal from "../sharedComponent/shareLoginModal"


export default function ServiceDetail(props: { id: string }) {

    const [service, setService] = React.useState({} as IService);
    const [show, setShow] = React.useState(false);
    const { userId } = useDetails((state) => state);
    const [vendor, setVendor] = React.useState<IUser | null>(null);

    const [reviewData, setData] = useState<Array<IReview>>([])

    const param = useParams();
    const { back, push } = useRouter();
    const toast = useToast();
    const id = props?.id;

    const {
        primaryColor,
        borderColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor
    } = useCustomTheme(); 

    // const { isLoading } = useQuery([`get-service-by-id-${id}`, id], () => httpService.get(`/business-service/search`, {
    //     params: {
    //         id: id
    //     }
    // }), { 
    //     onSuccess: (data) => {
    //         if (data?.data?.content?.length < 1) {
    //             toast({
    //                 title: 'No service found',
    //                 description: 'Service not found',
    //                 status: 'warning',
    //                 position: 'top-right',
    //                 isClosable: true,
    //             });

    //             // router.back();
    //             return;
    //         } 
    //         setService(data?.data?.content[0]); 
    //     },
    //     onError: (error: any) => {
    //         toast({
    //             title: 'Error',
    //             description: error?.message,
    //             status: 'error',
    //             position: 'top-right',
    //             duration: 5000,
    //             isClosable: true,
    //         });
    //         // router.back();
    //     }
    // }); 


    const { isLoading } = useQuery(
        ["service", id],
        () => httpService.get(`/business-service/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            console.log();

            if(data?.data?.content?.length > 0){
                setService(data?.data?.content[0])
            }
            
        }
    });
    
    let token = localStorage.getItem("token")

    const clickHandler = () => {
        if(!token){
            push("?open=true")
        } else {
            setShow(true)
        }
    }

    return (

        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} flexDir={"column"} gap={"6"} pos={"relative"} overflowY={"auto"} h={"full"} px={["4", "4", "6"]} pb={["6"]} py={"6"}  >

                <Flex gap={"1"} alignItems={"center"} pb={"3"} >
                    <Text role='button' onClick={() => back()} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >Service details</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >{service?.name}</Text>
                </Flex>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} h={["340px", "340px", "620px"]} bgColor={secondaryBackgroundColor} pos={"relative"} rounded={"8px"} borderWidth={"1px"} p={"1"} justifyContent={"center"} alignItems={"center"} borderColor={borderColor}  >
                        {service?.images?.length > 0 && (
                            <Image src={IMAGE_URL + service?.images[0]} alt='logo' rounded={"8px"} height={"full"} objectFit={"cover"} />
                        )}
                        <Grid templateColumns={["repeat(3, 1fr)"]} pos={"absolute"} gap={"3"} insetX={"4"} bottom={"4"} >
                            {service?.images?.map((subitem: string, index: number) => {
                                if (index !== 0 && index <= 3) {
                                    return (
                                        <Flex key={index} w={"full"} h={["100px", "150px"]} bgColor={secondaryBackgroundColor} rounded={"8px"} shadow={"md"} >
                                            <Image src={IMAGE_URL + subitem} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                        </Flex>
                                    )
                                }
                            })}
                        </Grid>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} > 
                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                            <Text fontSize={["24px", "24px", "32px"]} fontWeight={"700"} >{capitalizeFLetter(service?.name)}</Text>
                            <Flex w={"8"} h={"8"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"full"} > 
                                <ShareEvent newbtn={true} showText={false} data={service} name={service?.name} id={service?.id} type="SERVICE" eventName={textLimit(service?.name+"", 17)} />
                            </Flex>
                        </Flex> 
                        <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                            <DescriptionPage limit={200} label='Service Details' description={service?.description + ""} />
                            <Flex w={"full"} gap={"2"}>
                                <Flex w={["fit-content", "fit-content", "full"]} >
                                    <GetCreatorData reviewdata={reviewData} userData={service?.vendor as any} item={service?.rating} />
                                </Flex>
                                <Flex bgColor={mainBackgroundColor} display={["flex", "flex", "none"]} w={"full"}  >
                                    <Flex w={"full"} >
                                        <Flex w={"full"} flexDir={'column'} p={["3", "3", '30px']} justifyContent={'center'} borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                                            <Flex flexDir={"column"} >
                                                <Text fontWeight={600} fontSize={"14px"} color={bodyTextColor}>Starting price</Text>
                                                <Text fontSize={'24px'} fontWeight={600} color={headerTextColor}>NGN {(service?.discount) && service?.discount > 0 ? service?.discount.toLocaleString() : service?.price?.toLocaleString()}</Text>
                                            </Flex>

                                            {userId !== service?.vendor?.userId && (
                                                <Flex flexDir={"column"} gap={"2"} alignItems={"center"} >
                                                    <Button onClick={() => setShow(true)} w='full' h='54px' borderRadius={'full'} bgColor={primaryColor} mt='40px'>
                                                        <Text fontWeight={500} color='white'>Get Quote</Text>
                                                    </Button>
                                                    <ServiceTermAndCondition />
                                                </Flex>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex gap={"2"} alignItems={"center"}>
                            <Text fontWeight={"600"} fontSize={"14px"} w={"60px"} >Joined</Text>
                            <CalendarIcon color={primaryColor} />
                            <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(service?.createdDate)} {timeFormat(service?.createdDate)}</Text>
                        </Flex>
                        <Flex w={"full"} justifyContent={"end"} >
                            <Flex bgColor={mainBackgroundColor} maxW={"413px"} display={["none", "none", "flex"]}  >
                                <Flex flexDir={'column'} p='30px' justifyContent={'center'} borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                                    <HStack justifyContent={'flex-start'}>
                                        <Text fontWeight={600} fontSize={"14px"} color={bodyTextColor}>Starting price</Text>
                                        <Text fontSize={'24px'} fontWeight={600} color={headerTextColor}>NGN {(service?.discount) && service?.discount > 0 ? service?.discount.toLocaleString() : service?.price?.toLocaleString()}</Text>
                                    </HStack>

                                    {userId !== service?.vendor?.userId && (
                                        <Flex flexDir={"column"} gap={"2"} alignItems={"center"} >
                                            <Button onClick={clickHandler} w='full' h='54px' borderRadius={'full'} bgColor={primaryColor} mt='40px'>
                                                <Text fontWeight={500} color='white'>Get Quote</Text>
                                            </Button>
                                            <ServiceTermAndCondition />
                                        </Flex>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={"3"} flexDir={["column", "column", "row"]} justifyContent={"start"} alignItems={"start"} >
                    <Flex w={"full"}  >
                        <EventMap latlng={service?.location?.latlng} />
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} >
                        <ProductRating setData={setData} data={reviewData} item={service} reviewType="SERVICE" />
                        <Flex display={["flex", "flex", "none"]} w={"full"} h={"200px"} />
                    </Flex>
                </Flex>
                <CreateBookingModal show={show} onClose={() => setShow(false)} service={service} />
                <ShareLoginModal id={service?.id} type="SERVICE" />
            </Flex>
        </LoadingAnimation>
    )
}