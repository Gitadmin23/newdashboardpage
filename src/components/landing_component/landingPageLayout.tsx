"use client"
import { Box, Flex, Grid } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import FooterLandingPage from './footer'
import HomeNavbar from './navbar'
import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode"
import { useMutation } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { useElementScroll } from 'framer-motion'


interface IProps {
    children: React.ReactNode
}

export default function LandingPageLayout({ children }: IProps) {
    const [token, setToken]  = React.useState<string|null>(() => localStorage.getItem("token"));

    const refreshTokenMutation = useMutation({
        mutationFn: (data: string) => httpService.post(`${URLS.auth}/refresh-token`, {
            refreshToken: data,
        }),
        onSuccess: (data) => {
            console.log(data?.data)
        },
        onError: (error) => {

        }
    }) 

    const router = useRouter(); 

    const reftwo: any = React.useRef(null)
    const { scrollX, scrollY } = useElementScroll(reftwo)

    const [ yaxis, setYaxis ] = useState(0)
    
    React.useEffect(() => {
      const unsubscribeY = scrollY.onChange((latest) => {
        console.log("Scroll Y position:", latest)
        setYaxis(latest)
      })
      
      return () => unsubscribeY()
    }, [scrollY])

    console.log(scrollY);

    return (
        <Box overflow={"hidden"} w={"full"} > 
            <Grid h="100vh" w={"full"} overflow={"hidden"} >
                {/* <Flex w={"full"} position={"fixed"} zIndex={"100"} top={"0px"} > */}
                    <HomeNavbar yaxis={yaxis} />
                {/* </Flex> */}
                <Flex w="full" h="full" overflow={"hidden"}> 
                    <Flex ref={reftwo} w={"full"} h={"full"} flexDirection={"column"} overflowX={"hidden"} overflowY={"auto"} >
                        {children}
                        <FooterLandingPage />
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    )
}




