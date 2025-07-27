import GetProduct from '@/components/kisok/getProduce'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function ProfileKisok() {
    return (
        <Flex px={"4"} flexDir={"column"} >
            <GetProduct myproduct={true} />
        </Flex>
    )
}
