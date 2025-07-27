"use client"
import searchbar from '@/components/explore_component/searchbar';
import CommunityCard from '@/components/search_component/other_components/community_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import ProductImageScroller from '@/components/sharedComponent/productImageScroller';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { URLS } from '@/services/urls';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { textLimit } from '@/utils/textlimit';
import { Box, Flex, Grid, GridItem, HStack, Skeleton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { use } from 'react';

function Community(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);

    const router = useRouter()
    const { mainBackgroundColor, bodyTextColor } = useCustomTheme()

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.GET_JOINED_GROUPS + "?userID=" + params?.slug, limit: 10, filter: "id" })

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
                <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={[2, 2, 4]} px={"4"} >
                    {results?.map((community: any, i: number) => {
                        if (results?.length === i + 1) {
                            return (
                                <Flex ref={ref} key={i} onClick={() => router?.push(`/dashboard/community?activeID=${community?.id}`)} as={"button"} flexDir={"column"} bgColor={mainBackgroundColor} borderWidth={"1px"} rounded={"10px"} w={"full"} >
                                    <Flex w={"full"} pos={"relative"} >
                                        <ProductImageScroller images={[community?.data?.imgSrc]} />
                                    </Flex>
                                    <Flex flexDirection={"column"} alignItems={"start"} p={'2'}>
                                        <Text fontSize={"12px"} fontWeight={"700"} >{textLimit(capitalizeFLetter(community?.data?.name), 20)}</Text>
                                        <Text mb={"2px"} fontSize={["12px"]} fontWeight={"medium"} color={bodyTextColor} >{textLimit(community?.data?.description, 100)}</Text>
                                        <Box rounded={"2px"} bg={community?.data?.isPublic ? "brand.chasescrollPalePurple" : "#FBCDCD"} fontWeight={"semibold"} color={community?.data?.isPublic ? "brand.chasescrollBlue" : "#E90303"} fontSize={"10px"} py={"1"} display={"flex"} justifyContent={"center"} width={"50px"} >
                                            {community?.data?.isPublic ? 'Public' : 'Private'}
                                        </Box>
                                    </Flex>
                                </Flex>
                            )
                        } else {
                            return (
                                <Flex key={i} onClick={() => router?.push(`/dashboard/community?activeID=${community?.id}`)} as={"button"} flexDir={"column"} bgColor={mainBackgroundColor} borderWidth={"1px"} rounded={"10px"} w={"full"} >
                                    <Flex w={"full"} pos={"relative"} >
                                        <ProductImageScroller images={[community?.data?.imgSrc]} />
                                    </Flex>
                                    <Flex flexDirection={"column"} alignItems={"start"} p={'2'}>
                                        <Text fontSize={"12px"} fontWeight={"700"} >{textLimit(capitalizeFLetter(community?.data?.name), 20)}</Text>
                                        <Text mb={"2px"} fontSize={["12px"]} fontWeight={"medium"} color={bodyTextColor} >{textLimit(community?.data?.description, 100)}</Text>
                                        <Box rounded={"2px"} bg={community?.data?.isPublic ? "brand.chasescrollPalePurple" : "#FBCDCD"} fontWeight={"semibold"} color={community?.data?.isPublic ? "brand.chasescrollBlue" : "#E90303"} fontSize={"10px"} py={"1"} display={"flex"} justifyContent={"center"} width={"50px"} >
                                            {community?.data?.isPublic ? 'Public' : 'Private'}
                                        </Box>
                                    </Flex>
                                </Flex>
                            )
                        }
                    })}
                </Grid>
            </>
        </LoadingAnimation>
    )
}

export default Community