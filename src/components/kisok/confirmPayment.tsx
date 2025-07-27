import React, { useEffect, useState } from 'react'
import CustomButton from '../general/Button'
import useCustomTheme from '@/hooks/useTheme'
import ModalLayout from '../sharedComponent/modal_layout'
import { Flex, Image, Text } from '@chakra-ui/react'
import { IoIosClose, IoIosStar } from 'react-icons/io'
import { QRcode, SuccessIcon } from '../svg'
import Qr_code from '../modals/send_message/Qr_code'
import useOrderConfirmation from '@/hooks/useOrderConfirmation'
import { IUser } from '@/models/User'
import OrderScanner from '../modals/Order/Scanner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from 'react-query'

export default function ConfirmPayment({
    id,
    type,
    name,
    image,
    vendor,
    productId,
    hasConfirm
}: {
    id: string;
    productId: string;
    type: "PRODUCT" | "RENTAL" | "SERVICE",
    name: string
    image: string
    vendor: IUser;
    hasConfirm?: boolean
}) {

    const newdata = {
        name: name
    }
    const { primaryColor, mainBackgroundColor, borderColor, headerTextColor, secondaryBackgroundColor, bodyTextColor } = useCustomTheme()
    const userId = localStorage.getItem('user_id') + "";

    const queryClient = useQueryClient()

    const { push } = useRouter()
    const query = useSearchParams();
    const param = query?.get('type');

    const { productConfirm, serviceConfirm, rentalConfirm, open, setOpen, show, setShow, tab, setTab, openMesage, setOpenMesage } = useOrderConfirmation(id)

    const clickHandler = () => {
        if (type === "PRODUCT") {
            productConfirm?.mutate(id)
        } else if (type === "RENTAL") {
            rentalConfirm?.mutate(id)
        } else {
            serviceConfirm?.mutate({
                bookingID: id,
                completedWithIssues: false,
                userID: userId
            })
        }
    }

    useEffect(() => {
        if (param && type === "PRODUCT") {
            setOpenMesage(true)
        }
    }, [])

    const closeHandler = () =>{
        queryClient?.invalidateQueries("getreciept")
        push(type === "PRODUCT" ? `/dashboard/kisok/details/${productId}?type=true` : type === "RENTAL" ? `/dashboard/kisok/details-rental/${productId}?type=true` : "")
    } 

    const closeModal = () =>{
        queryClient?.invalidateQueries("getreciept")
        setOpenMesage(false) 
    }

    return (
        <>
            {(vendor?.userId !== userId && !hasConfirm) && (
                <CustomButton onClick={() => { setOpen(true), setTab(1) }} backgroundColor={"#F7FBFE"} height={"53px"} borderWidth={"1px"} borderColor={primaryColor} fontSize={"14px"} color={primaryColor} px={"4"} borderRadius={"999px"} width={"fit-content"} text={type === "PRODUCT" ? "Have you receive your order" : type === "RENTAL" ? "Have you received your rental" : "Have you received your service"} />
            )}
            {hasConfirm && (
                <Flex w={"150px"} >
                    <CustomButton backgroundColor={"#0CC23A"} borderRadius={"999px"} text={"Delivered"} />
                </Flex>
            )}

            {vendor?.userId === userId && (
                // <Flex as={"button"} bgColor={"#F7FBFE"} onClick={() => setShow(true)} w={"236px"} h={"47px"} gap={"2"} rounded={"999px"} borderWidth={"1px"} borderColor={primaryColor} justifyContent={"center"} alignItems={"center"} >
                //     <QRcode />
                //     <Text fontSize={"14px"} fontWeight={"600"} color={bodyTextColor} >Scan</Text>
                // </Flex>
                <>

                </>
            )}
            <OrderScanner isOpen={show} onClose={setShow} id={id} />
            <ModalLayout open={open} size={"md"} close={setOpen} >
                <>
                    {tab === 1 && (
                        <Flex bgColor={mainBackgroundColor} p={"4"} flexDir={"column"} gap={"4"} >
                            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                <Text fontSize={"14px"} >Confirmation Page</Text>
                                <Flex onClick={() => setOpen(false)} as={"button"} >
                                    <IoIosClose size={"25px"} />
                                </Flex>
                            </Flex>
                            <Flex w={"full"} gap={"3"} pos={"relative"} borderWidth={"1px"} borderColor={borderColor} bgColor={"black"} rounded={"12px"} p={"5"} >
                                <Flex pos={"relative"} zIndex={"20"} w={"fit-content"} >
                                    <Flex w={'138px'} h={"112px"} bgColor={secondaryBackgroundColor} rounded={"8px"} justifyContent={"center"} alignItems={"center"} >
                                        <Image alt='Confirm' src={image} objectFit={"cover"} w={"full"} h={"full"} rounded={"8px"} />
                                    </Flex>
                                </Flex>
                                <Flex pos={"relative"} zIndex={"20"} flexDir={"column"} color={"white"} gap={"2"} >
                                    <Text fontWeight={"600"} >{name}</Text>
                                    <Flex gap={"1"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} >Item Reviews</Text>
                                        <IoIosStar size={"24px"} color="white" />
                                    </Flex>
                                </Flex>
                                <Flex pos={"absolute"} inset={"0px"} rounded={"12px"} >
                                    <Image alt='Confirm' src={image} rounded={"12px"} objectFit={"cover"} w={"full"} h={"full"} />
                                </Flex>
                                <Flex w={"full"} h={"full"} pos={"absolute"} inset={"0px"} bgColor={"black"} opacity={"70%"} rounded={"12px"} blur={"20px"} zIndex={"10"} />
                            </Flex>
                            {/* <Flex as={"button"} onClick={() => setTab(2)} w={"full"} h={"47px"} gap={"2"} rounded={"999px"} borderWidth={"1px"} borderColor={"#F1F1F1"} justifyContent={"center"} alignItems={"center"} >
                                <QRcode />
                                <Text fontSize={"12px"} color={bodyTextColor} >Get  QR Code</Text>
                            </Flex> */}
                            <CustomButton isLoading={productConfirm?.isLoading || rentalConfirm?.isLoading} onClick={clickHandler} text={"Confirm"} height={"47px"} fontSize={"14px"} borderRadius={"999px"} />
                        </Flex>
                    )}
                    {tab === 2 && (
                        <Qr_code id={id} close={setOpen} data={newdata} type={type as any} />
                    )} 
                </>
            </ModalLayout>
            <ModalLayout open={openMesage} size={"xs"  } close={closeModal} >
                <> <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                    <SuccessIcon />
                    <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"2"} mb={"4"} >{"Thank you"}</Text>
                    {/* <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`You can rate this product.`}</Text> */}

                    <CustomButton onClick={() => closeHandler()} color={"#FFF"} text={'Leave a review'} w={"full"} borderRadius={"99px"} />
                </Flex>
                </>
            </ModalLayout>
        </>
    )
}
