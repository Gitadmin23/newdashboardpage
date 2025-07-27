import { Box, Image } from '@chakra-ui/react'
import React from 'react'

interface Props {
    imageUrl: string
}

function BlurredImage(props: Props) {
    const {
        imageUrl
    } = props

    return (
        <Box rounded={"32px"} roundedTopRight={"0px"} position={"relative"} width={"full"} height={"330px"} >
            <Image src={imageUrl} alt='Post Image'  id='img_blur' width={"full"} height={"full"} />
            <Box position={"absolute"} inset={"0px"} rounded={"32px"} roundedTopRight={"0px"} display={"flex"}  height={"330px"} alignItems={"center"} justifyContent={"center"} >
                <Image src={imageUrl} alt='Post Image' maxWidth={"full"} height={"full"} rounded={"32px"} roundedTopRight={"0px"} />
            </Box>
        </Box> 
    )
}

export default BlurredImage
