'use client'
import CreateServices from '@/components/new_booking_component/createServices'
import React from 'react'
import { useDetails } from '@/global-state/useUserDetails'


export default function Page() {
    const details = useDetails((state) => state);

    console.log(JSON.stringify(details.userId as string));
    return (
        <CreateServices id={details.userId as string} />
    )
}