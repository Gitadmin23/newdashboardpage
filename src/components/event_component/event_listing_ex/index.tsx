import ExploreEventCard from '@/components/sharedComponent/event_card'
import EventCardNew from '@/components/sharedComponent/event_card/eventCard'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import httpService from '@/utils/httpService'
import { Box, Flex, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react'
import lodash from 'lodash' 
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
    limit?: boolean, 
    landing?: boolean,
    eventdashboard?: boolean
}

function EventListingEx(props: Props) {
    const {
        limit, 
        landing,
        eventdashboard
    } = props
    const { event_category } = useSearchStore((state) => state);
    const { username } = useDetails((state) => state);
    const param = useParams();
    const id = param?.id;

    const { search } = useSearchStore((state) => state);

    console.log(id);
    

    const router = useRouter()

    const InfiniteComponent = () => {

        const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/events/events?createdBy=${id}`, limit: 20, filter: "id", newdata: event_category })

        return (
            <Flex width={"full"} justifyContent={"center"} mt={!event_category ? !limit ? "0px" : "" : ""} px={"0px"} flexDirection={"column"} alignItems={"center"} >
                {/* {!limit && (
                    <Text fontWeight={"semibold"} textAlign={!event_category ? "left" : "center"} fontSize={"20px"} mb={"10px"} mr={!event_category ? "auto" : ""} ml={!event_category ? "12px" : ""} >{!event_category ? "Trending" : event_category?.split("_")?.join(" ")}</Text>
                )} */}
                <LoadingAnimation loading={isLoading} customLoader={
                    <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["2", "2", "4"]} p={"6"}>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={["200px", "200px", "400px"]} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={["200px", "200px", "400px"]} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={["200px", "200px", "400px"]} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={["200px", "200px", "400px"]} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={["200px", "200px", "400px"]} />
                        </GridItem>
                    </Grid>
                } refeching={isRefetching} length={results?.length} >
                    <>
                        <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["2", "2", "4"]}>
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <GridItem key={i} w={["full", "full", "full", "full", "full"]} shadow={"lg"} ref={ref} >
                                            <EventCardNew event={event} />
                                            {/* <ExploreEventCard landing={landing} eventdashboard={eventdashboard} date={true} page={true} event={event} /> */}
                                        </GridItem>
                                    )
                                } else {
                                    return (
                                        <GridItem key={i + "last"} w={["full", "full", "full", "full", "full"]} shadow={"lg"}  >
                                            <EventCardNew event={event} />
                                            {/* <ExploreEventCard landing={landing} eventdashboard={true} date={true} page={true} event={event} /> */}
                                        </GridItem>
                                    )
                                }
                            })}
                        </Grid>
                    </>
                </LoadingAnimation>
            </Flex>
        )
    }
    const LimitedComponent = () => { 
 
        const { data, results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/events/events${event_category ? "?eventType=" + event_category : ""}`, limit: 15 , filter: "id", newdata: event_category })
 
        const token = localStorage.getItem("token")  

        return (
            <Flex width={"full"} justifyContent={"center"} mt={!event_category ? !limit ? "8" : "" : ""} py={"8"} px={"6px"} flexDirection={"column"} alignItems={"center"} >
                {!limit && (
                    <Text fontWeight={"semibold"} textAlign={!event_category ? "left" : "center"} fontSize={"20px"} mt={"15px"} mb={"10px"} mr={!event_category ? "auto" : ""} ml={!event_category ? "12px" : ""} >{!event_category ? "Trending" : event_category?.split("_")?.join(" ")}</Text>
                )}
                <LoadingAnimation loading={isLoading} customLoader={
                    <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={5}>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                    </Grid>
                } refeching={isRefetching} length={results?.length} >
                    <>
                        <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={[2,2,5]}>
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    if ((i + 1) >= 30) {
                                        return (
                                            <GridItem key={i + "last"} w={["full", "full", "full", "full", "full"]}  >
                                                <EventCardNew event={event} />
                                            </GridItem>
                                        )
                                    } else {
                                        return (
                                            <GridItem ref={ref} key={i + "last"} w={["full", "full", "full", "full", "full"]}  >
                                                <EventCardNew event={event} />
                                            </GridItem>
                                        )
                                    }
                                } else {
                                    return (
                                        <GridItem key={i + "last"} w={["full", "full", "full", "full", "full"]}  >
                                            <EventCardNew event={event} />
                                        </GridItem>
                                    )
                                }
                            })}
                        </Grid>
                    </>
                </LoadingAnimation>
                <Flex w={"full"} justifyContent={"center"}  >
                    {((results.length > 15) && (data?.data?.last === false)) && (
                        <Flex onClick={() => router?.push(token? "/dashboard/event":"/auth")} as={"button"} w={"200px"} fontWeight={"medium"} border={"1px solid #3C41F0"} justifyContent={"center"} color={"brand.chasescrollBlue"} mt={"8"} fontSize={"14px"} lineHeight={"20px"} px={"5"} height={"35px"} rounded={"8px"} alignItems={"center"} gap={"2"} >
                            show more
                        </Flex>
                    )}
                </Flex>
            </Flex>
        )
    }

    return (
        <>
            {!limit && (
                <InfiniteComponent />
            )}
            {limit && (
                <LimitedComponent />
            )}
        </>
    )

}

export default EventListingEx
