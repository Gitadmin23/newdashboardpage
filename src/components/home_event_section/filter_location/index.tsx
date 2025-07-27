import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface Props { }

function FilterLocation(props: Props) {
    const { } = props

    return (
        <Flex alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} gap={"2px"} >
            <Text color={"#121212"} lineHeight={"36px"} fontSize={["16px", "16px", "24px", "24px"]} fontWeight={"medium"} >Explore Popular Events in </Text>
            <Flex alignItems={"center"} gap={"2px"} >
                <IoIosArrowDown role="button" color={"#5465E0"} size={"25px"} />
                <Text as="button" color={"#5465E0"} borderBottom={"2px"} pb={"1px"} borderColor={"#5465E0"} lineHeight={"22.4px"} fontSize={["14px", "14px", "20px", "20px"]}  >Abuja</Text>
            </Flex>
        </Flex>
    )
}

export default FilterLocation
