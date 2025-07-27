import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import useEventStore from '@/global-state/useCreateEventState'
import useCustomTheme from '@/hooks/useTheme'
import httpService from '@/utils/httpService'
import { textLimit } from '@/utils/textlimit'
import { Checkbox, Flex, Input, Switch, Text, Textarea, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaCheckSquare } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { RiSearchLine } from 'react-icons/ri'
import { useQuery } from 'react-query'

export default function RequestServices() {

    const { primaryColor, borderColor, headerTextColor, secondaryBackgroundColor, mainBackgroundColor } = useCustomTheme()
    const { eventdata, updateEvent, updateRental, updateService, rental, service } = useEventStore((state) => state);
    const [selectedItem, setSelectedItem] = useState("")


    const array = ["test", "test", "test", "test", "test", "test",]


    const { data: datarental } = useQuery(
        ["getcategoryRental"],
        () => httpService.get(`/rental/categories`), {
    }
    );

    const { isLoading, data } = useQuery(['get-business-categories'], () => httpService.get('/business-service/categories'), {
        refetchOnMount: true,
        onError: (error: any) => { },
    });


    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)
    const [search, setSearch] = useState("")

    const [isPr, setPr] = useState(false)

    const changeHandler = (item: string) => {

        if(item?.toString()?.length <= 2){
            const clone = { ...eventdata }
    
            let data = {
                affiliateType: "pr",
                percent: item
            }
    
            clone.affiliates = [data]
    
            updateEvent({ ...clone })
        }
    }

    useEffect(() => {
        if (eventdata.affiliates?.length > 0) {
            if (eventdata.affiliates[0]?.affiliateType) {
                setPr(true)
            }
        }
    }, [eventdata.affiliates]) 

    const clickHander = () => {
        const clone = { ...eventdata } 
        

        if(eventdata?.affiliates?.length >= 1){ 
            clone?.affiliates.pop()
            updateEvent({ ...clone })
            setPr(false)
 
            
        } else {
            setPr(true)
    
            let data = {
                affiliateType: "pr",
                percent: null
            }
    
            clone.affiliates = [data]
    
            updateEvent({ ...clone }) 
        }
    }

    const selectService = (data: string) => {
        let clone = [...service]
        if (service?.some(item => item.category === data)) {

            clone = clone.filter((item: any) => item.category !== data)
            // updateService((prevItems: any) => prevItems.filter((item: any) => item.category !== data));// Removes the element at the found index  
            updateService(clone)
            setSelectedItem("")
        } else {
            updateService([...clone, {
                "category": data,
                "description": "",
                "type": "SERVICE"
            }])
        }
    }


    const selectRental = (data: string) => {
        let clone = [...rental]
        if (rental?.some(item => item.category === data)) {
            clone = clone.filter((item: any) => item.category !== data)
            updateRental(clone);// Removes the element at the found index  
            // updateRental(clone)
        } else {
            updateRental([...clone, {
                "category": data,
                "description": "",
                "type": "RENTAL"
            }])
        }
    }



    const changeHandlerRental = (type: string, value: string) => {
        const clone = [...rental]

        clone[rental.findIndex((item: any) => item.category === type)] = { ...clone[rental.findIndex((item: any) => item.category === type)], description: value }
        updateRental(clone)
    }



    const changeHandlerService = (type: string, value: string) => {
        const clone = [...service]

        clone[service.findIndex((item: any) => item.category === type)] = { ...clone[service.findIndex((item: any) => item.category === type)], description: value }
        updateService(clone)
    }


    return (
        <Flex w={"full"} flexDir={"column"} gap={"6"} >
            <Flex w={"full"} justifyContent={"space-between"} gap={"2"} alignItems={"center"} >
                <Text fontSize={"13px"} fontWeight={"500"} >Request services and rental for this event:</Text>
                <CustomButton onClick={() => setOpen(true)} text={"Request"} rounded={"16px"} fontSize={"sm"} backgroundColor={"#F7F8FE"} color={primaryColor} width={"112px"} />
            </Flex>
            {service?.length > 0 && (
                <Flex w={"full"} gap={"3"} flexDirection={"column"} >
                    <Text fontSize={"14px"} fontWeight={"500"} >Services Selected</Text>
                    <Wrap gap={"4"} >
                        {service?.map((item, index) => (
                            <WrapItem key={index} >
                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} gap={"3"} h={"40px"} px={"4"} rounded={"8px"} >
                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{item?.category}</Text>
                                    <Flex as={"button"} onClick={() => selectService(item?.category)}  >
                                        <IoClose size={"20px"} color='#F81F1F' />
                                    </Flex>
                                </Flex>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Flex>
            )}
            {rental?.length > 0 && (
                <Flex w={"full"} gap={"3"} flexDirection={"column"} >
                    <Text fontSize={"14px"} fontWeight={"500"} >Rentals Selected</Text>
                    <Wrap gap={"4"} >
                        {rental?.map((item, index) => (
                            <WrapItem key={index} >
                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} gap={"3"} h={"40px"} px={"4"} rounded={"8px"} >
                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{item?.category?.replaceAll("_", " ")}</Text>
                                    <Flex as={"button"} onClick={() => selectRental(item?.category)} >
                                        <IoClose size={"20px"} color='#F81F1F' />
                                    </Flex>
                                </Flex>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Flex>
            )}
            <Flex w={"full"} borderWidth={"1px"} rounded={"16px"} p={"4"} flexDir={"column"} gap={"3"} >
                <Text fontSize={"14px"} fontWeight={"500"} >Do you wish to accept PR requests for your event?</Text>
                <Switch isChecked={isPr ? true : false} onChange={clickHander} />
                {isPr && (
                    <Flex flexDir={"column"} gap={"3"} >
                        <Text fontSize={"14px"} fontWeight={"500"} >Add Percentage</Text>
                        {eventdata?.affiliates?.length > 0 && (
                            <Flex alignItems={"center"} gap={"2"} > 
                                <Input px={"2"} value={eventdata?.affiliates[0]?.percent} onChange={(item) => changeHandler(item?.target?.value)} w={"50px"} type="number" />
                                <Text fontWeight={"800"} >%</Text>
                            </Flex>
                        )}
                    </Flex>
                )}
            </Flex>
            <ModalLayout open={open} close={setOpen} closeIcon={true} >
                <Flex flexDir={"column"} gap={"4"} pb={"4"} >
                    <Text fontWeight={"500"} ml={"4"} >Service | Rentals</Text>
                    <Flex w={"full"} px={"4"} justifyContent={"center"} borderBottomWidth={"1px"} borderColor={borderColor}>
                        <Flex justifyContent={"center"} onClick={() => setTab(false)} w={"100px"} pb={"1"} mb={"-1px"} borderBottomWidth={"1px"} borderColor={!tab ? primaryColor : borderColor} >
                            <Text color={!tab ? primaryColor : headerTextColor} fontSize={"14px"} >Services</Text>
                        </Flex>
                        <Flex justifyContent={"center"} onClick={() => setTab(true)} w={"100px"} pb={"1"} mb={"-1px"} borderBottomWidth={"1px"} borderColor={tab ? primaryColor : borderColor} >
                            <Text color={tab ? primaryColor : headerTextColor} fontSize={"14px"} >Rental</Text>
                        </Flex>
                    </Flex>
                    <Flex w={"full"} pos={"relative"} h={"50px"} px={"4"} >
                        <Input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search' w={"full"} h={"50px"} pl={"40px"} rounded={"full"} />
                        <Flex w={"40px"} h={"50px"} pos={"absolute"} top={"0px"} justifyContent={"center"} alignItems={"center"} >
                            <RiSearchLine size={"25px"} color='#B6B6B6' />
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} gap={"4"} px={"4"} >
                        {(service?.length !== 0 && !tab) && (
                            <Flex w={"full"} h={"40px"} pos={"relative"} >
                                <Flex w={"full"} overflowX={"auto"} pos={"absolute"} gap={"3"} flex={"1"} left={"0px"} right={"0px"} top={"0px"} >
                                    {service?.map((item, index) => {
                                        return (
                                            <Flex key={index} w={"full"}>
                                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} justifyContent={"space-between"} gap={"3"} h={"40px"} w={"140px"} px={"4"} rounded={"8px"} >
                                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{textLimit(item?.category?.replaceAll("_", " "), 10)}</Text>
                                                    <Flex as={"button"} onClick={() => selectService(item?.category)} >
                                                        <IoClose size={"20px"} color='#F81F1F' />
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            </Flex>
                        )}

                        {(rental?.length !== 0 && tab) && (
                            <Flex w={"full"} h={"40px"} pos={"relative"} >
                                <Flex w={"full"} overflowX={"auto"} pos={"absolute"} gap={"3"} flex={"1"} left={"0px"} right={"0px"} top={"0px"} >
                                    {rental?.map((item, index) => {
                                        return (
                                            <Flex key={index} w={"fit-content"} >
                                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} justifyContent={"space-between"} gap={"3"} h={"40px"} w={"140px"} px={"4"} rounded={"8px"} >
                                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{textLimit(item?.category?.replaceAll("_", " "), 10)}</Text>
                                                    <Flex as={"button"} onClick={() => selectRental(item?.category)} >
                                                        <IoClose size={"20px"} color='#F81F1F' />
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            </Flex>
                        )}
                        <Flex maxH={"45vh"} overflowY={"auto"} bgColor={secondaryBackgroundColor} rounded={"16px"} >
                            {!tab && (
                                <Flex w={"full"} h={"auto"} flexDir={"column"} rounded={"16px"}>
                                    {data?.data?.filter((item: string) => item?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()))?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => {
                                        return (
                                            <Flex key={index} as={"button"} w={"full"} h={"fit-content"} gap={"2"} flexDir={"column"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                                <Flex w={"full"} flexDir={"column"} h={item === selectedItem ? "40px" : "53px"} justifyContent={"space-between"} >
                                                    <Flex onClick={() => selectService(item)} w={"full"} px={"4"} pt={(item !== selectedItem && service?.some((subitem: any) => subitem.category === item)) ? "2" : "0px"} h={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                                        <Text fontSize={"14px"} >{textLimit(item?.replaceAll("_", " "), 30)}</Text>
                                                        {service?.some((subitem: any) => subitem.category === item) ? (
                                                            <FaCheckSquare color={primaryColor} size={"20px"} />
                                                        ) : (
                                                            <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                                        )}
                                                        {/* <Checkbox onChange={() => selectService(item)} isChecked={service?.some((subitem: any) => subitem.category === item) ? true : false} /> */}
                                                    </Flex>
                                                    {(item !== selectedItem && service?.some((subitem: any) => subitem.category === item)) && (
                                                        <Flex px={"4"} color={primaryColor} as={"button"} pb={"1"} fontSize={"10px"} onClick={() => setSelectedItem(item)} >View requirements</Flex>
                                                    )}
                                                </Flex>
                                                {item === selectedItem && (
                                                    <Flex flexDir={"column"} gap={"2"} pb={"2"} justifyContent={"start"} alignItems={"start"} px={"3"} w={"full"} >
                                                        <Text fontSize={"10px"} >{("please ENTER YOUR SERVICE requirements")?.toLocaleLowerCase()}</Text>
                                                        <Flex w={"full"} gap={"2"} >
                                                            <Textarea value={service[service.findIndex((subitem: any) => subitem.category === item)]?.description} onChange={(e) => changeHandlerService(item, e.target?.value)} h={"55px"} bgColor={mainBackgroundColor} />
                                                            <Flex mt={"auto"} w={"fit-content"} >
                                                                <Flex px={"2"} color={primaryColor} fontSize={"12px"} h={"35px"} as={"button"} onClick={() => setSelectedItem("")} >Done</Flex>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                )}
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )}
                            {tab && (
                                <Flex w={"full"} h={"auto"} flexDir={"column"} rounded={"16px"}>
                                    {datarental?.data?.filter((item: string) => item?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()))?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => {
                                        return (
                                            <Flex key={index} as={"button"} w={"full"} h={"fit-content"} gap={"2"} flexDir={"column"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                                <Flex w={"full"} flexDir={"column"} h={item === selectedItem ? "40px" : "53px"} justifyContent={"space-between"} >
                                                    <Flex onClick={() => selectRental(item)} w={"full"} px={"4"} pt={(item !== selectedItem && rental?.some((subitem: any) => subitem.category === item)) ? "2" : "0px"} h={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                                        <Text fontSize={"14px"} >{textLimit(item?.replaceAll("_", " "), 30)}</Text>
                                                        {rental?.some((subitem: any) => subitem.category === item) ? (
                                                            <FaCheckSquare color={primaryColor} size={"20px"} />
                                                        ) : (
                                                            <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                                        )}
                                                    </Flex>

                                                    {(item !== selectedItem && rental?.some((subitem: any) => subitem.category === item)) && (
                                                        <Flex px={"4"} color={primaryColor} as={"button"} pb={"1"} fontSize={"10px"} onClick={() => setSelectedItem(item)} >View requirements</Flex>
                                                    )}
                                                </Flex>
                                                {item === selectedItem && (
                                                    <Flex flexDir={"column"} gap={"2"} pb={"2"} justifyContent={"start"} alignItems={"start"} px={"3"} w={"full"} >
                                                        <Text fontSize={"10px"} >{("please ENTER YOUR SERVICE requirements")?.toLocaleLowerCase()}</Text>
                                                        <Flex w={"full"} gap={"2"} >
                                                            <Textarea value={rental[rental.findIndex((subitem: any) => subitem.category === item)]?.description} onChange={(e) => changeHandlerRental(item, e.target?.value)} h={"55px"} bgColor={mainBackgroundColor} />
                                                            <Flex mt={"auto"} w={"fit-content"} >
                                                                <Flex px={"2"} color={primaryColor} fontSize={"12px"} h={"35px"} as={"button"} onClick={() => setSelectedItem("")} >Done</Flex>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                )}
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )}
                        </Flex>
                        <Flex w={"full"} justifyContent={"end"} >
                            <CustomButton onClick={() => setOpen(false)} text={"Submit"} width={"130px"} height={"44px"} fontSize={"14px"} borderRadius={"999px"} />
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
