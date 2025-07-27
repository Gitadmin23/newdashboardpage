'use client'
import CreateServices from '@/components/new_booking_component/createServices'
import React from 'react'
import { useParams } from 'next/navigation'
import { useDetails } from '@/global-state/useUserDetails';


export default function Page() {

    const { userId } = useDetails((state) => state);

    return (
        <CreateServices id={userId as string} />
    )
}