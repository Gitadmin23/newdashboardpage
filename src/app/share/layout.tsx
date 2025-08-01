"use client"
import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { useShareState } from './state';
import getUser from '@/hooks/useGetUser';


type Props = {
  children: React.ReactNode,
}

function ShareLayout({
  children
}: Props) {
  const router = useRouter();
  const query = useSearchParams();
  const type = query?.get('type');
  const typeID = query?.get('typeID');
  const eventName = query?.get('eventName');
  const { setAll } = useShareState((state) => state);

  React.useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (type === 'PROFILE') {
      if (!userId || userId === '') {
        setAll({ type: type as any, typeID: typeID as any });
        sessionStorage.setItem('type', type as string);
        sessionStorage.setItem('typeID', typeID as string);
        sessionStorage.setItem('eventName', eventName as string);
        router.push(`/share/auth/login?type=${type}&typeID=${typeID}&eventName=${eventName}`)
      }
    }
    
  }, [router, setAll, type, typeID, query, eventName]) 

  const { user } = getUser()
  
  return (
    <VStack width={'100%'} height={'100vh'} alignItems={'center'}>
      <Box width={['100%', '100%']}  height='100%' overflowY={'auto'}>
        { children }
      </Box>
    </VStack>
  )
}

export default ShareLayout 
