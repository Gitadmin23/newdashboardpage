"use client"
import React, { useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Image, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IOrder } from '@/models/product';
import { useRouter } from 'next/navigation';
import { dateFormat } from '@/utils/dateFormat';
import { numberFormat, numberFormatNaire } from '@/utils/formatNumberWithK';
import { formatNumber } from '@/utils/numberFormat';
import { IMAGE_URL } from '@/services/urls';
import UserImage from '../sharedComponent/userimage';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { SheildIcon, TruckColoredIcon } from '../svg';
import { IoArrowBack, IoStar } from 'react-icons/io5';
import { textLimit } from '@/utils/textlimit';
import useCustomTheme from '@/hooks/useTheme';
import EventMap from '../event_details_component/event_map_info';
import ConfirmPayment from './confirmPayment';
import CustomButton from '../general/Button';
import useProduct from '@/hooks/useProduct';
import Fundpaystack from '../settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';

export default function OrderDetail({ id }: { id: string }) {
    const [item, setItem] = useState({} as IOrder)

    const { push } = useRouter()

    const userId = localStorage.getItem('user_id') + "";
    const { secondaryBackgroundColor, headerTextColor } = useCustomTheme()
    const [sizeOfText, setSizeOfText] = useState(200)

    const { payForTicket, dataID, message, configPaystack, setPaystackConfig } = useProduct()


    const { isLoading } = useQuery(
        ["order", id],
        () => httpService.get(`/orders/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            setItem(data?.data?.content[0])
        }
    });

    const [size, setSize] = useState(100)

    console.log(item);

    const clickHandler = () => {
        payForTicket?.mutate({
            seller: item?.vendor?.userId,
            price: Number(item?.total),
            currency: "NGN",
            orderType: "ORDERS",
            typeID: item?.id
        })
    }


    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} px={"6"} pt={["6", "6", "6", "6"]} pb={"12"} gap={["4", "4", "6"]} flexDir={"column"} overflowY={"auto"} overflowX={"hidden"} >

                <Flex w={"full"} gap={"2"} flexDir={["column"]} >
                    <Flex gap={"3"} alignItems={"center"} >
                        <Flex as={"button"} onClick={() => push("/dashboard/product/kiosk?type=kiosk")} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} zIndex={"30"} left={"4"}  >
                            <IoArrowBack size={"20px"} color={headerTextColor} />
                        </Flex>
                        <Text fontWeight={"500"} >Order Details</Text>
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={["4"]} py={"4"} flexDir={["column", "column", "row"]} borderBottomWidth={"1px"} borderTopWidth={["0px", "0px", "1px"]} >
                    <Flex alignItems={"center"} flexDir={["column", "column", "row"]} w={"full"} gap={"3"}  >
                        <Flex w={"full"} h={["140px", "140px", "211px"]} >
                            <Image w={"full"} h={"full"} objectFit={"contain"} rounded={"12px"} src={IMAGE_URL + item?.product?.images[0]} alt='image' />
                        </Flex>
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontSize={["14px", "14px", "20px"]} fontWeight={"500"} >{capitalizeFLetter(item?.product?.name)}</Text>
                            <Flex w={"full"} justifyContent={"space-between"} >
                                <Text fontSize={"14px"} fontWeight={"700"} >{formatNumber(item?.product?.price)}</Text>
                                <Text fontSize={"12px"} fontWeight={"500"} >Order Date: {dateFormat(item?.createdDate)}</Text>
                            </Flex>
                            <Text fontSize={"12px"} fontWeight={"500"}>Bought {item?.quantity} Item{item?.quantity <= 1 ? "" : "s"}</Text>
                            <Flex w={"full"} gap={["0px", "0px", "8"]} justifyContent={["space-between", "space-between", "start"]} flexDir={["row-reverse", "row-reverse", "column"]} >
                                <Flex alignItems={"center"} gap={"1"} >
                                    <Text fontSize={["12px", "12px", "14px"]} >Item Reviews</Text>
                                    <IoStar size={"20px"} />
                                    <Text fontSize={["14px", "14px", "16px"]} fontWeight={"500"} >{item?.product?.rating}</Text>
                                </Flex>
                                <Flex alignItems={"center"} gap={2} >
                                    <UserImage image={item?.user?.data?.imgMain?.value} font={"16px"} data={item?.user} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"}>
                                        <Text fontSize={"12px"} >order by</Text>
                                        <Text fontSize={"14px"}>
                                            {capitalizeFLetter(item?.user?.firstName) + " " + capitalizeFLetter(item?.user?.lastName)}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex justifyContent={"center"} w={"full"} pl={["0px", "0px", 4]} borderLeftWidth={["0px", "0px", "1px"]} flexDir={"column"} gap={"2"} >
                        <Flex bgColor={secondaryBackgroundColor} p={"4"} rounded={"16px"} flexDirection={"column"} gap={"1"} >
                            <Text fontSize={"14px"} fontWeight={"700"} >Product  Description</Text>
                            <Text fontSize={"12px"} >{textLimit(item?.product?.description, sizeOfText)} {item?.product?.description?.length > sizeOfText && (<span style={{ fontWeight: "700" }} role='button' onClick={() => setSizeOfText((prev) => prev === item?.product?.description?.length ? 200 : item?.product?.description?.length)} >{item?.product?.description?.length === sizeOfText ? "less" : "more"}</span>)}</Text>
                        </Flex>
                        <Flex flexDir={"column"} gap={"2"} display={item?.paymentStatus === "PENDING" ? "none" : "flex"} >
                            <Text fontSize={["14px"]} fontWeight={"600"} >Payment Method</Text>
                            <Text fontWeight={"500"} fontSize={"14px"} >Items total: {formatNumber(item?.total)}</Text>
                            <Text fontWeight={"500"} fontSize={"14px"} >Service Fees: {formatNumber(item?.total * 0.03)}</Text>
                            <Text fontWeight={"600"} fontSize={"16px"} >Total: {formatNumber(item?.total + (item?.total * 0.03))}</Text>
                        </Flex>
                        {(item?.paymentStatus === "PENDING" && item?.vendor?.userId !== userId) && (
                            <CustomButton onClick={clickHandler} borderRadius={"999px"} mt={"3"} fontSize={"14px"} text={"Make Payment"} px={"4"} width={"fit-content"} />
                        )}
                        {(item?.paymentStatus === "PENDING" && item?.vendor?.userId === userId) && ( 
                            <CustomButton fontSize={"sm"} text={"Awaiting Payment"} borderRadius={"99px"} width={"200px"} backgroundColor={"#FF9500"} />
                        )}
                    </Flex>
                </Flex>
                <Flex w={"full"} flexDirection={"column"} gap={"4"} py={["0px", "0px", "4"]} >
                    <Text fontSize={["16px", "16px", "24px"]} fontWeight={"semibold"} >Delivery Information</Text>
                    <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontWeight={"500"} fontSize={["14px", "14px", "16px"]} >Phone Number: {item?.address?.phone}</Text>
                            <Text fontWeight={"500"} fontSize={["14px", "14px", "16px"]} >Address: {item?.address?.location?.locationDetails}</Text>
                            <EventMap height={"212px"} latlng={item?.address?.location?.latlng} />
                        </Flex>
                        <Flex w={"full"} flexDir={"column"} gap={"3"} alignItems={"start"} >
                            <Flex gap={"3"} >
                                <Flex w={"28px"} h={"28px"} justifyContent={"center"} alignItems={"center"} >
                                    <TruckColoredIcon />
                                </Flex>
                                <Text color={"#0CC23A"} fontWeight={"600"} >Shipping on all orders:</Text>
                            </Flex>
                            <Flex flexDir={"column"} gap={"3"} >
                                <Text fontSize={"14px"} fontWeight={"500"} >{`Seller-Fulfilled Shipping - The seller handles the entire shipping process and not Chasescroll.`}</Text>
                                <Text fontSize={"14px"} fontWeight={"500"} >Verify that items are in good condition and meet the expected quality standards before authorizing payment.</Text>
                                <Text fontSize={"14px"} fontWeight={"500"} >Please inform us if you encounter any issues at support@chasescroll.com</Text>
                            </Flex>
                            {item?.paymentStatus !== "PENDING" && (
                                <ConfirmPayment hasConfirm={item?.hasReceived} productId={item?.product?.id} vendor={item?.vendor} id={item?.id} image={IMAGE_URL + item?.product?.images[0]} type={"PRODUCT"} name={item?.product?.name} />
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Fundpaystack id={item?.id} config={configPaystack} setConfig={setPaystackConfig} message={message} />
        </LoadingAnimation>
    )
}