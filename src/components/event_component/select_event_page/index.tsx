"use client"
import { Box, HStack, Text, useColorMode } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import useCustomTheme from "@/hooks/useTheme";

interface Props { }

function SelectEventPage(props: Props) {
    const { } = props

    const pathname = usePathname();
    const router = useRouter();
    const query = useSearchParams();
    const type = query?.get('type');

    const tablist = [
            {
                name: "All Events",
                route: "/dashboard/product"
            },
            {
                name: "My Events",
                route: "/dashboard/product?type=my_event"
            },
            {
                name: "Past Events",
                route: "/dashboard/product?type=past_event"
            },
            {
                name: "Saved Events",
                route: "/dashboard/product?type=saved_event"
            },
            {
                name: "Draft",
                route: "/dashboard/product?type=draft"
            }
    ]
    const [showPage, setShowPage] = React.useState("All Event");
    const [showSelector, setShowSelector] = React.useState(false);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    // React.useEffect(() => {
        
    //     tablist?.map((item: any) => {
    //         if (pathname === item?.route) {
    //             console.log(item?.name)
    //             console.log(pathname === item?.route)
    //             setShowPage(item?.name)
    //         }
    //     })
    // }, [pathname, tablist])

    const clickHandler = (name: string, route: string) => {
        router.push(route)
        setShowSelector(false)
        setShowPage(name)
    }

    return (
        <Box position={"relative"} w={"full"} >
            <Box onClick={() => setShowSelector((prev) => !prev)} as='button'
                height={["40px", "50px", "50px"]}
                width={["full", "full", "fit-content"]}
                display={"flex"} gap={"2"} alignItems={"center"} justifyContent={"space-between"} borderWidth={"1px"} backgroundColor={"#F2F4FF"}
                borderColor={"#DDE6EB"}
                color={primaryColor}
                fontSize={"14px"}
                fontWeight={"bold"} px={"6"} rounded={"full"} position={"relative"} >
                <Text>{type === "saved_event" ? "Saved Events" : type === "past_event" ? "Past Events" : type === "my_event" ? "My Events": type === "draft" ? "Draft" : "All Events"}</Text>
                <IoIosArrowDown />
            </Box>
            {showSelector && (
                <HStack flexDirection={"column"} zIndex={"30"} position={"absolute"} shadow={"md"} width={["full", "full", "230px"]} p={"2"} top={"60px"} bg={mainBackgroundColor} >
                    {tablist?.map((item: any, index: number) => {
                        "fit-content"
                        return (
                            <Box key={index} onClick={() => clickHandler(item?.name, item?.route)} width={"full"} rounded={"md"} as='button' display={"flex"} justifyContent={"center"} color={showPage === item?.name ? "white" : bodyTextColor} bg={showPage === item?.name ? "brand.chasescrollBlue" : secondaryBackgroundColor} roundedTopRight={"none"} py={"2"} fontSize={"sm"} fontWeight={"medium"} >
                                {item?.name}
                            </Box>
                        )
                    })}
                </HStack>
            )}
            {showSelector && (
                <Box position={"fixed"} zIndex={"20"} onClick={() => setShowSelector((prev) => !prev)} inset={"0px"} />
            )}
        </Box>
    )
}

export default SelectEventPage
