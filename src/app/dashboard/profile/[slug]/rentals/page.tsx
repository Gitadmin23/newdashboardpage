import GetRental from '@/components/kisok/getRental'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function RentalProfile() {
    return (
        <Flex px={"4"} flexDir={"column"} >
            <GetRental myrental={true} />
        </Flex>
    )
}
