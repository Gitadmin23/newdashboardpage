import { ICommunityRequest } from '@/models/Communitty'
import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import CustomText from '../general/Text';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import UserImage from '../sharedComponent/userimage';
import EventImage from '../sharedComponent/eventimage';
import { textLimit } from '@/utils/textlimit';
import { capitalize } from 'lodash';
import CommunityRequestBtn from '../sharedComponent/CommunityRequestBtn';

interface IProps {
  community: ICommunityRequest;
}

function RequestCard({ community }: IProps) {

  // console.log(community);
    const [Index, setIndex] = useState("0") 

  return ( 
    <Flex width={"fit-content"} alignItems={"center"} >
      <UserImage data={community?.createdBy} image={community?.createdBy?.data?.imgMain?.value} size={"70px"} />
      <Flex ml={"4"} flexDirection={"column"} gap={"2"} pos={"relative"} >
        <CustomText fontFamily={'Satoshi-Bold'} fontSize={'20px'}>{textLimit(capitalizeFLetter(community?.createdBy?.firstName) + " " + capitalizeFLetter(community?.createdBy?.lastName), 20)}</CustomText>
        <CustomText fontFamily={'Satoshi-Regular'} fontSize={'16px'}>{textLimit(capitalizeFLetter(community?.createdBy?.username), 20)}</CustomText>
        <CommunityRequestBtn data={community} index={community?.id} setIndex={setIndex} />
      </Flex>
    </Flex>
  )
}

export default RequestCard