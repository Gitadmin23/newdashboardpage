import { LandOneIcon, LandThreeIcon, LandTwoIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function PlansSection() {

    const { primaryColor } = useCustomTheme()

    return (
        <Flex color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "20"]} py={["6", "6", "24"]} >
            <Flex w={"full"} pos={"relative"} flexDirection={"column"} gap={["4", "6", "6"]} bgColor={primaryColor} rounded={["12px", "12px", "32px"]} px={["3", "3", "6"]} py={["8", "8", "10"]} >
                <Flex pos={"absolute"} inset={"0px"} >
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"cover"} opacity={"10%"} />
                </Flex>
                <Text maxW={"1000px"} fontWeight={"700"} fontSize={["32px", "32px", "46px"]} lineHeight={"120%"} >From wedding events to complex initiatives, we can help</Text>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandOneIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Move events across the finish line</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Finding professionals doesn't have to be a task. Request a service while creating your event or you can search from the tabs`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandTwoIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Grow Your Event Team with Ease</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >Get the extra hands you need to manage multi-layered event projects—from planning to execution—on your schedule.</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandThreeIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Improved Event Quality</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >More funds mean better resources—entertainment, technology, food, décor—enhancing the overall experience for attendees.</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
