"use client"
import ConnectedUser from '@/components/profile_component/connected_user'
import RequestUser from '@/components/profile_component/request_user'
import { useDetails } from '@/global-state/useUserDetails'
import { Box, Button, Flex, useColorMode } from '@chakra-ui/react'
import React, { useState, use } from 'react';
import { useSearchParams } from 'next/navigation';
import useCustomTheme from '@/hooks/useTheme'

function Network(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);

    const [tab, setTab] = useState(false)
    const { userId } = useDetails((state) => state);
    const query = useSearchParams();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    React.useEffect(() => {
        const tab = query?.get('tab');
        if (tab) {
            if (tab === 'request') {
                setTab(true);
            }
        }
    }, [query])

    return (
        <Flex flexDirection={"column"} alignItems={"center"} width={"full"} >
            {params?.slug === userId && (
                <Flex bg={secondaryBackgroundColor} p={"1"} rounded={"md"} >
                    <Button onClick={() => setTab(false)} _hover={{}} width={"150px"} height={"43px"} bgColor={!tab ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? "brand.chasescrollBlue" : bodyTextColor} >
                        Connects
                    </Button>
                    <Button onClick={() => setTab(true)} _hover={{}} width={"150px"} height={"43px"} bgColor={tab ? mainBackgroundColor : secondaryBackgroundColor} color={tab ? "brand.chasescrollBlue" : bodyTextColor } >
                        Requests
                    </Button>
                </Flex>
            )}
            <Box width={"fit-content"} pt={"4"} >
                {!tab && (
                    <ConnectedUser user_index={params?.slug} />
                )}
                {tab && (
                    <RequestUser />
                )}
            </Box>
        </Flex>
    )
}

export default Network
