/* eslint-disable react/display-name */
import { ICommunityMember } from '@/models/Communitty'
import { Box, HStack, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text';
import { IMAGE_URL } from '@/services/urls';
import { THEME } from '@/theme';
import Link from 'next/link'

interface IProps {
    member: ICommunityMember,
    isAdmin: boolean;
}

const MemberCard = React.forwardRef<HTMLDivElement, IProps>(({member, isAdmin}, ref) => {
  
  return (
    <HStack ref={ref} width={'100%'} height='60px' borderBottomWidth={'0.8px'} borderBottomColor={'lightgray'} justifyContent={'space-between'}>
        <HStack>
                <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                    { member?.user.data?.imgMain.value === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{member?.user.username[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        member?.user.data?.imgMain.value && (
                            <>
                                {member?.user.data?.imgMain.value.startsWith('https://') && <Image src={`${member?.user.data?.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                                { !member?.user.data?.imgMain.value.startsWith('https://') && <Image src={`${IMAGE_URL}${member?.user.data?.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                            </>
                        )
                    }
                </Box>
                <VStack alignItems={'flex-start'} spacing={0}>
                    <Link href={`/dashboard/profile/${member.user.userId}`}>
                        <CustomText fontSize={'14px'}>{member?.user?.firstName} {member?.user?.lastName}</CustomText>
                    </Link>
                    <CustomText fontSize={'12px'}>{member?.user?.data?.about?.value?.length > 10 ? member?.user?.data?.about?.value.substring(1, 10) + '...':member?.user?.data?.about?.value || ''}</CustomText>
                </VStack>
        </HStack>
        { member.role === 'ADMIN' && <CustomText color={THEME.COLORS.chasescrollButtonBlue} fontFamily={'DM-Medium'} fontSize={'12px'}>Admin</CustomText>}
    </HStack>
  )
})

export default MemberCard