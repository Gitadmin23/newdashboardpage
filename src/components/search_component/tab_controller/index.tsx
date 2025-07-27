import {Box, Button, Flex, Link, useColorMode} from '@chakra-ui/react'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";
// import { BsChevronLeft } from 'react-icons/bs'
// import { IoMdClose } from 'react-icons/io'

interface Props {
    tab: number,
    setTab: any
}

function TabController(props: Props) {
    const {
        tab,
        setTab
    } = props

    const { bodyTextColor, primaryColor,secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const searchTab = [
        {
            name: "People",
            tab: 0
        },
        {
            name: "Events",
            tab: 1
        },
        {
            name: "Communities",
            tab: 2
        }
    ]

    return (
        <Box width={"full"} display={"flex"} pt={"2"} >
            {/* <Box as='button' display={"flex"} py={"3"}  width={"fit-content"} px={"6"} height={"full"} ml={"auto"} alignItems={"center"}  >
                <IoMdClose size={"20px"} />
            </Box> */}
            <Flex width={"full"} bg={mainBackgroundColor} zIndex={"40"} position={"relative"} top={"0px"} alignItems={"center"} gap={"4"} height={'60px'} >

                {searchTab?.map((item: any, index: number) => {
                    return (
                        <Button key={index} onClick={() => setTab(item?.tab)} width={"full"} color={tab === item?.tab ? "brand.chasescrollBlue" : bodyTextColor} bg={secondaryBackgroundColor} _hover={{ color: bodyTextColor }} fontSize={"sm"} >
                            {item?.name}
                        </Button>
                    )
                })}
            </Flex>
        </Box>
    )
}

export default TabController
