import useEventStore from '@/global-state/useCreateEventState';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Input, Radio, Select, Spinner, Switch, Text, Textarea, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import SelectImage from './select_image';
import SubmitTheme from '../submit_event';
import useCustomTheme from "@/hooks/useTheme";
import SelectEventType from './SelectEventType';
import { usePathname } from 'next/navigation';
import SelectDate from '../event_information/select_date';

function EventTheme() {

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const pathname = usePathname();
    const [types, setTypes] = useState(Array<any>)
    const { eventdata, updateEvent } = useEventStore((state) => state);
    const { isLoading } = useQuery(['getEventType'], () => httpService.get(URLS.GET_EVENTS_TYPES), {
        onError: (error: any) => {
            // toast.error(error.response?.data);
        },
        onSuccess: (data: any) => {


            const flavorOptions = data?.data.map((flavor: string) => ({
                value: flavor,
                label: (flavor.charAt(0).toUpperCase() + flavor.slice(1).split("_").join(" "))
            }));

            setTypes(flavorOptions)

        }
    });

    const handleChangeLimit = (e: any, limit: any) => {
        if ((e.target.value).length <= limit) {
            handleChange(e)
        }
    }

    const handleChange = ({ target: { name, value, type } }: any) => {

        if (name === "isPublic") {
            updateEvent({
                ...eventdata,
                [name]: value === "true" ? true : false
            });
        } else if (name === "attendeesVisibility") {
            updateEvent({
                ...eventdata,
                [name]: eventdata?.attendeesVisibility ? eventdata?.attendeesVisibility : !eventdata?.attendeesVisibility
            });
        } else {
            if (value === "") {

                updateEvent({
                    ...eventdata,
                    [name]: ""
                });
            } else {

                updateEvent({
                    ...eventdata,
                    [name]: value[0]?.toUpperCase() + value.slice(1)
                });
            }
        }
    };

    const handleTypeChange = (selectedOption: any) => {

        console.log(selectedOption);

        updateEvent({
            ...eventdata,
            eventType: selectedOption?.value
        });
    };


    return (
        <Box px={"4"} pt={"10"} >
            <Flex flexDirection={"column"} alignItems={"center"} >
                <Box maxW={["full", "full", "full", "1000px"]} width={"full"} >
                    <Text fontWeight={"bold"} fontSize={["md", "xl"]} >
                        Event Cover Image
                    </Text>
                    <Text fontWeight={"medium"} fontSize={["xs", "md"]} opacity={"0.5"} >
                        Add photos/posters that describes details of your events.
                    </Text>
                </Box>
                <Flex maxW={["full", "full", "full", "1000px"]} py={"6"} width={"full"} h={"full"} gap={"12"} flexDirection={["column", "column", "row"]} alignItems={"center"} justifyContent={"center"}          >
                    <Flex flexDirection={"column"} width={"full"} gap={"4"} >
                        <SelectImage />
                        <Box>
                            <Text fontSize={["md", "lg"]} fontWeight={"bold"} >
                                Basic Event Details
                            </Text>
                            <Text fontStyle={["xs", "sm"]} color={colorMode === 'light' ? "brand.chasescrollTextGray" : bodyTextColor} >
                                This section highlights details that should attract attendees to your event
                            </Text>
                        </Box>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Title <span style={{ color: "#F04F4F" }} > *</span></Text>
                            <Input
                                name="eventName"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                rounded={"full"}
                                disabled={pathname?.includes("edit_event_data") ? true : false}
                                onChange={(e) => handleChangeLimit(e, 150)}
                                value={eventdata?.eventName} />
                            <Text fontSize={"sm"} >{eventdata?.eventName?.length ? eventdata?.eventName?.length : "0"} {"/ 150"}</Text>
                        </Flex>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} >Attendee Visibility</Text>
                            <label htmlFor="showAttendees" style={{ display: "flex", height: "42px", alignItems: "center", justifyContent: "space-between", borderRadius: "999px", width: "100%", paddingLeft: "16px", paddingRight: "16px", padding: "8px", backgroundColor: colorMode === 'light' ? "#DCDEE4" : secondaryBackgroundColor }} >
                                <h3>Show</h3>
                                <Switch
                                    onChange={(e) => updateEvent({
                                        ...eventdata,
                                        attendeesVisibility: e.target.checked
                                    })}
                                    name="attendeesVisibility"
                                    isChecked={eventdata?.attendeesVisibility}
                                />
                            </label>
                        </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} h={"full"} mt={["4", "4", "0px"]} width={"full"} gap={"4"} >
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Type<span style={{ color: "#F04F4F" }} > *</span></Text>
                            <SelectEventType options={types} />
                        </Flex>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Description<span style={{ color: "#F04F4F" }} > *</span></Text>
                            <Textarea
                                id="eventDescription"
                                name="eventDescription"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                rounded={"24px"}
                                value={eventdata?.eventDescription}
                                onChange={(e) => handleChangeLimit(e, 1500)}
                                className="outline-none w-full h-20 text-sm"
                            />
                            <Text fontSize={"sm"} >{eventdata?.eventDescription?.length ? eventdata?.eventDescription?.length : "0"} {"/ 1500"}</Text>
                        </Flex>
                        <Flex width={"full"} gap={"2"} flexDirection={["column", "column", "column", "row"]} >
                            <SelectDate data={eventdata?.startDate ? eventdata?.startDate : ""} name={"Start"} />
                            <SelectDate data={eventdata?.endDate ? eventdata?.endDate : ""} name={"End"} />
                        </Flex>
                        <Flex flexDirection={"column"} gap={"2"} >
                            <Text fontWeight={"bold"} fontSize={"sm"}>Event Visibility</Text>
                            <Select name="isPublic" rounded={"full"} fontSize={"14px"} onChange={handleChange} value={eventdata?.isPublic + ""} >
                                <option value={"true"} >Public</option>
                                <option value={"false"} >Private</option>
                            </Select>
                        </Flex>
                        <Flex w={"full"} gap={"4"} my={"4"} >
                            <SubmitTheme type={""} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default EventTheme
