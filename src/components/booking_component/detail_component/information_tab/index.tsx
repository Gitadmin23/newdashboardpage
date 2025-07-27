import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function InformationTab(props: Props) {
    const {} = props

    return (
        <Box w={"full"}  >
            <Box width={"full"} h={"175px"} bg={"gray.300"} rounded={"8px"} />
            <Text fontSize={"lg"} fontWeight={"bold"} mt={"7"} >About Floyd’s 99 Barbers</Text>
            <Text fontWeight={"normal"} color={"#717591"} mt={"2"} >This is my bio, where I introduce myself & skills to the world and people. This is my bio, where I introduce myself &  skills to the world and people. This is my bio, where I introduce myself & skills to the world and people.</Text>
        </Box>
    )
}

export default InformationTab
