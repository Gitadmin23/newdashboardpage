import {Box, Button, Flex, ModalOverlay, Text, useColorMode} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SelectTicket from '../select_ticket'
import { usePathname, useRouter } from 'next/navigation'
import ViewClickYser from '../view_click_user'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import CustomButton from '@/components/general/Button'
import { FiAlertCircle } from "react-icons/fi";
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    isOrganizer: boolean,
    currency: any,
    ticket: any,
    selectedticket: any,
    setCategory: any,
    isBought: boolean,
    event: any
}

function EventUserOption(props: Props) {
    const {
        isOrganizer,
        currency,
        ticket,
        selectedticket,
        setCategory,
        isBought,
        event
    } = props

    const { bodyTextColor } = useCustomTheme();
    const { colorMode } = useColorMode();

    const router = useRouter()
    const [listOfClicks, setListOfClicks] = useState(0)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const clickHandler = () => {
        if(event?.ticketBought) {
            setOpen(true)
        } else {
            router.push("/dashboard/event/edit_event/" + event?.id)
        }
    }     

    useEffect(() => {
        event?.productTypeData?.map((item: any) => {
            let count = item?.clickThroughCount + listOfClicks

            setListOfClicks(count)
        })
    }, [])

    return (
        <Box my={"auto"} >
            {(isOrganizer || event?.eventMemberRole === "ADMIN") && (
                <Flex flexDirection={["column", "column", "row"]} width={"full"} justifyContent={"center"} alignItems={"center"} gap={"3"} >
                    {!event?.productTypeData[0]?.rerouteURL ?
                        <Button onClick={() => router.push("/dashboard/settings/event-dashboard/" + event?.id)} width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >My Dashboard</Button> :
                        <ViewClickYser ticket={ticket} data={event} listOfClicks={listOfClicks} />
                    }
                    <Button isDisabled={pathname?.includes("pastdetails") ? true : false} onClick={() => clickHandler()} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >Edit Event</Button>
                </Flex>
            )}
            {!isBought && (
                <>
                    {(!isOrganizer && event?.eventMemberRole !== "ADMIN") && (
                        <SelectTicket data={event} ticket={ticket} selectedticket={selectedticket} currency={currency} setCategory={setCategory} />
                    )}
                </>
            )}
            <ModalLayout open={open} close={setOpen} title='' >
                <Box px={"4"} pt={"5"} pb={"5"} >
                    <Flex color={"brand.chasescrollRed"} width={"full"} pb={"4"} justifyContent={"center"} >
                    <FiAlertCircle size={"60px"}  />
                    </Flex>
                    <Text  fontWeight={"medium"} textAlign={"center"} >You can only edit the date, time and location of this event because people have already bought tickets to this event.</Text>
                    <Flex w={"full"} gap={"4"} mt={"6"} >
                        <CustomButton onClick={()=> setOpen(false)} backgroundColor={"brand.chasescrollRed"} width={"full"} text='Cancel' />
                        <CustomButton onClick={()=> router.push("/dashboard/event/edit_event_data/" + event?.id)} text='Continue' width={"full"} />
                    </Flex>
                </Box>
            </ModalLayout>
        </Box>
    )
}

export default EventUserOption
