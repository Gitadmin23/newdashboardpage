"use client"
import CreateEventHeader from '@/components/create_event_component/create_event_header'
import EventInformation from '@/components/create_event_component/event_information'
import EventTheme from '@/components/create_event_component/event_theme'
import EventTicket from '@/components/create_event_component/event_ticket'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState'
import useCustomTheme from '@/hooks/useTheme'
import { IUser } from '@/models/User'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Box, Flex, useColorMode, useToast } from '@chakra-ui/react'
import React, { useState, use } from 'react';
import { focusManager, useQuery } from 'react-query'

interface Props { }

function EditEvent(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode } = useColorMode();

    focusManager.setFocused(false)
    const { tab, updateEvent, changeTab } = useEventStore((state) => state);
    const toast = useToast()
    const { isLoading, data } = useQuery(['all-events-details' + params?.slug,], () => httpService.get(URLS.All_EVENT + "?id=" + params?.slug), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {

            const clone: CreateEvent = {
                id: data?.data?.content[0]?.id,
                picUrls: data?.data?.content[0]?.picUrls,
                eventType: data?.data?.content[0]?.eventType,
                eventName: data?.data?.content[0]?.eventName,
                eventDescription: data?.data?.content[0]?.eventDescription,
                joinSetting: data?.data?.content[0]?.joinSetting,
                locationType: data?.data?.content[0]?.locationType,
                currency: data?.data?.content[0]?.currency,
                currentPicUrl: data?.data?.content[0]?.currentPicUrl,
                eventFunnelGroupID: data?.data?.content[0]?.eventFunnelGroupID,
                mediaType: data?.data?.content[0]?.mediaType,
                currentVideoUrl: data?.data?.content[0]?.currentVideoUrl,
                isPublic: data?.data?.content[0]?.isPublic,
                isExclusive: data?.data?.content[0]?.isExclusive,
                mask: data?.data?.content[0]?.mask,
                attendeesVisibility: data?.data?.content[0]?.attendeesVisibility,
                minPrice: data?.data?.content[0]?.minPrice,
                maxPrice: data?.data?.content[0]?.maxPrice,
                startTime: data?.data?.content[0]?.startTime,
                endTime: data?.data?.content[0]?.endTime,
                startDate: data?.data?.content[0]?.startDate,
                endDate: data?.data?.content[0]?.endDate,
                // expirationDate: "",
                location: data?.data?.content[0]?.location,
                productTypeData: data?.data?.content[0]?.productTypeData,
                collaborators: data?.data?.content[0]?.collaborators,
                acceptedAdmins: data?.data?.content[0]?.acceptedAdmins,
                acceptedCollaborators: data?.data?.content[0]?.acceptedCollaborators,
                admins: data?.data?.content[0]?.admins,
                affiliates: data?.data?.content[0]?.affiliates
            }
 
            const admin: any = []
            const collaborator: any = []
            const acceptedAdmins: any = []
            const acceptedCollaborators: any = []

            clone?.admins?.map((item: IUser) => {
                return admin.push(item?.userId)
            })
            clone?.collaborators?.map((item: IUser) => {
                return collaborator.push(item?.userId)
            })

            clone?.acceptedAdmins?.map((item: IUser) => {
                return acceptedAdmins.push(item?.userId)
            })
            clone?.acceptedCollaborators?.map((item: IUser) => {
                return acceptedCollaborators.push(item?.userId)
            })

            clone.admins = admin
            clone.collaborators = collaborator
            clone.acceptedAdmins = acceptedAdmins
            clone.acceptedCollaborators = acceptedCollaborators

            updateEvent(clone) 

        }
    })


    React.useEffect(() => {
        changeTab(1)
    }, [])

    return (
        <LoadingAnimation loading={isLoading}>

            {/* <Flex width={"full"} h={["auto", "auto", "auto", "100vh"]} pt={"74px"} display={["none", "none", "none", "flex"]} flexDir={["column", "column", "column", "row"]} >
                <CreateEventHeader name="Edit Events" />
                <Flex bgColor={"gray.300"} w={"full"} p={["0px", "0px", "0px", "3"]}   >
                    <Flex bgColor={"white"} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={["auto"]} overflowY={["auto"]}>
                        <Box bgColor={"white"} w={"full"} px={"3"} h={["auto"]} >
                            {tab === 0 && (
                                <EventTheme />
                            )}
                            {tab === 1 && (
                                <EventInformation />
                            )}
                            {tab === 2 && (
                                <EventTicket promotion={(data?.data?.content[0]?.productTypeData[0]?.ticketType === "Promotion" || data?.data?.content[0]?.productTypeData[0]?.rerouteURL) ? true : false} />
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Flex> 
            <Box width={"full"} display={["block", "block", "block", "none"]}  >
                <CreateEventHeader name="Edit Events" />
                {tab === 0 && (
                    <EventTheme />
                )}
                {tab === 1 && (
                    <EventInformation />
                )}
                {tab === 2 && (
                    <EventTicket promotion={(data?.data?.content[0]?.productTypeData[0]?.ticketType === "Promotion" || data?.data?.content[0]?.productTypeData[0]?.rerouteURL) ? true : false} />
                )}
            </Box> */}

            <Flex width={"full"} h={["auto", "auto", "auto", "100vh"]} pt={"76px"} display={["none", "none", "none", "none", "flex"]} flexDir={["column", "column", "column", "row"]}  >
                <CreateEventHeader name="Edit Events" />
                <Flex bgColor={colorMode === 'light' ? "gray.300" : secondaryBackgroundColor} w={"full"} p={["0px", "0px", "0px", "3"]} h={"full"}  >
                    <Flex bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={"auto"} overflowY={"auto"} >
                        <Box bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} px={"3"} h={"fit-content"} >
                            {tab === 0 && (
                                <EventTheme />
                            )}
                            {tab === 1 && (
                                <EventInformation />
                            )}
                            {tab === 2 && (
                                <EventTicket />
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Box width={"full"} display={["block", "block", "block", "block", "none"]}  >
                <CreateEventHeader name="Edit Events" />
                {tab === 0 && (
                    <EventTheme />
                )}
                {tab === 1 && (
                    <EventInformation />
                )}
                {tab === 2 && (
                    <EventTicket />
                )}
            </Box>
        </LoadingAnimation>
    )
}

export default EditEvent
