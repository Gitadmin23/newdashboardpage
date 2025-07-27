"use client"
import DonationItemGroup from '@/components/donation/donationItemGroup';
import DonationItemList from '@/components/donation/donationItemList' 
import { Flex } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function FundraisingPage() {

    const query = useSearchParams();
    const type = query?.get('type');

    return (
        <Flex w={"full"} flexDir={"column"} >
            {!type && ( 
                <DonationItemGroup publicData={true} /> 
            )}
            {type === "mydonation" && (
                <DonationItemList creator={true} />
            )}
            {type === "past" && (
                <DonationItemList pasted={true} />
            )}
        </Flex>
    )
}
