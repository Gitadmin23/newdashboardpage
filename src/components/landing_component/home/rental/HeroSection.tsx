"use client"
import CustomButton from '@/components/general/Button'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HeroSection() {

    const { push } = useRouter()

    return ( 
        <Flex w={"full"} h={["auto", "auto", "100vh"]} color={"white"} pos={"relative"} >
            <Flex pos={"absolute"} inset={"0px"} zIndex={"20"} style={{ background: "linear-gradient(116.54deg, rgba(84, 101, 224, 0) -7.35%, rgba(35, 61, 243, 0.2) 41.22%), linear-gradient(228.39deg, rgba(0, 0, 0, 0) -57.53%, rgba(0, 0, 0, 0.4) 90.44%), linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))" }} />
            <Image pos={["absolute", "absolute", "relative"]} zIndex={"10"}  src='/images/hero/rental.jpg' alt='rental' w={"full"} h={"full"} objectFit={"cover"} />
            <Flex pos={["relative", "relative", "absolute"]} insetX={"0px"} bottom={"0px"} pb={["6", "6", "0px"]} pt={["74px", "74px", "0px"]} top={["0px", "0px", "101.03px"]} gap={"8"} px={["6", "6", "16"]} flexDirection={["column", "column", "row"]} justifyContent={["center", "center", "space-between"]} alignItems={["start", "start", "center"]} zIndex={"30"} >
                <Flex w={"fit-content"} h={["fit-content", "fit-content", "80%"]} justifyContent={"center"} flexDir={"column"} gap={"4"} >
                    <Text fontWeight={"500"} >Rentals</Text>
                    <Text maxW={"481px"} fontSize={["42px", "42px", "60px"]} lineHeight={["120%", "120%", "75px"]} fontWeight={"700"} >Rent Items on Chasescroll</Text>
                    <Text maxW={"481px"} fontWeight={"500"} >Save time, money, and stress by renting event essentials directly from trusted providers in your area.</Text>
                    <CustomButton onClick={()=> push("/auth")} text={"Rent now"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
                </Flex>
                <Flex maxW={"751px"} h={"fit-content"} mt={["0px", "0px", "6"]} position={"relative"} >
                    <Image src='/images/plan/rental.png' alt='hero2' objectFit={"contain"} w={"full"} />
                    <Image src='/images/plan/rentcard.png' alt='hero2' pos={"absolute"} left={"0px"} bottom={["0px", "0px", "0px"]} height={"50%"} objectFit={"contain"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
