'use client';
import MainArea from '@/components/Chat/MainArea';
import Sidebar from '@/components/Chat/Sidebar';
import { useChatPageState } from '@/components/Chat/state';
import useCustomTheme from '@/hooks/useTheme';
import { Box, HStack, useColorMode, VStack } from '@chakra-ui/react';
import React from 'react'

function Chat() {
  const { activeChat } = useChatPageState((state) => state);
  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
} = useCustomTheme();
const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack flex={1} width={'100%'} height='' spacing={0} padding='5px' >
        {/* BIG SCREEN */}
        <HStack width='100%' height='100%' display={['none', 'flex']} spacing={0} alignItems={'flex-start'}>

          <Box flex={0.25} overflow={'hidden'} height='100%' borderRightColor={borderColor} borderRightWidth={activeChat !== null ?'0.5px':'0px'}  bg={mainBackgroundColor} >
            <Sidebar />
          </Box>
          <Box flex={0.75} overflow={'hidden'} height={['100%', '100%']} borderWidth={activeChat !== null ? 0:0.5}  borderColor={colorMode === 'light' ? 'brand.chasescrollButtonBlue':borderColor}  borderRadius={activeChat !== null ? '0px':'20px'}>
            <MainArea />
          </Box>

        </HStack>
        
        {/* SMALL SCREEN */}
        <HStack flex={1} width='100%' height='100%' display={['flex', 'none']} alignItems={'flex-start'}>
          { activeChat === null && (
            <Box width={'100%'} height={'100%'} borderRightColor={'lightgrey'} bg={mainBackgroundColor}  borderRightWidth={activeChat !== null ?'1px':'0px'} >
              <Sidebar />
          </Box>
          )}
        {
          activeChat !== null && (
            <VStack spacing={0} flex={1} height='100%' borderWidth={activeChat !== null ? 0:1}  borderColor={'brand.chasescrollButtonBlue'}  borderRadius={activeChat !== null ? '0px':'20px'}>
                <MainArea />
            </VStack>
          )
        }
        </HStack>
    </HStack>
  )
}

export default Chat