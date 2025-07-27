"use client"
import { Flex, Image, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import CopyRightText from "../sharedComponent/CopyRightText";
import MobileAppLink from "./mobileapplink";
import SocialMedia from "./socialMedia";
import { useRouter } from "next/navigation";

export default function FooterLandingPage() {

    const OtherComponent = () => {
        return (
            <Flex flexDir={["column-reverse", "column-reverse", "column"]} >
                <Flex gap={["6", "6", "2"]} flexDir={"column"} >
                    <Text fontSize={"15.38px"} lineHeight={"24px"} mt={"8"} >Lets connect</Text>
                    <SocialMedia top="0px" />
                </Flex>
                <Flex gap={["1", "1", "1"]} flexDir={"column"} >
                    <Text fontSize={"15.38px"} mt={"8"} mb={"2"} lineHeight={"24px"} >Coming Soon</Text>
                    <MobileAppLink width="113.14px" height="36px" />
                </Flex>
            </Flex>
        )
    }
    
    const router = useRouter()

    return (
        <Flex w={"full"} pt={"12"} flexDir={"column"} color={"white"} bgColor={"#01041A"} >
            <Flex w={"full"} pb={"8"} flexDir={["column", "column", "column", "row"]} px={["6", "6", "8", "12"]} gap={"4"}  >
                <Flex w={"65%"} flexDir={"column"} >
                    <Flex alignItems={"center"} gap={"1"} >
                        <Image width={["full", "full", "60px"]} src={"/assets/logo.png"} alt="logo" />
                        <Text fontWeight={"bold"} fontSize={"32px"} lineHeight={"48ox"} color={"white"} >Chasescroll</Text>
                    </Flex>
                    <Flex display={["none", "none", "flex"]} >
                        <OtherComponent />
                    </Flex>
                </Flex>
                <Flex w={"100%"} mt={["6", "6", "6", "0px"]} flexDir={["column", "column", "column", "row"]} gap={["8", "8", "8", "0px"]} justifyContent={"space-between"} pr={["0px", "0px", "10"]} >
                    <Flex w={[ "full", "full", "full", "300px"]} flexDir={"column"} >
                        <Text fontSize={["20px", "20px", "24px"]} lineHeight={"48px"} fontWeight={"medium"} >Helpful links</Text>
                        <Flex w={"full"} mt={"6"} gap={["8", "8", "8", "5"]} flexDir={"column"} >
                            <Link href={"/home#faq"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >FAQ</Text>
                            </Link>
                            <Link href={"/home/contact-us"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Contact Us</Text>
                            </Link>
                            <Link href={"/"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Event</Text>
                            </Link>
                            <Link href={"/home"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Home</Text>
                            </Link>
                        </Flex>
                        <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"20px"} mt={"8"} fontWeight={"500"} >Do Not Sell or Share My Personal Information</Text>
                    </Flex>
                    <Flex w={[ "full", "full", "150px"]} flexDir={"column"} >
                        <Text fontSize={[ "20px", "20px", "24px"]} lineHeight={"48px"} fontWeight={"medium"} >About Us</Text>
                        <Flex w={"full"} mt={"6"} gap={["8", "8", "5"]} flexDir={"column"} >
                            <Link href={"/home/privacy"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Privacy Policy</Text>
                            </Link>
                            <Link href={"/home/terms"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Terms & Condition</Text>
                            </Link>
                            <Link href={"/dashboard/event"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Sell Ticket</Text>
                            </Link>
                            <Link href={"/dashboard/explore"}  >
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Explore</Text>
                            </Link>
                        </Flex>
                    </Flex>
                    <Flex w={[ "full", "full", "155px"]} flexDir={"column"} >
                        <Text fontSize={[ "20px", "20px", "24px"]} lineHeight={"48px"} fontWeight={"medium"} >Partners</Text>
                        <Flex w={"full"} mt={"6"} gap={["8", "8", "5"]} flexDir={"column"} >
                            {/* <Link href={""}  > */}
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >Babcock University</Text>
                            {/* </Link>
                            <Link href={""}  > */}
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >University of San Diego</Text>
                            {/* </Link>
                            <Link href={""}  > */}
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >County  of san Diego chambers</Text>
                            {/* </Link>
                            <Link href={""}  > */}
                                <Text fontSize={["14px", "14px", "14px", "16px"]} lineHeight={"19.36px"} fontWeight={"500"} >The Brink</Text>
                            {/* </Link> */}
                        </Flex>
                    </Flex>
                </Flex>
                <Flex display={["flex", "flex", "flex", "none"]} >
                    <OtherComponent />
                </Flex>
            </Flex>
            <Flex w={"full"} px={["0px", "0px", "12"]} justifyContent={"center"} py={"4"} fontSize={["14px", "12px", "16px"]} borderTop={"1px solid white"} >
                <CopyRightText />
            </Flex>
        </Flex>
    )
}