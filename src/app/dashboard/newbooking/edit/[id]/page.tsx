"use client"
import EditBusinessPage from '@/components/new_booking_component/createBookTabs/EditBusinessPage'
// import EditBusinessPage from '../../../../../components/new_booking_component/createBookTabs/EditBusinessPage'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function EditBooking() {
 

    return (
        <Flex w={"full"} h={"full"} overflow={"hidden"} > 
            <EditBusinessPage /> 
        </Flex>
    )
}
