import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { LocationStroke } from '../svg'
import useCustomTheme from '@/hooks/useTheme';
import { IEventType } from '@/models/Event';

export default function EventLocation(props: IEventType) {

    const {
        location
    } = props

    const {
        headerTextColor,
        primaryColor
    } = useCustomTheme();
    return (
        <Flex w={"full"} flexDir={"column"} gap={"2"} >
            <Text fontSize={"16px"} fontWeight={"medium"} >Location</Text>
            <Flex gap={"2"} alignItems={"center"} >
                <Flex w={"fit-content"} >
                    <Flex w={"8"} h={"8"} color={primaryColor} justifyContent={"center"} alignItems={"center"} >
                        <LocationStroke />
                    </Flex>
                </Flex>
                <Text fontSize={"14px"} >{location.locationDetails ? location.locationDetails : location?.toBeAnnounced ? "To Be Announced" : "" } </Text>
            </Flex>
        </Flex>
    )
}