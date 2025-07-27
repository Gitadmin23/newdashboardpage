import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import ExploreCommunity from '../search_component/explore_communities'
import useSearchStore from '@/global-state/useSearchData';
import SearchBar from '../explore_component/searchbar';
import { Box } from 'iconsax-react';
import useCustomTheme from '@/hooks/useTheme';
import { IoSearchOutline } from 'react-icons/io5';

export default function FindCommunity() {

    const {
        bodyTextColor, 
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();

    const [search, setSearch] = useState("")

    return (
        <Flex w={"full"} h={"full"} pos={"relative"} flex={"1"} alignItems={"center"} flexDir={"column"}  >
            <Flex h={"90px"} w={"full"} bgColor={mainBackgroundColor} justifyContent={"center"} alignItems={"center"} maxW={"400px"}  >
                <InputGroup width={["full", "full", "361px"]} zIndex={"20"} position={"relative"} >
                    <InputLeftElement pointerEvents='none'>
                        <IoSearchOutline size={"25px"} color={bodyTextColor} />
                    </InputLeftElement>
                    <Input width={["full", "full", "361px"]} value={search} color={bodyTextColor} onChange={(e) => setSearch(e.target.value)} type='text' borderColor={borderColor} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} _placeholder={{ color: bodyTextColor }} bgColor={secondaryBackgroundColor} placeholder='Search for Community' />
                </InputGroup>
            </Flex>
            <Flex w={"full"} pos={"absolute"} top={"90px"} bottom={"0px"} insetX={"0px"} flexDir={"column"} overflowY={"auto"} px={"8"} >
                <ExploreCommunity searchData={search} community={true} />
            </Flex>
        </Flex>
    )
}
