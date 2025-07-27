import GetEventTicket from '@/components/event_details_component/get_event_ticket'
import CustomButton from '@/components/general/Button'
import BlurredImage from '@/components/sharedComponent/blurred_image'
import InterestedUsers from '@/components/sharedComponent/interested_users'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import { useDetails } from '@/global-state/useUserDetails'
import { IMAGE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { textLimit } from '@/utils/textlimit'
import { Box, Flex, Image, Skeleton, Text, useToast } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { focusManager, useQuery } from 'react-query'

interface Props { }

function HomeLandingPageCarousel(props: Props) {

    const { } = props

    const boxAnimation = {
        key: "box",
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        },
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    }

    const [isShown, setIsShown] = React.useState(0)


    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const router = useRouter()

    let token = localStorage.getItem("token")

    const { userId, email } = useDetails((state) => state);

    focusManager.setFocused(false)
    // react query
    const { isLoading, isRefetching } = useQuery(['get-events-for-carousel'], () => httpService.get('/events/events'), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data.data.content);
        }
    })

    React.useEffect(() => {
        const t1 = setTimeout(() => {
            if (isShown === data.length - 1) {
                setIsShown(0)
            } else {
                setIsShown(prev => prev + 1)
            }
        }, 5000);
        return () => {
            clearTimeout(t1);
        }
    }, [isShown])

    const clickHander = (item: any) => {
        if (token) {
            router.push("/dashboard/event/details/" + item?.id)
        } else {
            router.push("/event/" + item?.id)
        }
    }

    const createHander = () => {
        if (token) {
            router.push("/dashboard/event/create_event")
        } else {
            router.push("/auth")
        }
    }

    return (
        <Flex w={"full"} px={["2", "2", "12"]} pb={"8"} pt={["0px", "4", "4"]} position={"relative"} >
            {data?.length <= 1 && (
                <Flex position={"absolute"} insetX={["2", "2", "12"]} gap={"5"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} flexDir={"column"} zIndex={"90"} justifyContent={"center"} alignItems={"center"} insetY={["0px", "0px", "4"]} bottom={"0px"} h={["411px", "411px", "449px", "449px", "449px"]} >
                    <Text fontWeight={"600"} zIndex={"30"} position={"relative"} lineHeight={["20px", "20px","65px"]} fontSize={["18px", "18px", "60px"]} w={"80%"} textAlign={"center"} color={"white"} >Create and display your event on Chasescroll.</Text>
                    <CustomButton onClick={createHander} text={"Create Event"} zIndex={"30"} position={"relative"} backgroundColor={"transparent"} borderWidth={"1px"} borderColor={"white"} width={"fit-content"} borderRadius={"32px"} />
                    <Flex roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} bgColor={"#000000ce"} w={"full"} h={"full"} position={"absolute"} inset={"0px"} zIndex={"20"} />
                    <Image src='/assets/createimg.jpeg' alt='create' w={"full"} h={"full"} objectFit={"cover"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} position={"absolute"} inset={"0px"} zIndex={"10"} />
                </Flex>
            )}
            <LoadingAnimation loading={isLoading} customLoader={
                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={["411px", "411px", "449px", "449px", "449px"]} />
            } >
                <Flex color={"white"} w={"full"} bg={["transparent", "transparent", "#EFF1FE", "#EFF1FE", "#EFF1FE"]} position={"relative"} h={["411px", "411px", "449px", "449px", "449px"]} gap={["0px", "0px", "7", "7", "7"]} flexDir={["column", "column", "row"]} roundedBottom={"32px"} roundedTopLeft={"32px"}  >

                    <Box w={["full", "full", "568px", "568px", "568px"]} my={["", "auto"]} zIndex={"50"} px={["0px", "0px", "14", "14", "14"]} insetX={"0px"} position={["absolute", "absolute", "relative", "relative", "relative"]} bottom={"0px"} roundedBottom={["32px", "32px", "none", "none", "none"]} roundedTopLeft={"32px"} bg={["linear-gradient(168deg, rgba(46, 43, 43, 0.80) -7.34%, rgba(46, 43, 43, 0.00) 522.78%)", "linear-gradient(168deg, rgba(46, 43, 43, 0.80) -7.34%, rgba(46, 43, 43, 0.00) 522.78%)", "transparent", "transparent"]} >

                        {data?.map((item: any, index: any) => {
                            if (index === isShown) {
                                return (
                                    <Flex key={index} h={["fit-content", "fit-content", "449px", "449px", "449px"]} pos={"relative"} zIndex={"50"} flexDir={"column"} justifyContent={"center"} pb={["5", "5", "0px", "0px", "0px"]} pt={["5", "5", "0px", "0px", "0px"]} px={["4", "4", "0px", "0px", "0px"]} gap={["0px", "0px", "0px", "5"]} position={"relative"} >
                                        <motion.p {...boxAnimation} >
                                            <Text as={motion.p} fontSize={"45px"} display={["none", "none", "block", "block", "block"]} lineHeight={"40px"} fontWeight={"bold"}  >{textLimit(item?.eventName, 15)}</Text>
                                            <Text as={motion.p} fontSize={"20px"} display={["block", "block", "none", "none", "none"]} fontWeight={"bold"}  >{textLimit(item?.eventName, 15)}</Text>
                                        </motion.p>
                                        <motion.p {...boxAnimation} >
                                            <Text as={motion.p} lineHeight={"24px"} fontSize={"16px"} >{textLimit(item?.eventDescription, 40)}</Text>
                                        </motion.p>
                                        <Flex zIndex={"0"} mt={["5", "5", "5", "0px"]} color={"black"} left={"0px"} w={"full"} flexDir={['column', 'column', 'column', 'row', 'row']} alignItems={["", "", "start", "center", "center"]} gap={"5"} >
                                            <CustomButton onClick={() => clickHander(item)} fontSize={"sm"} borderColor={"brand.chasescrollBlue"} color={"white"} borderWidth={"0px"} px={"4"} text={"View Event"} width={["172px"]} />
                                            {item?.attendeesVisibility && (
                                                <InterestedUsers fontSize={16} color={["white", "white", "white", "white", "white"]} event={item} border={"2px"} size={"32px"} />
                                            )}
                                        </Flex>
                                    </Flex>
                                )
                            }
                        })}
                    </Box>
                    <Box w={"full"} pos={"absolute"} inset={"0px"} zIndex={"40"} roundedBottom={"32px"} borderTopLeftRadius={"32px"} h={"full"} bgColor={"black"} opacity={"15%"} />
                    <Box pos={"absolute"} inset={"0px"} w={"full"} h={["411px", "411px", "449px", "449px", "449px"]} roundedBottom={"32px"} roundedTopLeft={"32px"} >
                        {data?.map((item: any, index: any) => {
                            return (
                                <AnimatePresence key={index} >
                                    {index === isShown &&
                                        <motion.div {...boxAnimation} style={{ width: "100%", height: "100%", borderRadius: "32px", position: "absolute", inset: "0px", borderColor: "#D0D4EB", borderWidth: "2px", objectFit: "cover" }} >
                                            <BlurredImage border='0px ' height={["411px", "411px", "449px", "449px", "449px"]} image={item?.currentPicUrl} />
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            )
                        })}
                    </Box>
                </Flex>
            </LoadingAnimation>
        </Flex>
    )
}

export default HomeLandingPageCarousel
