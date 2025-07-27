import DonationGroupDetails from '@/components/donation/donationGroupDetails'
import { Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function FundraisingGroup(props: Props) {
    const params = await props.params;

    const id = params.slug

    return (
        <Flex w={"full"} overflowY={"auto"} >
            <DonationGroupDetails id={id} />
        </Flex>
    )
}
