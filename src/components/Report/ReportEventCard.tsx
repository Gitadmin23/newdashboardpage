import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text'
import { FiCalendar, FiMapPin, FiMoreHorizontal } from 'react-icons/fi'
import { THEME } from '@/theme'

function ReportEventCard() {
  return (
    <HStack borderWidth={'0.5px'} borderColor={'lightgrey'} borderRadius={'32px 0px 32px 32px'} width='90%' height={'206px'} padding='5px' marginBottom={'20px'}>

        <Box flex='1' height={'100%'} borderRadius={'32px 0px 32px 32px'} bg='whitesmoke'></Box>

        <VStack flex='1' height={'100%'} justifyContent={'center'} >
            <HStack justifyContent={'space-between'} width='100%'>
                <CustomText fontFamily={'DM-Medium'} fontSize={'20px'}>Libero interdum</CustomText>
                <FiMoreHorizontal />
            </HStack>

            <HStack width='100%'>
                <FiCalendar />
                <CustomText fontFamily={'DM-Light'} fontSize={'16px'}>Libero interdum</CustomText>
            </HStack>

            <HStack width='100%'>
                <FiMapPin color={THEME.COLORS.chasescrollButtonBlue} />
                <CustomText fontFamily={'DM-Light'} fontSize={'16px'} color='brand.chasescrollButtonBlue'>State farm area ATL</CustomText>
            </HStack>

            <HStack width='100%'>
                <CustomText fontFamily={'DM-Light'} fontSize={'16px'} color='black'>Category :</CustomText>
                <CustomText fontFamily={'DM-Light'} fontSize={'16px'} color='brand.chasescrollButtonBlue'>Movie</CustomText>

                <Button variant={'outline'} outline={'0px'} borderWidth={'0.5px'} bg='whitesmoke' color="brand.chasescrollButtonBlue" size={'sm'}>View Report</Button>
            </HStack>
        </VStack>
    </HStack>
  )
}

export default ReportEventCard