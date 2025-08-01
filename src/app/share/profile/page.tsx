"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import GetProfile from '@/app/olddashboard/profile/get_profile'
import ProfileHeader from '@/components/profile_component/profile_header';
import ProfileImage from '@/components/profile_component/profile_image';
import { Box } from '@chakra-ui/react';

function ShareProfile() {
  const query = useSearchParams();
  const type = query?.get('type');
  const typeID: any = query?.get('typeID');
  return (
    <Box width={"full"} overflowY={"auto"} >
      <ProfileImage user_index={typeID} />
      <ProfileHeader user_index={typeID} />
      <GetProfile profile_index={typeID} />
    </Box>
  )
}

export default ShareProfile