import MapComponent from '@/components/sharedComponent/map_component'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { LocationStroke } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    latlng: string,
    height?: string,
    location?: string
}

function EventMap(props: Props) {
    const {
        latlng,
        height,
        location
    } = props

    const [open, setOpen] = useState(false)
    const [myLocation, setMyLocation] = useState({
        lat: 0,
        lng: 0,
    })

    const {
        secondaryBackgroundColor
    } = useCustomTheme()

    const router = useRouter()

    return (
        <>
            {latlng && (
                <Flex w={"full"} flexDirection={["column-reverse", "column-reverse", "column-reverse", "column-reverse", "column-reverse"]} gap={"2"} alignItems={["end", "end", "end", "end", "end"]} >
                    <Box width={"full"} as='button' >
                        <MapComponent view={true} zoom={15} setMyLocat={setMyLocation} hidesearch={true} latlng={latlng} height={height ?? '30vh'} />
                    </Box>
                    <Flex w={"full"} alignItems={"center"}  >
                        {location && (
                            <Flex maxW={"400px"} rounded={"32px"} h={"fit-content"} py={"2"} px={"3"} bgColor={secondaryBackgroundColor} w={"full"} gap={"2"}>
                                <Flex w={"fit-content"} >
                                    <LocationStroke />
                                </Flex>
                                <Text fontSize={"14px"} fontWeight={"500"} whiteSpace={"none"} >{location}</Text>
                            </Flex>
                        )}
                        <a style={{ marginLeft: "auto" }} target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${Number(myLocation?.lat)},${Number(myLocation?.lng)}&destination=${Number(latlng.split(" ")[0])},${Number(latlng.split(" ")[1])}`} >
                            <Button width={"fit-content"} rounded={"full"} bg={"brand.chasescrollBlue"} px={"5"} height={"40px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >Direction</Button>
                        </a>
                    </Flex>
                </Flex>
            )}
        </>
    )
}

export default EventMap
