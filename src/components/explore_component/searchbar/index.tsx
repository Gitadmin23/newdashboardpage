import SearchComponent from '@/components/search_component'
import useSearchStore from '@/global-state/useSearchData'
import {InputGroup, InputLeftElement, Input, Box, Flex, useColorMode} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import useCustomTheme from "@/hooks/useTheme"; 

interface Props {
    home?: boolean,
    change?: boolean,
    landing?: boolean,
    event?: boolean,
    fundraising?: boolean
}

function SearchBar(props: Props) {
    const {
        home,
        change,
        landing,
        event,
        fundraising
    } = props

    const { search, setSearchValue } = useSearchStore((state) => state);

    const path = usePathname()

    const { bodyTextColor, primaryColor,secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(()=> {
        setSearchValue("")
    }, [path])

    return (
        <Flex width={["full", "full", "361px"]} position={"relative"} >
            <InputGroup width={["full", "full", "361px"]} zIndex={"20"} position={"relative"} >
                <InputLeftElement pointerEvents='none'>
                    <IoSearchOutline size={"25px"} color={landing? "black":bodyTextColor} />
                </InputLeftElement>
                <Input width={["full", "full", "361px"]} value={search} color={landing? "black" :bodyTextColor} onChange={(e) => setSearchValue(e.target.value)} type='text' borderColor={borderColor} rounded={"999px"} focusBorderColor={'brand.chasescrollBlue'} _placeholder={{ color: landing? "black" :bodyTextColor }} bgColor={landing ?  "white":secondaryBackgroundColor} placeholder={fundraising? 'Search for fundraising' : event ? 'Search for events' : 'Search for users, event or...'} />
            </InputGroup>
            {(!change) && (
                <>
                    {search && (
                        <Box width={"full"} zIndex={"1000"} position={"absolute"} mt={"45px"} bg={landing? "white" : secondaryBackgroundColor} >
                            <SearchComponent landing={landing} home={home} />
                        </Box>
                    )}
                    {search && (
                        <Box onClick={() => setSearchValue("")} bgColor={"black"} opacity={"0.3"} zIndex={"10"} position={"fixed"} inset={"0px"} bg={secondaryBackgroundColor} />
                    )}
                </>
            )}
        </Flex>
    )
}

export default SearchBar
