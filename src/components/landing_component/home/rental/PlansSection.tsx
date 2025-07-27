import { LandOneIcon, LandThreeIcon, LandTwoIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { LuCalendarDays } from 'react-icons/lu'

export default function PlansSection() {

    const { primaryColor } = useCustomTheme()

    return (
        <Flex color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "20"]} py={["6", "6", "24"]} >
            <Flex pos={"relative"} w={"full"} flexDirection={"column"} gap={["4", "6", "6"]} bgColor={"#C68241"} rounded={["12px", "12px", "32px"]} px={["3", "3", "6"]} pb={["8", "8", "28"]} pt={["8", "8", "10"]} >
                <Flex pos={"absolute"} inset={"0px"} >
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"cover"} opacity={"10%"} />
                </Flex>
                <Text maxW={"1000px"} fontWeight={"700"} fontSize={["32px", "32px", "46px"]} lineHeight={"120%"} >{`You're safe with us`}</Text>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandOneIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Wide Selection</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`From tables, chairs, venue, projectors, sound equipments to lighting and apartments. Find everything you need in one place.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                         <LandTwoIcon /> 
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Flexible Options</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Choose rental durations and delivery options that works for your event timeline.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandThreeIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >No Ownership Hassles</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >No need to buy, store, or maintain—just rent, use, and return.</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
