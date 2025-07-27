import CustomButton from '@/components/general/Button'
import CopyRightText from '@/components/sharedComponent/CopyRightText'
import CopyButtton from '@/components/sharedComponent/copy_btn'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventPrice from '@/components/sharedComponent/event_price'
import EventImage from '@/components/sharedComponent/eventimage'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import UserImage from '@/components/sharedComponent/userimage'
import { CaretLeftIcon, DownloadIcon, DownloadTwoIcon } from '@/components/svg'
import { URLS } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat'
import { textLimit } from '@/utils/textlimit'
import { Box, Flex, Image, Text, useColorMode, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import Barcode from "react-barcode"
import { BsChevronLeft } from 'react-icons/bs'
import { IoArrowBack, IoClose } from 'react-icons/io5'
import QRCode from 'react-qr-code'
import { useQuery } from 'react-query'
import { useReactToPrint } from "react-to-print";
import useCustomTheme from "@/hooks/useTheme";
import { IoIosArrowDropleft, IoMdReturnLeft } from 'react-icons/io'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Props {
    click: any,
    data: any,
    user_index?: any
}

function ViewTicket(props: Props) {
    const {
        click,
        // datainfo,
        data,
        user_index
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        ticketBackgroundColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const toast = useToast()

    const componentRef: any = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });


    // userName={ticketDetails?.createdBy?.firstName + " " + ticketDetails?.createdBy?.lastName}
    // date={ticketDetails?.event?.startDate}
    // time={ticketDetails?.event?.startDate}
    // ticketFee={ticketDetails?.ticketType === "Free"
    //     ? "Free"
    //     : ticketDetails?.boughtPrice
    // }
    // orderId={ticketDetails?.id}
    // length={ticketLenght}
    // currency={ticketDetails?.event?.currency}
    // location={ticketDetails?.event?.locationDetails} 

    const [datainfo, setTicketDetails] = useState({} as any)
    const [dataMultiple, setDataMultiple] = useState([] as any)
    const [length, setTicketLenght] = useState("" as any)

    let userId = sessionStorage?.getItem("user_id") + ""

    console.log(dataMultiple);




    const { isLoading } = useQuery(['event_ticket', data?.id, userId], () => httpService.get(`/events/get-users-tickets?userID=${user_index ? user_index : userId}&eventID=${data?.id}`), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
                position: 'top-right',
            });
        },
        onSuccess: (data) => {
            setTicketLenght(data?.data?.content?.length)
            setTicketDetails(data?.data?.content[0]);
            setDataMultiple(data?.data?.content)
        }
    })


    const checkEventDay = (item: any) => {
        return (new Date(item[item?.length - 1])?.getDate() >= new Date(datainfo?.event?.startDate)?.getDate()) && (new Date(item[item?.length - 1])?.getDate() <= new Date(datainfo?.event?.endDate)?.getDate())
    }



    const isToDay = (item: any) => {

        return (new Date()?.getDate() === new Date(item)?.getDate() || new Date(datainfo?.endDate)?.getDate() === new Date(item)?.getDate())
    }

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex p={"4"} shadow={"lg"} position={"relative"} flexDirection={"column"} bg={mainBackgroundColor} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} px={"2"} gap={"2"} >
                <Flex bg={mainBackgroundColor} maxW={["750px"]} display={["none", "none", "flex"]} position={"relative"} gap={"4"} px={"4"} mb={"2"} width={"full"} justifyContent={"space-between"} alignItems={"center"} >

                    <Box display={["none", "none", "flex"]} zIndex={"10"} onClick={click} as='button' >
                        <IoClose size={"30px"} />
                    </Box>
                    <Flex pos={"absolute"} display={["none", "none", "flex"]} w={"full"} justifyContent={"center"} >
                        <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                    </Flex>
                    {/* <Box as='button' pos={"relative"} zIndex={"10"} onClick={handlePrint} display={["block", "block", "none"]}>
                        <DownloadTwoIcon />
                    </Box> */}
                    <Box display={["none", "none", "block"]} >
                        <CustomButton width={"fit-content"} backgroundColor={"#3EC259"} color={"#FFF"} borderRadius={"full"} onClick={handlePrint} text='Download Ticket' />
                    </Box>
                </Flex>
                <Box pos={"absolute"} top={"2"} left={"2"} p={"1"} bgColor={mainBackgroundColor} rounded={"full"} display={["flex", "flex", "none"]} zIndex={"10"} onClick={click} as='button' >
                    <IoClose size={"25px"} />
                </Box>
                <Box bg={mainBackgroundColor} display={["none", "none", "block"]} >
                    <Flex ref={componentRef} width={"full"} flexDirection={"column"} alignItems={"center"} gap={"4"} px={["4", "4", "0px"]} >

                        {dataMultiple?.map((item: { id: string, scanTimeStamp: any }, index: number) => {

                            return (
                                <Flex key={index} maxW={["750px"]} w={["fit-content"]} flexDir={["row"]} rounded={"16px"} pb={"4"} p={["4"]} bg={index === 0 ? secondaryBackgroundColor : ticketBackgroundColor} alignItems={["center"]} justifyContent={"center"} gap={"4"} >
                                    <Flex w={["fit-content"]} gap={"4"} >
                                        <EventImage width={["201px"]} height={["201px"]} data={datainfo?.event} />
                                    </Flex>
                                    <Flex flexDir={"column"} pos={"relative"} gap={"4"} px={["4", "4", "0px"]} >
                                        <Text fontSize={"24px"} lineHeight={"18px"} fontWeight={"bold"} >{capitalizeFLetter(textLimit(datainfo?.event?.eventName, 20))}</Text>
                                        {/* {(checkEventDay(datainfo?.scanTimeStamp[datainfo?.scanTimeStamp?.length - 1]) || isToDay(datainfo?.scanTimeStamp[datainfo?.scanTimeStamp?.length - 1])) && (
                                            <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'50px'} right={"0"} bg={'transparent'}>
                                                <Image src={'/assets/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                            </Box>
                                        )} */}
                                        {isToDay(item?.scanTimeStamp ? item?.scanTimeStamp[item?.scanTimeStamp?.length - 1] : "") && (
                                            <>
                                                {(checkEventDay(item?.scanTimeStamp)) && (
                                                    <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'50px'} right={"0"} bg={'transparent'}>
                                                        <Image src={'/assets/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                                    </Box>
                                                )}
                                            </>
                                        )}
                                        <Flex gap={"4"} alignItems={"center"} >
                                            <Flex border={`0.5px solid ${index === 0 ? bodyTextColor : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={colorMode === 'light' ? "#5B5858" : bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                {dateFormat(datainfo?.event?.startDate)}
                                            </Flex>
                                            <Flex border={`0.5px solid ${index === 0 ? bodyTextColor : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={colorMode === 'light' ? "#5B5858" : bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                {timeFormat(datainfo?.event?.startDate)}
                                            </Flex>
                                        </Flex>
                                        <Flex gap={"4"} >

                                            <Flex flexDirection={"column"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{textLimit(item?.id, 7)}</Text>
                                            </Flex>
                                            <Flex flexDirection={"column"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                    <EventPrice minPrice={datainfo?.boughtPrice} maxPrice={datainfo?.boughtPrice} currency={datainfo?.event?.currency} />
                                                </Text>
                                            </Flex>
                                            <Flex flexDirection={"column"} alignItems={"center"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Quantity</Text>
                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{dataMultiple?.length}</Text>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={"4"} fontSize={"xs"} >

                                            <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                            <Flex flexDirection={"column"} gap={"2"} >
                                                <Text fontWeight={"bold"} color={headerTextColor} >Name</Text>
                                                <Text color={bodyTextColor} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex gap={"1"} borderLeft={["1px dashed black"]} w={["fit-content"]} alignItems={"center"} border={""} pl={["4"]} flexDir={"column"} >
                                        <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                            <QRCode
                                                style={{ height: "200px", width: "200px", zIndex: 20 }}
                                                value={item?.id}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </Box>
                                        <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                                    </Flex>
                                </Flex>
                            )
                        }
                        )}
                    </Flex>
                </Box>

                {dataMultiple?.length > 1 && (
                    <Flex w={"full"} top={"200px"} position={"absolute"}  display={["flex", "flex", "none"]} zIndex={"1000"} justifyContent={"space-between"} gap={"4"} px={"2"} >
                        <Flex onClick={() => scroll(-400)} as="button" position={"relative"} bgColor={mainBackgroundColor} w={"40px"} h={"40px"} borderWidth={"1px"} borderColor={bodyTextColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} >
                            <FaChevronLeft color={bodyTextColor} />
                        </Flex>
                        <Flex onClick={() => scroll(400)} as="button" bgColor={mainBackgroundColor} w={"40px"} h={"40px"} borderWidth={"1px"} borderColor={bodyTextColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} >
                            <FaChevronRight color={bodyTextColor} />
                        </Flex>
                    </Flex>
                )}

                <Flex ref={ref} position={"relative"} width={"full"} display={["flex", "flex", "none"]} sx={
                    {
                        '::-webkit-scrollbar': {
                            display: 'none',
                            scrollBehavior: "smooth"
                        }
                    }
                } flexDirection={"row"} overflowX={"auto"} alignItems={"center"} gap={"4"} px={["1", "1", "0px"]} >
                    <Flex width={"fit-content"} gap={"6"} >
                        {dataMultiple?.map((item: { id: string, scanTimeStamp: any }, index: number) => {
                            return (
                                <Flex key={index} w={["330px", "330px", "750px"]} flexDir={["column", "column", "row"]} rounded={"16px"} pb={"4"} pt={["4"]} p={["0px", "", "4"]} bg={index === 0 ? secondaryBackgroundColor : ticketBackgroundColor} alignItems={["start", "start", "center"]} justifyContent={"center"} >
                                    <Flex width={"full"} justifyContent={"space-between"} pos={"relative"} px={"4"} pt={"4"} >
                                        <Flex pos={"absolute"} width={"full"} pr={"6"} justifyContent={"center"} >
                                            <Text fontSize={"16px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                                        </Flex>
                                        <Box ml={"auto"} as='button' pos={"relative"} zIndex={"10"} onClick={handlePrint} display={["block", "block", "none"]}>
                                            <DownloadTwoIcon />
                                        </Box>
                                    </Flex>
                                    <Flex pos={"relative"} w={["full", "full", "fit-content"]} gap={"4"} mt={["4", "4", "0px"]} px={["4", "4", ""]} >
                                        <EventImage width={["full", "full", "201px"]} height={["201px", "201px", "201px"]} data={datainfo?.event} />
                                        {isToDay(item?.scanTimeStamp ? item?.scanTimeStamp[item?.scanTimeStamp?.length - 1] : "") && (
                                            <>
                                                {(checkEventDay(item?.scanTimeStamp)) && (
                                                    <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'-50px'} right={"3"} bg={'transparent'}>
                                                        <Image src={'/assets/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                                    </Box>
                                                )}
                                            </>
                                        )}
                                    </Flex>
                                    <Flex pos={"relative"} flexDir={"column"} mt={"2"} gap={"3"} px={["4", "4", "0px"]} >
                                        <Text fontSize={"18px"} fontWeight={"semibold"} >{capitalizeFLetter(textLimit(datainfo?.event?.eventName, 20))}</Text>

                                        <Flex gap={"4"} display={["flex", "flex", "none"]} fontSize={"xs"} >

                                            <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                            <Flex flexDirection={"column"} gap={"2"} >
                                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                                <Text color={bodyTextColor} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={"4"} alignItems={"center"} >
                                            <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                {dateFormat(datainfo?.event?.startDate)}
                                            </Flex>
                                            <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                {timeFormat(datainfo?.event?.startDate)}
                                            </Flex>
                                        </Flex>
                                        <Flex gap={"4"} >

                                            <Flex flexDirection={"column"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{textLimit(item?.id, 7)}</Text>
                                            </Flex>
                                            <Flex flexDirection={"column"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                    <EventPrice minPrice={datainfo?.boughtPrice} maxPrice={datainfo?.boughtPrice} currency={datainfo?.event?.currency} />
                                                </Text>
                                            </Flex>
                                            <Flex flexDirection={"column"} >
                                                <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Number</Text>
                                                <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{dataMultiple?.length}</Text>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={"4"} display={["none", "none", "flex"]} fontSize={"xs"} >

                                            <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                            <Flex flexDirection={"column"} gap={"2"} >
                                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                                <Text color={bodyTextColor} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    <Flex gap={"1"} borderLeft={["", "", "1px dashed black"]} mt={"2"} borderTop={["1px dashed black", "1px dashed black", "0px"]} w={["full", "full", "fit-content"]} alignItems={"center"} border={""} py={["4", "4", "0px"]} pl={["0px", "0px", "4"]} flexDir={"column"} >
                                        <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                            <QRCode
                                                style={{ height: "200px", width: "200px", zIndex: 20 }}
                                                value={item?.id}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </Box>
                                        <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                                    </Flex>
                                </Flex>
                            )
                        }
                        )}
                    </Flex>
                </Flex>

                {/* <CustomButton onClick={handlePrint} text='Download Ticket' /> */}

            </Flex>
        </LoadingAnimation>
    )
}

export default ViewTicket