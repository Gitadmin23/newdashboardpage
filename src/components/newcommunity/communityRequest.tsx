import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useCommunity } from '.'
import RequestCard from './components/RequestCard'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { ICommunityRequest } from '@/models/Communitty'

export default function CommunityRequest() {

    const { communityRequest, loadingCommunityRequest, refCommunityRequest, refectingCommunityRequest } = useCommunity()

    const [filter, setFilter] = useState<Array<ICommunityRequest>>([])

    console.log(filter);
    

    return (
        <Flex w={"full"} flexDir={"column"} px={"8"} >
            {/* <Flex h={"fit-content"} w={"full"} py={"4"} maxW={"400px"}  >
                <SearchBar />
            </Flex> */}
            <LoadingAnimation loading={loadingCommunityRequest} length={communityRequest?.length} refeching={refectingCommunityRequest} >
                <Flex w={"full"} h={"auto"} flexDirection={"column"} overflowY={"auto"} gap={"3"} pt={"8"} >
                    {communityRequest?.filter((item: any) => !filter?.includes(item?.id))?.map((item: ICommunityRequest, index: number) => {
                        if (communityRequest?.length === index + 1) {
                            return (
                                <Box ref={refCommunityRequest} w={"full"} borderBottomWidth={"1px"} py={"3"} key={index}>
                                    <RequestCard community={item} setIndex={setFilter} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box w={"full"} key={index} borderBottomWidth={"1px"} py={"3"} >
                                    <RequestCard community={item} setIndex={setFilter} />
                                </Box>
                            )
                        }
                    })}
                </Flex>
            </LoadingAnimation>
        </Flex>
    )
}
