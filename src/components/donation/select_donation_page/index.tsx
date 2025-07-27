"use client"
import {Box, HStack, Text, useColorMode} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import useCustomTheme from "@/hooks/useTheme";

interface Props { }

function SelectDonationPage(props: Props) {
    const { } = props

    const pathname = usePathname();
    const router = useRouter();

    const tablist = React.useCallback(() => {
        return [
            {
                name: "All Fundraising",
                route: "/dashboard/donation"
            },
            {
                name: "My Fundraising",
                route: "/dashboard/donation/mydonation"
            },
            {
                name: "Past Fundraising",
                route: "/dashboard/donation/pastdonation"
            }
        ]
    }, [])
    
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

    React.useEffect(() => {
        tablist()?.map((item: any) => {
            if(pathname?.includes(item?.route)){
                setShowPage(item?.name)
            } 
        })
    }, [pathname, tablist])
    
    const clickHandler =(name: string, route: string)=> {
        router.push(route)
        setShowSelector(false)
        setShowPage(name)
    }

    return (
        <Box position={"relative"} w={"full"} >
            <Box onClick={() => setShowSelector((prev) => !prev)} as='button' px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={secondaryBackgroundColor} borderRadius={"32px"} width={["full", "full", "fit-content"]} display={"flex"} gap={"2"} alignItems={"center"} justifyContent={"space-between"} borderWidth={"1px"} color={colorMode === "light" ? "#5465E0":bodyTextColor} fontWeight={"medium"} rounded={"32px"} position={"relative"} >
                <Text>{showPage}</Text>
                <IoIosArrowDown />
            </Box>
            {showSelector && ( 
                <HStack flexDirection={"column"} zIndex={"200"} position={"absolute"} shadow={"md"}  width={["full", "full", "230px"]} p={"2"} top={"60px"} bg={mainBackgroundColor} >
                    {tablist()?.map((item: any, index: number) => {"fit-content"
                        return (
                            <Box key={index} onClick={()=> clickHandler(item?.name, item?.route)} width={"full"} rounded={"md"} as='button' display={"flex"} justifyContent={"center"} color={showPage === item?.name ? "white" : bodyTextColor} bg={showPage === item?.name ? "brand.chasescrollBlue" : secondaryBackgroundColor} roundedTopRight={"none"} py={"2"} fontSize={"sm"} fontWeight={"medium"} >
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

export default SelectDonationPage
