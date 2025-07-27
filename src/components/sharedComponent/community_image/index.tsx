import { IMAGE_URL } from '@/services/urls'
import { Box, Flex, Image, Text } from '@chakra-ui/react' 
import React from 'react'

interface Props {
    data?: any,
    size: any,
    font?: string,
    src?: string,
    rounded?: string
}

function CommunityImage(props: Props) {
    const {
        data,
        size,
        font, 
        src,
        rounded
    } = props

    return (
        <Box roundedBottom={rounded ?? "64px"} roundedTopLeft={rounded ?? "64px"} borderColor={"#D0D4EB"} w={size} h={size} borderWidth={"2px"} >
            {data?.data?.imgSrc &&
                <Image style={{ borderBottomLeftRadius: rounded ?? "64px", borderBottomRightRadius: rounded ?? "64px", borderTopLeftRadius: rounded ?? "64px" }} objectFit="cover" alt={data?.data?.imgSrc} width={"full"} height={"full"} src={data?.data?.imgSrc?.includes("https://") ? data?.data?.imgSrc : IMAGE_URL + data?.data?.imgSrc} />
            }
            {src &&
                <Image style={{ borderBottomLeftRadius: rounded ?? "64px", borderBottomRightRadius: rounded ?? "64px", borderTopLeftRadius: rounded ?? "64px" }} objectFit="cover" alt={src} width={"full"} height={"full"} src={src?.includes("https://") ? src : IMAGE_URL + src} />
            }
            {(!data?.data?.imgSrc) && (
                <Flex justifyContent={"center"} alignItems={"center"} width={"full"} height={"full"} fontSize={font ? font : "30px"} fontWeight={"bold"} >
                    <Text>{data?.data?.name?.charAt(0).toUpperCase()}{data?.data?.name?.charAt(1).toUpperCase()}</Text>
                </Flex> 
            )}
        </Box> 
    )
}

export default CommunityImage
