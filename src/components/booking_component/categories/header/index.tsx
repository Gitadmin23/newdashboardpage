"use client"
import CustomButton from '@/components/general/Button'
import { AddIconWithBorder } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props { }

function CategoryHeader(props: Props) {
    const { } = props

    const router = useRouter()

    return (
        <Box width={"full"} >
            <Flex justifyContent={"space-between"} alignItems={"center"} width={"full"} >
                <Flex gap={"4"} >
                    <CustomButton borderRadius={"8px"} width={"150px"} text='Categories' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
                    <CustomButton borderRadius={"8px"} width={"150px"} text='My Business' backgroundColor={"#F0F1F2"} color={"#101828B2"} fontSize={"sm"} />
                </Flex>
                <Flex width={"40px"} height={"40px"} rounded={"full"} as={"button"} backgroundColor={"#5D70F9"} justifyContent={"center"} alignItems={"center"} >
                    <AddIconWithBorder />
                </Flex>
            </Flex>
            <Text fontWeight={"bold"} my={"5"} >Sponsored</Text>
            <Box width={"full"} height={"230px"} bgColor={"gray.300"} rounded={"16px"} />
        </Box>
    )
}

export default CategoryHeader
