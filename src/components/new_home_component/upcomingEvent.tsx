import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react'
import HomeEventCard from '../sharedComponent/event_card/homeEventCard'
import { useRouter } from 'next/navigation'
import EventCardNew from '../sharedComponent/event_card/eventCard'

interface Props {
    mobile?: boolean,
}

function UpcomingEvent(props: Props) {
    const {
        mobile
    } = props

    const router = useRouter()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/events/events`, limit: 20, filter: "id", name: "listofevent" })

    return (
        <Flex justifyContent={"center"} gap={["4", "4", "6"]} w={"full"} pt={["4", "4", "8"]} h={"full"} flexDirection={"column"} >
            <Flex w={"full"} justifyContent={"space-between"} px={["0xp", "0px", "6"]} alignItems={"center"} >
                <Text fontWeight={"semibold"} fontSize={"16px"} >{"Upcoming Event"}</Text>
                <Text onClick={() => router.push("/dashboard/event")} as={"button"} fontWeight={"500"} fontSize={"12px"} color={primaryColor} >{"See More"}</Text>
            </Flex>

            <Flex w={"full"} gap={"4"} flexDirection={["row", "row", "row", "column", "column"]} h={"full"} overflowY={"auto"} pb={["3", "3", "3", "0px", "0px"]} overflowX={"auto"}

            >
                <Flex w={["fit-content", "fit-content", "fit-content", "full", "full"]} flexDir={"column"} >
                    <LoadingAnimation loading={isLoading} customLoader={
                        <Grid width={["full", "full", "full", "full", "full"]} templateColumns={'repeat(2, 1fr)'} gap={"4"} px={"6"} >
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                        </Grid>
                    } refeching={isRefetching} length={results?.length} >
                        <>
                            {!mobile && ( 
                                <Grid templateColumns='repeat(2, 1fr)' gap={4} width={["full", "full", "full", "full", "full"]} h={"fit-content"} px={["0px", "0px", "6"]} flexDir={["row", "row", "row", "column", "column"]}>
                                    {results?.map((event: any, i: number) => {
                                        if (results.length === i + 1) {
                                            return (
                                                <Flex key={i} w={["80vw", "350px", "350px", "full", "full"]} ref={ref} >
                                                    <EventCardNew event={event} />
                                                </Flex>
                                            )
                                        } else {
                                            return (
                                                <Flex key={i + "last"} w={["80vw", "350px", "350px", "full", "full"]}  >
                                                    <EventCardNew event={event} />
                                                </Flex>
                                            )
                                        }
                                    })}
                                </Grid>
                            )}
                            {mobile && (
                                <Flex gap={4} width={"auto"} h={"fit-content"} px={["0px", "0px", "6"]} flexDir={["row"]}>
                                    {results?.map((event: any, i: number) => {
                                        if (results.length === i + 1) {
                                            return (
                                                <Flex key={i} w={["90vw", "350px", "350px", "full", "full"]} ref={ref} >
                                                    <EventCardNew event={event} />
                                                </Flex>
                                            )
                                        } else {
                                            return (
                                                <Flex key={i + "last"} w={["90vw", "350px", "350px", "full", "full"]}  >
                                                    <EventCardNew event={event} />
                                                </Flex>
                                            )
                                        }
                                    })}
                                </Flex>
                            )}
                        </>
                    </LoadingAnimation>
                </Flex>
            </Flex>
        </Flex>
    )

}

export default UpcomingEvent
