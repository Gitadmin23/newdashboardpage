import { IMAGE_URL } from '@/services/urls'
import { Box, Image, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

interface Props {
    data: any,
    width: any,
    height: any,
    date?: boolean,
    searchbar?: boolean,
    borderWidth?: string,
    rounded?: string,
    maxW?: Array<string>
}

function EventImage(props: Props) {
    const {
        data,
        width,
        height,
        date,
        borderWidth,
        searchbar,
        rounded,
        maxW,
    } = props

    return (
        <Box maxWidth={maxW ? maxW : "full"} roundedBottom={rounded ? rounded : "32px"} position={"relative"} roundedTopLeft={rounded ? rounded : "32px"} borderColor={"#D0D4EB"} w={width} h={height} borderWidth={searchbar ? "3px" : borderWidth ? borderWidth : "5px"} >
            <Image style={{ borderBottomLeftRadius: rounded ? rounded : "32px", borderBottomRightRadius: rounded ? rounded : "32px", borderTopLeftRadius: rounded ? rounded : "32px" }} objectFit="cover" alt={data?.currentPicUrl ? data?.currentPicUrl : data?.bannerImage} width={"full"} height={"full"} src={data?.currentPicUrl ? IMAGE_URL + data?.currentPicUrl : IMAGE_URL + data?.bannerImage} />
            {date && (
                <Box color={"#121212"} roundedBottom={"8px"} roundedTopLeft={"8px"} fontWeight={"semibold"} position={"absolute"} bottom={"10px"} left={"10px"} width={"36px"} height={"36px"} bgColor={"white"} >
                    <Text fontSize={"18px"} >{moment(data?.startDate).format("D")}</Text>
                    <Text fontSize={"11px"} mt={"-8px"} >{moment(data?.startDate).format("MMM")}</Text>
                </Box>
            )}
        </Box>
    )
}

export default EventImage
