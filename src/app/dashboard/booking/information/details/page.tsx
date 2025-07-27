import InformationTab from '@/components/booking_component/detail_component/information_tab'
import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function BookingDetails(props: Props) {
    const {} = props

    return (
        <Box width={"full"} >
            <InformationTab />
        </Box>
    )
}

export default BookingDetails
