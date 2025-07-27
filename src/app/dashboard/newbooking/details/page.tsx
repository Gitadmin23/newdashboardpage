"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Text, border } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineMore } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoArrowBack, IoBookmarkOutline } from 'react-icons/io5';
import { LuShare } from 'react-icons/lu';

export default function BookingDetails() {

    const {
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme()

    const handleDateSelect = () => {

    }

    const [empty, setEmpty] = useState(false)

    const router = useRouter()

    return (
        <Flex w={"full"} >
            {empty && (
                <Flex py={"20"} gap={"6"} w={"full"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                    <Text fontSize={"24px"} fontWeight={"500"} >{`You don’t any Service yet please create`}</Text>
                    <Button onClick={() => router.push("/dashboard/create/services")} w={"224px"} bg={primaryColor} color={"white"} rounded={"full"} h={"42px"} _hover={{ backgroundColor: primaryColor }} >
                        Add New Service
                    </Button>
                </Flex>
            )}
            <Flex w={"full"} p={"9"} flexDirection={"column"} gap={"6"} >
                <Text fontWeight={"600"} color={primaryColor} >+ Add New Service</Text>
                <Flex roundedBottom={"12px"} borderWidth={"1px"} borderColor={borderColor} alignItems={"center"} py={"1"} w={"full"} px={"24px"} >
                    <Flex flexDir={"column"} >
                        <Text fontSize={"24px"} fontWeight={"500"} >Hair Cut</Text>
                        <Text fontWeight={"500"} mt={"-1"} color={primaryColor} >Price $100</Text>
                    </Flex>
                    <Button ml={"auto"} onClick={() => router?.push("/dashboard/newbooking/details")} bgColor={primaryColor} _hover={{ backgroundColor: primaryColor }} color={"white"} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={"42px"} w={"160px"} >Book now</Button>
                    <Flex ml={"3"} >
                        <AiOutlineMore size="25px" />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
