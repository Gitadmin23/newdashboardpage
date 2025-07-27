import CustomButton from '@/components/general/Button'
import { SuccessIcon, ThumbsUpIcon } from '@/components/svg'
import {Flex, Text, useColorMode} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from '@/models/Event'

interface Props {
    close?: any,
    update?: boolean,
    eventData?: IEventType
}

function SuccessMessageCreateEvent(props: Props) {
    const {
        // close,
        eventData,
        update
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

    const router = useRouter()

    return (
        <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} bg={secondaryBackgroundColor} >
            <ThumbsUpIcon />
            <Text fontSize={"22px"} color={headerTextColor} lineHeight={"26.4px"} textAlign={"center"} fontWeight={"500"} mt={"4"} >Event {update ? "Updated" : "Created"} Successfully</Text>
            <Text fontSize={"14px"} color={bodyTextColor} maxW={"258px"} textAlign={"center"} mt={"2"} mb={"6"} lineHeight={"16.8px"} >Your event is now live. You may proceed to My Events to view it.</Text>
            <CustomButton borderWidth={"0px"} onClick={()=> router.push(`/dashboard/event/details/${eventData?.id}`)} color={"white"} text='Proceed to My Event' w={"full"} />
        </Flex>
    )
}

export default SuccessMessageCreateEvent