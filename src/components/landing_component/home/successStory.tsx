import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function SuccessStory() {
    return (
        <Flex w={"full"} flexDir={"column"} alignItems={"center"} py={"14"} gap={"4"} >
            <Text fontSize={"45px"} fontWeight={"600"} color={"#1A202C"} ><span style={{ color: "#5465E0" }} >Success</span> Story</Text>
            <Text color={"#222222CC"} fontSize={"20px"} maxW={"680px"} textAlign={"center"} >Discover how our clients have streamlined their expense tracking and achieved significant cost savings.</Text>
            <Flex style={{ background: "linear-gradient(0deg, #5465E0, #5465E0), linear-gradient(180deg, #5465E0 0%, #2E377A 100%)" }} w={"full"} mt={"10"} >
                <Flex w={"full"} color={"white"} flexDir={"column"} p={"8"} gap={"6"} >
                    <Text fontSize={"120px"} fontWeight={"bold"} >“</Text>
                    <Text fontSize={"20px"} fontWeight={"semibold"} mt={"-80px"} >It was a normal playful day for these kids but we decided to change a normal playful day to become memorable and eventful.</Text>
                    <Text fontSize={"20px"} fontWeight={"semibold"}  >At chasescroll, we are all about creating unforgettable memories. It doesn’t matter if it’s a small or large scale event, church, weddings, corporate or school event. You can create free and paid events on Chasescroll for FREE, add collaborators to your events, share pictures and videos on your timeline, get your attendee list from your dashboard, cash out your funds instantly, connect with friends from your events, view past events and much more. We keep things simple and beautiful at Chasescroll.</Text>
                    <Text fontSize={"20px"} fontWeight={"semibold"}  >Sign up today and we are happy to work with you on all your events.</Text>
                </Flex>
                <Flex w={"full"} >
                    <Image src='/images/story.png' alt='story' w={"full"} h={"full"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
