'use client';
import CustomText from '@/components/general/Text';
import { Box, Button, Checkbox, HStack, Radio, VStack } from '@chakra-ui/react';
import React from 'react'
import { FiChevronLeft } from 'react-icons/fi';

function CreatePromotion() {
  return (
   <Box width='100%' height='100%' overflowY={'auto'}>
    <VStack width='100%' height='100%' padding={['20px','30px']} alignItems={'flex-start'}>
        <VStack alignItems={'flex-start'} width={['100%', '40%']} height={'auto'} bg='white' padding={'10px'} spacing={6}>
            <HStack width='100%' alignItems={'center'}>
                <FiChevronLeft size='20px' />
                <CustomText marginLeft={'20px'} fontFamily={'DM-Bold'} fontSize={'20px'} color={'black'}>Promotion</CustomText>
            </HStack>

            <Box width='100%' height={'196px'} borderRadius={'36px 0px 36px 36px'} bg='whitesmoke'></Box>

            <HStack width='100%' justifyContent={'space-between'}>
                <CustomText fontFamily={'DM-Medium'} fontSize={'22px'} color='black'>Netfliex Oscar Award</CustomText>
                <HStack>
                    <Box width='30px' height={'30px'} borderRadius={'15px'} bg='whitesmoke'></Box>
                    <Box width='30px' height={'30px'} borderRadius={'15px'} bg='whitesmoke'></Box>
                    <Box width='30px' height={'30px'} borderRadius={'15px'} bg='whitesmoke'></Box>
                </HStack>
            </HStack>

            <CustomText fontSize={'18px'} color='brand.chasescrollButtonBlue' fontFamily={'DM-Regular'}>$100 - 700</CustomText>

            <HStack>
                <Box width='58px' height={'58px'} borderRadius={'36px 0px 36px 36px'} bg='whitesmoke' />
                <VStack spacing={0} alignItems={'flex-start'}>
                    <CustomText fontFamily={'DM-Medium'} color='black' fontSize={'18px'}>Organizer</CustomText>
                    <CustomText fontFamily={'DM-Light'} fontSize={'14px'} color='grey'>Netflix</CustomText>
                </VStack>
            </HStack>
            
            <HStack>
                <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'black'}>About this event</CustomText>
            </HStack>

            <CustomText fontFamily={'DM-Regular'} color={'grey'} fontSize={'14px'}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo asperiores iste eos consequatur quibusdam non ipsam quos, facilis minus dolorem eum voluptas quaerat pariatur dicta, doloribus obcaecati! Alias tempore facilis, saepe eius perferendis architecto laudantium.
            </CustomText>

            <Box width='100%' height={'auto'} borderRadius={'10px'} borderWidth={'0.5px'} borderColor={'grey'} paddingX={'10px'}>

                <HStack borderBottomWidth={'0.5px'} borderBottomColor={'grey'} justifyContent={'space-between'} alignItems={'center'} paddingY={'10px'}>
                    <VStack alignItems={'flex-start'} spacing={0}>
                        <CustomText color={'black'} fontFamily={'DM-Medium'} fontSize={'18px'}>3 Days Cost $32</CustomText>
                        <CustomText  color='grey' fontFamily={'DM-Regular'} fontSize={'14px'}>Estimated reach cost daily $1.4</CustomText>
                    </VStack>

                    <Radio size={'md'}name='price' />
                </HStack>

                <HStack borderBottomWidth={'0.5px'} borderBottomColor={'grey'} justifyContent={'space-between'} alignItems={'center'} paddingY={'10px'}>
                    <VStack alignItems={'flex-start'} spacing={0}>
                        <CustomText color={'black'} fontFamily={'DM-Medium'} fontSize={'18px'}>7 Days Cost $32</CustomText>
                        <CustomText  color='grey' fontFamily={'DM-Regular'} fontSize={'14px'}>Estimated reach cost daily $1.4</CustomText>
                    </VStack>

                    <Radio size={'md'} name='price' />
                </HStack>

                <HStack borderBottomWidth={'0px'} borderBottomColor={'grey'} justifyContent={'space-between'} alignItems={'center'} paddingY={'10px'}>
                    <VStack alignItems={'flex-start'} spacing={0}>
                        <CustomText color={'black'} fontFamily={'DM-Medium'} fontSize={'18px'}>14 Days Cost $32</CustomText>
                        <CustomText  color='grey' fontFamily={'DM-Regular'} fontSize={'14px'}>Estimated reach cost daily $1.4</CustomText>
                    </VStack>

                    <Radio size={'md'} name='price' />
                </HStack>

            </Box>

            <Button width='100%' height='50px' borderRadius='5px' bg='#5D70F9' color='white'>Promote Event</Button>

            <HStack alignItems={'center'}>
                <Checkbox />
                <CustomText fontSize={'14px'} color='grey' fontFamily={'DM-Light'}>
                    Acccept the <span style={{ color:'#5D70F9' }}>Terms and conditions</span> of this service
                </CustomText>
            </HStack>

        </VStack>
    </VStack>
   </Box>
  )
}

export default CreatePromotion