import CustomButton from '@/components/general/Button'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Grid, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import React, { useRef } from 'react'

export default function ProfessionService() {

    const { primaryColor } = useCustomTheme()
    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });
    const refthree: any = useRef(null);
    const isInViewthree = useInView(ref, { once: true });

    return (
        <Flex w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} flexDir={["column", "column", "row"]} bg={"#F8FBF8"} alignItems={"center"} >
            <Flex w={"full"} bgColor={"#F8FBF8"} rounded={"32px"} gap={"6"} flexDirection={["column"]} >
                <Flex w={"full"} flexDir={["column", "column", "row"]} >
                    <Flex 
                        ref={ref}
                        style={{
                            transform: isInView ? "none" : "translateX(-150px)",
                            opacity: isInView ? 1 : 0,
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }} w={["full", "full", "fit-content"]} >
                        <Flex w={["full", "full", "587px"]} h={["395px", "395px", "480px"]} rounded={"2xl"}  >
                            <Image src='/images/hero/profession.png' alt='fund' w={"full"} h={["full"]} objectFit={"contain"} rounded={["12px", "12px", "32px"]} objectPosition={["center"]} />
                        </Flex>
                    </Flex>
                    <Flex 
                        ref={reftwo}
                        style={{
                            transform: isInViewtwo ? "none" : "translateX(+150px)",
                            opacity: isInViewtwo ? 1 : 0,
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }} flexDir={"column"} w={"full"} gap={"4"} pt={"6"} px={"6"} >
                        <Text fontSize={"24px"} color={primaryColor} fontWeight={"700"} >For professionals</Text>
                        <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} >Find great work</Text>
                        <Text maxW={"376px"} fontWeight={"500"} >{`Meet customers you're excited to work with and take your career or business to new heights.`}</Text>
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", 'repeat(3, 1fr)']} gap={4} py={"3"} borderTopWidth={"1px"} borderBottomWidth={"1px"} >
                            <Flex flexDir={"column"} w={"full"} gap={"1"} >
                                <Text fontSize={"32px"} fontWeight={"600"} color={primaryColor} >1</Text>
                                <Text fontWeight={"500"} >Find opportunities for every stage of your entrepreneur journey</Text>
                            </Flex>
                            <Flex flexDir={"column"} w={"full"} gap={"1"} >
                                <Text fontSize={"32px"} fontWeight={"600"} >2</Text>
                                <Text fontWeight={"500"} color={primaryColor}>Control when, where, and how you work</Text>
                            </Flex>
                            <Flex flexDir={"column"} w={"full"} gap={"1"} >
                                <Text fontSize={"32px"} fontWeight={"600"} color={primaryColor} >3</Text>
                                <Text fontWeight={"500"} >Payments are made in full in your escrow before you render service.</Text>
                            </Flex>
                            <Flex flexDir={"column"} w={"full"} gap={"1"} >
                                <Text fontSize={"32px"} fontWeight={"600"} >4</Text>
                                <Text fontWeight={"500"} color={primaryColor} >Explore different ways to earn</Text>
                            </Flex>
                        </Grid>
                    </Flex>
                </Flex>
                {/* <Flex 
                    ref={refthree}
                    style={{
                        transform: isInViewthree ? "none" : "translateY(+70px)",
                        opacity: isInViewthree ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} w={"full"} flexDirection={"column"} gap={"4"} px={"6"} >
                    <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} >How Payments Work for <span style={{ color: primaryColor }} >Service</span> Providers</Text>
                    <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", 'repeat(2, 1fr)']} gap={4} pb={"5"} >
                        <Text fontWeight={"500"} >upfront into your secure escrow system. Once the service is successfully completed, they must approve the release of funds to your wallet so you can cash out.</Text>
                        <Text fontWeight={"500"} >{`If a customer is disrespectful, acts irresponsibly, or significantly delays the event without prior notice, we've got your back—we'll release your full payment to you, hassle-free.`}</Text>
                        <Text fontWeight={"500"} >{`To ensure a smooth resolution, be sure to take photos or videos as evidence. With us, you don't have to worry about losing your money or dealing with subpar customers.`}</Text>
                        <Flex justifyContent={"end"} >
                            <CustomButton text={"Find Opportunities"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
                        </Flex>
                    </Grid>
                </Flex> */}
            </Flex>
        </Flex>
    )
}
