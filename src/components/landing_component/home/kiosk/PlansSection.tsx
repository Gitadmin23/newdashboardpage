import { LandOneIcon, LandThreeIcon, LandTwoIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function PlansSection() {

    const { primaryColor } = useCustomTheme()

    return (
        <Flex color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "20"]} py={["6", "6", "24"]} >
            <Flex w={"full"} pos={"relative"} flexDirection={"column"} gap={["4", "6", "6"]} bgColor={"#016545"} rounded={["12px", "12px", "32px"]} px={["3", "3", "6"]} pb={["8", "8", "28"]} pt={["8", "8", "10"]} >
                <Flex pos={"absolute"} inset={"0px"} >
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"cover"} opacity={"10%"} />
                </Flex>
                <Text maxW={"1000px"} fontWeight={"700"} fontSize={["32px", "32px", "46px"]} lineHeight={"120%"} >Increased Visibility</Text>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandOneIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Curated Selection</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Discover high-quality event items including food produce from trusted sellers.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandTwoIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Secure Transactions</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Shop with peace of mind knowing every payment is protected from checkout to delivery. Vendors don't get paid without your approval.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandThreeIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Competitive Pricing</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Find great deals without compromising on quality.`}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
