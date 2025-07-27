import MapComponent from '@/components/sharedComponent/map_component'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    latlng: string, 
    height?: string
}

function EventMap(props: Props) {
    const {
        latlng,
        height
    } = props

    const [open, setOpen] = useState(false)
    const [myLocation, setMyLocation] = useState({
        lat: 0,
        lng: 0,
    }) 
    
    const router = useRouter() 

    return (
        <>
            {latlng && (
                <Flex w={"full"} flexDirection={["column-reverse", "column-reverse", "column-reverse", "column-reverse", "column-reverse"]} gap={"2"} alignItems={["end", "end", "end", "end", "end"]} >
                    <Box width={"full"} as='button' >
                        <MapComponent view={true} zoom={15} setMyLocat={setMyLocation} hidesearch={true} latlng={latlng} height={height ?? '30vh'} />
                    </Box>
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${Number(myLocation?.lat)},${Number(myLocation?.lng)}&destination=${Number(latlng.split(" ")[0])},${Number(latlng.split(" ")[1])}`} >
                        <Button width={"fit-content"} rounded={"full"} bg={"brand.chasescrollBlue"} px={"5"} height={"40px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >Direction</Button>
                    </a>
                </Flex>
            )}
        </>
    )
}

export default EventMap
