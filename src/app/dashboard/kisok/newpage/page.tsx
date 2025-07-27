"use client"
import CustomButton from '@/components/general/Button'
import DescriptionPage from '@/components/sharedComponent/descriptionPage'
import { CalendarIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Page() {

    const { primaryColor } = useCustomTheme()

    return (
        <Flex w={"full"} flexDir={"column"} h={"full"} p={"6"} >
            <Flex w={"full"} gap={"4"} >
                <Flex w={"full"} h={"400px"} bgColor={"red"} >

                </Flex>
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"700"} fontSize={"24px"} >{`Hair Cut Nig`}</Text>
                    <DescriptionPage limit={100} label='Service Details' description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`} />
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Flex gap={"4"} alignItems={"center"} >
                            <Flex w={"48px"} h={"48px"} bgColor={"orange"} />
                            <Flex flexDir={"column"} >
                                <Text fontWeight={"600"} >Organizer</Text>
                                <Text fontWeight={"500"} fontSize={"12px"} >235 followers</Text>
                            </Flex>
                        </Flex>
                        <CustomButton text={"Message"} height={"30px"} fontSize={"12px"} width={"100px"} borderRadius={"999px"} />
                    </Flex>

                    <Flex gap={"2"} alignItems={"center"}>
                        <Text fontWeight={"600"} w={"60px"} >Joined</Text>
                        <CalendarIcon color={primaryColor} />
                        <Text fontSize={["12px", "12px", "14px"]} >{dateFormat("")} {timeFormat("")}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
