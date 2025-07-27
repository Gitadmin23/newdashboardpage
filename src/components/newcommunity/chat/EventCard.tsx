import CustomText from '@/components/general/Text'
import { IEvent } from '@/models/Events'
import { IMAGE_URL, URLS } from '@/services/urls'
import { THEME } from '@/theme'
import httpService from '@/utils/httpService'
import { Box, HStack, VStack, Image, useToast, Spinner, Flex } from '@chakra-ui/react'
import React from 'react'
import { FiMapPin, FiMinus } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query'
import { useCommunityPageState } from './state'
import Link from 'next/link'
import { useDetails } from '@/global-state/useUserDetails'
import { BsArrowLeftCircle } from 'react-icons/bs' 
import { useCommunity } from '..'

function EventCard({
    event,
    communityId,
    userId: userIndex,
    index
}: { event?: IEvent, userId: any, communityId: any, index?: number }) {
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const { refectEvent } = useCommunity()
  
  const queryClient = useQueryClient();
  const toast = useToast();
  const { activeCommunity, removeEvent } = useCommunityPageState((state) => state); 

  const { mutate, isLoading } = useMutation({ 
    mutationFn: (data: any) => httpService.post(`${URLS.REMOVE_EVENT}`, data),
    onSuccess: () => {
      refectEvent()
      removeEvent(index as number)
      toast({
        title: 'Success',
        description: 'Event has been removed',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'An error occured while removing the event',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
  })
  const handleDelete = React.useCallback(async() => {
    const data = {
      eventID: event?.id,
      type: 'EVENT',
      typeID: communityId,
    }

    mutate(data);
  },[activeCommunity?.id, event?.id, mutate])

  const { userId } = useDetails((state) => state);
  const Id = localStorage.getItem('user_id');

  console.log(communityId);
  console.log(Id);
  
  
  return (
    <VStack onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)} display={'inline-block'} position={'relative'}  flexWrap={'wrap'} whiteSpace={'nowrap'} marginBottom={'20px'} marginRight={'20px'} width={'82px'} height='73px' borderRadius={'8px 0px 8px 8px'} borderWidth={'0.8px'} borderColor={'lightblue'} padding='2px'>
       
       <Link href={`/dashboard/event/details/${event?.id}`}>
        <Box width='100%' height='60%' bg='lightgrey' borderRadius={'5px'}>
          <Image alt='om' src={`${IMAGE_URL}${event?.currentPicUrl}`} width='100%' height='100%' objectFit={'cover'} />
        </Box>
       </Link>

        <CustomText fontFamily={'DM-Bold'} width={'100%'} wordBreak={'break-word'} color='black' fontSize={'10px'}>{(event?.eventName as string).length > 10 ? event?.eventName.substring(0, 10)+ '...': event?.eventName}</CustomText>
      
        {(show && userIndex === userId) && (
            <VStack onClick={handleDelete} cursor={'pointer'} alignItems={'center'} justifyContent={'center'} width={'20px'} height={'20px'} borderRadius={'10px'} bg='red' position={'absolute'} top='-10px' right={'-10px'}>
              { isLoading && <Spinner size={'xs'} /> }
              { !isLoading && <FiMinus color='white' size='15px' /> }
          </VStack>
        )}
    </VStack>
  )
}

export default EventCard