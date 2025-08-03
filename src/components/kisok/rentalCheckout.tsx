import { Flex, HStack, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoIosAdd, IoIosClock, IoIosClose, IoIosRemove } from 'react-icons/io'
import CustomButton from '../general/Button'
import { formatNumber } from '@/utils/numberFormat'
import { IRental } from '@/models/product'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter } from 'next/navigation'
import ModalLayout from '../sharedComponent/modal_layout'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { CalendarIcon, LocationIcon, LocationIcon_2 } from '../svg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectAddress from './selectAddress'
import ProductImageScroller from '../sharedComponent/productImageScroller'
import moment from 'moment'
import { FiMinus, FiPlus } from 'react-icons/fi'
import RentalTermAndCondition from './RentalTermAndCondition'

interface IAction {
    value: number;
    type: 'ADDITION' | 'SUBSTRACTION',
}

export default function RentalCheckout({ setQty, qty, item }: { setQty: any, qty: number, item: IRental }) {

    const { borderColor, secondaryBackgroundColor, bodyTextColor, primaryColor, mainBackgroundColor } = useCustomTheme()

    const [startDate, setStartDate] = useState("" as any)
    const [open, setOpen] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const [price, setPrice] = useState((item?.price * qty) + "")

    const [tab, setTab] = useState(true)
    const { push } = useRouter()

    useEffect(() => {
        setPrice((item?.price * qty) + "")
    }, [qty, open])

    useEffect(() => {
        setPercentage(0)
    }, [open])

    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"12px"} h={"50px"}  >
                <CalendarIcon />
                {startDate ? dateFormat(startDate) : "Select Date And Time"}
                {" "}
                {startDate ? timeFormat(startDate) : ""}
            </Flex>
        )
    }
    const handleDateSelect = (date: any) => {
        setStartDate(date)
    }

    useEffect(() => {
        setStartDate("" as any)
    }, [])

    useEffect(() => {
        setTab(false)
    }, [open])

    const handlePriceChange = (itemData: IAction) => {
        if (itemData.type === 'ADDITION') {
            // calculate 5% fo the inital price
            const Percentage = Number(item?.price) * (percentage + 0.05);
            const newPrice = Number(item?.price) + Percentage;
            setPrice((newPrice * qty).toString());
            setPercentage(percentage + 0.05)
        } else {
            const Percentage = Number(item?.price) * (percentage - 0.05);
            const newPrice = Number(item?.price) + Percentage;
            setPrice((newPrice * qty).toString());
            setPercentage(percentage - 0.05)
        }
    }

    let token = localStorage.getItem("token")

    const clickHandler = () => {
        setOpen(true)
    }

    return (
        <Flex w={"full"} bgColor={mainBackgroundColor} rounded={"16px"} flexDirection={"column"} borderWidth={"1px"} p={["3", "3", "24px"]} gap={"1"} borderColor={borderColor} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
            <Flex gap={"1"} flexDir={["column", "column", "row"]} >
                <Text fontSize={"14px"} >Starting Price</Text>
                <Text fontSize={"14px"} ><span style={{ fontSize: "22px", fontWeight: "600" }} >{formatNumber(item?.price)}</span>{item?.frequency !== "HOURLY" ? "/Per day" : "/Per hour"}</Text>
            </Flex>
            <Flex alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} gap={["1", "1", "3"]} >
                <Text fontSize={["12px", "12px", "14px"]} fontWeight={"500"} >Number of {item?.frequency !== "HOURLY" ? "days" : "hours"}</Text>
                <Flex rounded={"39px"} alignItems={"center"} padding={"12px"} gap={"3"} >
                    <Flex as={"button"} onClick={() => setQty((prev: any) => prev === 1 ? 1 : prev - 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                        <IoIosRemove />
                    </Flex>
                    <Text fontSize={"18px"} >{qty}</Text>
                    <Flex as={"button"} disabled={qty === item?.maximiumNumberOfDays ? true : false} _disabled={{ cursor: "not-allowed" }} onClick={() => setQty((prev: any) => prev + 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} fontSize={"14px"}  >
                        <IoIosAdd />
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDir={"column"} gap={"2"} alignItems={"center"} >
                <CustomButton onClick={clickHandler} text={`NGN ${formatNumber(Number(item?.price) * Number(qty))}`} borderRadius={"999px"} height={["45px", "45px", "55px"]} />
                <RentalTermAndCondition />
            </Flex>
            <ModalLayout open={open} close={setOpen} size={tab ? ["full", "full", "4xl"] : ["full", "full", "4xl"]} >
                {!tab &&
                    <Flex w={"full"} flexDir={["column", "column", "row"]} position={"relative"} >
                        <Flex w={"35px"} h={"35px"} zIndex={"30"} bgColor={["#D8D8D880", "#D8D8D880", "transparent"]} pos={"absolute"} rounded={"full"} top={"2"} right={"2"} shadow={["md", "md", "none"]} justifyContent={"center"} alignItems={"center"} >
                            <IoIosClose onClick={() => setOpen(false)} size={"25px"} />
                        </Flex>
                        <ProductImageScroller images={item?.images} createdDate={moment(item?.createdDate)?.fromNow()} rounded='0px' height={["206px", "206px", "680px"]} userData={item?.creator} />
                        <Flex w={"full"} flexDir={"column"} p={"4"} gap={"4"} >
                            <Flex flexDir={"column"} >
                                <Text fontSize={"14px"} color={bodyTextColor} >Item Name</Text>
                                <Text fontSize={["16px", "16px", "20px"]} fontWeight={"700"} >{item?.name}</Text>
                            </Flex>
                            <Flex flexDir={"column"} >
                                <Text fontSize={"14px"} color={bodyTextColor} >Category</Text>
                                <Text fontSize={["16px", "16px", "20px"]} lineHeight={["17px", "17px", "25px"]} fontWeight={"700"}  >{item?.category?.replaceAll("_", " ")}</Text>
                            </Flex>
                            <Flex flexDir={"column"} >
                                <Text fontSize={"14px"} color={bodyTextColor} >Location</Text>
                                <Flex gap={"2"} alignItems={"center"}>
                                    <LocationIcon_2 />
                                    <Text fontSize={["12px", "12px", "14px"]} >{item?.location?.locationDetails}</Text>
                                </Flex>
                            </Flex>
                            <Flex gap={"4"} >
                                <Text fontSize={["12px", "12px", "14px"]} fontWeight={"500"} >{item?.frequency !== "HOURLY" ? "Days" : "Hours"} selected</Text>
                                <Flex borderWidth={"1px"} rounded={"39px"} alignItems={"center"} padding={"12px"} gap={"3"} >
                                    <Flex as={"button"} onClick={() => setQty((prev: any) => prev === 1 ? 1 : prev - 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosRemove />
                                    </Flex>
                                    <Text fontSize={"18px"} >{qty}</Text>
                                    <Flex as={"button"} disabled={qty === item?.maximiumNumberOfDays ? true : false} _disabled={{ cursor: "not-allowed" }} onClick={() => setQty((prev: any) => prev + 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosAdd />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex gap={"2"} flexDir={["column", "column", "row"]} >
                                <Flex flexDirection={"column"} w={"full"} gap={"1"}  >
                                    <Text fontSize={"14px"} >Start Date</Text>
                                    <DatePicker
                                        // value={}
                                        // disabled={name === "End" && !eventdata.startDate}
                                        selected={startDate ? new Date(startDate) : new Date()}
                                        dateFormat="MMM d, yyyy h:mm aa"
                                        showTimeSelect
                                        minDate={new Date()}
                                        onChange={handleDateSelect}
                                        customInput={<CustomInput />}
                                    />
                                </Flex>

                                {startDate && (
                                    <Flex flexDirection={"column"} w={"full"} gap={"1"}  >
                                        <Text fontSize={"14px"} >(Estimated) End Date</Text>

                                        <Flex as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"sm"} h={"50px"}  >
                                            <CalendarIcon />
                                            {item?.frequency !== "HOURLY" && (
                                                <Text fontSize={"12px"} >{dateFormat(new Date(startDate?.getTime() + qty * 24 * 60 * 60 * 1000)) +" "+timeFormat(new Date(startDate?.getTime() + qty * 24 * 60 * 60 * 1000))}</Text>
                                            )}
                                            {item?.frequency === "HOURLY" && (
                                                <Text fontSize={"12px"} >{dateFormat(new Date(startDate).setHours(new Date(startDate).getHours() + qty)) + " " + timeFormat(new Date(startDate).setHours(new Date(startDate).getHours() + qty))}</Text>
                                            )}
                                        </Flex>
                                    </Flex>
                                )}
                            </Flex>
                            <Flex w={"full"} gap={"4"} justifyContent={"space-between"} alignItems={"center"} >
                                <Text fontWeight={"500"} >Total Price</Text>
                                <Text fontWeight={"600"} fontSize={["20px", "20px", "20px"]} >{formatNumber(Number(price))}</Text>
                            </Flex>
                            <Text fontWeight={"500"} fontSize={"14px"} >You can negotiate this price by 5%</Text>
                            <Flex w={"full"} justifyContent={"center"} >
                                <HStack width={'180px'} height={'54px'} borderRadius={'50px'} overflow={'hidden'} backgroundColor={'#DDE2E6'}>
                                    <Flex cursor={'pointer'} onClick={() => handlePriceChange({ type: 'SUBSTRACTION', value: 0 })} flex={1} w={"full"} height={'100%'} borderRightWidth={'1px'} borderRightColor={'gray'} justifyContent={'center'} alignItems={'center'}>
                                        <FiMinus size={12} color='black' />
                                    </Flex>
                                    <Flex cursor={'pointer'} onClick={() => handlePriceChange({ type: 'ADDITION', value: 0 })} flex={1} w={"full"} justifyContent={'center'} alignItems={'center'}>
                                        <FiPlus size={12} color='black' />
                                    </Flex>
                                </HStack>
                            </Flex>

                            <Flex w={"full"} justifyContent={"end"} pt={"4"} mt={"auto"} gap={"4"} >
                                <CustomButton backgroundColor={mainBackgroundColor} color={primaryColor} borderWidth={"1px"} borderColor={primaryColor} onClick={() => setOpen(false)} text={`Cancel`} borderRadius={"999px"} height={"45px"} width={"150px"} fontSize={"14px"} />
                                <CustomButton disable={startDate ? false : true} onClick={() => setTab(true)} text={`Continue`} borderRadius={"999px"} height={"45px"} width={"150px"} fontSize={"14px"} />
                            </Flex>
                        </Flex>
                    </Flex>
                }

                {tab && (
                    <SelectAddress item={item} newPrice={Number(price)} qty={qty} id={item?.id} startDate={Date.parse(new Date(startDate)?.toJSON())} endDate={startDate ? (item?.frequency !== "HOURLY" ? Date.parse(new Date(startDate?.getTime() + item?.maximiumNumberOfDays * 24 * 60 * 60 * 1000).toJSON()) : Date.parse(new Date(new Date(startDate).setHours(new Date(startDate).getHours() + qty)).toJSON())) : ""} />
                )}
            </ModalLayout>
        </Flex>
    )
}
