import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import HeaderLayout from './header_layout'
import { PostGridIcon } from '@/components/svg'
import NetworkHeader from './network_header'
import EventHeader from './event_header'
import CommunityHeader from './community_header'
import PostHeader from './post_header'
import useCustomTheme from '@/hooks/useTheme'
import KisokHeader from './kisok'
import FundrasierHeader from './fundraiser'
import RentalHeader from './rental'
import ServicesHeader from './service'

interface Props {
    user_index: string
}

function ProfileHeader(props: Props) {
    const {
        user_index
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex w={"full"} pb={"3"} >
            <Flex bgColor={mainBackgroundColor} justifyContent={"space-between"} borderBottomWidth={"2px"} borderBottomColor={borderColor} pt={"3"} px={["4", "4"]} w={"full"} overflowX={"auto"} >
                {/* <HeaderLayout name='Posts' count='230' icon={<PostGridIcon />} link='' />  */}
                <Flex w={"auto"} gap={"3"} alignItems={"center"} >
                    <PostHeader user_index={user_index} />
                    <NetworkHeader user_index={user_index} />
                    <EventHeader user_index={user_index} />
                    <CommunityHeader user_index={user_index} />
                    <KisokHeader user_index={user_index} />
                    <RentalHeader user_index={user_index} />
                    <ServicesHeader user_index={user_index} />
                    <FundrasierHeader user_index={user_index} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ProfileHeader
