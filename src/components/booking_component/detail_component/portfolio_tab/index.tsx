import { MoreIcon } from '@/components/svg'
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineDotsHorizontal, HiOutlineDownload, HiOutlineHeart, HiOutlineStar } from "react-icons/hi";

interface Props { }

function PortfolioTab(props: Props) {
    const { } = props

    const Card = () => {
        return (
            <GridItem w='100%' h='240px' display={"flex"} flexDir={"column"} pb={"2"} rounded={"8px"} bg='blue.500' >
                <Flex px={"4"} w={"full"} height={"12"}  >
                    <Box as="button" ml={"auto"} > 
                        <HiOutlineDotsHorizontal color="white" size="25px" />
                    </Box>
                </Flex>
                <Flex width={"full"} mt={"auto"} justifyContent={"space-between"} px={"4"} >
                    <Box as="button"  >
                        <HiOutlineStar size="25px" color="white" />
                    </Box>
                    <Flex gap={"1"} alignItems={"center"} as="button">
                        <HiOutlineHeart size="25px" color="white" />
                        <Text color={"white"} fontSize={"11px"} >124</Text>
                    </Flex>
                    <Box as="button"  >
                        <HiOutlineDownload size="25px" color="white" />
                    </Box>
                </Flex>
            </GridItem>
        )
    }

    return (
        <Box w={"full"} >
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                <Button width={"161px"} h={"12"} bgColor={"#5D70F9"} color={"white"} fontSize={"lg"} fontWeight={"medium"} >
                    Add
                </Button>
                <Box transform={"rotate(90deg)"} >
                    <MoreIcon />
                </Box>
            </Flex>
            <Grid w={"full"} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} mt={"4"} gap={6}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Grid>
        </Box>
    )
}

export default PortfolioTab
