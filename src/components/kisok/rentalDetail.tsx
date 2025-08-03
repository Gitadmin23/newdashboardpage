"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Grid, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IRental, IReview } from '@/models/product'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { IMAGE_URL } from '@/services/urls'
import UserImage from '../sharedComponent/userimage'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegStar, FaStar } from 'react-icons/fa'
import RentalCheckout from './rentalCheckout'
import ProductRating from './productRating'
import DescriptionPage from '../sharedComponent/descriptionPage'
import CustomButton from '../general/Button'
import { CalendarIcon } from '../svg'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import EventMap from '../event_details_component/event_map_info'
import { IoIosArrowForward } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import GetCreatorData from './getCreatorData'
import ShareEvent from '../sharedComponent/share_event'
import { textLimit } from '@/utils/textlimit'
import ShareLoginModal from '../sharedComponent/shareLoginModal'


export default function RentalDetail({ id }: { id: string }) {


    const { primaryColor, borderColor, secondaryBackgroundColor } = useCustomTheme()
    const [qty, setQty] = useState(1)
    const [item, setItem] = useState({} as IRental)

    const { push } = useRouter()

    const { isLoading, isRefetching, refetch, data } = useQuery(
        ["rental", id],
        () => httpService.get(`/rental/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            console.log(data?.data?.content[0]);
            setItem(data?.data?.content[0])
        }
    }
    );
    
    const [reviewData, setData] = useState<Array<IReview>>([]) 
    
    let token = localStorage.getItem("token")

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} flexDir={"column"} pos={"relative"} gap={"3"} overflowY={"auto"} h={"full"} px={["4", "4", "6"]} pb={["400px", "400px", "6"]} py={"6"} >

                <Flex gap={"1"} alignItems={"center"} pb={"3"} >
                    <Text role='button' onClick={() => push("/dashboard/product/kiosk?type=rental")} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >Rental details</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >{item?.name}</Text>
                </Flex>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >

                    {item?.images?.length > 0 && (
                        <Flex w={"full"} h={["340px", "340px", "620px"]} pos={"relative"} borderWidth={"1px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"8px"} p={["1", "1", "3"]} >
                            <Image src={IMAGE_URL + item?.images[0]} alt='logo' rounded={"8px"} height={"full"} objectFit={"contain"} />
                            <Grid templateColumns={["repeat(3, 1fr)"]} pos={"absolute"} gap={"3"} insetX={"4"} bottom={"4"} >
                                {item?.images?.map((subitem: string, index: number) => {
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
                    )}
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontWeight={"700"} fontSize={["16px", "16px", "24px"]} >{capitalizeFLetter(item?.name)}</Text>
                            <Text>Phone Number: {item?.creator?.data?.mobilePhone?.value}</Text>
                            {/* <Flex w={"8"} h={"8"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"full"} > 
                                <ShareEvent newbtn={true} showText={false} data={item} name={item?.name} id={item?.id} type="RENTAL" eventName={textLimit(item?.name, 17)} />
                            </Flex> */}
                        </Flex>
                        <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                            <DescriptionPage limit={200} label='Rental Details' description={item?.description} />
                            <Flex w={"full"} gap={"2"}>
                                <Flex w={["fit-content", "fit-content", "full"]} >
                                    <GetCreatorData reviewdata={reviewData} userData={item?.creator} item={item?.rating} />
                                </Flex>
                                <Flex display={["flex", "flex", "none"]} w={"full"}  >
                                    <RentalCheckout setQty={setQty} item={item} qty={qty} />
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex gap={"2"} alignItems={"center"}>
                            <Text fontWeight={"600"} fontSize={"14px"} w={"60px"} >Joined</Text>
                            <CalendarIcon color={primaryColor} />
                            <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(item?.createdDate)} {timeFormat(item?.createdDate)}</Text>
                        </Flex>
                        <Flex w={"full"} justifyContent={"end"} >
                            <Flex maxW={"600px"} display={["none", "none", "flex"]}  >
                                <RentalCheckout setQty={setQty} item={item} qty={qty} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={"3"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"}  >
                        <EventMap latlng={item?.location?.latlng} />
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} >
                        {token && (
                            <ProductRating data={reviewData} setData={setData} item={item} reviewType="RENTAL" />
                        )}
                        <Flex display={["flex", "flex", "none"]} w={"full"} h={"200px"} />
                    </Flex>
                </Flex>
                <ShareLoginModal id={item?.id} type="RENTAL" />
            </Flex>
        </LoadingAnimation>
    )
}
