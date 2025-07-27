import { THEME } from "@/theme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";


export default function OurPartner() {

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };
    
    return (
        <Flex w={"full"} flexDir={"column"} color={"black"} >
            <Flex position={"relative"} borderBottomWidth={"1px"} borderColor={"#CDD3FD"} width={"full"} alignItems={"center"} flexDir={"column"} gap={"6"} justifyContent={"center"} height={"267px"} >
                <Text color={"#2B2D31"} fontWeight={"semibold"} lineHeight={"38.73px"} fontSize={["24px", "24px", "32px"]} >Our Partners</Text>
                <Flex scrollBehavior={"smooth"} ref={ref} w={"fit-content"} overflowX={["auto", "auto", "hidden"]} px={"14"} gap={"12"} alignItems={"center"} sx={
                    {
                        '::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }>
                    <Image src="/images/The_Founder_Institute_Logo.svg" alt="Institute" w={"134.52px"} />
                    <Image src="/images/The_Brink.svg" alt="Brink" w={"119.31px"} />
                    <Image src="/images/babcock.svg" alt="babcock" w={"100px"} />
                    <Image src="/images/sdbcc.svg" alt="sdbcc" w={"100px"} />
                    <Image src="/images/unilag.png" alt="unilag" w={"60px"} />
                </Flex>
                <Box display={["block", "block", "none"]} position={"absolute"} bottom={"20"} left={"3"} bgColor={"white"} onClick={() => scroll(-400)} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                    <Image w={"full"} h={"full"} rounded={"full"} src="/images/arrow.png" alt="arrow" />
                </Box>
                <Box display={["block", "block", "none"]} position={"absolute"} bottom={"20"} right={"3"} bgColor={"white"} onClick={() => scroll(400)} transform={"rotate(180deg)"} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                    <Image w={"full"} h={"full"} rounded={"full"} src="/images/arrow.png" alt="arrow" />
                </Box>
            </Flex>
            <Flex width={"full"} alignItems={"center"} flexDir={"column"} gap={"6"} justifyContent={"center"} height={["136px", "146px", "345px"]} >
                <Text maxW={"913px"} fontSize={["20px", "20px", "45px"]} lineHeight={["24.2px", "24.2px", "54.46px"]} textAlign={"center"} fontWeight={"semibold"} >Take control of your events with <span style={{ color: THEME?.COLORS?.chasescrollBlue }} >Chasescroll</span></Text>
            </Flex>
        </Flex>
    )
}