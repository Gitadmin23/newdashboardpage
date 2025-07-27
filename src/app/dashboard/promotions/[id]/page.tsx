'use client';
import CustomText from '@/components/general/Text';
import { Box, Button, HStack, Select, VStack } from '@chakra-ui/react';
import React from 'react'
import { FiChevronRight } from 'react-icons/fi';

function Promotion() {
  return (
   <Box width='100%' height='100%' bg='white' overflowY={'auto'}>
        <HStack width={'100%'} height='100%' justifyContent={'center'}>
            <VStack width={['100%', '30%']} height='100%' bg='white' alignItems={'flex-start'} paddingY='50px' spacing={6} paddingX={['20px', '0px']}>

                {/* FIRST BOX */}
                <VStack borderRadius={'20px'} bg='whitesmoke' width='100%' height='auto' alignItems={'flex-start'} padding={'20px'}>

                    <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color='black'>Promotion</CustomText>

                    <HStack width='100%' justifyContent={'space-between'} alignItems={'center'}>
                        <Select bg='whitesmoke' width='150px' borderWidth={'0px'} padding='0px'>
                            <option>Last 3 days</option>
                        </Select>

                        <Select  width={'150px'}height={'45px'} borderRadius={'15px'} bg='white'>
                            <option>Business</option>
                            <option>Post</option>
                            <option>Community</option>
                            <option>Event</option>
                        </Select>
                    </HStack>

                    <CustomText fontFamily={'DM-Medium'} fontSize={'20px'} color={'black'}>$150</CustomText>

                    {/* CANDLE STICK SECTION */}

                    <HStack width='100%' justifyContent={'center'} alignItems={'flex-end'} spacing={6}>
                        <VStack spacing={0}>
                            <CustomText fontFamily={'DM-Regular'} fontSize={'14px'} color='grey'>50k</CustomText>
                            <Box width={'34px'} height={'70px'} borderRadius={'25px'} bg='#5D70F9' />
                            <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color='black'>S</CustomText>
                        </VStack>

                        <VStack spacing={0}>
                            <CustomText fontFamily={'DM-Regular'} fontSize={'14px'} color='grey'>50k</CustomText>
                            <Box width={'34px'} height={'100px'} borderRadius={'25px'} bg='#5D70F9' />
                            <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color='black'>M</CustomText>
                        </VStack>

                        <VStack spacing={0}>
                            <CustomText fontFamily={'DM-Regular'} fontSize={'14px'} color='grey'>50k</CustomText>
                            <Box width={'34px'} height={'120px'} borderRadius={'25px'} bg='#5D70F9' />
                            <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color='black'>T</CustomText>
                        </VStack>
                    </HStack>
                </VStack>

                {/* END OF FIRST BOX */}

                <Box width='100%'>
                    <HStack width='100%' justifyContent={'space-between'} alignItems={'center'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color='black'>Promotions</CustomText>
                        <FiChevronRight size={'20px'} color='black' />
                    </HStack>

                    <CustomText>Status: <span style={{ color: 'green' }}>Completed</span>. Promotions made by Event Organizer  
                        Netflix On 23rd May at 02:23am   Duration: 7days </CustomText>
                </Box>

                <HStack width='100%' height='100px' justifyContent={'space-between'}>
                    <VStack width={'47%'} height={'100%'} borderRadius={'20px'} bg='whitesmoke' alignItems={'center'} justifyContent={'center'}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'14px'} color='grey'>People Reached</CustomText>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color='black'>120K</CustomText>
                    </VStack>

                    <VStack width={'47%'} height={'100%'} borderRadius={'20px'} bg='whitesmoke' alignItems={'center'} justifyContent={'center'}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'14px'} color='grey'>Engagements</CustomText>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color='black'>120K</CustomText>
                    </VStack>
                </HStack>
                
                <VStack bg='#EFF1FF' width='100%' borderRadius='20px'height={'auto'}padding='20px' alignItems={'flex-start'}>
                    <CustomText fontFamily={'DM-Bold'} fontSize={'16px'} color='black'>📢  Attention Business Owners 🚀 </CustomText>
                    <CustomText fontSize={'14px'} fontFamily={'DM-Regular'} color='grey'>
                    Ready to take your business to new heights?  Looking to expand your reach and attract more customers? Its time to unleash the power of promotion and watch your success soar!
                    </CustomText>
                </VStack>

                <Button width='100%' height={'50px'} borderRadius={'5px'} color='white' bg='#5D70F9'>Promote Again</Button>


            </VStack>
        </HStack>
   </Box>
  )
}

export default Promotion