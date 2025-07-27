"use client"
import { BookingPrice, InfoTab, ListServices } from '@/components/new_booking_component/createBookTabs'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function CreateBooking() {
 

    return (
        <Flex w={"full"} h={"full"} overflow={"hidden"} > 
            <InfoTab /> 
        </Flex>
    )
}
