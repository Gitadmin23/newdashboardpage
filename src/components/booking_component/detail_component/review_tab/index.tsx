 import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function ReviewTab(props: Props) {
    const { } = props

    return (
        <Flex w={"full"} flexDir={"column"} gap={"7"} >
            <Flex w={"full"} flexDir={"column"} >
                <Flex w={"full"} justifyContent={"space-between"} >
                    <Flex alignItems={"center"} gap={"1"} >
                        <Box width={"41px"} height={"41px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >

                        </Box>
                        <Box color={"#717591"} >
                            <Text fontSize={"sm"} fontWeight={"bold"} >Lena Kyles</Text>
                            {/* <Rate */}
                            <Text fontSize={"xs"} fontWeight={"normal"} >May 03, 2023, 12:56</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Text color={"#4B4E61"} fontSize={"sm"} mt={"2"} >Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con</Text>
            </Flex>
            <Flex w={"full"} flexDir={"column"} >
                <Flex w={"full"} justifyContent={"space-between"} >
                    <Flex alignItems={"center"} gap={"1"} >
                        <Box width={"41px"} height={"41px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >

                        </Box>
                        <Box color={"#717591"} >
                            <Text fontSize={"sm"} fontWeight={"bold"} >Lena Kyles</Text>
                            {/* <Rate */}
                            <Text fontSize={"xs"} fontWeight={"normal"} >May 03, 2023, 12:56</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Text color={"#4B4E61"} fontSize={"sm"} mt={"2"} >Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con</Text>
            </Flex>
            <Flex w={"full"} flexDir={"column"} >
                <Flex w={"full"} justifyContent={"space-between"} >
                    <Flex alignItems={"center"} gap={"1"} >
                        <Box width={"41px"} height={"41px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >

                        </Box>
                        <Box color={"#717591"} >
                            <Text fontSize={"sm"} fontWeight={"bold"} >Lena Kyles</Text>
                            {/* <Rate */}
                            <Text fontSize={"xs"} fontWeight={"normal"} >May 03, 2023, 12:56</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Text color={"#4B4E61"} fontSize={"sm"} mt={"2"} >Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet con</Text>
            </Flex>
        </Flex>
    )
}

export default ReviewTab
