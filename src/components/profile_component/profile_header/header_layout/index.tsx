import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    icon: any,
    count: string,
    name: string,
    link: string,
    index?: string
}

function HeaderLayout(props: Props) {
    const {
        icon,
        count,
        name,
        link,
        index
    } = props

    const router = useRouter()
    const pathname = usePathname();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex as={"button"} onClick={()=> router.push(link)} alignItems={"center"} gap={"2"} >
            <Flex borderBottom={"0px"} pos={"relative"} flexDir={"column"} borderColor={(pathname?.includes(name.toLocaleLowerCase()) || (pathname === "/dashboard/profile/" + index)) ? "brand.chasescrollBlue" : "transparent"} >
                <Flex px={"2"} >
                    <Text fontSize={"14px"} fontWeight={"600"} >{name}</Text>
                </Flex>
                <Flex w={"full"} h={"2px"} bgColor={(pathname?.includes(name.toLocaleLowerCase()) || (pathname === "/dashboard/profile/" + index)) ? "brand.chasescrollBlue" : "transparent"} />
            </Flex>
            <Flex w={"28px"} h={"19px"} mt={"-1px"} rounded={"full"} bgColor={secondaryBackgroundColor} justifyContent={"center"} alignItems={"center"} fontSize={"12px"} fontWeight={"700"} color={primaryColor} >
                {count ? count : 0}
            </Flex>
        </Flex> 
    )
}

export default HeaderLayout
