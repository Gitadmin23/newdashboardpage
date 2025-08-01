'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { VStack, Box, Spinner } from '@chakra-ui/react'
import { IMediaContent, IMediaPost } from '@/models/MediaPost';
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import CustomText from '@/components/general/Text';
import ThreadCard from '@/components/home/ThreadCard';
import { PostCard } from '@/components/new_home_component';


function SharePost() {
  const query = useSearchParams();
  const type = query?.get('type');
  const typeID = query?.get('typeID');

  const [post, setPost] = React.useState<IMediaContent|null>(null)
  const { isLoading, isError } = useQuery(['get-single-post', typeID], () => httpService.get(`${URLS.GET_SINGLE_POST}/${typeID}`), {
    onSuccess: (data) => {
      console.log(data.data);
      setPost(data?.data);
    },
    onError: (error) => {
      alert('An error occured');
    }
  })
  return (
    <VStack width='100%' height={'100%'} alignItems={'center'}>
      <Box width={['100%', '450px']} pt={"5"} height='100%'>
        { isLoading && (
          <VStack width='100%' height='300px' justifyContent={'center'} alignItems={'center'}>
            <Spinner size={'lg'} />
            <CustomText>Loading Data</CustomText>
          </VStack>
        )}
        {
          !isLoading && isError && (
            <VStack width='100%' height='300px' justifyContent={'center'} alignItems={'centerr'}>
              <CustomText>An error occured while loading details</CustomText>
            </VStack>
          )
        }
        {
          !isLoading && !isError && post !== null && (
            <PostCard {...post} />
          )
        }
      </Box>
    </VStack>
  )
}

export default SharePost