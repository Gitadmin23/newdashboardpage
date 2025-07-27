"use client"
import ExploreEventCard from '@/components/sharedComponent/event_card'
import NewEventCard from '@/components/sharedComponent/event_card/newEventCard'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import useGetUser from '@/hooks/useGetUser'
import useCustomTheme from '@/hooks/useTheme'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'

interface Props {}

function EventDashboard(props: Props) {
    const {} = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
  
    const { userId: user_index } = useDetails((state) => state);
    const { user } = useGetUser()
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.All_EVENT+"?createdBy="+user?.userId+"&myEvents=true", limit: 10, filter: "id" })
    const router = useRouter();

    return (
        <Box height={"auto"} display={"flex"} width={"full"} overflowY={"auto"} justifyContent={"center"} position={"relative"} bg={mainBackgroundColor}  > 
            <Box width={["full", "full", "60%"]} px={"6"} py={"10"} position={"relative"} >
                <Flex alignItems={"center"} gap={"4"} width={"full"} justifyContent={"center"} paddingBottom={"6"}> 
                    <Box onClick={()=> router.back()} as='button' position={"absolute"} zIndex={"10"} left={"0px"} width={"fit-content"} >
                        <BsChevronLeft color={bodyTextColor} size={"25px"} />
                    </Box>
                    <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} >Events Dash Board</Text>
                </Flex>
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            <NewEventCard {...event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            <NewEventCard {...event} />
                                        </Box>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Box>
            </Box>
        </Box>
    )
}

export default EventDashboard 

