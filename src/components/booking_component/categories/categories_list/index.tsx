import { PersonIcon } from '@/components/svg'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function CategoriesList(props: Props) {
    const { } = props

    return (
        <Box width={"full"} mt={"7"} >
            <Box width={"full"} py={"10px"} borderBottomWidth={"1px"} borderColor={"#667085"} >
                <Text fontWeight={"bold"} fontSize={"lg"} >Top Categories</Text>
            </Box>
            <Grid mt={"5"} templateColumns='repeat(3, 1fr)' gap={6}>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
                <GridItem w='100%' display={"flex"} alignItems={"center"} gap={"2"} >
                    <Flex rounded={"full"} justifyContent={"center"} alignItems={"center"} width={"32px"} height={"32px"} bgColor={"#5D70F9"} > 
                        <PersonIcon />
                    </Flex>
                    <Text fontSize={"lg"} fontWeight={"medium"} color={"#101828B2"} >Event Planners</Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default CategoriesList
