import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Bird, CalendarIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState'
import useCustomTheme from '@/hooks/useTheme'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import { IoIosClose } from 'react-icons/io'
import { IoLogoTwitter } from 'react-icons/io5'
import { usePathname } from 'next/navigation'

interface IProps {
    data?: any,
    index?: number
}

export default function EarlyBird({ data, index }: IProps) {


    const pathname = usePathname();
    const { primaryColor, secondaryBackgroundColor, headerTextColor, mainBackgroundColor } = useCustomTheme()

    const { eventdata, updateEvent } = useEventStore((state) => state);

    const [open, setOpen] = useState(false)

    const toast = useToast()

    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"sm"} h={"50px"}  >
                <CalendarIcon />
                {eventdata.productTypeData[0]?.startDate ? dateFormat(eventdata.productTypeData[0]?.startDate) : "Select Date And Time"}
                {" "}
                {eventdata.productTypeData[0]?.startDate ? timeFormat(eventdata.productTypeData[0]?.startDate) : ""}
            </Flex>
        )
    }

    const CustomInputEnd = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} rounded={"full"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} fontSize={"sm"} h={"50px"}  >
                <CalendarIcon />
                {eventdata.productTypeData[0]?.endDate ? dateFormat(eventdata.productTypeData[0]?.endDate) : "Select Date And Time"}
                {" "}
                {eventdata.productTypeData[0]?.endDate ? timeFormat(eventdata.productTypeData[0]?.endDate) : ""}
            </Flex>
        )
    }

    const handleChange = (value: any) => {
        let clone: any = { ...eventdata }
        clone.productTypeData[0]["startTime"] = Date.parse(new Date(value).toJSON())
        clone.productTypeData[0]["startDate"] = Date.parse(new Date(value).toJSON())

        updateEvent(clone)
    };

    const handleChangeEnd = (value: any) => {
        let clone: any = { ...eventdata }

        if(eventdata?.productTypeData[0]?.startDate) {
            if((new Date(eventdata?.productTypeData[0]?.startDate) ) < new Date(value)){
                clone.productTypeData[0]["endTime"] = Date.parse(new Date(value).toJSON())
                clone.productTypeData[0]["endDate"] = Date.parse(new Date(value).toJSON())
                updateEvent(clone)
            } else {
                toast({
                    status: "error",
                    title: "Error",
                    description: "End Date can not be less than Start Date",
                    position: "top-right"
                })
            }
        }
    };

    const clickHander = () => {
        setOpen(true)
        if (eventdata?.productTypeData[0]?.ticketType !== "Early Bird") {
            const clone = { ...eventdata }
            const ticket = {
                totalNumberOfTickets: "",
                ticketPrice: 0,
                ticketType: "Early Bird",
                minTicketBuy: 1,
                maxTicketBuy: 1, 
            }
            clone.productTypeData.unshift(ticket)
            console.log(clone);

        }
    }

    const handleChangeInput = (index: any, name: any, value: any) => {
        let clone: any = { ...eventdata }

        if (name === "minTicketBuy" && value > 5) {
            toast({
                status: "error",
                title: "Error",
                description: "minimum ticket can't be greater than 5",
                position: "top-right"
            })

        } else if (name === "maxTicketBuy" && value > 50) {
            toast({
                status: "error",
                title: "Error",
                description: "maximum ticket can't be greater than 50",
                position: "top-right"
            })
            console.log("max stop");
        } else {
            clone.productTypeData[0]["minTicketBuy"] = 1
            clone.productTypeData[0][name] = value

            updateEvent(clone)
        }
    };

    const removeHander = () => {
        const clone = { ...eventdata }

        clone?.productTypeData.shift()

        updateEvent(clone)
    }

    return (
        <Flex>
            <Flex gap={"1"}  >
                <Flex as={"button"} disabled={pathname?.includes("edit_event_data")} _disabled={{opacity: "0.2", cursor: "not-allowed"}} onClick={() => clickHander()} alignItems={"center"} gap={"1"} px="6" h={"45px"} rounded={"full"} bgColor={eventdata?.productTypeData[0]?.ticketType === "Early Bird" ? primaryColor : mainBackgroundColor} borderColor={primaryColor} borderWidth={"1px"} color={eventdata?.productTypeData[0]?.ticketType === "Early Bird" ? "white" : primaryColor} >
                    <IoLogoTwitter size="23px" />
                    <Text fontWeight={"500"} fontSize={"14px"} >{eventdata?.productTypeData[0]?.ticketType === "Early Bird" ? "Edit" : ""} Early Bird</Text>
                </Flex>
                {eventdata?.productTypeData[0]?.ticketType === "Early Bird" && 
                    <Flex as={"button"} onClick={()=> removeHander()} disabled={pathname?.includes("edit_event_data")} _disabled={{opacity: "0.2", cursor: "not-allowed"}} _hover={{ backgroundColor: "transparent" }} color={"red"} flexDir={"column"} justifyContent={"end"} mt={"7"} bg={"transparent"} h={"fit-content"} > 
                        <PiTrashSimpleDuotone size={"15px"} />
                    </Flex>
                }
            </Flex>
            <ModalLayout bg={secondaryBackgroundColor} open={open} close={setOpen} >
                <Flex p={"6"} w={"full"} flexDir={"column"} color={headerTextColor} >
                    <Flex w={"full"} flexDir={"column"} gap={"6"} justifyContent={"space-between"} >
                        <Flex w={"full"} justifyContent={"space-between"} >
                            <Flex flexDir={"column"} >
                                <Text fontSize={"22px"} fontWeight={"600"} >Early Bird Ticket</Text>
                                <Text>Enter the ticket information</Text>
                            </Flex>
                            <Flex as={"button"} onClick={() => setOpen(false)} width={"fit-content"} h={"full"} justifyContent={"center"} alignItems={"center"} >
                                <IoIosClose size="32px" />
                            </Flex>
                        </Flex>
                        <Flex flexDir={"column"} w={"full"} gap={"4"} >

                            <Box width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Enter Price
                                </label>
                                <Flex gap={"2"} >
                                    <Input
                                        h={"45px"}
                                        type="number"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                        width={"full"}
                                        border={"1px solid #E2E8F0"}
                                        focusBorderColor={"#E2E8F0"}
                                        placeholder="Enter amount"
                                        rounded={"full"}
                                        value={eventdata.productTypeData[0]?.ticketPrice ?? ""}
                                        disabled={false}
                                        name="ticketPrice"
                                        // onChange={e => handleChangeInput(0, "ticketPrice", e.target.value)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                handleChangeInput(0, "ticketPrice", value)
                                                // updateProduct({ ...productdata, price: value })
                                            }
                                        }} 
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </Flex>
                            </Box>
                            <Box width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Total number of early bird tickets available.
                                </label>
                                <Input
                                    h={"45px"}
                                    type="number"
                                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                    border={"1px solid #E2E8F0"}
                                    focusBorderColor={"#E2E8F0"}
                                    rounded={"full"}
                                    placeholder=" Type in available quantity"
                                    // value={eventdata.totalTicketAvailable}
                                    value={eventdata.productTypeData[0]?.totalNumberOfTickets ?? ""}
                                    name="totalNumberOfTickets"
                                    onChange={e =>
                                        handleChangeInput(0, "totalNumberOfTickets", e.target.value)
                                    }
                                />
                            </Box>
                            <Flex flexDir={"column"} gap={"2"} >
                                <Text fontSize={"sm"} >
                                    Start date
                                </Text>
                                <DatePicker
                                    // value={}
                                    // disabled={name === "End" && !eventdata.startDate}
                                    selected={eventdata.productTypeData[0]?.startDate ? new Date(eventdata.productTypeData[0]?.startDate) : new Date()}
                                    dateFormat="MMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    minDate={new Date()}
                                    maxDate={new Date(eventdata?.startDate)}
                                    onChange={handleChange}
                                    customInput={<CustomInput />}
                                />
                            </Flex>
                            <Flex flexDir={"column"} gap={"2"} >
                                <Text fontSize={"sm"} >
                                    End date
                                </Text>
                                <DatePicker
                                    // value={}
                                    // disabled={name === "End" && !eventdata.startDate}
                                    selected={eventdata.productTypeData[0]?.endDate ? new Date(eventdata.productTypeData[0]?.endDate) : eventdata.productTypeData[0]?.startDate ? new Date(eventdata.productTypeData[0]?.startDate) : new Date()}
                                    dateFormat="MMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    minDate={eventdata.productTypeData[0]?.startDate ? new Date(eventdata.productTypeData[0]?.startDate) : new Date()} 
                                    maxDate={new Date(eventdata?.startDate)}
                                    onChange={handleChangeEnd}
                                    customInput={<CustomInputEnd />}
                                />
                            </Flex>
                        </Flex>
                        <CustomButton onClick={() => setOpen(false)} backgroundColor={"#1732F70D"} borderWidth={"1px"} borderColor={"#1732F7"} color={"#5D70F9"} text={"Done"} borderRadius={"full"} w={"full"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}