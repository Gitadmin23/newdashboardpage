import CustomButton from '@/components/general/Button'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import React, { useRef } from 'react'

export default function FundraisingSection() {

    const { primaryColor } = useCustomTheme()
    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true }); 

    return (
        <Flex
            ref={ref}
            style={{
                transform: isInView ? "none" : "translateY(+150px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }} color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} >
            <Flex w={"full"} bgColor={primaryColor} rounded={["12px", "12px", "32px"]} flexDirection={["column-reverse", "column-reverse", "row"]}  >
                <Flex flexDir={"column"} p={["4", "4", "6"]} gap={"3"} >
                    <Text fontSize={["20px", "20px", "24px"]} fontWeight={"600"} >Fundraising Suite</Text>
                    <Text fontSize={["32px", "32px", "46px"]} fontWeight={"700"} lineHeight={"120%"} >Fundraising offers several key benefits to event organizers:</Text>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Financial Support:</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >It provides the necessary funds to cover event costs—venue, equipment, permits, insurance, marketing, and more—without relying solely on ticket sales, sending proposals to companies or personal contributions.</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Risk Reduction:</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >Fundraising helps spread the financial risk. Instead of depending on post-event revenue, organizers can secure resources in advance to ensure the event can proceed regardless of ticket sales.</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Expanded Reach & Marketing:</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >{`Fundraising efforts often attract sponsors, donors, and community interest. These supporters can help amplify the event's visibility through their own networks.`}</Text>
                    </Flex>
                    <CustomButton text={"Learn More"} px={"12"} mt={"3"} backgroundColor={"white"} color={primaryColor} width={"fit-content"} borderRadius={"999px"} />
                </Flex>
                <Flex w={["full", "full", "fit-content"]} > 
                    <Flex w={["full", "full", "453px"]} >
                        <Image src='/images/hero/fund.png' alt='fund' w={"full"} h={["331px", "331px", "full"]} objectFit={"cover"} rounded={["12px", "12px", "32px"]} objectPosition={["top", "top", "center"]} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}