import { formatNumber } from '@/utils/numberFormat'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    ticket: any,
    currency: string,
    setSelectedTicket: any,
    click: any
}

function SelectTicketType(props: Props) {
    const {
        ticket,
        currency,
        setSelectedTicket,
        click
    } = props



    const clickHandler = (item: any) => {
        setSelectedTicket(item)
        click(1)
    }

    return (
        <Box width={"full"} px={"6"} pb={"8"} >
            <Text fontSize={"xs"} mt={"3"} color={"#121212CC"} >Please select any ticket type and proceed</Text>
            <Flex flexDirection={"column"} gap={"4"} mt={"3"} >
                {ticket?.map((item: any, index: number) => {
                    return (
                        <Button disabled={item?.totalNumberOfTickets === item?.ticketsSold ? true : false} key={index} onClick={() => clickHandler(item)} width={"full"} height={"44px"} bgColor={"white"} borderColor={"brand.chasescrollBlue"} color={"brand.chasescrollBlue"} rounded={"lg"} borderWidth={"1px"} >
                            {item?.totalNumberOfTickets === item?.ticketsSold ?
                                item?.ticketType + " Sold Out" :
                                item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                            }
                        </Button>
                    )
                })}
            </Flex>
        </Box>
    )
}

export default SelectTicketType
