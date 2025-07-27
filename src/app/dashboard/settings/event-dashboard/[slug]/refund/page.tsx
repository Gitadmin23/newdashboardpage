"use client"
import DashboardRefund from '@/components/settings_component/event_dashboard_component/dashboard_refund'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { use } from 'react';
import { BsChevronLeft } from 'react-icons/bs'

function Page(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);

    return (
        <Box width={"full"} py={"8"} > 
            <DashboardRefund index={params?.slug} />
        </Box>
    )
}

export default Page
