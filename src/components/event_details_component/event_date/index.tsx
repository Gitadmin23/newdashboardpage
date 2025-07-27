import { BlueCalendarIcon, CalendarIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

interface Props {
    name?: string,
    date: any,
    dashboard?: boolean,
    eventdashboard?: boolean
}

function EventDate(props: Props) {
    const {
        date,
        name,
        dashboard,
        eventdashboard
    } = props
    
    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();

    return (
        <Box display={"flex"} flexDirection={dashboard ? "row" : "column"} gap={dashboard ? "2" : "0px"} borderBottomWidth={(dashboard || eventdashboard) ? "0px" : "1px"} borderBottomColor={"#B6B6B6"} roundedBottom={["0px", "0px", "lg"]} px={(dashboard || eventdashboard) ? "0px" : "2"} alignItems={dashboard ? "center" : "start"} pb={dashboard ? "0px" : "2"} >
            <Text fontSize={"sm"} ml={dashboard ? "0px" : "3"} fontWeight={["medium", "semibold", "semibold"]} >{name}</Text>
            <Flex width={dashboard ? "auto" : "full"} gap={eventdashboard ? "0px" : "3"} mt={(dashboard || eventdashboard) ? "0px" : "3"} alignItems={"center"} >
                {!dashboard && (
                    <>
                        {eventdashboard && ( 
                            <Flex justifyContent={"start"} w={"27px"} >
                                <CalendarIcon />
                            </Flex>
                        )}
                        {!eventdashboard && (
                            <BlueCalendarIcon />
                        )}
                    </>
                )}
                {!eventdashboard && (
                    <Flex flexDirection={dashboard ? "row" : "column"} gap={dashboard ? "2" : "0px"} alignItems={dashboard ? "center" : "flex-start"} >
                        <Text fontSize={["13px", "13px", "14px"]} fontWeight={["medium", "medium", "bold"]} color={"brand.chasescrollBlue"} >{dateFormat(date)}</Text>
                        <Text fontSize={["13px", "13px", "14px"]} fontWeight={["medium", "medium", "semibold"]} color={"brand.chasescrollTextGrey2"} >{timeFormat(date)} ({new Date(date).toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]})</Text>
                    </Flex>
                )}
                {eventdashboard && (
                    <Text fontSize={"12px"} color={bodyTextColor} >{dateFormat(date)} 
            </Text>
                )}
            </Flex>
        </Box>
    )
}

export default EventDate
