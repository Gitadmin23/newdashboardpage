import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import EventCard from '../Community/chat/EventCard';
import ReportEventCard from './ReportEventCard';
import Events from './Tabonepages/Events';
import Business from './Tabonepages/Business';
import Community from './Tabonepages/Community';

function TabOne() {
    const [tab, seTab] = React.useState(1);

    const handleChange = React.useCallback(() => {
      switch(tab) {
        case 1: {
          return <Events />
        }
        case 2: {
          return <Business />
        }
        case 3: {
          return <Community pageType='TRANSACTION' />
        }
      }
    }, [tab])
  return (
    <Box width='100%' height={'auto'}>
       <VStack width='100%' alignItems={'center'}>

       <HStack width='70%' height={'50px'} borderBottomWidth={'0.1px'} borderBottomColor={'lightgrey'} justifyContent={'center'}>

            <Flex onClick={() => seTab(1)} alignItems={'center'} justifyContent={'center'} cursor='pointer' _hover={{ backgroundColor: 'whitesmoke' }} borderBottomWidth={tab === 1 ? '2px' : '0px'} borderBottomColor={'black'}>EVENT</Flex>

            <Flex onClick={() => seTab(2)} alignItems={'center'} justifyContent={'center'} marginX={['10px', '50px']} cursor='pointer' _hover={{ backgroundColor: 'whitesmoke' }} borderBottomWidth={tab === 2 ? '2px' : '0px'} borderBottomColor={'black'}>BUSINESS</Flex>

            <Flex onClick={() => seTab(3)} alignItems={'center'} justifyContent={'center'} cursor='pointer' _hover={{ backgroundColor: 'whitesmoke' }} borderBottomWidth={tab === 3 ? '2px' : '0px'} borderBottomColor={'black'}>COMMUNITY</Flex>

        </HStack>

        <Box flex='1' width='100%' overflowY={'auto'} overflowX={'hidden'}>
          {handleChange()}
        </Box>

       </VStack>
    </Box>
  )
}

export default TabOne