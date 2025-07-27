import CustomButton from '@/components/general/Button'
import VideoPlayer from '@/components/general/VideoPlayer'
import { GreenTickTwo } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import YouTube from 'react-youtube'

export default function AboutEventSection() {

    const { primaryColor } = useCustomTheme()

    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });
    const { push } = useRouter()


    interface IProps { 
        video?: boolean,
        url?: string
    }

    const Video = (props: IProps) => {

        const {
            url
        } = props

        return (
            <Flex w={"full"} h={["220px", "220px", "330px"]} bgColor={"white"} justifyContent={"center"} rounded={"14px"} alignItems={"center"}  >
                <Flex display={["none", "none", "flex"]} >
                    <YouTube className=" videoborder " videoId={url} opts={opts} />
                </Flex>
                <Flex display={["flex", "flex", "none"]} >
                    <YouTube className=" videoborder " videoId={url} opts={optsmobile} />
                </Flex>
            </Flex>
        )
    }

    const opts = {
        height: '330',
        width: '512',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
        control: false
    };

    const optsmobile = {
        height: '220',
        width: '320',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };


    return (
        <Flex w={"full"} gap={"6"} px={["6", "6", "16"]} py={["6", "6", "14"]} flexDir={["column", "column", "row"]} bg={"white"} alignItems={"center"} >
            <Flex
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateX(-150px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
                w={["full", "full", "fit-content"]} >
                <Flex w={"full"} h={["300px", "440px", "440px"]} rounded={"2xl"} >
                    <Flex w={"full"} h={"full"} rounded={"2xl"} px={"2"} bgColor={"#F2F7F1"} justifyContent={"center"} alignItems={"center"} >
                        {/* <Image src="/images/aboutplatform.png" alt='hometo' objectFit={"cover"} h={["full", "full"]} /> */}
                        <Video url='drGoYkoIfh4' />
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                ref={reftwo}
                style={{
                    transform: isInViewtwo ? "none" : "translateX(+150px)",
                    opacity: isInViewtwo ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
                w={"full"} flexDir={"column"} gap={"4"} >
                <Text fontSize={["32px", "32px", "48px"]} lineHeight={"150%"} fontWeight={"700"} >Up your <span style={{ color: primaryColor }} >event</span> {`game, it's easy`}</Text>
                <Flex flexDir={"column"} gap={"3"} mt={"2"} >
                    <Flex gap={"3"}>
                        <Flex w={"fit-content"} mt={"1"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >No cost to join</Text>
                            <Text fontSize={"14px"} >Register and browse talent profiles, explore events, or even rent an item.</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"3"}>
                        <Flex w={"fit-content"} mt={"1"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Request a service and hire top professionals</Text>
                            <Text fontSize={"14px"} >{`Finding professionals doesn't have to be a task. Request a service while creating your event or you can search from the tabs!`}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"3"}>
                        <Flex w={"fit-content"} mt={"1"} >
                            <GreenTickTwo />
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"24px"} fontWeight={"600"} lineHeight={"120%"} >Work with the best—without breaking the bank</Text>
                            <Text fontSize={"14px"} >Chasescroll makes it affordable to focus on your guests and take advantage of low transaction rates</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <CustomButton onClick={() => push("/auth/signup")} text={"Sign Up now for free"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}
