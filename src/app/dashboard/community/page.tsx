import { CommunityScreen } from '@/components/newcommunity'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Community() {
    return (
        <Flex w={"full"} h={"full"} overflow={"hidden"} >
            <CommunityScreen />
        </Flex>
    )
}
