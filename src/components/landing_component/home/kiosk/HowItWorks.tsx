import CustomButton from '@/components/general/Button'
import { GreenTickTwo } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HowItWorks() {

    const { primaryColor } = useCustomTheme()
    const { push } = useRouter()

    return (
        <Flex w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} flexDir={["column", "column", "row"]} bg={"white"} alignItems={"center"} >
            <Flex w={["full", "full", "fit-content"]} >
                <Flex w={["full", "full", "553px"]} h={["322px", "322px", "464px"]} rounded={"2xl"}  >
                    <Image src='/images/hero/kiosk.jpg' alt='kiosk' w={"full"} h={["full"]} objectFit={"cover"} rounded={["12px", "12px", "32px"]} objectPosition={["center"]} />
                </Flex>
            </Flex>
            <Flex w={"full"} flexDir={"column"} gap={"4"} > 
                <Flex flexDir={"column"} >
                    <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} ><span style={{ color: primaryColor }} >How it works</span></Text>
                    <Text fontSize={"14px"} fontWeight={"500"} >{`Get the event essentials you need—quickly, confidently, and all in one place.`}</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Click on the Kiosk tab → Create your items`}</Text> 
                </Flex>
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Go to event tab → Select your event from  “My Event” drop-down list`}</Text> 
                </Flex>
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`In the event details page, click the “My support center” button`}</Text> 
                </Flex> 
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Select “Kiosk” from the list, then choose the items you want to display with your event.`}</Text> 
                </Flex> 
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`When your friends and family register through the event link, they'll see items for sale and purchase it.`}</Text> 
                </Flex>  
                <CustomButton onClick={()=> push("/auth")} text={"Shop now"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}
