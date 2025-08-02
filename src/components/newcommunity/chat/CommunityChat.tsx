'use client';
import MainArea from '@/components/Community/chat/MainArea';
import Sidebar from '@/components/Community/chat/Sidebar';
import CustomText from '@/components/general/Text';
import {
  Box, HStack, VStack, Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Textarea,
  Spinner, Image, useColorMode
} from '@chakra-ui/react';
import React from 'react'
import { useCommunityPageState } from './state';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { IComment } from '@/models/Comment';
import { FiSend, FiSmile, FiX } from 'react-icons/fi';
import { THEME } from '@/theme';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import CommentCard from '@/components/Community/chat/CommentCard';
import EmojiPicker from 'emoji-picker-react';
import useCustomTheme from "@/hooks/useTheme";

function CommunityChat() {
  const [comment, setComment] = React.useState<string>('');
  const [showEmoji, setShowEmoi] = React.useState(false);
  const intObserver = React.useRef<IntersectionObserver>(null);
  const queryClient = useQueryClient();

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const { drawerOpen, setAll, activeCommunity, activeMessageId, commentHasNext, commentPage, comments } = useCommunityPageState((state) => state);

  console.log(drawerOpen);

  return (
    <HStack flex={1} height='100%' spacing={0} padding='5px' alignItems={'flex-start'}>

      {/* BIG SCREEN */}
      <HStack width='100%' height='100%' display={['none', 'flex']} spacing={0} alignItems={'flex-start'}>

        <Box width='30%' height='100%' borderRightColor={'lightgrey'} borderRightWidth={activeCommunity !== null ? '1px' : '0px'} >
          <Sidebar />
        </Box>
        <Box flex={1} height='100%' bg={secondaryBackgroundColor} borderWidth={activeCommunity !== null ? 0 : 1} borderColor={colorMode === 'light' ? 'brand.chasescrollButtonBlue' : borderColor} borderRadius={activeCommunity !== null ? '0px' : '20px'}>
          <MainArea />
        </Box>

      </HStack>

      {/* SMALL SCREEN */}
      <HStack flex={1} width='100%' height='100%' display={['flex', 'none']} alignItems={'flex-start'}>
        {activeCommunity === null && (
          <Box width={'100%'} height={'100%'} borderRightColor={'lightgrey'} borderRightWidth={activeCommunity !== null ? '1px' : '0px'} >
            <Sidebar />
          </Box>
        )}
        {
          activeCommunity !== null && (
            <VStack spacing={0} flex={1} height='100%' bg={secondaryBackgroundColor} borderWidth={activeCommunity !== null ? 0 : 1} borderColor={colorMode === 'light' ? 'brand.chasescrollButtonBlue' : borderColor} borderRadius={activeCommunity !== null ? '0px' : '20px'}>
              <MainArea />
            </VStack>
          )
        }
      </HStack>
    </HStack>
  )
}

export default CommunityChat