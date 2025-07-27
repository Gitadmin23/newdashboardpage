import { useCommunityPageState } from '@/components/Community/chat/state';
import CustomText from '@/components/general/Text'
import ReportCommunityModal from '@/components/modals/community/ReportCommunityModal';
import { useDetails } from '@/global-state/useUserDetails';
import { IEvent } from '@/models/Events';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls';
import { THEME } from '@/theme';
import httpService from '@/utils/httpService';
import { IoClose } from 'react-icons/io5';
import {
  HStack, VStack, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
  Spinner,
  useToast,
  Link, useColorMode, Flex, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Button, Text
} from '@chakra-ui/react'
import { uniqBy } from 'lodash';
import React, { useState } from 'react'
import { FiCalendar, FiPlusSquare, FiX } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ArrowLeft2 } from 'iconsax-react'
import ShareEvent from '@/components/sharedComponent/share_event';
import useCustomTheme from "@/hooks/useTheme";
import CustomButton from '@/components/general/Button';
import { useRouter } from 'next/navigation';
import { EditButton, EditIcon } from '@/components/svg';
import CommunityInfo from '../communityInfo';
import { IoArrowBack } from 'react-icons/io5';
import EditComunity from '../communityInfo/editComunity';
import { useCommunity } from '..';
import { textLimit } from '@/utils/textlimit';
import { capitalizeFLetter } from '@/utils/capitalLetter';



function CommunityChatHeader() {
  const { activeCommunity, setAll, events, eventHasNext, eventPageNumber, showEvents } = useCommunityPageState((state) => state);
  const { userId } = useDetails((state) => state);
  const [showModal, setShowModal] = React.useState(false);

  const { communityEvent } = useCommunity()

  const [open, setOpen] = useState(false)

  const [tab, setTab] = useState(false)

  const {
    bodyTextColor,
    headerTextColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex width='100%' height={'72px'} bg={mainBackgroundColor} alignItems={"center"} borderBottomWidth={'0.5px'} borderBottomColor={borderColor} paddingX={['0px', '20px']} justifyContent={'space-between'}>

      {/* {MODAL} */}
      <ReportCommunityModal isOpen={showModal} onClose={() => setShowModal(false)} typeID={activeCommunity?.id as string} REPORT_TYPE='REPORT_COMMUNITY' />
      <Flex gap={"3"} >
        <Box onClick={() => setAll({ activeCommunity: null })} as='button' display={["block", "block", "none", "none", "none"]} >
          <IoArrowBack size={"20px"} />
        </Box >
        <Box w={"42px"} h={"42px"} ml={"2"} bgColor={"ButtonText"} borderWidth={'1px'} borderBottomLeftRadius={'20px'} borderBottomRadius={'20px'} borderTopLeftRadius={'20px'} overflow={'hidden'}>
          <Image src={`${activeCommunity?.data?.imgSrc?.includes("http") ? "" : IMAGE_URL}${activeCommunity?.data?.imgSrc}`} alt='image' style={{ width: '100%', height: '100%', objectFit: "cover" }} />
        </Box>
        <VStack alignItems={'flex-start'} spacing={0}>
          <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} >{textLimit(capitalizeFLetter(activeCommunity?.data?.name), 12)}</CustomText>
          <VStack width='67px' height='21px' borderRadius={'4px'} justifyContent={'center'} alignItems={'center'} bg='#D0D4EB52' >
            <CustomText fontSize={'10px'} color={colorMode === 'light' ? 'brand.chasescrollButtonBlue' : bodyTextColor} fontFamily={'DM-Regular'}>{activeCommunity?.data.memberCount} Members</CustomText>
          </VStack>
          {/* <CustomText fontFamily={'DM-Regular'} fontSize={'12px'}>{activeCommunity?.data.memberCount} Members</CustomText> */}
        </VStack>
      </Flex>

      <Flex alignItems={"center"} gap={"4"} >
        <CustomButton onClick={() => setOpen(true)} text={"Details"} fontSize={"sm"} width={"113px"} borderWidth={"1px"} borderColor={borderColor} borderRadius={"full"} backgroundColor={mainBackgroundColor} color={headerTextColor} />
        {communityEvent.length > 0 && (
          <Box onClick={() => setAll({ showEvents: !showEvents })} cursor='pointer' position={'relative'} marginRight={'10px'} >
            {showEvents ? (
              <Box rounded={"full"} p={"6px"} borderWidth={"1px"} borderColor={"red"} >
                <IoClose color={"red"} />
              </Box>
            ) : (
              <Image src='/assets/images/note-add.png' alt='logo' width={'30px'} height={'30px'} />
            )}
            {!showEvents && (
              <VStack justifyContent={'center'} alignItems={'center'} zIndex={'10'} position={'absolute'} top='-15px' right='-15px' bg='white' width='30px' height='30px' borderRadius={'15px'} shadow={'lg'}>
                <CustomText fontFamily={'DM-Bold'} fontSize={'14px'} color='red'>{communityEvent.length}</CustomText>
              </VStack>
            )}

          </Box>
        )}
      </Flex>

      <Drawer isOpen={open} onClose={() => setOpen(false)} placement='right' size={'sm'}>
        <DrawerOverlay />
        <DrawerContent bg={secondaryBackgroundColor}>
          <DrawerHeader >
            <Flex justifyContent={'space-between'}>
              <Box onClick={() => setTab((prev) => !prev)} as='button' >
                {tab && (
                  <IoArrowBack size={"20px"} />
                )}
              </Box>
              <CustomText fontWeight={"700"} >{!tab ? "Community info" : "Edit Community"}</CustomText>

              <Box as='button' onClick={() => setOpen(false)}  >
                {!tab && (
                  <FiX fontSize='25px' color={THEME.COLORS.chasescrollButtonBlue} />
                )}
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            {!tab && (
              <CommunityInfo setTab={setTab} />
            )}
            {tab && (
              <EditComunity />
            )}
          </DrawerBody>

        </DrawerContent>
      </Drawer>

    </Flex>
  )
}

export default CommunityChatHeader