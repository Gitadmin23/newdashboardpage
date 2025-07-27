import useCustomTheme from '@/hooks/useTheme'
import { Flex, Switch, Text } from '@chakra-ui/react'
import React from 'react'

export default function OrganizerPrBtn() {

    const {
        mainBackgroundColor
    } = useCustomTheme() 

    return (
        <Flex display={["none", "none", "none", "flex", "flex"]} bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={"1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
            <Text fontWeight={"500"} >Apply to provide a service or become a PR to this  event</Text>
            <Switch size={"md"} />
        </Flex>
    )
}
