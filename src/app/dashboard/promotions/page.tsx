'use client';
import TabOne from '@/components/Report/TabOne';
import TabTwo from '@/components/Report/TabTwo';
import CustomText from '@/components/general/Text';
import PromotionCreationModal from '@/components/modals/promotions/CreatePromitionModal';
import { Box, HStack, VStack } from '@chakra-ui/react';
import React from 'react'
import { FiX } from 'react-icons/fi';

function Report() {
    const [currenTab, setCurrenTab] = React.useState(1);

  return (
    <Box width='100%' height={'100%'} paddingX={['10px', '50px']} >
        
        <HStack width={'100%'} height={'100%'} justifyContent={'center'}>
           <VStack width={['100%', '50%']} height={'100%'} >

                 {/* HEADER SECTION */}
                <HStack width='70%' height='40px' alignItems={'center'} justifyContent={'space-between'} >
                    <FiX size='25px' />
                    <CustomText fontFamily={'DM-Medium'} fontSize={'25px'} marginLeft='20px' >Report Dashboard</CustomText>
                </HStack>

                <HStack marginTop={'20px'} width='100%' height='45px' justifyContent={'center'} >
                    <HStack width={'70%'} height={'100%'} padding='5px' alignItems={'flex-start'} borderRadius={'10px'} bg='whitesmoke'>
                        <VStack cursor={'pointer'} onClick={() => setCurrenTab(1)} flex='1' height='100%' justifyContent={'center'} alignItems={'center'} bg={currenTab === 1 ?'white':'whiitesmoke'} borderRadius={'10px'}>
                            <CustomText color={currenTab === 1 ?'brand.chasescrollBlue':'grey'} >Transactions</CustomText>
                        </VStack>

                        <VStack cursor={'pointer'} onClick={() => setCurrenTab(2)} flex='1' height='100%' justifyContent={'center'} alignItems={'center'} bg={currenTab === 2 ?'white':'whiitesmoke'} borderRadius={'10px'}>
                            <CustomText color={currenTab === 2 ?'brand.chasescrollBlue':'grey'}>Promotions</CustomText>
                        </VStack>
                    </HStack>
                </HStack>

                {/* end of header section */}
                <Box flex='1' overflowY={'auto'} width='100%'>
                    { currenTab === 1 && <TabOne /> }
                    { currenTab === 2 && <TabTwo /> }
                </Box>

           </VStack>
        </HStack>


    </Box>
  )
}

export default Report