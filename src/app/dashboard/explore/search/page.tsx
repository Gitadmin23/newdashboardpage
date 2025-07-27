"use client"
import ExploreCommunity from '@/components/search_component/explore_communities'
import ExploreEvent from '@/components/search_component/explore_events'
import ExploreUser from '@/components/search_component/explore_users'
import TabController from '@/components/search_component/tab_controller'
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {}

function Search(props: Props) {
    const {} = props

    const [tab, setTab] = useState(0)

    return (
        <Flex width={"full"} overflowY={"auto"} justifyContent={"center"}   > 
            <Box width={["full", "full", "600px"]} px={"6"} position={"relative"} >
                <TabController tab={tab} setTab={setTab} />
                <Box width={"full"} py={"6"} > 
                    {tab === 0 && (
                        <ExploreUser />
                    )}
                    {tab === 1 && (
                        <ExploreEvent />
                    )}
                    {tab === 2 && (
                        <ExploreCommunity />
                    )}
                </Box>
            </Box>
        </Flex> 
    )
}

export default Search
