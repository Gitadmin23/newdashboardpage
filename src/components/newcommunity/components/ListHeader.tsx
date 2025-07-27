"use client"
import { AddChatIcon, SearchTwoIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMenu } from 'react-icons/io5'

interface IProps {
    tab: number
    setTab?: any, 
    setShow?: any
}

export default function ListHeader({ tab, setTab, setShow }: IProps) {

    const {
        bodyTextColor,
        borderColor,
        mainBackgroundColor,
    } = useCustomTheme();
    const { onOpen, onClose, isOpen } = useDisclosure()

    const router = useRouter()

    const clickHander = (index: number)=> {
        setTab(index)
        setShow(true)
        onClose()
    }

    return (
        <Flex w={"full"} h={"72px"} px={"6"} borderBottomWidth={"1px"} borderBottomColor={borderColor} justifyContent={"space-between"} alignItems={"center"} >
            <Flex alignItems={"center"} gap={"3"} >
                <Popover

                    isOpen={isOpen} 
                    onOpen={onOpen}
                    onClose={onClose}
                    
                >
                    <PopoverTrigger  >
                        <Button display={["block", "block", "none", "none", "none"]} bg={"white"} >
                            <IoMenu size={"20px"} />
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent ml={"6"} >
                            <PopoverArrow />
                            <PopoverHeader>Header</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody zIndex={"10000"} display={"flex"} flexDir={"column"} gap={"3"} >
                                <Button bgColor={tab === 0 ? "#F5F5F5" : mainBackgroundColor} borderWidth={"1px"} borderColor={"#F5F5F5"} color={tab === 0 ? "brand.chasescrollBlue" : bodyTextColor} onClick={() => clickHander(0)} width={"full"} >My Community</Button>
                                <Button bgColor={tab === 1 ? "#F5F5F5" : mainBackgroundColor} borderWidth={"1px"} borderColor={"#F5F5F5"} color={tab === 1 ? "brand.chasescrollBlue" : bodyTextColor} onClick={() => clickHander(1)} width={"full"} >Find Community</Button>
                                <Button bgColor={tab === 2 ? "#F5F5F5" : mainBackgroundColor} borderWidth={"1px"} borderColor={"#F5F5F5"} color={tab === 2 ? "brand.chasescrollBlue" : bodyTextColor} onClick={() => clickHander(2)} width={"full"} >Request</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                <Text lineHeight={"36px"} fontSize={"20px"} fontWeight={"700"} >Community</Text>
            </Flex>
            <Flex gap={"5"} >
                {/* <SearchTwoIcon /> */}
                <Box as={"button"} onClick={()=> router?.push("/dashboard/community/create")} >
                    <AddChatIcon />
                </Box>
            </Flex>
        </Flex>
    )
}
