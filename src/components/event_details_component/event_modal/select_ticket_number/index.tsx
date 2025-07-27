// import CustomButton from '@/components/Form/CustomButton'
import CustomButton from '@/components/general/Button'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventImage from '@/components/sharedComponent/eventimage'
import { AddIcon, SubtractIcon } from '@/components/svg'
import { IEvent } from '@/models/Events'
import { URLS } from '@/services/urls'
import { dateFormatMonthDay } from '@/utils/dateFormat'
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat'
import { textLimit } from '@/utils/textlimit'
import {Box, Flex, Text, useColorMode, useToast} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import PayStackBtn from '../paystack_btn'
import useCustomTheme from "@/hooks/useTheme";
import useStripeStore from '@/global-state/useStripeState'

interface Props {
    data: IEvent,
    selectedTicket: {
        ticketPrice: number,
        minTicketBuy: number,
        maxTicketBuy: number,
        totalNumberOfTickets: number,
        ticketCount: number,
        ticketType: string,
        ticketsSold: number
    },
    numbOfTicket: any,
    setNumberOfTicket: any,
    next: any,
    close: any
}

function SelectTicketNumber(props: Props) {
    const {
        data,
        selectedTicket,
        next,
        numbOfTicket,
        setNumberOfTicket,
        close
    } = props


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const serviceFee = 1.77
    const router = useRouter()

    let price = selectedTicket?.ticketPrice * numbOfTicket
    let service = price * 0.015

    const queryClient = useQueryClient()
    const toast = useToast()
    let usdtotal = ((((selectedTicket?.ticketPrice * numbOfTicket) * 1.015) + 0.39) / (1 - 0.059))
    let nairatotal = ((((selectedTicket?.ticketPrice * numbOfTicket) * 1.015) + 100) / (1 - 0.015))
    let nairatotalnew = ((((selectedTicket?.ticketPrice * numbOfTicket) * 1.015)) / (1 - 0.015))
    const { setModalTab, modalTab } = useStripeStore((state: any) => state);

    const createTicket = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_TICKET, data),
        onSuccess: (data: any) => {
            toast({
                title: 'Success',
                description: "Ticket Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            queryClient.refetchQueries(['event_ticket'])
            queryClient.refetchQueries(['all-events-details'])

            // queryClient.invalidateQueries(['event_ticket' + id])
            // queryClient.invalidateQueries(['all-events-details' + id])
            // router.refresh()
            // window.location.reload()
            // close(false)
            setModalTab(7)
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: "Error Creating Ticket",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });


    const clickHandler = () => {
        if (price === 0) {
            createTicket.mutate({
                eventID: data?.id,
                ticketType: selectedTicket?.ticketType,
                numberOfTickets: numbOfTicket
            })
        } else {
            next(4)
        }
    }

    const addticket = () => {

        if ((selectedTicket?.totalNumberOfTickets - selectedTicket?.ticketsSold) <= numbOfTicket) {

            toast({
                title: 'Error',
                description: numbOfTicket + " Ticket is Remaining for this Event",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        } else {
            if (selectedTicket?.maxTicketBuy === numbOfTicket) {

                toast({
                    title: 'Error',
                    description: "Limit of Ticket is " + numbOfTicket,
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
            } else {
                setNumberOfTicket((prev: any) => prev + 1)
            }
        }
    }

    React.useEffect(() => {
        setNumberOfTicket(selectedTicket?.minTicketBuy)
    }, [])

    console.log(selectedTicket?.ticketPrice);



    return (
        <Box width={"full"} bg={mainBackgroundColor} px={"8"} py={"6"} >
            <Flex alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"16px"} px={"8px"} py={"12px"} >
                <EventImage borderWidth='2px' rounded='16px' width={"153px"} height={"127px"} data={data} />
                <Flex height={"fit-content"} ml={"3"} flexDir={"column"} gap={"2px"} >
                    <Text fontSize={"14px"} fontWeight={"bold"} >{textLimit(data?.eventName, 20)}</Text>
                    <EventLocationDetail height='fit-content' location={data?.location} fontWeight={"medium"} color={"brand.chasescrollBlue"} fontsize='sm' noicon={false} locationType={data?.locationType} />
                    <Text>{textLimit(data?.eventDescription, 20)}</Text>
                    <Flex flexDir={"column"} >
                        <Text fontSize={"sm"} color={"brand.chasescrollBlue"} >{dateFormatMonthDay(data?.startDate)}</Text>
                        {/* <Text fontSize={"sm"} color={"brand.chasescrollTextGrey2"} >{timeFormat(data?.startTime)} ({new Date(data?.startTime).toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]})</Text> */}
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDirection={"column"} pt={"3"} pb={"5"} alignItems={"center"} >
                <Flex alignItems={"center"} rounded={"16px"} borderWidth={"1px"} borderColor={"#CDD3FD"} w={"full"} flexDir={"column"} py={"4"} >
                    <Text color={colorMode === 'light' ? "#667085":bodyTextColor} >
                        Number of Tickets
                    </Text>
                    <Flex gap={"5"} alignItems={"center"} py={"1"}  >
                        <Box disabled={numbOfTicket === selectedTicket?.minTicketBuy} onClick={() => setNumberOfTicket((prev: any) => prev - 1)} as='button' >
                            <SubtractIcon />
                        </Box>
                        {numbOfTicket}
                        <Box onClick={() => addticket()} as='button' >
                            <AddIcon color={bodyTextColor} />
                        </Box>
                    </Flex>
                </Flex>
                <Box width={"full"} pt={"4"} display={"flex"} flexDirection={"column"} gap={"3"} fontWeight={"medium"} fontSize={"sm"} >
                    <Text >VIP Ticket  [{numbOfTicket}]</Text>
                    <Flex justifyContent={"space-between"} >
                        <Text>Ticket Price</Text>
                        <Text>{formatNumber(price, data?.currency === "USD" ? "$" : "₦")}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} >
                        <Text>Service Fee</Text>
                        <Text>{formatNumber(service, data?.currency === "USD" ? "$" : "₦")}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} >
                        <Text>Processing Fee</Text>
                        {selectedTicket?.ticketPrice === 0 ? <Text>{data?.currency === "USD" ? "$0" : "₦0"}</Text> :
                            <Text>{formatNumber((data?.currency === "USD" ? usdtotal - price - service : (nairatotal < 2500 ? nairatotalnew : nairatotal) - price - service), data?.currency === "USD" ? "$" : "₦")}</Text>
                        }
                        {/* <Text>{selectedTicket?.ticketPrice === 0 ? data?.currency === "USD" ? "$0" : "₦0" : formatNumber((data?.currency === "USD" ? usdtotal - price - service : (nairatotal < 2500 ? nairatotalnew : nairatotal) - price - service), data?.currency === "USD" ? "$" : "₦")}</Text> */}
                    </Flex>
                    <Flex justifyContent={"space-between"} >
                        <Text>Total</Text>
                        {selectedTicket?.ticketPrice === 0 ? <Text>{data?.currency === "USD" ? "$0" : "₦0"}</Text> :
                            <Text>{formatNumber((data?.currency === "USD" ? usdtotal : (nairatotal < 2500 ? nairatotalnew : nairatotal)), data?.currency === "USD" ? "$" : "₦")}</Text>
                        }
                        {/* <Text>{selectedTicket?.ticketPrice === 0 ? data?.currency === "USD" ? "$0" : "₦0" : formatNumber((data?.currency === "USD" ? usdtotal : (nairatotal < 2500 ? nairatotalnew : nairatotal)), data?.currency === "USD" ? "$" : "₦")}</Text> */}
                    </Flex>
                    {price === 0 && (
                        <CustomButton isLoading={createTicket?.isLoading} onClick={clickHandler} text='Pay now' width={["full", "full"]} />
                    )}
                    {price > 0 && (
                        <PayStackBtn datainfo={data} selectedCategory={selectedTicket?.ticketType} ticketCount={numbOfTicket} />
                    )}
                    <Flex justifyContent={"center"} mt={"2"} >
                        <Text textAlign={"center"} as={"button"} fontSize={"12px"} color={headerTextColor} onClick={() => next(2)} > Click to read  <span style={{ color: "#5D70F9", fontWeight: "700" }} >Chasescroll refund policy.</span></Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default SelectTicketNumber
