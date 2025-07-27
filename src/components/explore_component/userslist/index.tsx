import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserExploreCard from '../userexplorecard'

interface Props { }

function UserList(props: Props) {
    const { } = props

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: '/user/suggest-connections', limit: 20, filter: "userId", newdata: false })
    const [BlockedUser, setblockedUser] = useState([] as any) 

    return (
        <LoadingAnimation loading={isLoading} refeching={isRefetching} >
            <Flex flexWrap={"wrap"} py={"8"} gap={"4"} p={"4"} justifyContent={"center"} width={"full"} >
                {results?.filter((item: any) => !BlockedUser.includes(item?.userId))?.map((suggestion: any, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Box key={index} ref={ref} width={"fit-content"} >
                                <UserExploreCard
                                    key={suggestion.id}
                                    userId={suggestion?.userId}
                                    data={suggestion}
                                    mutualFriends={suggestion?.mutualFriends}
                                    firstName={suggestion?.firstName}
                                    lastName={suggestion?.lastName}
                                    publicProfile={suggestion?.publicProfile}
                                    setDeleted={setblockedUser}
                                    deleted={BlockedUser} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={index} ref={ref} width={"fit-content"} >
                                <UserExploreCard
                                    key={suggestion.id}
                                    userId={suggestion?.userId}
                                    data={suggestion}
                                    mutualFriends={suggestion?.mutualFriends}
                                    firstName={suggestion?.firstName}
                                    lastName={suggestion?.lastName}
                                    publicProfile={suggestion?.publicProfile}
                                    setDeleted={setblockedUser}
                                    deleted={BlockedUser} />
                            </Box>
                        )
                    }
                })}
            </Flex>
        </LoadingAnimation>
    )
}

export default UserList
