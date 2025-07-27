import ModalLayout from '@/components/sharedComponent/modal_layout'
import useCustomTheme from '@/hooks/useTheme'
import { Button, Checkbox, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { IoCloseCircle } from 'react-icons/io5'

export default function BookingPrice({setTab}: {setTab: (by: number) => void}) {

    const {
        borderColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const [open, setOpen] = useState(false)

    return (
        <Flex justifyContent={"center"} w={"full"} height={"full"} py={"8"} >
            <Flex maxW={"770px"} w={"full"} flexDir={"column"} gap={"6"} >
                <Flex flexDir={"column"} >
                    <Text fontWeight={"600"} fontSize={"24px"} >Days that you are available for Business</Text>
                    <Text fontWeight={"500"} >Weekly Hours</Text>
                </Flex>
                <Flex gap={"4"} style={{ boxShadow: "0px 20.62px 72.18px 0px #C2C2C21A" }} rounded={"16px"} borderWidth={"0.38px"} borderColor={borderColor} w={"full"} flexDir={"column"} px={"14"} py={"8"} >
                    <Input h={"57px"} rounded={"16px"} />
                    <Flex alignItems={"center"} gap={"3"} >
                        <Checkbox />
                        <Text fontWeight={"500"} >{`Don’t have fixed price contact Me`}</Text>
                    </Flex>
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"} mt={"4x"} >
                    <Button onClick={()=> setTab(2)} height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={borderColor} bgColor={mainBackgroundColor} _hover={{backgroundColor: mainBackgroundColor}}>Back</Button>
                    <Button onClick={()=> setOpen(true)} height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{backgroundColor: primaryColor}} >Submit</Button>
                </Flex>
            </Flex>
            <ModalLayout open={open} close={setOpen} closeIcon={true}>
                <Flex w={"full"} flexDir={"column"} alignItems={"center"} py={"5"} >
                    <IoIosCheckmarkCircle size={"100px"} color={"#46CC6B"} />
                    <Text fontWeight={"600"} fontSize={"24px"} >Congratulations Miracle!</Text>
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} >{`You’ve successfully published your Business. Kindly check your email for further instructions and additional information.`}</Text>
                    <Button height={"50px"} mt={"4"} borderWidth={"1px"} w={"200px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{backgroundColor: primaryColor}} >View property</Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
