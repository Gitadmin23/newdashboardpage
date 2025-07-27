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
                    <Image src='/images/hero/serve.jpg' alt='fund' w={"full"} h={["full"]} objectFit={"cover"} rounded={["12px", "12px", "32px"]} objectPosition={["center"]} />
                </Flex>
            </Flex>
            <Flex w={"full"} flexDir={"column"} gap={"4"} > 
                <Flex flexDir={"column"} >
                    <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} ><span style={{ color: primaryColor }} >How it works</span></Text>
                    <Text fontSize={"14px"} fontWeight={"500"} >Get the event essentials you need—quickly, confidently, and all in one place.</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Click on the Service tab→ Browse and select the relevant service category and location.`}</Text> 
                </Flex>
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Select a vendor → click on Get quote`}</Text> 
                </Flex>
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Choose the date you need the service, and use the description box to detail your requirements and preferences.`}</Text> 
                </Flex> 
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Once completed, click the “Create booking” button and the vendor will revert back to you`}</Text> 
                </Flex> 
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Go to “All Services” drop-down list and select “My Request” to view your request status.`}</Text> 
                </Flex>  
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`After the vendor accepts your request, proceed with payment through the platform to ensure secure and protected transactions.`}</Text> 
                </Flex>  
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Your payment remains in the vendor's escrow until the service is fully delivered as agreed.`}</Text> 
                </Flex>  
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <GreenTickTwo />
                    </Flex>
                    <Text fontSize={["16px", "16px", "20px"]} fontWeight={"600"} >{`Click the "Approve" button to confirm the service is complete—this will automatically release the funds from escrow to the vendor’s wallet for withdrawal.`}</Text> 
                </Flex>  
                <CustomButton onClick={()=> push("/auth")} text={"Hire a Pro"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}
