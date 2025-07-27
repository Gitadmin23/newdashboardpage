import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import CommunityCard from '../other_components/community_card'
import useSearchStore from '@/global-state/useSearchData'

interface Props { 
    searchbar?: boolean, 
    community?: boolean,
    searchData?: string
}

function ExploreCommunity(props: Props) {
    const { 
        searchbar,
        community,
        searchData
    } = props

    // const { search, setSearchValue } = useSearchStore((state) => state);
    const searchValue = useSearchStore((state) => state.search);

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/group/find-groups?searchText=${community ? searchData : searchValue}`, limit: 10, filter: "id" })

    return (
        <Flex borderWidth={"0px"} width={"full"} flexDirection={"column"} gap={"2"} p={"3"} >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                {results?.map((community: any, i: number) => {
                    if (results?.length === i + 1) {
                        return (
                            <Box ref={ref} key={i} width={"full"}>
                                <CommunityCard searchbar={searchbar} data={community} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={i} width={"full"}>
                                <CommunityCard searchbar={searchbar} data={community} />
                            </Box>
                        )
                    }
                })}
            </LoadingAnimation>
        </Flex>
    )
}

export default ExploreCommunity
