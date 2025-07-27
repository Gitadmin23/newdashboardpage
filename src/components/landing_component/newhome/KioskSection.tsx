import CustomButton from '@/components/general/Button'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

export default function KioskSection() {

    const { primaryColor } = useCustomTheme()
    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });
    const { push } = useRouter()

    return (
        <Flex w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} flexDir={["column", "column", "row"]} bg={"white"} alignItems={"center"} >
            <Flex
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateX(-150px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }} w={["full", "full", "fit-content"]} >
                <Flex w={["full", "full", "553px"]} h={["322px", "322px", "585px"]} rounded={"2xl"}  >
                    <Image src='/images/hero/homekiosk.png' alt='fund' w={"full"} h={["full"]} objectFit={"contain"} rounded={["12px", "12px", "32px"]} objectPosition={["center"]} />
                </Flex>
            </Flex>
            <Flex
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateX(+150px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }} w={"full"} flexDir={"column"} gap={"4"} >
                <Text fontSize={"24px"} fontWeight={"600"} color={primaryColor} >Kiosk Suite</Text>
                <Flex flexDir={"column"} >
                    <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} ><span style={{ color: primaryColor }} >Buy</span>  from Our Kiosk</Text>
                    <Text fontSize={"14px"} fontWeight={"500"} >Get the event essentials you need—quickly, confidently, and all in one place.</Text>
                </Flex>
                <Flex flexDir={"column"}>
                    <Text fontSize={"24px"} fontWeight={"600"} >Curated</Text>
                    <Text fontSize={"14px"} fontWeight={"500"}>Shop with peace of mind knowing every seller is vetted and reviewed.</Text>
                </Flex>
                <Flex flexDir={"column"}>
                    <Text fontSize={"24px"} fontWeight={"600"} >Competitive Pricing</Text>
                    <Text fontSize={"14px"} fontWeight={"500"}>Find great deals without compromising on quality.</Text>
                </Flex>
                <Flex flexDir={"column"}>
                    <Text fontSize={"24px"} fontWeight={"600"} >Secure Transactions</Text>
                    <Text fontSize={"14px"} fontWeight={"500"}>Your payment is protected from checkout to delivery.</Text>
                </Flex>
                <Flex flexDir={"column"}>
                    <Text fontSize={"24px"} fontWeight={"600"} >Fast, Reliable Delivery</Text>
                    <Text fontSize={"14px"} fontWeight={"500"}>Get items delivered on time, right to your door or venue.</Text>
                </Flex>
                <Flex flexDir={"column"}>
                    <Text fontWeight={"600"} color={primaryColor} >From decor to equipment, buying for your event has never been easier.</Text>
                </Flex>
                <CustomButton onClick={()=> push("/home/kiosk")} text={"How it works"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}
