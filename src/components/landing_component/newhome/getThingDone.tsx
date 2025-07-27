import useCustomTheme from "@/hooks/useTheme";
import { Box, Flex, Image, Text } from "@chakra-ui/react"; 
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function GetThingDone() {

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    const [active, setActive] = useState("")

    const { primaryColor } = useCustomTheme()
    const { push } = useRouter()


    const data = [
        {
            "name": "create event →",
            "detail": "Explore Events and Purchase Ticket on Chasescroll",
            link: "/home/event"
        },
        {
            "name": "Aso Ebi & product Hub→ ",
            "detail": "Browse and buy from our Kiosk",
            link: "/home/kiosk"
        },
        {
            "name": "Rental space → ",
            "detail": "Rent venues, apartments, and event essentials all in one place.",
            link: "/home/rental"
        },
        {
            "name": "Fundraiser →",
            "detail": "Start a fundraiser and bring your dream event to life.",
            link: "/home/fundraising"
        },
        {
            "name": "Talent marketplace→ ",
            "detail": "Create an event and hire a pro",
            link: "/home/service"
        },
    ]

    return (
        <Flex w={"full"} zIndex={"20"} flexDir={"column"} color={"white"} gap={["4", "4", "8"]} pl={["6", "6", "16"]} py={["6", "6", "14"]} pos={"relative"} >
            <Flex w={"full"} h={"full"} pos={"absolute"} inset={"0px"} >
                <Image src="/images/hero/getthings.jpg" alt="getthing" w={"full"} objectFit={"cover"} objectPosition={"top"} />
            </Flex>
            <Flex pos={"absolute"} inset={"0px"} zIndex={"10"} bgColor={"#00000080"} />
            <Flex flexDir={"column"} zIndex={"20"} gap={"2"} pr={["6", "6", "16"]} >
                <Text fontSize={["48px"]} fontWeight={"700"} zIndex={"20"} >Get things done </Text>
                <Text maxW={"500px"} fontWeight={"500"} >quick jobs or major overhauls—by working with top independent professionals.</Text>
            </Flex>
            <Flex ref={ref} w={"full"} zIndex={"20"} overflowX={"auto"} h={"fit-content"} gap={"3"} scrollBehavior={"smooth"} sx={
                {
                    '::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            }>
                <Flex w={"auto"} gap={"3"} >
                    {data?.map((item) => {
                        return (
                            <Flex onClick={()=> push(item?.link)} onMouseOver={()=> setActive(item?.name)} onMouseOut={()=> setActive("")} cursor={"pointer"} color={active === item?.name ? primaryColor :"white"}  key={item?.name} bgColor={active === item?.name ? "white" : "#5465E0B2"} rounded={"8px"} w={"400px"} h={"full"} py={"8"} px={"3"} flexDirection={"column"} justifyContent={"space-between"} >
                                <Text fontSize={"32px"} lineHeight={"120%"} fontWeight={"700"} >{item?.detail}</Text>
                                <Text fontWeight={"600"} mt={"7"} >{item?.name}</Text>
                            </Flex>
                        )
                    })}
                </Flex>
            </Flex>

            <Flex w={"full"} justifyContent={"end"} gap={"4"} px={"12"} zIndex={"20"} >
                <Flex onClick={() => scroll(-400)} as="button" w={"40px"} h={"40px"} pr={"1"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} >
                    <IoChevronBack size={"20px"} />
                </Flex>
                <Flex onClick={() => scroll(400)} as="button" w={"40px"} h={"40px"} pl={"1"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} >
                    <IoChevronForward size={"20px"} />
                </Flex>
            </Flex>
        </Flex>
    )
}