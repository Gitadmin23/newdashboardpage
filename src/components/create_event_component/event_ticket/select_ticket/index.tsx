import CustomButton from '@/components/general/Button';
import { AddIcon, SubtractIcon } from '@/components/svg';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex, Input, Select, Switch, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EarlyBird from './earlyBird';
import { usePathname } from 'next/navigation';

interface Props {
    type?: string,
    promotion?: boolean
}

function SelectTicket(props: Props) {
    const {
        type,
        promotion
    } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);
    const toast = useToast()

    const pathname = usePathname();

    const [donate, setDonate] = useState(false)

    const handleChange = (index: any, name: any, value: any) => {
        let clone: any = { ...eventdata }
        if (clone.productTypeData.length - 1 < index) {
            clone.productTypeData = [...clone.productTypeData, {
                totalNumberOfTickets: null,
                ticketPrice: null,
                ticketType: "",
                minTicketBuy: null,
                maxTicketBuy: null
            },]
        }

        if (name === "minTicketBuy" && value > 5) {
            toast({
                status: "error",
                title: "Error",
                description: "minimum ticket can't be greater than 5",
                position: "top-right"
            })
            console.log("min stop");

        } else if (name === "maxTicketBuy" && value > 50) {
            toast({
                status: "error",
                title: "Error",
                description: "maximum ticket can't be greater than 50",
                position: "top-right"
            })
            console.log("max stop");
        } else {
            clone.productTypeData[index]["minTicketBuy"] = 1
            clone.productTypeData[index][name] = value

            updateEvent(clone)
            console.log(" stop");
        }
    };


    const MaxTicketHandler = (index: number, type: string) => {
        let clone: any = { ...eventdata }
        if (type === "add") {
            if ((Number(eventdata.productTypeData[index]?.maxTicketBuy) + 1) <= 50) {
                clone.productTypeData[index]["maxTicketBuy"] = Number(eventdata.productTypeData[index]?.maxTicketBuy) + 1
            } else {
                toast({
                    status: "error",
                    title: "Error",
                    description: "maximum ticket can't be greater than 50",
                    position: "top-right"
                })
                return
            }
        } else {
            clone.productTypeData[index]["maxTicketBuy"] = Number(eventdata.productTypeData[index]?.maxTicketBuy) - 1
        }
        updateEvent(clone)
    }


    const handleChangeCurrency = ({ target: { name, value, type } }: any) => {
        if (name === "isPublic" || name === "attendeesVisibility") {
            updateEvent({
                ...eventdata,
                [name]: value === "true" ? true : false
            });
        } else {
            updateEvent({
                ...eventdata,
                [name]: value
            });
        }
    };

    useEffect(() => {

        const clone = { ...eventdata }

        clone?.productTypeData?.map((item, index) => {
            return clone.productTypeData[index]["minTicketBuy"] = "1"
        })

        updateEvent({
            ...clone,
            currency: "NGN",
        });
    }, [])

    const handleMaxTicket = (index: number, name: string, value: any) => {

        if (Number(eventdata.productTypeData[index]?.totalNumberOfTickets) >= (value)) {
            handleChange(index, name, value)
        } else {
            if (name === "minTicketBuy") {
                toast({
                    status: "error",
                    title: "Error",
                    description: "minimum ticket can't be greater than total number of ticket",
                    position: "top-right"
                })
            } else {
                toast({
                    status: "error",
                    title: "Error",
                    description: "Maximum number of ticket cannot be greater than total number of available ticket",
                    position: "top-right"
                })
            }
        }
    }

    const HandleDeleteTicket = (item: any) => {

        let myArr: any = [...eventdata?.productTypeData]

        var index = myArr.findIndex(function (o: any) {
            return o.ticketType === item;
        })
        myArr.splice(index, 1);
        updateEvent({
            ...eventdata,
            productTypeData: myArr
        })
    }

    const HandleAddTicket = (index: any) => {

        let myArr: any = [...eventdata?.productTypeData]
        myArr[index] = {
            totalNumberOfTickets: null,
            ticketPrice: type === "Free" ? 0 : null,
            ticketType: "Regular" + index,
            minTicketBuy: 1,
            maxTicketBuy: null
        }
        updateEvent({
            ...eventdata,
            productTypeData: myArr
        })
    }
 
    return (
        <Flex flexDirection={"column"} gap={"3"} width={"full"} >
            {eventdata?.productTypeData[0].ticketType !== "Free" ? (
                <EarlyBird />
            ) : (
                <Flex justifyContent={"space-between"} py={"4"} alignItems={"center"} >
                    {/* <Text fontWeight={"700"} >Do you which to accept donations for this event?</Text>
                    <Switch isChecked={eventdata?.donationEnabled} onChange={(e) =>
                        updateEvent({
                            ...eventdata,
                            donationEnabled: !eventdata?.donationEnabled
                        })} /> */}
                </Flex>
            )}

            {/* {eventdata?.donationEnabled && (
                <Flex width={"full"} flexDir={["column", "column", "row"]} pb={"3"} gap={"3"} >
                    <Box width={"full"}>
                        <label className="block text-gray-700 font-medium mb-2">
                            Donations Target
                        </label>
                        <Flex >
                            <Input
                                h={"45px"}
                                type="number"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                placeholder='₦0.00'
                                onChange={(e)=> updateEvent({
                                    ...eventdata,
                                    donationTargetAmount: e.target.value
                                })}
                                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                rounded={"full"}
                                name="ticketType"
                            />
                        </Flex>
                    </Box>
                    <Box width={"full"} >
                        <label className="block text-gray-700 font-medium mb-2">
                            Purpose for Donation
                        </label>
                        <Flex gap={"2"} >
                            <Input
                                h={"45px"}
                                rounded={"full"}
                                type="text"
                                width={"full"}
                                onChange={(e)=> updateEvent({
                                    ...eventdata,
                                    donationName: e.target.value
                                })}
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                placeholder="e.g Wedding, building project etc"
                            />
                        </Flex>
                    </Box>
                </Flex>
            )} */}
            {eventdata?.productTypeData[0].ticketType !== "Free" && (
                <Text fontSize={"18px"} my={"1"} fontWeight={"600"} >Other Ticket Types</Text>
            )}
            {eventdata.productTypeData?.map((item, index) => {
                if (item?.ticketType !== "Early Bird") {
                    return (
                        <Flex width={"full"} flexDirection={"column"} border={"1px solid #E2E8F0"} roundedBottom={"3xl"} roundedTopLeft={"3xl"} p={"6"} gap={"4"} key={index} >

                            {promotion && (
                                <Box width={"full"}>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        {`Add event owner’s website/link where attendees can  get the ticket.`}
                                    </label>
                                    <Flex >
                                        <Input
                                            h={"45px"}
                                            type="text"
                                            border={"1px solid #E2E8F0"}
                                            rounded={"full"}
                                            // disabled={pathname?.includes("edit_event_data") ? true : false}
                                            focusBorderColor={"#E2E8F0"}
                                            placeholder="https//"
                                            value={eventdata.productTypeData[index]?.rerouteURL ?? ""}
                                            name="rerouteURL"
                                            onChange={e => handleChange(index, "rerouteURL", e.target.value)}
                                        />
                                    </Flex>
                                </Box>
                            )}
                            <Flex width={"full"} flexDir={["column", "column", "row"]} gap={"3"} >
                                <Box width={"full"}>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Enter Ticket Name
                                    </label>
                                    <Flex >
                                        <Input
                                            h={"45px"}
                                            type="text"
                                            border={"1px solid #E2E8F0"}
                                            focusBorderColor={"#E2E8F0"}
                                            // disabled={pathname?.includes("edit_event_data") ? true : false}
                                            rounded={"full"}
                                            placeholder="Enter Name"
                                            value={eventdata.productTypeData[index]?.ticketType ?? ""}
                                            name="ticketType"
                                            onChange={e => handleChange(index, "ticketType", e.target.value)}
                                        />
                                    </Flex>
                                </Box>
                                <Box width={"full"} >
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Enter Price
                                    </label>
                                    <Flex gap={"2"} >
                                        <Input
                                            h={"45px"}
                                            rounded={"full"}
                                            type="number" 
                                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                            width={"full"}
                                            border={"1px solid #E2E8F0"}
                                            focusBorderColor={"#E2E8F0"}
                                            placeholder="Enter amount"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    handleChange(index, "ticketPrice", value)
                                                    // updateProduct({ ...productdata, price: value })
                                                }
                                            }} 
                                            onKeyPress={(e) => {
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            value={eventdata.productTypeData[index]?.ticketPrice ?? ""}
                                            // disabled={(type === "Free" || pathname?.includes("edit_event_data"))? true : false}
                                            name="ticketPrice"
                                            // onChange={e => handleChange(index, "ticketPrice", e.target.value)}
                                        />
                                    </Flex>
                                </Box>
                            </Flex>
                            {/* } */}
                            <Box width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Total number of tickets available to be sold for your
                                    events
                                </label>
                                <Input
                                    h={"45px"}
                                    type="number"
                                    rounded={"full"}
                                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                    border={"1px solid #E2E8F0"}
                                    focusBorderColor={"#E2E8F0"}
                                    placeholder=" Type in available quantity"
                                    // value={eventdata.totalTicketAvailable}
                                    value={eventdata.productTypeData[index]?.totalNumberOfTickets ?? ""}
                                    name="totalNumberOfTickets"
                                    onChange={e =>
                                        handleChange(index, "totalNumberOfTickets", e.target.value)
                                    }
                                />
                            </Box>
                            <Flex flexDirection={"column"} gap={"4"} width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Indicate the maximum number of tickets each user can
                                    purchase for your event
                                </label>
                                <Flex alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#CDD3FD"} w={"full"} flexDir={"column"} py={"4"} >
                                    {/* <Text color={colorMode === 'light' ? "#667085" : bodyTextColor} > */}
                                    {/* Number of Tickets
                                        </Text> */}
                                    <Flex gap={"5"} alignItems={"center"} py={"1"}  >
                                        <Box 
                                        disabled={(eventdata.productTypeData[index]?.maxTicketBuy === 0)}
                                         _disabled={{opacity: "0.2", cursor: "not-allowed"}} onClick={() => MaxTicketHandler(index, "subtract")} as='button' >
                                            <SubtractIcon />
                                        </Box>
                                        {eventdata.productTypeData[index]?.maxTicketBuy ?? 0}
                                        <Box _disabled={{opacity: "0.2", cursor: "not-allowed"}}onClick={() => MaxTicketHandler(index, "add")} as='button' >
                                            <AddIcon />
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Flex>
                            {eventdata?.productTypeData[0]?.ticketType === "Early Bird" ? (
                                <>
                                    {eventdata.productTypeData[index]?.ticketType && (
                                        <>
                                            {index !== 1 && (
                                                <CustomButton disable={pathname?.includes("edit_event_data")} _disabled={{opacity: "0.2", cursor: "not-allowed"}} onClick={() => HandleDeleteTicket(eventdata.productTypeData[index]?.ticketType)} backgroundColor={"brand.chasescrollRed"} width={"fit-content"} text='Remove Ticket' />
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {eventdata.productTypeData[index]?.ticketType && (
                                        <>
                                            {index !== 0 && (
                                                <CustomButton  disable={pathname?.includes("edit_event_data")}  onClick={() => HandleDeleteTicket(eventdata.productTypeData[index]?.ticketType)} backgroundColor={"brand.chasescrollRed"} width={"fit-content"} text='Remove Ticket' />
                                            )}
                                        </>
                                    )}
                                </>
                            )}

                        </Flex>
                    )
                }
            })}

            <CustomButton borderRadius={"full"} onClick={() => HandleAddTicket(eventdata?.productTypeData?.length)} text='+ Add New Ticket Type' color={"#5465E0"} mt={"3"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"6"} rounded={"8px"} width={"fit-content"} />

            <Box>
                <label className="block text-gray-700 font-medium ">
                    Currency
                </label>
                <Select
                    h={"45px"}
                    border={"1px solid #E2E8F0"}
                    focusBorderColor={"#E2E8F0"}
                    rounded={"full"}
                    placeholder="Select ticket currency"
                    value={eventdata.currency}
                    name="currency"
                    disabled={true}
                    onChange={handleChangeCurrency}
                >
                    <option>NGN</option>
                    <option>USD</option>
                </Select>
            </Box>
        </Flex>
    )
}

export default SelectTicket
