"use client"
import React from 'react'
import Temporarylogin from './temporarylogin'
import { Flex, Image, Box } from '@chakra-ui/react' 
import PageLoader from 'next/dist/client/page-loader' 
import { IoIosArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'

export default function TemporaryAccount() {

    const router = useRouter()

    return (
        <Flex w={"full"} height={"100vh"} >
      {/* <PageLoader show={isSuccess} /> */}
      <Flex w={"full"} h={"full"} display={["none", "none", "none", "flex"]} justifyContent={"center"} alignItems={"center"} position={"relative"} >
        <Image alt='bg' src='/images/loginimg.jpg' objectPosition={"left"} pos={"absolute"} inset={"0px"} h={"full"} objectFit={"cover"} />
        <Image alt='bg' src='/images/bay.png' pos={"relative"} zIndex={"10"} w={"70%"} objectFit={"contain"} />
        <Box pos={"absolute"} inset={"0px"} w={"full"} h={"full"} bg={"black"} opacity={"40%"} />
        <Flex as={"button"} type='button' onClick={() => router?.back()} pos={"absolute"} top={"12"} color={"white"} fontSize={"16px"} fontWeight={"600"} zIndex={"5"} gap={"1"} alignItems={"center"} left={"12"} >
          <IoIosArrowBack size={"20px"} />
          Back
        </Flex>
      </Flex>
      <Flex justifyContent={"center"} alignItems={"center"} bgColor={"#FCFCFC"} h={"full"} w={"full"} position={"relative"} >
         
        <Flex style={{ boxShadow: "0px 2px 8px 2px #00000003" }} flexDir={"column"} gap={"1"} justifyContent={"center"} alignItems={"center"} maxW={"500px"} p={"8"} rounded={"62px"} w={"full"} >
          
        <Temporarylogin />
        </Flex>
      </Flex>
      {/* <PageLoader show={isSuccess} /> */}
    </Flex>
    )
}
