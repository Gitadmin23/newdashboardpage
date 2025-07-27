import { Box, Flex, Image, Text } from "@chakra-ui/react";
import MobileAppLink from "../mobileapplink";


function FirstSetion() {
    return (
        <Flex w={"full"} pos={"relative"} h={["416px", "416px", "547px"]} color={"white"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} >
            <Flex alignItems={"center"} zIndex={"30"} px={"6"} flexDir={"column"} >
                <Text fontSize={["28px", "28px", "60px"]} lineHeight={["39.2px", "39.2px", "84px"]} fontWeight={"700"} textAlign={"center"} >About Chasescroll</Text>
                <Text maxW={"700px"} fontSize={["12px", "12px", "lg"]} mb={"10"} textAlign={"center"} lineHeight={"21.78px"} fontWeight={"500"} >Chasescroll is a cutting-edge event management platform designed to streamline the process of organizing and participating in events.</Text>
                <MobileAppLink />
            </Flex>
            <Box pos={"absolute"} inset={"0px"} zIndex={"10"} bgColor={"black"} opacity={"50%"} />
            <Box pos={"absolute"} inset={"0px"}  >
                <Image w={"full"} h={"full"} objectFit={"cover"} alt="heroo" src="/images/aboutlanding.png" />
            </Box>
        </Flex>
    )
}

export default FirstSetion