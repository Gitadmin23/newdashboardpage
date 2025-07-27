import DonationItemList from '@/components/donation/donationItemList'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function DonationProfile() {
    return (
        <Flex flexDir={"column"} px={"4"} >
            <DonationItemList creator={true} />
        </Flex>
    )
}
