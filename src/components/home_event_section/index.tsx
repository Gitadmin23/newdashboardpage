import { Box } from '@chakra-ui/react'
import React from 'react'
import EventCategory from '../event_component/event_category'
import HomeCarousel from './home_carousel'
import EventListing from '../event_component/event_listing'

interface Props { }

function HomeEventSection(props: Props) {
    const { } = props

    return (
        <Box width={"full"}>
            <HomeCarousel />
            <EventListing />
        </Box>
    )
}

export default HomeEventSection
