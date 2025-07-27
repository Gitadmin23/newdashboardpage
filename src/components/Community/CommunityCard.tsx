import { ICommunity } from '@/models/Communitty'
import { Box, Button, HStack, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text';
import { RESOURCE_BASE_URL } from '@/services/urls';
import Link from 'next/link'
// import Image from 'next/image'

interface IProps {
    community: ICommunity;
    hasJoined?: boolean;
}

function CommunityCard({ community, hasJoined }: IProps) { 
    
  return (
    <HStack width={'50%'} height={'230px'} marginBottom='30px'>

        <Box width='70%' height={'100%'} borderWidth={'2px'} borderBottomLeftRadius={'20px'} borderBottomRadius={'20px'} borderTopLeftRadius={'20px'} overflow={'hidden'}>
            <Image src={`${RESOURCE_BASE_URL}${community?.data?.imgSrc}`} alt='image' style={{ width: '100%', height: '100%' }} />
        </Box>

        <VStack width={'30%'} height='100%' justifyContent={'center'}>
            <CustomText fontFamily={'Satoshi-Bold'} fontSize={'20px'}>{community?.data?.name}</CustomText>
            <CustomText fontFamily={'Satoshi-Regular'} fontSize={'16px'}>{community?.data?.description}</CustomText>
            { hasJoined && (
                <HStack>
                    <Link href={`/dashboard/community/chat?id=${community.id}`}>
                        <Button variant={'solid'} height='40px' width={'100px'} color='white' bg='brand.chasescrollButtonBlue'>View</Button>
                    </Link>
                    <Button variant={'outline'} outlineColor={'brand.chasescrollButtonBlue'} height='40px' color='brand.chasescrollButtonBlue'>{community?.data.memberCount} Members</Button>
                </HStack>
            )}
            { !hasJoined && (
                <HStack>
                    <Button variant={'solid'} height='40px' width={'100px'} color='white' bg='brand.chasescrollButtonBlue'>Join</Button>
                    <Button variant={'outline'} outlineColor={'brand.chasescrollButtonBlue'} height='40px' color='brand.chasescrollButtonBlue'>{community?.data.memberCount} Members</Button>
                </HStack>
            )}
        </VStack>
    </HStack>
  )
}

export default CommunityCard