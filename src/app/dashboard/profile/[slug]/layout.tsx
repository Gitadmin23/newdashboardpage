"use client"
import ProfileHeader from '@/components/profile_component/profile_header'
import ProfileImage from '@/components/profile_component/profile_image'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import React, { ReactNode, use } from 'react';

function Layout(props: { params: Promise<{ slug: string }>, children: ReactNode }) {
    const params = use(props.params);

    const {
        children
    } = props;

    const { userId } = useDetails((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box width={"full"} pos={"relative"} overflowY={"auto"}  >
            <ProfileImage user_index={params.slug} />
            {userId && (
                <Box zIndex={"60"} w={"full"} pos={"sticky"} top={"0px"} > 
                    <ProfileHeader user_index={params.slug} />
                </Box>
            )}
            {userId && (
                <Box width={"full"} py={"6"} >
                    {children}
                </Box>
            )}
        </Box>
    )
}

export default Layout
