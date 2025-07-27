import { IMAGE_URL } from '@/services/urls'
import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

interface Props {
    image: any,
    height: any,
    border?: string,
    forEvent?: boolean
}

function BlurredImage(props: Props) {
    const {
        image,
        height,
        border,
        forEvent = true
    } = props

    return (
        <Flex width={"full"} justifyContent={"center"} position={"relative"} roundedBottom={"32px"} roundedTopLeft={"32px"} height={height} borderWidth={[ "0px" ,"2px"]} > 
            <Box position={"absolute"} inset={"0px"} bgColor={"black"} opacity={"20%"} zIndex={"12"} roundedBottom={"32px"} roundedTopLeft={"32px"} />
            <Image display={["block", "block"]} style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} id='img_blur' objectFit={"cover"} backdropFilter={"blur(10px)"} alt={image} width={"full"} height={"full"} src={forEvent ? IMAGE_URL + image : image} />
            <Box width={["fit-content"]} py={["0px" ,"2"]} zIndex={"20"} position={"absolute"} height={height} >
                <Box width={["fit-content"]} roundedBottom={"32px"} roundedTopLeft={"32px"} height={"full"} borderWidth={border ?? "3px"} borderColor={"#D0D4EB"} >
                    <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} borderColor={"#D0D4EB"} objectFit={"contain"} alt={image} width={["full"]} height={"full"} src={forEvent ? IMAGE_URL + image : image} />
                </Box>
            </Box>
        </Flex>
    )
}

export default BlurredImage
