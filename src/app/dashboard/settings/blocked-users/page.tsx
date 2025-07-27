"use client"
import BlockedUsersComponent from '@/components/settings_component/blocked_user_component'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation' 
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

interface Props {}

function BlockedUsers(props: Props) {
    const {} = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const router = useRouter()

    return ( 
        <Flex flexDirection={"column"} height={"auto"} width={"full"} overflowY={"auto"} bg={mainBackgroundColor} >
            <Flex justifyContent={"space-between"} py={"36px"} px={["6", "59px"]} width={"full"} alignItems={"center"} >

                <Flex onClick={() => router.push("/dashboard/settings")} as={"button"} alignItems={"center"} fontWeight={"700"} fontSize={"20px"} gap={"3"} >
                    <IoIosArrowBack size="24px" />
                    <Text>Blocked Users</Text>
                </Flex>
            </Flex> 

            <Box width={["full", "400px"]} height={"full"} mx={"auto"} px={["6", "0px"]} py={"0px"} >
                <BlockedUsersComponent />
            </Box>
        </Flex>
    )
}

export default BlockedUsers
