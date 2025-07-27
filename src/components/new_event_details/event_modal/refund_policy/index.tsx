import CustomButton from '@/components/general/Button'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventImage from '@/components/sharedComponent/eventimage'
import useStripeStore from '@/global-state/useStripeState'
import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

interface Props {
    data: any
}

function RefundPolicy(props: Props) {
    const {

    } = props

    const { setModalTab } = useStripeStore((state: any) => state);

    return (
        <Box width={"full"} bg={"white"} px={"8"} pt={"3"} pb={"4"} >
            <Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >
                <Text fontSize={"24px"} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >Chasescroll Refund Policy</Text>
                <Text my={"3"} lineHeight={"22px"} color={"#00000080"} >
                    {/* Once payment has been debited from your bank account, it will be credited to the event Organizer’s account after 24hrs waiting period.<span style={{ color: '#5D70F9' }} >Chasescroll</span> is not responsible for any refund requests. If you want a refund, contact the event organizer directly through our chat system or email event organizer directly.
                    <br /> <br />
                    If you suspect or notice any fraudulent act on the platform, kindly report such incidents to the Chasescroll Team via this email <span style={{ color: '#5D70F9' }} >support@chasescroll.com</span>
                    Event Terms and Conditions. */}
                    Section 5.1 - 6.3
                    <br /> <br />
                    5. Event Listings and Ticketing <br />
                    5.1 Organizers are solely responsible for the accuracy of event information, including descriptions, pricing, and schedules. <br />
                    5.2 The platform is not responsible for cancellations, postponements, or inaccuracies in event listings. <br />
                    5.3 All ticket sales, if applicable, are subject to the terms provided at the point of purchase. <br />
                    6.3 The platform is not liable for payment disputes between organizers and attendees.
                </Text>
                <Button onClick={() => setModalTab(1)} w={"full"} h={"42px"} mt={"3"} borderWidth={"1px"} color={"#5465E0"} borderColor={"#5465E0"} rounded={"8px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} >
                    Done
                </Button>
            </Box>
        </Box>
    )
}

export default RefundPolicy
