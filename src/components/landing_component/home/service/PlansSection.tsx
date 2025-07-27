import { LandOneIcon, LandThreeIcon, LandTwoIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function PlansSection() {

    const { primaryColor } = useCustomTheme()

    return (
        <Flex color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "20"]}  py={["6", "6", "24"]} >
            <Flex w={"full"} position={"relative"} flexDirection={"column"} gap={["4", "6", "6"]} bgColor={"#E92424"} rounded={["12px", "12px", "32px"]} px={["3", "3", "6"]} pb={["6", "6", "24"]} pt={["8", "8", "10"]} >
                <Flex pos={"absolute"} inset={"0px"} >
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"cover"} opacity={"10%"} />
                </Flex>
                <Text maxW={"1000px"} fontWeight={"700"} fontSize={["32px", "32px", "46px"]} lineHeight={"120%"} >{`You're safe with us`}</Text>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandOneIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Easy Access to event professionals</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`You can quickly connect with experienced, reviewed professionals who specialize in everything from planning and logistics to decor, catering, and entertainment.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandTwoIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Nationwide Reach</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`You're not limited to your immediate area—Chasescroll gives you access to a broader pool of event professionals, including local pros in other cities or specialists for destination events.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandThreeIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Built-in Tools & Support</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Chasescroll offer built-in messaging, scheduling, contracts, and payment processing—streamlining the hiring and collaboration process.`}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
