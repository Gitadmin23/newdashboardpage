"use client"
import GetEventById from '@/components/sharedComponent/user_event_by_id'
import PastEventById from '@/components/sharedComponent/user_event_by_id/pastEventById';
import useCustomTheme from '@/hooks/useTheme';
import { Button, Flex } from '@chakra-ui/react'
import React, { useState, use } from 'react';

function Network(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();

    const [tab, setTab] = useState(false)

    return (
        <Flex width={"full"} flexDir={"column"} gap={"4"} px={"4"} >
            <Flex w={"full"} pb={"4"} justifyContent={["start", "start", "center"]} >
                <Flex w={["full", "full", "fit-content"]} pos={"relative"} >
                    {/* < */}
                    <Flex bg={secondaryBackgroundColor} p={"1"} w={["full", "fit-content", "fit-content"]} rounded={"md"} >
                        <Button onClick={() => setTab(false)} _hover={{}} fontSize={["14px", "14px", "16px"]} width={["full", "200px", "200px"]} height={"43px"} bgColor={!tab ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? "brand.chasescrollBlue" : bodyTextColor} >
                            My Event
                        </Button>
                        <Button onClick={() => setTab(true)} _hover={{}} fontSize={["14px", "14px", "16px"]} width={["full", "200px", "200px"]} height={"43px"} bgColor={tab ? mainBackgroundColor : secondaryBackgroundColor} color={tab ? "brand.chasescrollBlue" : bodyTextColor} >
                            Past Event
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            {!tab && (
                <GetEventById profile={true} user_index={params?.slug} />
            )}
            {tab && (
                <PastEventById />
            )}
        </Flex>
    )
}

export default Network
