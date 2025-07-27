import EventPrice from '@/components/sharedComponent/event_price'
import InterestedUsers from '@/components/sharedComponent/interested_users'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { formatNumber } from '@/utils/numberFormat'
import { textLimit } from '@/utils/textlimit'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    name: string,
    currency: string,
    minPrice: string,
    maxPrice: string,
    event?: any
}

function EventHeader(props: Props) {
    const {
        name,
        currency,
        minPrice,
        maxPrice,
        event
    } = props

    return (
        <Flex mt={"12"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
                <Text display={["none", "none", "block"]} fontSize={"24px"} fontWeight={"bold"} >{capitalizeFLetter(name)}</Text>
                <Text display={["block", "block", "none"]} fontSize={["14px", "14px", "18px"]} fontWeight={["medium", "bold", "bold"]} >{capitalizeFLetter(textLimit(name, 30))}</Text>
                <Text fontSize={["13px", "13px", "20px"]} fontWeight={["medium", "semibold", "semibold"]} color={"brand.chasescrollBlue"} >
                    <EventPrice minPrice={minPrice} maxPrice={maxPrice} currency={currency} />
                </Text>
            </Box>
            {event?.attendeesVisibility && (
                <InterestedUsers fontSize={16} event={event} border={"2px"} size={"38px"} refund={true} />
            )}
        </Flex>
    )
}

export default EventHeader
