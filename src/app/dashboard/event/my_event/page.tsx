'use client' 
import MobileCard from '@/components/sharedComponent/event_card/mobileCard' 
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, Grid } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function MyEvent(props: Props) {
    const { } = props

    const { search } = useSearchStore((state) => state);

    const { userId: user_index } = useDetails((state) => state);
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.JOINED_EVENT + user_index+(search ? "?searchText="+search : ""), limit: 10, filter: "id" })

    return (
        <Flex w={"full"} flexDir={"column"} h={"full"} > 
            <Box width={["full", "full", "full"]} px={["0px", "0px","4"]} position={"relative"} pt={"6"} >
                <Box width={"full"}  >
                    <LoadingAnimation withimg={true} loading={isLoading} refeching={isRefetching} length={results?.length} >
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={"4"} h={"full"} pb={"6"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} > 
                                            <MobileCard {...event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  > 
                                            <MobileCard {...event} />
                                        </Box>
                                    )
                                }
                            })}
                        </Grid>
                    </LoadingAnimation>
                </Box>
            </Box>
        </Flex>
    )
}

export default MyEvent
