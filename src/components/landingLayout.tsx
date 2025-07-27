"use client"
import { Flex, Grid, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function LandingLayout({ children }: any) {

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex w={"full"} h={["100vh"]} pos={"relative"} >
            <Flex pos={"relative"} w={"full"} h={"100vh"} zIndex={"10"} bgColor={"transparent"} >
                {children}
            </Flex>
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} bgColor={colorMode !== "dark" ? "transparent" : "#000"} opacity={colorMode !== "dark" ? "100%" : "50%"} pos={"fixed"} inset={"0px"} w={"full"} h={"full"} overflow={"hidden"} >
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
            </Grid>
        </Flex>
    )
}
