"use client"
import CustomButton from '@/components/general/Button'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function FundHeroSection() {

    const { push } = useRouter()

    return ( 
        <Flex w={"full"} h={["auto", "fit-content", "100vh"]} color={"white"} pos={"relative"} >
            <Flex pos={"absolute"} inset={"0px"} zIndex={"20"} style={{ background: "linear-gradient(116.54deg, rgba(84, 101, 224, 0) -7.35%, rgba(35, 61, 243, 0.2) 41.22%), linear-gradient(228.39deg, rgba(0, 0, 0, 0) -57.53%, rgba(0, 0, 0, 0.4) 90.44%), linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))" }} />
            <Image pos={["absolute", "absolute", "relative"]} h={"full"} zIndex={"10"} src='/images/hero/fundraising.jpg' alt='fundraising' w={"full"} objectFit={"cover"} />
            <Flex pos={["relative", "relative", "absolute"]} insetX={"0px"} bottom={"0px"} pb={["6", "6", "0px"]} pt={["74px", "74px", "0px"]} top={["0px", "0px", "101.03px"]} gap={"8"} px={["6", "6", "16"]} flexDirection={["column", "column", "row"]} justifyContent={["center", "center", "space-between"]} alignItems={["start", "start", "center"]}  zIndex={"30"} >
                <Flex w={"fit-content"} h={["fit-content", "fit-content", "80%"]} justifyContent={"center"} flexDir={"column"} gap={"4"} >
                    <Text fontWeight={"500"} >Fundraiser</Text>
                    <Text maxW={"481px"} fontSize={["42px", "42px", "60px"]} lineHeight={["120%", "120%", "75px"]} fontWeight={"700"} >Make your event dream a reality.</Text>
                    <Text maxW={"481px"} fontWeight={"500"} >Plan your dream event, bridge financial gaps, and scale effortlessly with our intuitive fundraising platform.</Text>
                    <CustomButton onClick={()=> push("/auth")} text={"Start a fundraiser"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
                </Flex>
                <Flex maxW={"751px"} h={"fit-content"} mt={["0px", "0px", "6"]} position={"relative"} >
                    <Image src='/images/plan/donation.png' alt='hero2' objectFit={"contain"} w={"full"} />
                    <Image src='/images/plan/donationcard.png' alt='hero8' pos={"absolute"} left={"0px"} bottom={["0px", "0px", "0px"]} height={"50%"} objectFit={"contain"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
