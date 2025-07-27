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
                    Once payment has been debited from your bank account, it will be credited to the event Organizer’s account after 24hrs waiting period.<span style={{ color: '#5D70F9' }} >Chasescroll</span> is not responsible for any refund requests. If you want a refund, contact the event organizer directly through our chat system or email event organizer directly.
                    <br /> <br />
                    If you suspect or notice any fraudulent act on the platform, kindly report such incidents to the Chasescroll Team via this email <span style={{ color: '#5D70F9' }} >support@chasescroll.com</span>
                    {/* Payment has been debited from your account but would be credited to the Organizers account after a 3days waiting period. <span style={{color:'#5D70F9'}} >Chasescroll</span> is not responsible for any refund requests. If you want a refund send a request or message to the event organizer.
                        <br/> <br/>
                    If you suspect or notice any fraudulent act on the platform, kindly reach out to the Chasescroll Team via this email <span style={{color:'#5D70F9'}} >support@chasescroll.com</span> */}
                </Text>
                <Button onClick={() => setModalTab(1)} w={"full"} h={"42px"} mt={"3"} borderWidth={"1px"} color={"#5465E0"} borderColor={"#5465E0"} rounded={"8px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} >
                    Done
                </Button>
            </Box>
        </Box>
    )
}

export default RefundPolicy
