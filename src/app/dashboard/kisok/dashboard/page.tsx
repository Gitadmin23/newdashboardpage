"use client"
import CopyRightText from '@/components/sharedComponent/CopyRightText'
import { BarchartIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat } from '@/utils/dateFormat'
import { Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Switch, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react' 
import { IoMdMore } from 'react-icons/io'

export default function KisokDashboard() {

    const { primaryColor, secondaryBackgroundColor, borderColor } = useCustomTheme()

    return (
        <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} overflowY={"auto"} >
            <Text fontSize={"24px"} fontWeight={"700"} >Kiosk Dashboard</Text>
            <Flex w={"full"} gap={"4"} >
                <Flex w={"full"} rounded={"8px"} h={"164px"} py={"4"} px={"6"} gap={"2"} bgColor={primaryColor} flexDir={"column"} >
                    <Image src='/images/logo.png' alt='logo' w={"50px"} />
                    <Text fontSize={"24px"} color={"white"} fontWeight={"700"} >Kiosk Dashboard</Text>
                    <Text fontSize={"12px"} color={"white"} lineHeight={"14px"} >Consolidate tools for insights and reaction management in on place.</Text>
                </Flex>
                <Flex w={"full"} flexDir={"column"} rounded={"8px"} h={"164px"} py={"4"} gap={"2"} px={"6"} bgColor={secondaryBackgroundColor} >
                    <Text textAlign={"center"} >Total Number of item Sold</Text>
                    <Flex alignItems={"center"} gap={"4"} >
                        <Flex w={"46px"} h={"46px"} bgColor={"#FFEEF1"} rounded={"8px"} justifyContent={"center"} alignItems={"center"} >
                            <BarchartIcon />
                        </Flex>
                        <Text fontWeight={"600"} fontSize={"30px"} >43</Text>
                    </Flex>
                    <Text fontSize={"12px"} fontWeight={"700"} color={"#66CB9F"} textAlign={"right"} >(+5%)</Text>
                </Flex>
                <Flex w={"full"} flexDir={"column"} rounded={"8px"} h={"164px"} py={"4"} gap={"2"} px={"6"} bgColor={secondaryBackgroundColor} >
                    <Text textAlign={"center"} >Total Revenue</Text>
                    <Flex alignItems={"center"} gap={"4"} >
                        <Flex w={"46px"} h={"46px"} bgColor={"#FFEEF1"} rounded={"8px"} justifyContent={"center"} alignItems={"center"} >
                            <BarchartIcon />
                        </Flex>
                        <Text fontWeight={"600"} fontSize={"30px"} >23,000</Text>
                    </Flex>
                    <Text fontSize={"12px"} fontWeight={"700"} color={"#66CB9F"} textAlign={"right"} >(+5%)</Text>
                </Flex>
            </Flex>

            <TableContainer >
                <Table variant='simple' borderWidth={"1px"} borderColor={borderColor} colorScheme="gray">
                    <TableCaption>
                        <Box>
                            Powered By Chasescroll
                            <Text fontSize={"sm"} >
                                <CopyRightText />
                            </Text>
                        </Box>
                    </TableCaption>
                    <Thead bgColor={"#FAFAFB"} >
                        <Tr>
                            <Th borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                <Flex gap={"3"}>
                                    Email Address
                                </Flex>
                            </Th>
                            <Th borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                <Flex gap={"3"}>
                                    Amount
                                    <Switch />
                                </Flex>
                            </Th>
                            <Th borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                <Flex gap={"3"}>
                                    Item Purchased
                                    <Switch />
                                </Flex>
                            </Th>
                            <Th borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                <Flex gap={"3"}>
                                    Purchase Status
                                    <Switch />
                                </Flex>
                            </Th>
                            <Th borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                <Flex gap={"3"}>
                                    Date
                                    <Switch />
                                </Flex>
                            </Th>
                            <Th borderBottomWidth={"1px"} >

                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {["1", "2", "3", "4"].map((person: any, i: number) => {
                            return (
                                <Tr key={i} >
                                    <Td borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                        <Flex flexDir={"column"} gap={"1"} >
                                            <Text fontSize={"14px"} fontWeight={"500"} >John Doe</Text>
                                            <Text fontSize={"14px"} >Johndoe@untitled.com</Text>
                                        </Flex>
                                    </Td>
                                    <Td borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                        <Text color={"#0B835C"} fontSize={"12px"} fontWeight={"600"}>+₦5,000</Text>
                                    </Td>
                                    <Td borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} >3 B&G shirt</Text>
                                    </Td>
                                    <Td borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                        <Flex bgColor={"#E7F8F2"} px={"2"} rounded={"full"} h={"22px"} gap={"1"} alignItems={"center"} w={"fit-content"} >
                                            <Flex w={"6px"} h={"6px"} rounded={"full"} bgColor={"#10B981"} />
                                            <Text color={"#10B981"} fontWeight={"500"} fontSize={"12px"} >Successful</Text>
                                        </Flex>
                                    </Td>
                                    <Td borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} >29-01-2025</Text>
                                    </Td> 
                                    <Td borderRightWidth={"1px"} borderBottomWidth={"1px"} >
                                        <IoMdMore size={"18px"} />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}
