import CustomButton from '@/components/general/Button'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import React, { useRef } from 'react'

export default function RentalSection() {

    const { primaryColor } = useCustomTheme()

    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true }); 

    return (
        <Flex color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} >
            <Flex 
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateY(-150px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }} w={"full"} bgColor={primaryColor} rounded={["12px", "12px", "32px"]} flexDirection={["column-reverse", "column-reverse", "row"]}  >
                <Flex w={"full"} flexDir={"column"} p={["4", "4", "6"]} gap={"3"} >
                    <Text fontSize={["20px", "20px", "24px"]} fontWeight={"600"} >Rental suite</Text>
                    <Flex flexDir={"column"} >
                        <Text fontSize={["32px", "32px", "46px"]} fontWeight={"700"} lineHeight={"120%"} >Rent Items on Chasescroll</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >Save time, money, and stress by renting event essentials directly from trusted providers in your area.</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Wide Selection</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >From tables and tents to lighting and linens, find everything you need in one place.</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Verified Vendors</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >Rent with confidence from vetted suppliers with reviews and ratings.</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Flexible Options</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >Choose rental durations and delivery options that work for your event timeline</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Secure Payments</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >Your payment is protected and only released when the rental is fulfilled.</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >No Ownership Hassles</Text>
                        <Text fontSize={"14px"} fontWeight={"500"} >No need to buy, store, or maintain—just rent, use, and return</Text>
                    </Flex>
                    <CustomButton text={"Learn More"} px={"12"} mt={"3"} backgroundColor={"white"} color={primaryColor} width={"fit-content"} borderRadius={"999px"} />
                </Flex>
                <Flex w={["full", "full", "fit-content"]} > 
                    <Flex w={["full", "full", "453px"]} >
                        <Image src='/images/hero/homerental.png' alt='fund' w={"full"} h={["331px", "331px", "full"]} objectFit={"cover"} rounded={["12px", "12px", "32px"]} objectPosition={["center", "center", "center"]} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}