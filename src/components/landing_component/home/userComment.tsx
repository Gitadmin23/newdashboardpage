import { QuoteIcon } from "@/components/svg";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
// import { FaPlay } from "react-icons/fa";
import YouTube from "react-youtube";

interface IProps {
    name: string,
    detail: string,
    video?: boolean,
    url?: string
}

export default function UserComment() {

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    function getFirstLetterBeforeSpace(str: string) {
        // Split the string into an array of words
        const words = str.split(' ');

        // Check if there are at least two words
        if (words.length >= 2) {
            // Return the first character of the second word
            return words[1].charAt(0);
        }

        // Return an empty string if there is no second word
        return '';
    }

    const Card = (props: IProps) => {

        const {
            name,
            detail,
        } = props

        return (
            <Flex w={["320px", "320px", "399px"]} h={["220px", "220px", "330px"]} pb={"6"} bgColor={"white"} pt={"4"} flexDir={"column"} pos={"relative"} rounded={"14px"} borderWidth={"1px"} borderColor={"#E2E8F0"} >
                <Flex px={"6"} pt={"2"} w={"full"} h={"200px"} justifyContent={"center"} alignItems={"center"} overflowY={"auto"} >
                    <Text fontSize={"17.3px"} lineHeight={"28px"} letterSpacing={"-0.18px"} >{detail}</Text>
                </Flex>
                <Flex px={"6"} alignItems={"center"} position={"relative"} zIndex={"20"} mt={"auto"} gap={"3"} >
                    <Flex bgColor={"gray.700"} fontWeight={"600"} color={"white"} justifyContent={"center"} alignItems={"center"} w={"48px"} h={"48px"} rounded={"full"}>
                        {name?.slice(0, 1)}
                        {getFirstLetterBeforeSpace(name)}
                    </Flex>
                    <Text fontWeight={"medium"} fontSize={"15.13px"} lineHeight={"28px"} letterSpacing={"-0.16px"} >{name}</Text>
                </Flex>
                <Box pos={"absolute"} bottom={"0px"} zIndex={"0"} right={"4"} >
                    <QuoteIcon />
                </Box>
            </Flex>
        )
    }

    const Video = (props: IProps) => {

        const {
            url
        } = props

        return (
            <Flex w={["420px", "420px", "512px"]} h={["220px", "220px", "330px"]} bgColor={"white"} justifyContent={"center"} rounded={"14px"} alignItems={"center"}  >
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
    };

    const optsmobile = {
        height: '220',
        width: '420',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    // https://youtu.be/f8gJriFJE5k
    

    const data = [ 
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "bghyODXzp08",
        },
        {
            "name": "Egwake Jc - Abuja",
            "detail": "My experience with Chasescroll was very nice.",
            "video": false,
        },
        {
            "name": "Osuntade Brian - Lagos",
            "detail": "My experience with Chasescroll was nice.",
            "video": false,
        },
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "rZpcP499EPY",
        },
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "f8gJriFJE5k",
        },
        {
            "name": "Atuma Eric - Babcock University",
            "detail": "It was nice and all. Love the service.",
            "video": false,
        },
        {
            "name": "Akintokun Olamide - Port Harcourt",
            "detail": "It was an awesome experience.",
            "video": false,
        },
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "g0wurG_8E3Q"
        },
        {
            "name": "Akintunde Emma - Lagos",
            "detail": "It was nice and smooth, and I was able to organize my event properly.",
            "video": false,
        },
        {
            "name": "Ilenreh David - Abuja",
            "detail": "Yoo, fire as hell.",
            "video": false,
        },
        {
            "name": "Aderibigbe Precious - Port Harcourt",
            "detail": "It was a very pleasant one, to be honest. Sincerely, I’m very happy I got to know about it.",
            "video": false,
        },
        {
            "name": "Nwabueze Prince - Babcock University",
            "detail": "I recently had the pleasure of patronizing the Chasescroll brand, and I must say, my experience was nothing short of amazing! From the initial planning stages to the execution of the event, the team at Chasescroll was professional, organized, and dedicated to ensuring every detail was taken care of. I must say I was thoroughly impressed. I am extremely satisfied with the services provided by Chasescroll, and I would highly recommend them to anyone.",
            "video": false,
        },
        {
            "name": "Dada Jimmi - Port Harcourt",
            "detail": "I had a very nice experience with Chasescroll.",
            "video": false,
        },
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "0dHrSQ5hO6U"
        },
        {
            "name": "Olushola Andrew - Abuja",
            "detail": "Bro, thanks, the Chasescroll experience was fire.",
            "video": false,
        },
        {
            "name": "Ebereonwu Charles - Lagos",
            "detail": "It’s calm, mehn...really nice for real.",
            "video": false,
        },
        {
            "name": "Obele Chinaza - Babcock University",
            "detail": "Not gonna lie, my experience was really nice.",
            "video": false,
        },
        {
            "name": "Ugochukwu Chinaza - Port Harcourt",
            "detail": "My experience with Chasescroll has been so good, and I’m so happy. Thank you so much.",
            "video": false,
        },
        {
            "name": "Chijioke Ebube - Lagos",
            "detail": "My experience with Chasescroll was nice.",
            "video": false,
        },
        {
            "name": "Duruaku Michael - Abuja",
            "detail": "Okay, so my experience with Chasescroll was one of a kind. They really know their stuff. From the ease of use to the well-planned events, it’s really nice. I recommend a lot of people to try it.",
            "video": false,
        }
    ]


    return (
        <Flex w={"full"} flexDir={"column"} pt={["8", "8", "12"]} pb={["4", "4", "12"]} gap={"9"} >
            <Flex ref={ref} w={"full"} overflowX={"auto"} h={"fit-content"} px={["3", "3", "12"]} scrollBehavior={"smooth"} sx={
                {
                    '::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            }>
                <Flex w={"auto"} gap={"3"} >
                    {data?.map((item: IProps, index: number) => {
                        if (item?.video) {
                            return (
                                <Video key={index} {...item} />
                            )
                        } else {
                            return (
                                <Card key={index} {...item} />
                            )
                        }
                    })} 
                </Flex>
            </Flex>
            <Flex w={"full"} justifyContent={"end"} gap={"4"} px={"12"} >
                <Box onClick={() => scroll(-400)} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                    <Image w={"full"} h={"full"} rounded={"full"} src="/images/arrow.png" alt="arrow" />
                </Box>
                <Box onClick={() => scroll(400)} transform={"rotate(180deg)"} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                    <Image w={"full"} h={"full"} rounded={"full"} src="/images/arrow.png" alt="arrowrigth" />
                </Box>
            </Flex>
        </Flex>
    )
}