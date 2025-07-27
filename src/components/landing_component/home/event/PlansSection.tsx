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
            <Flex pos={"relative"} w={"full"} flexDirection={"column"} gap={["4", "6", "6"]} bgColor={"#BA09C4"} rounded={["12px", "12px", "32px"]} px={["3", "3", "6"]} pb={["8", "8", "28"]} pt={["8", "8", "10"]} >
                <Flex pos={"absolute"} inset={"0px"} >
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"cover"} opacity={"10%"} />
                </Flex>
                <Text maxW={"1000px"} fontWeight={"700"} fontSize={["32px", "32px", "46px"]} lineHeight={"120%"} >{`Effortless event management made simple.`}</Text>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandOneIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Seamless ticket sales and distribution.</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Effortlessly manage your event ticketing with a smooth, all-in-one system for selling, tracking, and distributing tickets. From online sales to check-in, and collaborators and validate tickets using your mobile phones. We make the entire process fast, secure, and user-friendly—for both organizers and attendees.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                         <LandTwoIcon /> 
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Connect with friends via chat on Chasescroll</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Chat with friends from an event and engage Collaboratively. Seamless teamwork and coordination.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <LandThreeIcon />
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Build and Belong: Embrace Community on Chasescroll.</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >Create, engage, and be a part of thriving event communities where you can foster meaningful connections and discover new opportunities.</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
