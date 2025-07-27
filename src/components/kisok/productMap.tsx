import CustomButton from '@/components/general/Button'
import MapComponent from '@/components/sharedComponent/map_component'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import useEventStore from '@/global-state/useCreateEventState'
import useProductStore from '@/global-state/useCreateProduct'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props { 
    location: any,
    height?: string
}

function ProductMap(props: Props) {
    const { 
        location,
        height
    } = props

    const [open, setOpen] = useState(false)
    const { mainBackgroundColor } = useCustomTheme()

    const changeHandler = (item: any) => { 
        setOpen(true)
    } 

    return (
        <>
            {/* <CustomButton onClick={()=> setOpen(true)} borderWidth={"1px"} color={"#5465E0"} mt={"3"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"6"} rounded={"8px"} width={"fit-content"} text={eventdata?.location?.latlng ? 'Change Map Location' : 'Add Google Map' } /> */}
            <Input
                type="text"
                h={height ? height : "60px"}
                placeholder="Enter Location"
                mt={"sm"}
                fontSize={"sm"} 
                // disabled={true} 
                bgColor={mainBackgroundColor}
                onChange={changeHandler}
                width={"full"}
                // className="border w-full mt-4 text-sm rounded-md text-chasescrollTextGrey p-3"
                name="locationDetails" 
                onClick={()=> setOpen(true)}
                value={location?.locationDetails}
            />
            <ModalLayout title='Map' open={open} close={setOpen} size={"2xl"}  >
                <MapComponent latlng={location?.latlng} close={setOpen} />
            </ModalLayout>
        </>
    )
}

export default ProductMap
