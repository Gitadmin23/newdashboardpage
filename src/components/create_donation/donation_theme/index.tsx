import useEventStore from '@/global-state/useCreateEventState';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Input, Radio, Spinner, Switch, Text, Textarea, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import SelectImage from './select_image';
import SubmitTheme from '../submit_event';
import CustomButton from '@/components/general/Button';
import useDonationStore from '@/global-state/useDonationState';
import SelectDonationDate from '../select_date';
import FunnelBtn from '../funnel';
import GetCommunity from '../funnel/get_community';
import DonationCollaborator from '../donationCollaborator';
import { usePathname } from 'next/navigation';

function DonationTheme({ id }: { id?: string }) {

    const { data, updateDontion, image, updateImage } = useDonationStore((state) => state)
    const pathname = usePathname();

    const handleChangeLimit = (e: any, limit: any, index: number) => {
        if ((e.target.value).length <= limit) {
            handleChange(e.target.name, e.target.value, index)
        }
    }

    const HandleAddTicket = (index: any) => {
        let myArr = [...data]
        myArr[index + 1] = {
            creatorID: "",
            name: "",
            bannerImage: "",
            description: "",
            goal: "",
            visibility: data[0]?.visibility,
            purpose: "",
            endDate: "",
            collaborators: []
        }
        updateDontion(myArr)
    }

    const user_id = localStorage.getItem("user_id") + ""

    const handleChange = (name: string, value: any, index: number) => {
        let clone: any = [...data]
        clone[index] = {
            ...clone[index],
            [name]: value,
            creatorID: user_id
        }
        updateDontion(clone)
    };

    const HandleDeleteTicket = (index: any) => {

        let myArr = [...data]
        let imgArr = [...image]

        myArr.splice(index, 1);
        imgArr.splice(index, 1);

        updateImage(imgArr)
        updateDontion(myArr)
    }

    return (
        <Flex px={"4"} justifyContent={"center"} pt={"10"} >
            <Flex maxW={"600px"} flexDirection={"column"} alignItems={"center"} >
                <Box maxW={["full", "full", "full", "1000px"]} width={"full"} >
                    <Text fontWeight={"bold"} fontSize={["md", "xl"]} >
                        Fundraising Cover Photo
                    </Text>
                    <Text fontWeight={"medium"} fontSize={["xs", "md"]} opacity={"0.5"} >
                        Add  photos / posters that describes details of your Fund raising
                    </Text>
                </Box>
                {data?.map((item, index) => (
                    <Flex key={index} maxW={["full", "full", "full", "1000px"]} pt={"6"} width={"full"} h={"full"} gap={"8"} flexDirection={["column", "column", "column"]} alignItems={"center"} justifyContent={"center"}          >
                        <Flex flexDirection={"column"} width={"full"} gap={"4"} >
                            <SelectImage index={index} />
                            <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                                <Text color={"brand.chasescrollTextGrey"} fontWeight={"600"} >Fundraising Title<span style={{ color: "#F04F4F" }} > *</span></Text>
                                <Input
                                    name="name"
                                    border={"1px solid #E2E8F0"}
                                    focusBorderColor={"#E2E8F0"}
                                    rounded={"full"}
                                    onChange={(e) => handleChangeLimit(e, 150, index)}
                                    value={item?.name} />
                                <Text fontSize={"sm"} >{item?.name?.length ? item?.name?.length : "0"} {"/ 150"}</Text>
                            </Flex>
                            <Flex width={"full"} flexDir={["column", "column", "row"]} pb={"3"} gap={"3"} >
                                <Box width={"full"}>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Fundraising Target
                                    </label>
                                    <Flex >
                                        <Input
                                            h={"45px"}
                                            type="number"
                                            border={"1px solid #E2E8F0"}
                                            focusBorderColor={"#E2E8F0"}
                                            placeholder='₦0.00'
                                            value={item?.goal}
                                            onChange={(e) => handleChange(e.target.name, Number(e.target.value), index)}
                                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                            rounded={"full"}
                                            name="goal"
                                        />
                                    </Flex>
                                </Box>
                                <Box width={"full"} >
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Fundraising Category
                                    </label>
                                    <Flex gap={"2"} >
                                        <Input
                                            h={"45px"}
                                            rounded={"full"}
                                            type="text"
                                            width={"full"}
                                            name='purpose'
                                            value={item?.purpose}
                                            onChange={(e) => handleChange(e.target.name, e.target.value, index)}
                                            border={"1px solid #E2E8F0"}
                                            focusBorderColor={"#E2E8F0"}
                                            placeholder="e.g Wedding, building project etc"
                                        />
                                    </Flex>
                                </Box>
                            </Flex>
                            <SelectDonationDate index={index} />
                            <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                                <Text color={"brand.chasescrollTextGrey"} > Fundraising Purpose<span style={{ color: "#F04F4F" }} > *</span></Text>
                                <Textarea
                                    id="description"
                                    name="description"
                                    border={"1px solid #E2E8F0"}
                                    focusBorderColor={"#E2E8F0"}
                                    rounded={"24px"}
                                    value={item?.description}
                                    onChange={(e) => handleChangeLimit(e, 1500, index)}
                                    className="outline-none w-full h-20 text-sm"
                                />
                                <Text fontSize={"sm"} >{item?.description?.length ? item?.description?.length : "0"} {"/ 1500"}</Text>
                            </Flex>
                        </Flex>
                        <Flex flexDirection={"column"} h={"full"} width={"full"} gap={"6"} > 
                                <Flex flexDirection={"column"} gap={"2"} >
                                    <Text fontWeight={"600"} >Fundraising Visibility</Text>
                                    <label htmlFor="publicVisibility" style={{ display: "flex", justifyContent: "space-between", borderBottomWidth: "1px", fontSize: "14px", padding: "8px" }} role='button' >
                                        <Text>
                                            Public
                                        </Text>
                                        <Radio
                                            type="radio"
                                            id="publicVisibility"
                                            name="visibility"
                                            value={"PUBLIC"}
                                            onChange={(e) => handleChange(e.target.name, e.target.value, index)}
                                            isChecked={item?.visibility === "PUBLIC"}
                                        />
                                    </label>
                                    <label htmlFor="privateVisibility" style={{ display: "flex", justifyContent: "space-between", borderBottomWidth: "1px", fontSize: "14px", padding: "8px" }} role='button' >
                                        <Text>
                                            Private
                                        </Text>
                                        <Radio
                                            type="radio"
                                            id="privateVisibility"
                                            name="visibility"
                                            value={"PRIVATE"}
                                            onChange={(e) => handleChange(e.target.name, e.target.value, index)}
                                            isChecked={item?.visibility === "PRIVATE"}
                                        />
                                    </label>
                                </Flex> 
                            {(index > 0 && !pathname?.includes("edit")) && (
                                <CustomButton onClick={() => HandleDeleteTicket(index)} backgroundColor={"brand.chasescrollRed"} width={"fit-content"} text='Remove Fundraising' />
                            )}
                            {!pathname?.includes("edit") && (
                                <Flex flexDir={["column", "column", "row"]} justifyContent={"space-between"} mt={"5"} gap={["4", "4", "4"]} >
                                    {/* <FunnelBtn index={index} />
                                    <Text color={"gray"} fontWeight={"800"} >|</Text> */}
                                    <DonationCollaborator btn={true} index={index} />
                                </Flex>
                            )}
                            <GetCommunity index={index} />
                        </Flex>
                    </Flex>
                ))}
                {!pathname?.includes("edit") && (
                    <Flex w={"full"} gap={"4"} mb={6} >
                        <CustomButton onClick={() => HandleAddTicket(data?.length - 1)} borderRadius={"full"} text='+ Add New Fundraising' color={"#5465E0"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"6"} rounded={"8px"} width={"fit-content"} />
                    </Flex>
                )}
                <Flex w={"full"} gap={"4"} mb={12} >
                    <SubmitTheme id={id} type={""} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DonationTheme


