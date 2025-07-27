"use client"
import CustomButton from '@/components/general/Button'
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { SuccessIcon } from '@/components/svg'
import useGetUser from '@/hooks/useGetUser'
import useProduct from '@/hooks/useProduct'
import useCustomTheme from '@/hooks/useTheme'
import { IRental } from '@/models/product'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat'
import { Checkbox, Flex, Input, Select, Text, Textarea, useToast } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation' 
import React, { useEffect, useState, use } from 'react';
import { FaCheckCircle, FaEdit } from 'react-icons/fa' 
import { IoIosAdd } from 'react-icons/io'
import { IoTrashBin } from 'react-icons/io5'
import { useQuery } from 'react-query'

interface IProps {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": any,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "state": string,
    "lga": string,
    "phone": string,
    "landmark": string,
    "isDefault": boolean
}

type Props = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function ShippingAddress(props: Props) {
    const params = use(props.params);

    const id = params.slug
    const { primaryColor, secondaryBackgroundColor, bodyTextColor } = useCustomTheme();
    const query = useSearchParams();
    const type = query?.get('qty');
    const startDate = query?.get('startDate');
    const endDate = query?.get('endDate');
    const { push } = useRouter()

    const { createAddress, setOpen, open, payload, setPayload, userId, editAddress, setAddressId, addressId, openDelete, setOpenDelete, deleteAddress, addressDefault, setAddressDefault, createRentalRecipt, updateAddress, openSucces, setOpenSucces } = useProduct()
    const toast = useToast()
    const [address, setAddress] = useState<Array<IProps>>([])


    const { user } = useGetUser()
    const [item, setItem] = useState({} as IRental)

    const { isLoading: loading } = useQuery(
        ["rental", id],
        () => httpService.get(`/rental/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            setItem(data?.data?.content[0])
        }
    });

    const { isLoading } = useQuery(
        ["addressuser", userId],
        () => httpService.get(`/addresses/user/${userId}`), {
        onSuccess(data) {
            setAddress(data?.data)
            data?.data?.map((item: IProps) => {
                if (item?.isDefault) {
                    setAddressDefault(item?.id)
                }
            })
        },
    }
    );

    const clickHandler = () => {
        if (!payload?.state || !payload?.lga || !payload?.phone || !payload?.landmark) {
            toast({
                title: "Fill the form complete to change address",
                description: "",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        } else {
            if (addressId) {
                editAddress?.mutate(payload)
            } else {
                createAddress?.mutate(payload)
            }
        }
    }

    const editHandler = (item: any) => {
        console.log(item);

        setAddressId(item?.id)
        setPayload({
            ...payload, state: item?.state,
            lga: item?.lga,
            phone: item?.phone,
            landmark: item?.landmark,
        })
        setOpen(true)
    }

    const createHandler = () => {
        setAddressId("")
        setOpen(true)
    }

    const deleteHandler = (item: any) => {
        setAddressId(item?.id)
        setOpenDelete(true)
    }

    const changeStatus = (item: IProps) => {
        setAddressId(item?.id)
        updateAddress?.mutate(
            {id:item?.id, payload: {
                state: item?.state,
                lga: item?.lga,
                phone: item?.phone,
                isDefault: true,
                landmark: item?.landmark,
                userId: userId,
            }}
        )
    }

    console.log(startDate);
    console.log(endDate);


    return (
        <Flex w={"full"} px={"6"} pt={["6", "6", "6", "6"]} pb={"12"} flexDir={"column"} gap={"6"} overflowY={"auto"} overflowX={"hidden"} >
            <Flex alignItems={"center"} gap={"1"} >
                <FaCheckCircle size={"15px"} color='#34C759' />
                <Text fontSize={"14px"} >Customer Address </Text>
            </Flex>
            <Flex w={"full"} gap={"6"} >
                <Flex flexDir={"column"} w={"full"} gap={"6"} >
                    <LoadingAnimation loading={isLoading} >
                        {address?.map((item, index) => {
                            return (
                                <Flex key={index} w={"full"} p={"6"} gap={"4"} rounded={"8px"} shadow={"lg"} flexDir={"column"} >
                                    <Flex w={"full"} justifyContent={"space-between"} >
                                        <Text fontSize={"12px"} fontWeight={"500"} >Address List</Text>
                                        <Flex gap={"4"} >
                                            <Flex as={"button"} onClick={() => editHandler(item)} >
                                                <FaEdit size={"20px"} color='black' />
                                            </Flex>
                                            <Flex as={"button"} onClick={() => deleteHandler(item)} >
                                                <IoTrashBin size={"20px"} color='black' />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex w={"full"} alignItems={"start"} gap={"4"} >
                                        <Flex onClick={() => changeStatus(item)} >
                                            <Checkbox isChecked={addressDefault === item?.id ? true : false} />
                                        </Flex>
                                        <Flex flexDir={"column"} gap={"1"} >
                                            <Text fontSize={"14px"} fontWeight={"500"} >{capitalizeFLetter(user?.firstName) + " " + capitalizeFLetter(user?.lastName)}</Text>
                                            <Text>{item?.state}</Text>
                                            <Text>{item?.lga}</Text>
                                            <Text>{item?.landmark}</Text>
                                            {addressDefault === item?.id && (
                                                <Flex fontSize={"8px"} fontWeight={"500"} px={"2"} py={"1"} bgColor={"#34C759"} rounded={"32px"} color={"white"} width={"fit-content"} >
                                                    DEFAULT ADDRESS
                                                </Flex>
                                            )}
                                            <Text fontWeight={"500"} fontSize={"12px"} mt={"3"} >Phone Number</Text>
                                            <Text fontSize={"14px"} >{item?.phone}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </LoadingAnimation>
                    <Flex onClick={createHandler} as={"button"} w={"full"} p={"6"} gap={"4"} h={"fit-content"} alignItems={"center"} rounded={"8px"} shadow={"lg"} flexDir={"column"} >
                        <Flex gap={"2"} w={"full"} >
                            <IoIosAdd size={"20px"} />
                            <Text fontSize={"14px"} fontWeight={"500"} >Add Address</Text>
                        </Flex>
                    </Flex>
                    <Text as={"button"} fontSize={"14px"} color={primaryColor} fontWeight={"500"} mr={"auto"} >Go back & Continue buying</Text>
                </Flex>
                <Flex w={"fit-content"} h={"fit-content"} >
                    <Flex w={"292px"} rounded={"8px"} flexDir={"column"} gap={"4"} p={"6"} shadow={"lg"} bgColor={"white"} >
                        <Text fontWeight={"500"} >Order Summary</Text>
                        <Flex w={"full"} justifyContent={"space-between"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Duration</Text>
                            <Text fontWeight={"500"} >{type} {item?.frequency === "HOURLY" ? (type === "1" ? "hour" : "hours") : (type === "1" ? "day" : "days")}</Text>
                        </Flex>
                        <Flex w={"full"} justifyContent={"space-between"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Item price</Text>
                            <Text fontWeight={"500"} >{formatNumber(item?.price)}</Text>
                        </Flex>
                        <Flex w={"full"} justifyContent={"space-between"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Total</Text>
                            <Text fontWeight={"500"} >{formatNumber(item?.price * Number(type))}</Text>
                        </Flex>
                        <Flex mt={"4"} >
                            <CustomButton isLoading={createRentalRecipt?.isLoading} onClick={() => createRentalRecipt?.mutate({
                                userID: userId + "", price: Number(item?.price * Number(type)), addressedId: addressDefault + "",
                                rentalID: item?.id,
                                startDate: Number(startDate),
                                endDate: Number(endDate),
                            })} text={"Confirm order"} borderRadius={"999px"} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <ModalLayout open={open} close={setOpen} title={"Add a new Address"} >
                <Flex w={"full"} gap={"4"} flexDir={"column"} p={"4"} >
                    <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>State</Text>
                        <Select value={payload?.state} placeholder='Select State' onChange={(e) => setPayload({ ...payload, state: e.target.value })} >
                            <option>Rivers</option>
                        </Select>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>L.G.A</Text>
                        <Select value={payload?.lga} placeholder='Select L.G.A' onChange={(e) => setPayload({ ...payload, lga: e.target.value })} >
                            <option>Port Harcourt</option>
                        </Select>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>Phone Number</Text>
                        <Input value={payload?.phone} type='number' placeholder='Enter Phone Number' onChange={(e) => setPayload({ ...payload, phone: e.target.value })} />
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>Land Mark</Text>
                        <Textarea value={payload?.landmark} placeholder='Select Land Mark' onChange={(e) => setPayload({ ...payload, landmark: e.target.value })} />
                    </Flex>
                    <CustomButton isLoading={createAddress?.isLoading || editAddress?.isLoading} onClick={clickHandler} text={"Submit"} borderRadius={"999px"} />
                </Flex>
            </ModalLayout>

            <ModalLayout open={openDelete} close={setOpenDelete} title={"Delete Address"} >
                <Flex w={"full"} gap={"4"} flexDir={"column"} alignItems={"center"} p={"4"} >
                    <IoTrashBin size={"40px"} color='red' />
                    <Text>Are you sure you want to delete this Address?</Text>
                    <Flex gap={"3"} w={"full"} >
                        <CustomButton onClick={() => setOpenDelete(false)} text={"Cancel"} color={primaryColor} borderWidth={"1px"} borderColor={primaryColor} backgroundColor={"white"} borderRadius={"999px"} />
                        <CustomButton isLoading={deleteAddress?.isLoading} onClick={() => deleteAddress?.mutate()} text={"Submit"} borderWidth={"1px"} borderColor={"red"} backgroundColor={"red"} borderRadius={"999px"} />
                    </Flex>
                </Flex>
            </ModalLayout> 
            <ModalLayout open={openSucces} close={setOpenSucces} bg={secondaryBackgroundColor} closeIcon={true} >
                <LoadingAnimation loading={loading} >
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={["18px", "20px", "24px"]} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{"Receipt created Successful"}</Text>
                        <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Your reciept has reach the vendor `}</Text> 
                            <CustomButton onClick={() => push("/dashboard/kisok?type=myreciept")} color={"#FFF"} text={'View Receipt'} w={"full"} backgroundColor={"#3EC259"} /> 
                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </Flex>
    )
}
