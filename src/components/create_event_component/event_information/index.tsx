import DatePicker from '@/components/Form/DatePicker'
import { CalendarIcon } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectDate from './select_date'
import useEventStore from '@/global-state/useCreateEventState'
import SelectLocation from './select_location'
import CustomButton from '@/components/general/Button'
import SubmitEvent from '../submit_event'
import SelectMap from './select_map'
import RequestServices from './request_Services'

function EventInformation() {

    const { eventdata, changeTab } = useEventStore((state) => state);

    const getValidationInfo = () => {
        if (!eventdata?.startDate) {
            return true
        } else if (!eventdata?.endDate) {
            return true
        } else if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                return true
            }
        } else {
            return false
        }
    }

    return (
        <Flex width={"full"} display={"flex"} h={"full"} flexDirection={"column"} alignItems={"center"} pt={"10"} px={"6"} >
            <Flex width={"full"} maxWidth={["full", "full", "full"]} flexDirection={"column"} justifyContent={"space-between"} gap={"4"} py={"6"} >
                <Flex w={"full"} gap={"4"} flexDir={["column-reverse", "column-reverse", "row"]} >
                    <SelectLocation />
                    <RequestServices />
                </Flex>
                <Flex w={"full"} gap={"4"} my={"4"} >
                    <CustomButton onClick={() => changeTab(0)} text={"Back"} width={"full"} borderRadius={"999px"} backgroundColor={"#EFF1FE80"} color={"#5465E0"} />
                    <SubmitEvent type={""} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default EventInformation
