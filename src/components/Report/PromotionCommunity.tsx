import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text'
import { FiCalendar, FiMapPin, FiMoreHorizontal } from 'react-icons/fi'
import { THEME } from '@/theme'

function PromotionCommunityCard() {
  return (
    <HStack borderWidth={'0.5px'} borderColor={'lightgrey'} borderRadius={'32px 0px 32px 32px'} width='90%' height={'206px'} padding='5px' marginBottom={'20px'}>

        <Box width='143px'  height={'143px'} borderRadius={'1308.93px 0px 1308.93px 1308.93px'} bg='whitesmoke'></Box>

        <HStack spacing={3} paddingRight={'20px'} flex='1' height={'100%'} justifyContent={'space-between'} alignItems={'center'} >

            <VStack alignItems={'flex-start'} width='100%'>
                <CustomText fontFamily={'DM-Medium'} fontSize={'20px'}>Libero interdum</CustomText>

                <CustomText color="brand.chasescrollButtonBlue" fontSize={'12px'}>Community Description</CustomText>

                <HStack width='100%'>
                    <CustomText fontFamily={'DM-Light'} fontSize={'14px'}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by inject etc.</CustomText>
                </HStack>
            </VStack>

            <Button size="sm" color="brand.chasescrollButtonBlue" outline={'0px'}  variant={'outline'} borderWidth={'0.5px'} bg='whitesmoke' outlineOffset={'0.5px'} outlineColor={'grey'}>View Report</Button>


        </HStack>

    </HStack>
  )
}

export default PromotionCommunityCard