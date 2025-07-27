import CustomButton from '@/components/general/Button'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion';
import React, { useRef } from 'react'

export default function ServiceSection() {

    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });

    return (
        <Flex color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "16"]} py={["6", "6", "14"]} >
            <Flex w={"full"} backgroundColor={"#01041A"} rounded={["12px", "12px", "32px"]} flexDirection={["column", "column", "row"]}  >
                <Flex
                    ref={ref}
                    style={{
                        transform: isInView ? "none" : "translateX(-150px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} w={["full", "full", "fit-content"]} >
                    <Flex w={["full", "full", "553px"]} >
                        <Image src='/images/hero/homeservice.png' alt='fund' w={"full"} h={["425px", "425px", "full"]} objectFit={"contain"} roundedLeft={["12px", "12px", "32px"]} objectPosition={["top", "top", "center"]} />
                    </Flex>
                </Flex>
                <Flex
                    ref={reftwo}
                    style={{
                        transform: isInViewtwo ? "none" : "translateY(+150px)",
                        opacity: isInViewtwo ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} flexDir={"column"} p={["4", "4", "6"]} gap={"3"} >
                    <Text fontSize={["20px", "20px", "24px"]} fontWeight={"600"} >Service suite</Text>
                    <Text fontSize={["32px", "32px", "46px"]} fontWeight={"700"} lineHeight={"120%"} >Find event professionals your way.</Text>
                    <Text fontSize={"14px"} >Collaborate with a vast network of independent event professionals to tackle everything from rapid event tasks to major initiatives.</Text>
                    <Flex flexDir={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Easy Access to event professionals</Text>
                        <Text fontSize={"14px"} fontWeight={"500"}>You can quickly connect with experienced, reviewed professionals who specialize in everything from planning and logistics to decor, catering, and entertainment.</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Time & Cost Efficiency</Text>
                        <Text fontSize={"14px"} fontWeight={"500"}>Instead of spending hours searching or hiring full-time staff, you can find exactly who you need—when you need them—often at competitive rates.</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Flexibility & Scalability</Text>
                        <Text fontSize={"14px"} fontWeight={"500"}>Whether you need a single professional for a quick task or a team for a large-scale event, Chasescroll lets you scale your support based on your event size and timeline.</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Built-in Tools & Support</Text>
                        <Text fontSize={"14px"} fontWeight={"500"}>Chasescroll offer built-in messaging, scheduling, contracts, and payment processing—streamlining the hiring and collaboration process.</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Quality & Accountability</Text>
                        <Text fontSize={"14px"} fontWeight={"500"}>Ratings, reviews, and portfolios make it easier to choose trusted professionals and hold them to high standards.</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Nationwide Reach</Text>
                        <Text fontSize={"14px"} fontWeight={"500"}>{`You're not limited to your immediate area—Chasescroll gives you access to a broader pool of event professionals, including local pros in other cities or specialists for destination events.`}</Text>
                    </Flex>
                    <CustomButton text={"Learn More"} px={"12"} mt={"3"} backgroundColor={"white"} color={"#01041A"} width={"fit-content"} borderRadius={"999px"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
