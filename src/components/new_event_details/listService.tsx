import React, { useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { Checkbox, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import useCustomTheme from '@/hooks/useTheme';
import { ITag } from '@/models/product';
import { RiSearchLine } from 'react-icons/ri';
import { textLimit } from '@/utils/textlimit';
import { FaCheckSquare } from 'react-icons/fa';

export default function ListService({ selectService, service }: { selectService: any, service: Array<ITag> }) {


    const { isLoading, data: serviceData } = useQuery(['get-business-categories'], () => httpService.get('/business-service/categories'), {
        refetchOnMount: true,
        onError: (error: any) => { },
    });

    const [selectedItem, setSelectedItem] = useState("")
    const { mainBackgroundColor, primaryColor, secondaryBackgroundColor } = useCustomTheme()
    const [search, setSearch] = useState("")

    const selectServiceHandle = (data: string) => {
        const clone = [...service]
        if (service?.some(item => item.category === data)) {
            selectService((prevItems: any) => prevItems.filter((item: any) => item.category !== data));// Removes the element at the found index  
            // updateRental(clone)
        } else {
            selectService([...clone, {
                "category": data,
                "description": "",
                "type": "SERVICE"
            }])
        }
    }

    const changeHandler = (type: string, value: string) => {
        const clone = [...service]

        clone[service.findIndex((item: any) => item.category === type)] = { ...clone[service.findIndex((item: any) => item.category === type)], description: value }
        selectService(clone)
    } 

    return (
        <LoadingAnimation loading={isLoading} length={serviceData?.data?.length} >
            <Flex w={"full"} flexDir={"column"} gap={"3"} >
                <Flex w={"full"} pos={"relative"} h={"40px"} >
                    <Input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search' w={"full"} h={"40px"} pl={"40px"} rounded={"full"} fontSize={"14px"} />
                    <Flex w={"40px"} h={"40px"} pos={"absolute"} top={"0px"} justifyContent={"center"} alignItems={"center"} >
                        <RiSearchLine size={"25px"} color='#B6B6B6' />
                    </Flex>
                </Flex>
                <Flex w={"full"} maxH={"300px"} flexDir={"column"} gap={"3"} bgColor={secondaryBackgroundColor} rounded={"16px"} overflowY={"auto"} pos={"relative"} >
                    {serviceData?.data?.filter((item: string) => item?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()))?.sort((a: string, b: string) => {
                        if (a > b) {
                            return 1
                        } else {
                            return -1;
                        }
                        return 0;
                    })?.map((item: string, index: number) => {
                        return (
                            <Flex key={index} as={"button"} w={"full"} h={"fit-content"} gap={"2"} flexDir={"column"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                <Flex flexDir={"column"} h={item === selectedItem ? "40px" : "53px"} justifyContent={"space-between"} >
                                    <Flex onClick={() => selectServiceHandle(item)} w={"full"} px={"4"} pt={(item !== selectedItem && service?.some((subitem: any) => subitem.category === item)) ? "2" : "0px"} h={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                        <Text fontSize={"14px"} >{textLimit(item?.replaceAll("_", " "), 30)}</Text>
                                        <Flex ml={"auto"} >
                                            {service?.some((subitem: any) => subitem.category === item) ? (
                                                <FaCheckSquare color={primaryColor} size={"20px"} />
                                            ) : (
                                                <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                            )}
                                        </Flex>
                                        {/* <Checkbox isChecked={service?.some((subitem: any) => subitem.category === item) ? true : false} onChange={() => selectServiceHandle(item)} /> */}
                                    </Flex>

                                    {(item !== selectedItem && service?.some((subitem: any) => subitem.category === item)) && (
                                        <Flex px={"4"} color={primaryColor} as={"button"} pb={"1"} fontSize={"10px"} onClick={() => setSelectedItem(item)} >View requirements</Flex>
                                    )}
                                </Flex>
                                {item === selectedItem && (
                                    <Flex flexDir={"column"} gap={"2"} pb={"2"} justifyContent={"start"} alignItems={"start"} px={"3"} w={"full"} >
                                        <Text fontSize={"10px"} >{("please ENTER YOUR SERVICE requirements")?.toLocaleLowerCase()}</Text>
                                        <Flex w={"full"} gap={"2"} >
                                            <Textarea value={service[service.findIndex((subitem: any) => subitem.category === item)]?.description} onChange={(e) => changeHandler(item, e.target?.value)} h={"55px"} bgColor={mainBackgroundColor} />
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
            </Flex>
        </LoadingAnimation>
    )
}
