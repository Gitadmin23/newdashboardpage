"use client"
import UserList from '@/components/explore_component/userslist';
import {Box, Flex, Link, Text, useColorMode, VStack} from '@chakra-ui/react'
import React from 'react'
import { BsChevronLeft } from "react-icons/bs";
import useCustomTheme from "@/hooks/useTheme";

interface Props {}

function Suggested(props: Props) {
    const {} = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <VStack height='100%' width={"full"} bg={mainBackgroundColor} overflowY={"auto"} >
        
                <Flex  height={"54px"} bg={secondaryBackgroundColor} width={"full"} alignItems={"center"} justifyContent={"center"} position={"relative"} >
                    <Link href='/dashboard/explore' display={"flex"}  px={"3"} height={"full"} left={"0px"} justifyContent={"center"} alignItems={"center"} position={"absolute"} zIndex={"10"} >
                        <BsChevronLeft size={"25px"} />
                    </Link>
                    <Text fontWeight={"medium"} fontSize={"28px"} >Suggestion</Text>
                </Flex>
      
            <Box flex={1} width={'100%'} height={'100%'} overflowY={'auto'}>
                <Flex flexDirection={"column"} flex={1} width={"full"} >
                    <UserList />
                </Flex>
            </Box>
        </VStack>
    );
}

export default Suggested
