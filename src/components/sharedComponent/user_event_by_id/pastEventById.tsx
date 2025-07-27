"use client"
import { useDetails } from '@/global-state/useUserDetails';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { URLS } from '@/services/urls';
import { HStack, Flex, Box, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import React from 'react'
import ExploreEventCard from '../event_card';
import LoadingAnimation from '../loading_animation';
import { boolean } from 'zod';
import NewEventCard from '../event_card/newEventCard';
import EventCardNew from '../event_card/eventCard';

function PastEventById() {

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.PAST_EVENT, limit: 10, filter: "id" })

    return (
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
                <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={[2, 2, 4]}>
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
    )
}

export default PastEventById
