import CustomButton from '@/components/general/Button'
import { Flex, HStack, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ConfirmPayment from '../confirmPayment'
import { IReceipt } from '@/models/product'
import { IoIosClose } from 'react-icons/io'
import UserImage from '@/components/sharedComponent/userimage'
import useCustomTheme from '@/hooks/useTheme'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { dateFormat } from '@/utils/dateFormat'
import { formatNumber } from '@/utils/numberFormat'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { IMAGE_URL } from '@/services/urls'

interface IAction {
    value: number;
    type: 'ADDITION' | 'SUBSTRACTION',
}

export default function Reciept({ detail, setOpen, userId, price, handlePriceChange, updateHandler, updateReciptPrice, payForTicket, reject, updateRecipt }: { detail: IReceipt, setOpen: any, userId: string, price: any, handlePriceChange: any, updateHandler: any, updateReciptPrice: any, payForTicket: any, reject: any, updateRecipt: any }) {

    const { mainBackgroundColor, secondaryBackgroundColor, primaryColor, borderColor } = useCustomTheme()
    const [textSize, setTextSize] = useState(40)

    const [status, setStatus] = useState("")

    let InitialPrice = detail?.durationFrequency === "DAILY" ? detail?.rental?.dailyPrice : detail?.durationFrequency === "HOURLY" ? detail?.rental?.hourlyPrice : detail?.rental?.price

    return (
        <Flex flexDir={"column"} p={"4"} gap={"4"} fontSize={"14px"}  >
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"500"} >e-invoice</Text>
                <IoIosClose onClick={() => setOpen(false)} size={"30px"} />
            </Flex>
            <Flex w={"full"} gap={"4"} flexDir={["column", "column", "column"]} >
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={["full", "full", "fit-content"]} >
                        <Flex flexDir={"column"} gap={"2"} w={["full", "full", "218px"]} >
                            <Flex w={["full", "full", "218px"]} h={"157px"} rounded={"8px"} bgColor={"#00000066"} position={"relative"} justifyContent={"center"} alignItems={"center"} >

                                {detail?.createdBy?.userId === userId && (
                                    <Flex w={"fit-content"} h={"fit-content"} p={"6px"} pr={"5"} rounded={"24px"} pos={"absolute"} top={"3"} left={"3"} borderColor={mainBackgroundColor} borderWidth={"1px"} alignItems={"center"} gap={2} zIndex={"20"} >
                                        <UserImage image={detail?.vendor?.data?.imgMain?.value} font={"16px"} data={detail?.vendor} border={"1px"} size={"32px"} />
                                        <Flex flexDir={"column"} alignItems={"start"} color={mainBackgroundColor} >
                                            <Text fontSize={"12px"} fontWeight={"700"} >
                                                {capitalizeFLetter(detail?.vendor?.firstName) + " " + capitalizeFLetter(detail?.vendor?.lastName)}
                                            </Text>
                                            <Text fontSize={"10px"} color={mainBackgroundColor} fontWeight={"600"} >
                                                Vendor
                                            </Text>
                                        </Flex>
                                    </Flex>
                                )}

                                {detail?.createdBy?.userId !== userId && (
                                    <Flex w={"fit-content"} h={"fit-content"} p={"6px"} pr={"5"} rounded={"24px"} pos={"absolute"} top={"3"} left={"3"} borderColor={mainBackgroundColor} borderWidth={"1px"} alignItems={"center"} gap={2} zIndex={"20"} >
                                        <UserImage image={detail?.createdBy?.data?.imgMain?.value} font={"16px"} data={detail?.createdBy} border={"1px"} size={"32px"} />
                                        <Flex flexDir={"column"} alignItems={"start"} color={mainBackgroundColor} >
                                            <Text fontSize={"12px"} fontWeight={"700"} >
                                                {capitalizeFLetter(detail?.createdBy?.firstName) + " " + capitalizeFLetter(detail?.createdBy?.lastName)}
                                            </Text>
                                            <Text fontSize={"10px"} color={mainBackgroundColor} fontWeight={"600"} >
                                                Client
                                            </Text>
                                        </Flex>
                                    </Flex>
                                )}
                                <Flex pos={"absolute"} inset={"0px"} bgColor={"black"} opacity={"20%"} zIndex={"10"} rounded={"8px"} />
                                <Image borderColor={"#D0D4EB"} objectFit={"cover"} alt={detail?.rental?.images[0]} w={["full", "full", "218px"]} h={"157px"} rounded={"8px"} src={detail?.rental?.images[0].startsWith('https://') ? detail?.rental?.images[0] : (IMAGE_URL as string) + detail?.rental?.images[0]} />
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex flexDir={"column"} gap={"2"} w={"full"} >
                        <Flex flexDir={"row"} gap={"1"} w={"fit-content"} alignItems={"center"} >
                            <Text fontWeight={400} fontSize={'12px'}>Reciept ID:</Text>
                            <Text fontWeight={400} fontSize={'12px'} bgColor={secondaryBackgroundColor} p={"2px"} rounded={"8px"} px={"4px"} >{detail?.id}</Text>
                        </Flex>
                        {detail?.createdBy?.userId === userId && (
                            <Flex gap={"2"} flexDir={"column"} >
                                <Flex justifyContent={["start", "start"]} w={"full"} flexDir={["column", "column", "column"]} >
                                    <Text fontWeight={500} fontSize={'12px'}>Vendor Name:</Text>
                                    <Text fontSize={"16px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(detail?.vendor?.firstName) + " " + capitalizeFLetter(detail?.vendor?.lastName), textSize)}</Text>
                                </Flex>
                                <Flex gap={"1"} flexDir={"column"} >
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Email:</Text>
                                        <Text fontSize={'14px'}>{detail?.vendor?.email}</Text>
                                    </HStack>

                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Phone:</Text>
                                        <Text fontSize={'14px'}>{detail?.vendor?.data?.mobilePhone?.value ? detail?.vendor?.data?.mobilePhone?.value : 'None'}</Text>
                                    </HStack>
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Start Date:</Text>
                                        <Text fontSize={'14px'}>{dateFormat(detail?.startDate?.millis)}</Text>
                                    </HStack>
                                </Flex>
                            </Flex>
                        )}
                        {detail?.createdBy?.userId !== userId && (
                            <Flex gap={"2"} flexDir={"column"} >
                                <Flex justifyContent={["start", "start"]} w={"full"} flexDir={["column", "column", "column"]} >
                                    <Text fontWeight={500} fontSize={'12px'}>Customer Name:</Text>
                                    <Text fontSize={"16px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(detail?.createdBy?.firstName) + " " + capitalizeFLetter(detail?.createdBy?.lastName), textSize)}</Text>
                                </Flex>
                                <Flex gap={"1"} flexDir={"column"} >
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Email:</Text>
                                        <Text fontSize={'14px'}>{detail?.createdBy?.email}</Text>
                                    </HStack>

                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Phone:</Text>
                                        <Text fontSize={'14px'}>{detail?.createdBy?.data?.mobilePhone?.value ? detail?.createdBy?.data?.mobilePhone?.value : 'None'}</Text>
                                    </HStack>
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Start Date:</Text>
                                        <Text fontSize={'14px'}>{dateFormat(detail?.startDate?.millis)}</Text>
                                    </HStack>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <Flex w={"full"} mt={"2"} flexDir={["column", "column", "row"]} gap={"4"} >
                    <Flex w={"fit-content"} >
                        <Flex flexDir={"column"} gap={"1"} w={"218px"} >
                            <Flex justifyContent={["start", "start", "space-between"]} w={"full"} p={"5px"} rounded={"8px"} bgColor={secondaryBackgroundColor} flexDir={["column", "column", "column"]} >
                                <Text fontWeight={400} fontSize={'12px'}>Rental Details:</Text>
                                <Text fontSize={"12px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(detail?.rental?.description), textSize)}<span role='button' style={{ color: primaryColor, fontSize: "12px", fontWeight: "600" }} onClick={() => setTextSize((prev) => prev === 40 ? detail?.rental?.description?.length + 1 : 40)} >{detail?.rental?.description?.length > 40 ? (textSize < detail?.rental?.description?.length ? "show more" : "show less") : ""}</span></Text>
                            </Flex>
                            <Flex justifyContent={["start", "start", "start"]} alignItems={"center"} w={"full"} flexDir={["row", "row", "row"]} gap={"1"} >
                                <Text fontWeight={400} fontSize={'12px'}>Duration Of Rental:</Text>
                                <Text fontSize={"14px"} fontWeight={"600"} >{detail?.frequency} <span style={{ fontSize: "12px", fontWeight: "500" }} >{(detail?.rental?.frequency === "DAILY" || detail?.durationFrequency === "DAILY") ? (detail?.frequency > 1 ? "days" : "day") : (detail?.frequency > 1 ? "hours" : "hour")}</span></Text>
                            </Flex>
                            <Flex justifyContent={["start", "start", "start"]} alignItems={"center"} w={"full"} flexDir={["row", "row", "row"]} gap={"1"} >
                                <Text fontWeight={400} fontSize={'12px'}>Rental Initial Price:</Text>
                                <Flex pos={"relative"}  >
                                    {((InitialPrice * detail?.frequency) !== InitialPrice) && (
                                        <Flex w={"full"} h={"1.5px"} pos={"absolute"} top={"11px"} bgColor={"black"} />
                                    )}
                                    <Text fontSize={"14px"} fontWeight={"600"} textDecor={""} >{formatNumber(InitialPrice * detail?.frequency)}</Text>
                                </Flex>
                                {((InitialPrice * detail?.frequency) !== InitialPrice) && (
                                    <Text fontSize={"12px"} fontWeight={"500"}  >{(InitialPrice * detail?.frequency) > InitialPrice ? "by" : "discount of"} {((((InitialPrice) - (detail?.price / detail?.frequency)) * 100) / InitialPrice)?.toFixed(0)?.replaceAll("-", "")}%</Text>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"4"} >
                        {(!detail?.hasPaid && detail?.rental?.createdBy !== userId) && (
                            <Flex w={"full"} flexDir={"column"} gap={"2"} >
                                <Text fontSize={'14px'}>You can neogiate this price by 5%</Text>
                                <Flex w={"full"} mt='10px' justifyContent={"space-between"} alignItems="center">
                                    <HStack width={'120px'} height={'35px'} borderRadius={'50px'} overflow={'hidden'} backgroundColor={'#DDE2E6'}>
                                        <Flex onClick={() => handlePriceChange({ type: 'SUBSTRACTION', value: 0 })} cursor={'pointer'} w={"full"} height={'100%'} borderRightWidth={'1px'} borderRightColor={'gray'} justifyContent={'center'} alignItems={'center'}>
                                            <FiMinus size={12} color='black' />
                                        </Flex>
                                        <Flex onClick={() => handlePriceChange({ type: 'ADDITION', value: 0 })} cursor={'pointer'} w={"full"} height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                            <FiPlus size={12} color='black' />
                                        </Flex>
                                    </HStack>
                                    <CustomButton fontSize={"sm"} disable={detail?.price === Number(price)} isLoading={updateReciptPrice?.isLoading} onClick={() => updateReciptPrice.mutate({
                                        payload: {
                                            price: price
                                        },
                                        id: detail?.id
                                    })} text={"Update Price"} borderRadius={"99px"} width={"150px"} />
                                </Flex>
                            </Flex>
                        )}
                        <Flex flexDir={["row", "row"]} justifyContent={["start", "start", 'end']} gap={"5"} mt={"auto"} w='full' alignItems={'center'}>
                            <Text fontSize={'14px'}>Total Price:</Text>
                            <Text fontSize={'23px'} fontWeight={700}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format((Number(price)) || 0)}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex flexDir={"column"} gap={"2"} >
                    <Text fontWeight={"600"} >Shipped To :  <span style={{ fontWeight: "500" }} >{detail?.address?.location?.locationDetails}</span></Text>
                    {/* <Text fontWeight={"600"} >State: <span style={{ fontWeight: "500" }} >{detail?.address?.state}</span></Text> */}
                </Flex>
                {((detail?.rental?.createdBy !== userId) && (detail?.approvalStatus === "ACCEPTED") && (!detail?.hasPaid)) && (
                    <Flex gap={"2"} >
                        <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                        <CustomButton isLoading={payForTicket?.isLoading} onClick={() => payForTicket.mutate({
                            seller: detail?.rental?.createdBy,
                            price: Number(detail?.price),
                            currency: 'NGN',
                            orderType: "RECEIPT",
                            typeID: detail?.id
                        })} fontSize={"sm"} text={"Make Payment"} borderRadius={"99px"} width={"150px"} />
                    </Flex>
                )}

                {(detail?.approvalStatus === "ACCEPTED" && (detail?.hasPaid) && (detail?.hasReceived)) && (
                    <Flex gap={"2"} >
                        <CustomButton disable={true} fontSize={"sm"} text={"Completed"} borderRadius={"99px"} width={"150px"} />
                    </Flex>
                )}
                {(detail?.approvalStatus === "ACCEPTED" && (detail?.hasPaid) && (!detail?.hasReceived)) && (
                    <Flex gap={"2"} >
                        <ConfirmPayment productId={detail?.rental?.id} id={detail?.id} type={"RENTAL"} name={detail?.rental?.name} image={IMAGE_URL + detail?.rental?.images[0]} vendor={detail?.vendor} />
                    </Flex>
                )}
                {(detail?.approvalStatus === "PENDING" && detail?.rental?.createdBy !== userId) && (
                    <Flex gap={"2"} >
                        {(!detail?.hasPaid) && (
                            <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                        )}
                        <CustomButton fontSize={"sm"} text={"Pending Approval"} borderRadius={"99px"} width={"150px"} backgroundColor={"#FF9500"} />
                    </Flex>
                )}
                {(detail?.approvalStatus === "ACCEPTED" && (!detail?.hasPaid || !detail?.hasReceived) && detail?.rental?.createdBy === userId) && (
                    <Flex gap={"2"} >
                        {(!detail?.hasPaid) && (
                            <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                        )}
                        <CustomButton fontSize={"sm"} text={"Pending Confirmation "} borderRadius={"99px"} width={"200px"} backgroundColor={"#FF9500"} />
                    </Flex>
                )}
                {(detail?.rental?.createdBy === userId && detail?.approvalStatus !== "ACCEPTED" && detail?.approvalStatus !== "CANCELLED") && (
                    <Flex gap={"2"} >
                        <CustomButton fontSize={"sm"} isLoading={updateRecipt?.isLoading && status === "ACCEPTED"} onClick={() => updateHandler("ACCEPTED")} text={"Accept"} borderRadius={"99px"} width={"150px"} />
                        {(!detail?.hasPaid) && (
                            <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Cancel"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={mainBackgroundColor} color={"#FE0909"} width={"150px"} />
                        )}
                    </Flex>
                )}
                {detail?.approvalStatus === "CANCELLED" && (
                    <CustomButton fontSize={"sm"} disable={true} onClick={() => updateHandler("CANCELLED")} text={"Cancelled"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={"#FE0909"} color={"#FFF"} width={"250px"} />
                )}
            </Flex>
        </Flex>
    )
}
