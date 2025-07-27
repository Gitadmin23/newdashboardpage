"use client"
import useCustomTheme from '@/hooks/useTheme';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

function Layout({ children, params }: {
    children: ReactNode,
    params: { slug: string }
}) {
    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();

    return (
        <>
            {/* <Box width={"full"} display={["none", "none", "none", "block"]} h={"100vh"} position={"relative"} overflowY={"hidden"} >
                <Box width={"full"} bgColor={"white"} height={"74px"} top={"0px"} zIndex={"50"} position={"fixed"} >
                    <Flex style={{ boxShadow: "0px 1px 1px 0px #00000040" }} height={"74px"} width={"full"} alignItems={"center"} px={"6"} justifyContent={"start"} position={"relative"} >

                        <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                    </Flex>
                </Box>
                <Box overflow={["auto", "auto", "auto", "hidden"]} h={"100vh"}>
                    {children}
                </Box>
            </Box>
            <Box width={"full"} display={["block", "block", "block", "none"]} position={"relative"} overflowY={"auto"} >
                <Box width={"full"} top={"0px"} zIndex={"50"} py={"2"} position={"sticky"} >
                    <Flex height={"30px"} width={"full"} alignItems={"center"} justifyContent={"center"} position={"relative"} >
                        <Link href={'/dashboard/event/details/' + params?.slug} display={"flex"} px={"3"} height={"full"} left={"0px"} justifyContent={"center"} alignItems={"center"} position={"absolute"} zIndex={"10"} >
                            <BsChevronLeft size={"25px"} />
                        </Link>
                        <Text fontWeight={"bold"} fontSize={"20px"} >Edit Events</Text>
                    </Flex>
                </Box>
                <Box flex={1} pb={["8", "8", "8", "8", "0px"]} >
                    {children}
                </Box>
            </Box> */}

            <Flex width={"full"} display={["none", "none", "none", "none", "flex"]} flexDir={"column"} h={"full"} position={"relative"} overflow={"hidden"} bg={mainBackgroundColor} >
                <Box width={"full"} height={"74px"} top={"0px"} zIndex={"50"} position={"fixed"} bg={mainBackgroundColor} >
                    <Flex style={{ boxShadow: "0px 1px 1px 0px #00000040" }} height={"74px"} width={"full"} alignItems={"center"} px={"6"} justifyContent={"start"} position={"relative"} >
                        <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                    </Flex>
                </Box>
                <Box overflow={"hidden"} h={"full"} bg={mainBackgroundColor}>
                    {children}
                </Box>
            </Flex>
            <Box width={"full"} display={["block", "block", "block", "block", "none"]} position={"relative"} overflowY={"auto"} bg={mainBackgroundColor} >
                <Box width={"full"} top={"0px"} zIndex={"50"} py={"2"} position={"sticky"} bg={mainBackgroundColor} >
                    <Flex height={"30px"} width={"full"} alignItems={"center"} justifyContent={"center"} position={"relative"} >
                        <Link href={'/dashboard/product'} display={"flex"} px={"3"} height={"full"} left={"0px"} justifyContent={"center"} alignItems={"center"} position={"absolute"} zIndex={"10"} >
                            <BsChevronLeft size={"25px"} />
                        </Link>
                        <Text fontWeight={"bold"} fontSize={"20px"} color={bodyTextColor} >Edit Events</Text>
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
