"use client"
import { CreatePost, PostCard, UpcomingEvent } from '@/components/new_home_component'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useHome from '@/hooks/useHome'
import useCustomTheme from '@/hooks/useTheme'
import { IMediaContent } from '@/models/MediaPost'
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function Home() {

    const { postData, refetchingPost, loadingPost, postRef } = useHome() 
    const { borderColor } = useCustomTheme();
    
    return (
        <Flex w={"full"} height={"full"} >
            <Flex w={["full", "full", "full", "55%", "full"]} h={"full"} alignItems={"center"} flexDir={"column"} >
                <CreatePost />
                <Flex w={"full"} h={"full"} flexDir={"column"} alignItems={"center"} overflowY={"auto"} overflowX={"hidden"} >
                    <LoadingAnimation loading={loadingPost} refeching={refetchingPost} >
                        <Flex w={["full", "full", "full", "full", "619px"]} height={"fit-content"} gap={"5"} px={["4", "4", "4", "4", "8"]} py={"8"} flexDir={"column"} >
                            {postData?.map((item: IMediaContent, index: number) => {
                                if (index === postData?.length - 1) {
                                    return (
                                        <Flex key={index} flexDir={"column"} w={"full"} h={"full"} gap={"4"} ref={postRef} >
                                            <PostCard {...item} />
                                            {(index + 1) % 6 === 0 && (
                                                <Flex display={["flex", "flex", "flex", "none", "none"]} w={"full"} >
                                                    <UpcomingEvent mobile={true} />
                                                </Flex>
                                            )}
                                        </Flex>
                                    )
                                } else {
                                    return (
                                        <Flex key={index} flexDir={"column"} w={"full"}  gap={"4"} h={"full"} >
                                            <PostCard {...item} />
                                            {(index + 1) % 6 === 0 && (
                                                <Flex display={["flex", "flex", "flex", "none", "none"]}  w={"full"} >
                                                    <UpcomingEvent mobile={true} />
                                                </Flex>
                                            )}
                                        </Flex>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Flex>
            </Flex>
            <Flex h={"full"} borderLeftColor={borderColor} borderLeftWidth={"1px"} w={["fit-content", "fit-content", "fit-content", "45%", "full"]} display={["none", "none", "none", "flex", "flex"]} >
                <Flex w={"full"} >
                    <UpcomingEvent />
                </Flex>
            </Flex>
        </Flex>
    )
}
