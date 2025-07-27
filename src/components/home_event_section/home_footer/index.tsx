import CopyRightText from '@/components/sharedComponent/CopyRightText'
import { Flex, Box, Text, Image } from '@chakra-ui/react' 
import React from 'react'

interface Props { }

function HomeFooter(props: Props) {
    const { } = props

    return (
        <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"} pb={2} px={"8"} >
            <Text color={"#626262"} fontSize={"14px"} lineHeight={"-0.4px"} >
            <CopyRightText />
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} >
                <Text color={"#626262"} fontSize={"14px"} >Partners:</Text>
                <Flex alignItems={"center"} mt={"2"} gap={"3"} >
                    <Image src="/images/The_Founder_Institute_Logo.svg" height={"47px"} alt='The_Founder_Institute_Logo' />
                    <Image src="/images/The_Brink.svg" height={"47px"} alt='The_Brink' />
                    <Image w={"90px"} src="/images/babcock.png" alt='The_Brink' />
                    <Image src="/images/sdbcc.svg" height={"47px"} alt='sdbcc' />
                </Flex>
            </Flex>
            <Flex alignItems={"center"}  flexDir={"column"}  >
                <Text color={"#626262"} fontSize={"14px"} >Payment transactions, powered by :</Text>
                    <Image src="/images/Payment.svg" height={"47px"} alt='Payment' />
            </Flex>
        </Flex>
    )
}




export default HomeFooter
