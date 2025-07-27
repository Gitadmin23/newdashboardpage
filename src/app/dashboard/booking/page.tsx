import BookingList from '@/components/booking_component/booking_list'
import ListUser from '@/components/booking_component/list_user'
import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function Booking(props: Props) {
    const {} = props

    return (
        <Box width={"full"} > 
            <ListUser />
            <BookingList />
        </Box>
    )
}

export default Booking
