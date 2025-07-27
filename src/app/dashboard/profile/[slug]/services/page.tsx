import MyBusiness from '@/Views/dashboard/booking/MyBusiness'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function ServicesProfile() {
    return (
        <Flex px={"4"}  flexDir={"column"} > 
            <MyBusiness />
        </Flex>
    )
}
