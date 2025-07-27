import { ICommunityRequest } from '@/models/Communitty'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { textLimit } from '@/utils/textlimit';
import CustomText from '@/components/general/Text';
import CommunityRequestBtn from '@/components/sharedComponent/CommunityRequestBtn';
import UserImage from '@/components/sharedComponent/userimage';
import { color } from 'framer-motion';

interface IProps {
  community: ICommunityRequest;
  setIndex: any
}

function RequestCard({ community, setIndex }: IProps) {

  // console.log(community);
  // const [Index, setIndex] = useState("0")

  return (
    <Flex width={"full"} alignItems={"center"} gap={"4"} >
      <Flex w={"fit-content"} >
        <UserImage data={community?.createdBy} image={community?.createdBy?.data?.imgMain?.value} size={"40px"} font={"20px"} />
      </Flex>
      <Flex flexDirection={"column"} pos={"relative"} >
        <CustomText fontFamily={'Satoshi-Bold'} fontSize={'16px'}>{textLimit(capitalizeFLetter(community?.createdBy?.firstName) + " " + capitalizeFLetter(community?.createdBy?.lastName), 20)}</CustomText>
        <CustomText fontFamily={'Satoshi-Regular'} fontSize={'14px'}>Request to join <span style={{color: "#5D70F9"}} >{community?.group?.data?.name}</span></CustomText>
      </Flex>
      <Flex ml={"auto"} w={"fit-content"}>
        <CommunityRequestBtn index={community?.id} data={community} setIndex={setIndex} />
      </Flex>
    </Flex> 
  )
}

export default RequestCard