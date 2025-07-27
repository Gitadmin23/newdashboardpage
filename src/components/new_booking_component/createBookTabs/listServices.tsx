import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function ListServices({setTab}: {setTab: (by: number) => void}) {

    const {
        primaryColor,
        borderColor,
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const [active, setActive] = useState(0)

    return (
        <Flex justifyContent={"center"} w={"full"} height={"full"} py={"8"} >
            <Flex maxW={"770px"} w={"full"} flexDir={"column"} gap={"6"} >
                <Text fontWeight={"500"} fontSize={"24px"} >Select from the list of the services </Text>
                <Flex style={{boxShadow: "0px 20.62px 72.18px 0px #C2C2C21A"}} borderWidth={"0.38px"} borderColor={borderColor} rounded={"16px"} w={"full"} flexDir={"column"} gap={"4"} p={"8"} >
                    <Flex w={"full"} as={"button"} h={"44px"} onClick={()=> setActive(0)} rounded={"16px"} alignItems={"center"} color={active === 0 ? primaryColor : headerTextColor} borderWidth={"1px"} borderColor={active === 0 ? primaryColor : borderColor} px={"5"} style={{boxShadow: "0px 1px 2px 0px #1018280D"}} >
                        <Text fontWeight={"500"} >Event Planning</Text>
                    </Flex>
                    <Flex w={"full"} as={"button"} h={"44px"} onClick={()=> setActive(1)} rounded={"16px"} alignItems={"center"} color={active === 1 ? primaryColor : headerTextColor} borderWidth={"1px"} borderColor={active === 1 ? primaryColor : borderColor} px={"5"} style={{boxShadow: "0px 1px 2px 0px #1018280D"}} >
                        <Text fontWeight={"500"} >Costume</Text>
                    </Flex>
                    <Flex w={"full"} as={"button"} h={"44px"} onClick={()=> setActive(2)} rounded={"16px"} alignItems={"center"} color={active === 2 ? primaryColor : headerTextColor} borderWidth={"1px"} borderColor={active === 2 ? primaryColor : borderColor} px={"5"} style={{boxShadow: "0px 1px 2px 0px #1018280D"}} >
                        <Text fontWeight={"500"} >Disk jokey</Text>
                    </Flex>
                    <Flex w={"full"} as={"button"} h={"44px"} onClick={()=> setActive(3)} rounded={"16px"} alignItems={"center"} color={active === 3 ? primaryColor : headerTextColor} borderWidth={"1px"} borderColor={active === 3 ? primaryColor : borderColor} px={"5"} style={{boxShadow: "0px 1px 2px 0px #1018280D"}} >
                        <Text fontWeight={"500"} >Catering</Text>
                    </Flex>
                    <Flex w={"full"} as={"button"} h={"44px"} onClick={()=> setActive(4)} rounded={"16px"} alignItems={"center"} color={active === 4 ? primaryColor : headerTextColor} borderWidth={"1px"} borderColor={active === 4 ? primaryColor : borderColor} px={"5"} style={{boxShadow: "0px 1px 2px 0px #1018280D"}} >
                        <Text fontWeight={"500"} >Venue Rental</Text>
                    </Flex>
                    <Flex w={"full"} as={"button"} h={"44px"} onClick={()=> setActive(5)} rounded={"16px"} alignItems={"center"} color={active === 5 ? primaryColor : headerTextColor} borderWidth={"1px"} borderColor={active === 5 ? primaryColor : borderColor} px={"5"} style={{boxShadow: "0px 1px 2px 0px #1018280D"}} >
                        <Text fontWeight={"500"} >Graphics Design</Text>
                    </Flex>
                    <Flex w={"full"} as={"button"} h={"44px"} onClick={()=> setActive(6)} rounded={"16px"} alignItems={"center"} color={active === 6 ? primaryColor : headerTextColor} borderWidth={"1px"} borderColor={active === 6 ? primaryColor : borderColor} px={"5"} style={{boxShadow: "0px 1px 2px 0px #1018280D"}} >
                        <Text fontWeight={"500"} >Other</Text>
                    </Flex> 
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"} mt={"4x"} >
                    <Button onClick={()=> setTab(0)} height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={borderColor} _hover={{backgroundColor: mainBackgroundColor}} bgColor={mainBackgroundColor} >Back</Button>
                    <Button onClick={()=> setTab(2)} height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{backgroundColor: primaryColor}} >Next</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
