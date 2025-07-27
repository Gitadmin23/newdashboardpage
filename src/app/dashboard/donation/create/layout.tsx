'use client'
import { CancelIcon } from '@/components/svg'
import {Box, Flex, Image, Link, Text, useColorMode} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import useCustomTheme from "@/hooks/useTheme";

function Layout({ children }: {
    children: ReactNode
}) {

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Flex width={"full"} display={["none", "none", "none", "none", "flex"]} flexDir={"column"} h={"full"} position={"relative"} overflow={"hidden"} bg={mainBackgroundColor} >
                <Box width={"full"} height={"74px"} top={"0px"} zIndex={"50"} position={"fixed"} bg={mainBackgroundColor} >
                    <Flex style={{ boxShadow: "0px 1px 1px 0px #00000040" }} height={"74px"} width={"full"} alignItems={"center"} px={"6"} justifyContent={"start"} position={"relative"} >
                        <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                    </Flex>
                </Box>
                <Box overflow={"hidden"} h={"100vh"} bg={mainBackgroundColor}>
                    {children}
                </Box>
            </Flex>
            <Box width={"full"} display={["block", "block", "block", "block", "none"]} position={"relative"} overflowY={"auto"} bg={mainBackgroundColor} >
                <Box width={"full"} top={"0px"} zIndex={"50"} py={"2"} position={"sticky"} bg={mainBackgroundColor} >
                    <Flex height={"30px"} width={"full"} alignItems={"center"} justifyContent={"center"} position={"relative"} >
                        <Link href={'/dashboard/event'} display={"flex"} px={"3"} height={"full"} left={"0px"} justifyContent={"center"} alignItems={"center"} position={"absolute"} zIndex={"10"} >
                            <BsChevronLeft size={"25px"} />
                        </Link>
                        <Text fontWeight={"bold"} fontSize={"20px"} color={bodyTextColor} >Create Fundraising</Text>
                    </Flex>
                </Box>
                <Box flex={1} pb={["8", "8", "8", "8", "0px"]} bg={mainBackgroundColor} >
                    {children}
                </Box>
            </Box>
        </>
    )
}

export default Layout
