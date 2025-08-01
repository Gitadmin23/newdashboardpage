
'use client';
import CustomText from '@/components/general/Text'
import { Box, HStack, Spinner, VStack, InputGroup, InputLeftElement, Input, Image, Grid, GridItem, Button, useToast, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FiBell, FiChevronLeft, FiDownloadCloud, FiEdit2, FiLink, FiLogIn, FiSettings } from 'react-icons/fi'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, URLS } from '@/services/urls';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { ICommunity, ICommunityMember } from '@/models/Communitty';
import { IUser } from '@/models/User';
import SettingsChip from '@/components/Community/SettingsChip';
import { THEME } from '@/theme';
import MemberCard from '@/components/Community/MemberCard';
import { IMediaContent } from '@/models/MediaPost';
import { FILE_FORMATS } from '@/utils/acceptedMediatypes';
import { useDetails } from '@/global-state/useUserDetails';
import { uniqBy } from 'lodash';
import ShareEvent from '@/components/sharedComponent/share_event';
import { useSearchParams } from 'next/navigation'
import { useShareState } from '../state';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import CommunityImage from '@/components/sharedComponent/community_image';
import PeopleCard from '@/components/search_component/other_components/people_card';
import { textLimit } from '@/utils/textlimit';
import { capitalizeFLetter } from '@/utils/capitalLetter';


function ShareCommunity() {
  const query = useSearchParams();
  const type = query?.get('type');
  const typeID = query?.get('typeID');
  const [details, setDetails] = React.useState<ICommunity | null>(null);
  const [members, setMembers] = React.useState<ICommunityMember[]>([]);
  const [posts, setPosts] = React.useState<IMediaContent[]>([])
  const [search, setSearch] = React.useState('');
  const [mediaTab, setMediaTab] = React.useState(1);
  const router = useRouter();
  const userId = localStorage.getItem('user_id')?.toString()

  const admin = userId === details?.creator?.userId;
  const toast = useToast();
  const { setAll } = useShareState((state) => state)

  // query
  const community = useQuery(['getCommunity', typeID], () => httpService.get(`${URLS.GET_GROUP_BY_ID}`, {
    params: {
      groupID: typeID,
    }
  }), {
    enabled: typeID !== null || typeID !== undefined,
    onSuccess: (data) => {
      const item: PaginatedResponse<ICommunity> = data.data;
      setDetails(item.content[0]);
    }
  });
  const joinGroup = useMutation({
    mutationFn: () => httpService.post(`${URLS.JOIN_GROUP}`, {
      groupID: typeID,
      joinID: userId,
    }),
    onSuccess: (data) => {

      console.log(data);

      toast({
        title: 'Success',
        description: details?.data?.isPublic ? "You have joined this group" : data?.data?.message,
        status: 'success',
        duration: 4000,
        position: 'top-right',
      });
      router.push(`/dashboard/community?activeID=${typeID}`)
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: 'An Error occured while you where trying to join the community',
        status: 'error',
        duration: 4000,
        position: 'top-right',
      });
    }
  })
  const userIdn = localStorage.getItem('user_id');

  console.log(userIdn);
  console.log(userId);

  const handleJoin = () => {
    if (!userId || userId === '') {
      toast({
        title: 'Warning',
        description: 'You have to login to continue',
        status: 'warning',
        duration: 4000,
        position: 'top-right',
      });
      setAll({ type: type as any, typeID: typeID as any });
      sessionStorage.setItem('type', type as string);
      sessionStorage.setItem('typeID', typeID as string);
      router.push(`/share/auth/login?type=${type}&typeID=${typeID}`)
    } else {
      joinGroup.mutate() 
    }
  }

  return (
    <Flex w={"full"} bgColor={"white"} alignItems={"center"} flexDir={"column"} py={"10"} h={"100vh"} overflowY={"auto"} >
      <LoadingAnimation loading={community?.isLoading} refeching={community?.isRefetching} >
        <Flex maxW={"400px"} w={"full"} gap={"5"} alignItems={"center"} flexDirection={"column"}  >
          <Flex p={"8"} roundedBottom={"32px"} roundedTopLeft={"32px"} borderWidth={"1px"} alignItems={"center"} flexDir={"column"} w={"full"} >
            <Box w={"fit-content"} pos={"relative"} >
              <CommunityImage src={details?.data?.imgSrc} rounded='36px' size={"150px"} />
            </Box>
            <Text fontWeight={"700"} fontSize={"18px"} mt={"2"} >{details?.data?.name}</Text>
            <Text fontWeight={"400"} textAlign={"justify"} fontSize={"14px"} >{textLimit(capitalizeFLetter(details?.data?.description), 200)}</Text>
            <Text color={"#2E2B2BB2"} fontSize={"12px"} >{details?.data?.memberCount} Members</Text>
          </Flex>
          <Box rounded={"2px"} bg={details?.data?.isPublic ? "brand.chasescrollPalePurple" : "#FBCDCD"} fontWeight={"semibold"} color={details?.data?.isPublic ? "brand.chasescrollBlue" : "#E90303"} fontSize={"12px"} py={"1"} display={"flex"} justifyContent={"center"} width={"70px"} >
            {details?.data?.isPublic ? 'Public' : 'Private'}
          </Box>
          <Flex w={"full"} rounded={"32px"} maxH={"309px"} overflowY={"auto"} borderWidth={"1px"} p={"4"} borderColor={"#D0D4EB"} flexDir={"column"}  >
            <PeopleCard community={true} role={"ADMIN"} search={true} person={details?.creator} />
          </Flex>
          {(details?.joinStatus !== "CONNECTED") && (
            <Button width='100%' maxW={"300px"} height='45px' mt={"3"} borderRadius='16px' _hover={{ backgroundColor: "brand.chasescrollButtonBlue" }} isLoading={joinGroup.isLoading} type='button' variant={'solid'} bg='brand.chasescrollButtonBlue' color='white' onClick={handleJoin}>Join Community</Button>
          )}
          {(details?.joinStatus === "CONNECTED") && (
            <Button width='100%' maxW={"300px"} height='45px' mt={"3"} borderRadius='16px' _hover={{ backgroundColor: "brand.chasescrollButtonBlue" }} isLoading={joinGroup.isLoading} type='button' variant={'solid'} bg='brand.chasescrollButtonBlue' color='white' onClick={() => router.push(`/dashboard/community?activeID=${typeID}`)}>View Community</Button>
          )}
        </Flex>
      </LoadingAnimation>

    </Flex>
  )
}

export default ShareCommunity