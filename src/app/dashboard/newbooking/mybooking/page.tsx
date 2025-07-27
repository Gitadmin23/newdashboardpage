"use client"
import BookingList from '@/components/new_booking_component/bookingList'
import ListUser from '@/components/new_booking_component/listUser'
import { AddIconWithBorder } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CgMore } from 'react-icons/cg'

export default function Booking() {

    const { colorMode } = useColorMode();
    const { headerTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();

    const [tab, setTab] = useState(0)

    const router = useRouter()

    return (
        <Flex w={"full"} flexDir={"column"} height={"full"} overflow={"hidden"} p={"8"} bgColor={colorMode !== "dark" ? mainBackgroundColor : mainBackgroundColor} >
            <Flex w={"full"} h={"fit-content"} justifyContent={"space-between"} alignItems={"center"} >
                <Flex flexDir={"column"} >
                    <Text fontSize={"24px"} fontWeight={"600"} >My Business</Text>
                    <Text >See all my Listings on Chasescroll</Text>
                </Flex>
                <Button onClick={() => router.push("/dashboard/newbooking/create")} borderWidth={"0.5px"} borderColor={primaryColor} _hover={{ backgroundColor: "#F7FBFE" }} bg={"#F7FBFE"} fontSize={"14px"} color={primaryColor} rounded={"full"} px={"4"} h={"44px"} >
                    Create Business
                </Button>
            </Flex>
            <Flex gap={"6"} borderBottomWidth={"1px"} borderBottomColor={borderColor} py={"5"} mt={"8"} h={"fit-content"} alignItems={"center"} >
                <Text as={"button"} onClick={() => setTab(0)} fontWeight={"400"} color={tab === 0 ? primaryColor : headerTextColor} textDecor={tab === 0 ? "underline" : ""} fontSize={"16px"} >My Business</Text>
                <Text as={"button"} onClick={() => setTab(1)} fontWeight={"400"} color={tab === 1 ? primaryColor : headerTextColor} textDecor={tab === 1 ? "underline" : ""} fontSize={"16px"} >My Bookings </Text>
                <Text as={"button"} onClick={() => setTab(2)} fontWeight={"400"} color={tab === 2 ? primaryColor : headerTextColor} textDecor={tab === 2 ? "underline" : ""} fontSize={"16px"} >Draft</Text>
                <Text as={"button"} onClick={() => setTab(3)} fontWeight={"400"} color={tab === 3 ? primaryColor : headerTextColor} textDecor={tab === 3 ? "underline" : ""} fontSize={"16px"} >My Receipt </Text>
            </Flex>
            <Flex py={"9"} w={"full"}  >
                <Flex w={"500px"} rounded={"16px"} p={"24px"} flexDir={"column"} gap={"5"} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} >
                    <Flex alignItems={"center"} w={"full"} gap={"3"} pr={"4"} >
                        <Flex w={"32px"} h={"32px"} rounded={"full"} roundedTopRight={"0px"} borderWidth={"1px"} borderColor={primaryColor} />
                        <Text color={primaryColor} fontWeight={"600"} fontSize={"14px"} >Miracle Jason</Text>
                        <Box as="button" ml={"auto"} >
                            <CgMore size={"25px"} />
                        </Box>
                    </Flex>
                    <Flex w={"full"} bg={"red"} h={"150px"} rounded={"lg"} >

                    </Flex>
                    <Flex flexDir={"column"} w={"full"} >
                        <Text fontSize={"14px"} >Business Name</Text>
                        <Text fontSize={"24px"} fontWeight={"700"} >Next Generation Barbers</Text>
                    </Flex>
                    <Button onClick={()=> router?.push("/dashboard/newbooking/details")} borderWidth={"0.5px"} borderColor={primaryColor} _hover={{ backgroundColor: "#F7FBFE" }} bg={"#F7FBFE"} fontSize={"14px"} color={primaryColor} rounded={"full"} px={"4"} h={"44px"} >
                        View Business
                    </Button>
                </Flex>
            </Flex>
            {/* <Flex w={["full", "full", "full", "55%", "55%"]} h={"full"} flexDir={"column"} gap={"4"} overflowY={"auto"} >
                <Flex w={"full"} h={"auto"} flexDir={"column"} gap={"6"}  px={["4", "4", "4", "4", "8"]} py={"8"}>
                    <ListUser />
                    <Flex w={"full"} gap={"4"} alignItems={"center"} >
                        <Button onClick={()=> router?.push("/dashboard/newbooking")} bgColor={secondaryBackgroundColor} _hover={{ backgroundColor: secondaryBackgroundColor }} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={"50px"} w={"160px"} >Categories</Button>
                        <Button bgColor={primaryColor} _hover={{ backgroundColor: primaryColor }} color={"white"} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={"50px"} w={"160px"} >My Business</Button>
                        <Flex onClick={() => router.push("/dashboard/newbooking/create")} width={"40px"} height={"40px"} rounded={"full"} as={"button"} backgroundColor={primaryColor} justifyContent={"center"} alignItems={"center"} ml={"auto"} >
                            <AddIconWithBorder />
                        </Flex>
                    </Flex>
                    <BookingList />
                </Flex>
            </Flex>
            <Flex h={"full"} borderLeftColor={borderColor} borderLeftWidth={"1px"} w={["fit-content", "fit-content", "fit-content", "45%", "45%"]}  overflowY={"auto"} display={["none", "none", "none", "flex", "flex"]} px={["4", "4", "4", "4", "8"]} py={"8"} >
                <Flex w={"full"} h={"auto"} gap={"8"} flexDir={'column'}  >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} h={"fit-content"} >
                        <Text fontSize={"20px"} fontWeight={"600"} >Services in your location</Text>
                        <Text color={primaryColor} fontWeight={"500"} fontSize={"14px"} >See More</Text>
                    </Flex>
                    <BookingList small={true} />
                </Flex>
            </Flex> */}

        </Flex>
    )
}
