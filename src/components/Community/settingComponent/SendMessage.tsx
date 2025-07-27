import { Box, Flex, Text } from '@chakra-ui/react'
import { People, Personalcard, User } from 'iconsax-react'
import React, { useState } from 'react'

export default function SendMessage() { 

    const [message, setMessage] = useState(false)

    return ( 
        <Flex pos={"relative"} w={"full"} flexDir={"column"} rounded={"24px"} p={"2"} borderWidth={"0.2px"} borderColor={"#B1B5C3"} >
            <Flex w={"fit-content"} px={"8px"} py={"4px"} rounded={"32px"} pos={"absolute"} top={"-12px"} left={"20px"} borderWidth={"0.5px"} borderColor={"#D0D4EB"} zIndex={"10"} bgColor={"white"} >
                <Text fontSize={"11px"} lineHeight={"13px"} fontWeight={"bold"} color={"#5D70F9"} >Send Message</Text>
            </Flex>
            <Flex w={"full"} alignItems={"center"} borderBottomColor={"#EAEBED"} borderBottomWidth={"1px"} justifyContent={"space-between"} p={"3"} >
                <Flex gap={"3"} alignItems={"center"} >
                    <People />
                    <Text fontSize={"sm"} lineHeight={"21px"} >All users</Text>
                </Flex>
                <Flex as='button' onClick={()=> setMessage(false)} w={"20px"} h={"20px"} rounded={"full"} borderWidth={"2px"} borderColor={!message ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                    {!message && (
                        <Box w={"8px"} h={"8px"} bgColor={"#5465E0"} rounded={"full"} />
                    )}
                </Flex>
            </Flex>
            <Flex w={"full"} alignItems={"center"} borderBottomColor={"#EAEBED"} borderBottomWidth={"1px"} justifyContent={"space-between"} p={"3"} >
                <Flex gap={"3"} alignItems={"center"} >
                    <User />
                    <Text fontSize={"sm"} lineHeight={"21px"} >Admin</Text>
                </Flex>
                <Flex as='button' onClick={()=> setMessage(true)} w={"20px"} h={"20px"} rounded={"full"} borderWidth={"2px"} borderColor={message ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                    {message && (
                        <Box w={"8px"} h={"8px"} bgColor={"#5465E0"} rounded={"full"} />
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
