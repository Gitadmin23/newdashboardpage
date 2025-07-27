import { MoreIcon } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function ServicesTab(props: Props) {
    const { } = props

    return (
        <Flex w={"full"} gap={"4"} flexDir={"column"} > 
            <Box w={"full"} color={"black"} >
                <Text fontSize={"17px"} fontWeight={"semibold"} >My Services</Text>
                <Flex width={"full"} justifyContent={"space-between"} py={"4"} px={"1"} >
                    <Text>Men’s Hair cut</Text>
                    <Flex gap={'4'} >
                        <Text color={"#5B5858"} >$35.00</Text>
                        <Box as='button'  >
                            <MoreIcon />
                        </Box>
                    </Flex>
                </Flex>
                <Flex width={"full"} justifyContent={"space-between"} py={"4"} px={"1"} >
                    <Text>Men’s Hair cut</Text>
                    <Flex gap={'4'} >
                        <Text color={"#5B5858"} >$35.00</Text>
                        <Box as='button'  >
                            <MoreIcon />
                        </Box>
                    </Flex>
                </Flex>
                <Flex width={"full"} justifyContent={"space-between"} py={"4"} px={"1"} >
                    <Text>Men’s Hair cut</Text>
                    <Flex gap={'4'} >
                        <Text color={"#5B5858"} >$35.00</Text>
                        <Box as='button'  >
                            <MoreIcon />
                        </Box>
                    </Flex>
                </Flex>
                <Flex width={"full"} justifyContent={"space-between"} py={"4"} px={"1"} >
                    <Text>Men’s Hair cut</Text>
                    <Flex gap={'4'} >
                        <Text color={"#5B5858"} >$35.00</Text>
                        <Box as='button'  >
                            <MoreIcon />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default ServicesTab
