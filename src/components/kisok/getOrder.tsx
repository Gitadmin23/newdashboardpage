import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import React from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import { IOrder, IProduct } from '@/models/product';
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { formatNumber } from '@/utils/numberFormat';
import { LocationStroke } from '../svg';
import CustomButton from '../general/Button';
import { textLimit } from '@/utils/textlimit';
import { IMAGE_URL } from '@/services/urls';
import { dateFormat } from '@/utils/dateFormat';
import ProductImageScroller from '../sharedComponent/productImageScroller';

export default function GetOrder() {

    const { primaryColor, mainBackgroundColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/orders/search?userId=${userId}`, limit: 20, filter: "id", name: "getOrder" })

    console.log(results);

    const clickHandler = (item: string) => {
        push("/dashboard/kisok/details-order/" + item)
    }

    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["4", "4", "6"]} >
                {results?.map((item: IOrder, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex as={"button"} ref={ref} flexDir={"column"} onClick={() => clickHandler(item?.id)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} >
                                <ProductImageScroller images={item?.product?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.user} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.product?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.product?.name), 16)}</Text> 
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={["14px", "14px", "14px"]} fontWeight={"400"} >Order On {dateFormat(item?.createdDate)}</Text> 
                                    </Flex> 
                                </Flex>
                                <Flex as={"button"} onClick={() => clickHandler(item?.id)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                    {"View Details"}
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return ( 
                            <Flex as={"button"} flexDir={"column"} onClick={() => clickHandler(item?.id)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} >
                                <ProductImageScroller images={item?.product?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.user} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.product?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.product?.name), 16)}</Text> 
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={["14px", "14px", "14px"]} fontWeight={"400"} >Order On {dateFormat(item?.createdDate)}</Text> 
                                    </Flex> 
                                </Flex>
                                <Flex as={"button"} onClick={() => clickHandler(item?.id)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                    {"View Details"}
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}
