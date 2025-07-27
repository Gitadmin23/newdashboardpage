"use client"
import EventDetails from '@/components/event_details_component'
import EventDetail from '@/components/new_event_details/eventDetail'
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import usePaystackStore from '@/global-state/usePaystack'
import { URLS } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import httpService from '@/utils/httpService'
import { Box, useToast } from '@chakra-ui/react'
import React from 'react'
import { useQuery, focusManager } from 'react-query'

interface Props {
    event_index: any,
    dynamic?: boolean
}
 
function GetEventData(props: Props) {
    const {
        event_index,
        dynamic
    } = props
    const toast = useToast()
    const [data, setData] = React.useState({} as any) 

    const { configPaystack, setPaystackConfig } = usePaystackStore((state) => state);

    focusManager.setFocused(false)
    // react query
    const { isLoading, isRefetching } = useQuery(['all-events-details' + event_index], () => httpService.get(URLS.All_EVENT + "?id=" + event_index + "&pastEvent=true"), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            setData(data?.data?.content[0]);
        }
    })

    return (
        <Box width={"full"}  >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.length} >
                <EventDetail {...data} />
                {/* <EventDetails
                    dynamic={dynamic}
                    dataInfo={data}
                    eventID={data?.id}
                    isBought={data?.isBought}
                    eventName={data?.eventName}
                    about={data?.eventDescription}
                    banner={data?.currentPicUrl ? data?.currentPicUrl : ""}
                    isFree={data?.isFree}
                    timeAndDate={data?.startDate}
                    endtimeAndDate={data?.endDate}
                    location={data?.location}
                    locationType={data?.locationType}
                    convener={capitalizeFLetter(data?.createdBy?.firstName) + " " + capitalizeFLetter(data?.createdBy?.lastName)}
                    username={data?.createdBy?.username}
                    userBy={data?.createdBy?.userId}
                    ticketInfo={data?.productTypeData}
                    eventLogo={data?.createdBy?.data?.imgMain?.value}
                    price={data?.productTypeData}
                    currency={data?.currency}
                    isOrganizer={data?.isOrganizer}
                    minPrice={data?.minPrice}
                    maxPrice={data?.maxPrice}
                    ticketBought={data?.ticketBought} attendees={undefined} /> */}
            </LoadingAnimation> 
            <Fundpaystack id={data?.id} config={configPaystack} setConfig={setPaystackConfig} />
        </Box>
    )
}

export default GetEventData
