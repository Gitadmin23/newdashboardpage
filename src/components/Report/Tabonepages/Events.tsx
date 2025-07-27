import { Box } from '@chakra-ui/react'
import React from 'react'
import ReportEventCard from '../ReportEventCard'

function Events() {
  return (
    <Box width='100%' height='100%'>
      <ReportEventCard />
      <ReportEventCard />
      <ReportEventCard />
      <ReportEventCard />
      <ReportEventCard />
    </Box>
  )
}

export default Events