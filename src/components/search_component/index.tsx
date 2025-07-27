"use client"
import ExploreCommunity from '@/components/search_component/explore_communities'
import ExploreEvent from '@/components/search_component/explore_events'
import ExploreUser from '@/components/search_component/explore_users'
import TabController from '@/components/search_component/tab_controller'
import {Box, Flex, useColorMode} from '@chakra-ui/react'
import React, { useState } from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    home?: boolean,
    landing?: boolean
}

function SearchComponent(props: Props) {
    const {
        home,
        landing
    } = props

    const [tab, setTab] = useState(home ? 1 : 0)

    const { bodyTextColor, primaryColor,secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex width={"full"} bg={landing ? "":secondaryBackgroundColor} shadow={"lg"} roundedBottom={"lg"} maxHeight={"450px"} overflowX={"hidden"} overflowY={"auto"} justifyContent={"center"}   >
            <Box width={["full", "full", "full"]} position={"relative"} >
                {!home && (
                    <TabController tab={tab} setTab={setTab} />
                )}
                <Box width={"full"} pt={"2"} pb={"6"} px={"2"} >
                    {tab === 0 && (
                        <ExploreUser />
                    )}
                    {tab === 1 && (
                        <ExploreEvent landing={landing} searchbar={true} />
                    )}
                    {tab === 2 && (
                        <ExploreCommunity searchbar={true} />
                    )}
                </Box>
            </Box>
        </Flex>
    )
}

export default SearchComponent
