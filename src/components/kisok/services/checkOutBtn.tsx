import { useDetails } from "@/global-state/useUserDetails";
import { Button, Flex, HStack, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import ServiceTermAndCondition from "../ServiceTermAndCondition";
import { IService } from "@/models/Service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCustomTheme from "@/hooks/useTheme";
import ModalLayout from "@/components/sharedComponent/modal_layout";
import { IoIosClose } from "react-icons/io";
import moment from "moment";
import ProductImageScroller from "@/components/sharedComponent/productImageScroller";
import { CalendarIcon, LocationIcon_2 } from "@/components/svg";
import { FiMinus, FiPlus } from "react-icons/fi";
import { formatNumber } from "@/utils/numberFormat";
import React from "react";
import { useMutation } from "react-query";
import httpService from "@/utils/httpService";
import { dateFormat, timeFormat } from "@/utils/dateFormat";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import CustomButton from "@/components/general/Button";

interface IAction {
    value: number;
    type: 'ADDITION' | 'SUBSTRACTION',
}


export default function CheckoutBtn({ data }: { data: IService }) {

    const [show, setShow] = useState(false);
    const { userId } = useDetails((state) => state);
    // let token = localStorage.getItem("token")
    const { push } = useRouter()

    const { primaryColor, bodyTextColor, borderColor } = useCustomTheme()


    const clickHandler = () => {
        setShow(true)
    }


    // states
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(data?.price + "");
    const [percentage, setPercentage] = useState(0)
    const [date, setDate] = React.useState<string>("")

    // utils
    const router = useRouter();
    const toast = useToast()

    useEffect(() => {
        setDate("")
        setDescription("")
    }, [])

    useEffect(() => {
        setPrice((data?.price) + "")
    }, [data])

    const handleDateSelect = (date: any) => {
        setDate(date)
    }
    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"12px"} h={"50px"}  >
                <CalendarIcon />
                {date ? dateFormat(date) : "Select Date And Time"}
                {" "}
                {date ? timeFormat(date) : ""}
            </Flex>
        )
    }

    const handlePriceChange = (item: IAction) => {
        if (item.type === 'ADDITION') {
            // calculate 5% fo the inital price
            const Percentage = data?.price * (percentage + 0.05)
            const newPrice = data?.price + Percentage;
            setPrice(newPrice.toString());
            setPercentage(percentage + 0.05)
        } else {
            // calculate 5% fo the inital price
            const Percentage = data?.price * (percentage - 0.05);
            const newPrice = data?.price + Percentage;
            setPrice(newPrice.toString());
            setPercentage(percentage - 0.05)
        }
    }

    // mutations
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post('/booking/create', data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Booking has been created succesfully, and is waiting for approval from the Vendor',
                status: 'success',
                duration: 5000,
                position: 'top-right',
                isClosable: true,
            });
            console.log(data?.data);
            router.push(`/dashboard/product/kiosk?type=mybooking`);
            setShow(false);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message ?? 'An error occured while booking this service',
                status: 'error',
                duration: 5000,
                position: 'top-right',
                isClosable: true,
            });
        }
    });


    const handleCreation = React.useCallback(() => {
        if (description === '') {
            toast({
                title: 'Warning',
                description: 'You have to give a short description of what you expect from the vendor',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return;
        }

        if (!data?.hasFixedPrice && price === "0") {
            toast({
                title: 'Warning',
                description: 'You have to enter a valid price',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return;
        }

        const obj = {
            description,
            userID: userId,
            vendorID: data?.vendor?.userId,
            serviceID: data?.id,
            bookingType: "Busy",
            price: parseInt(price),
            date: new Date(date).toISOString(),
        }

        mutate(obj);
    }, [description, data, userId, toast, mutate, price]);

    useEffect(() => {
        setPercentage(0)
    }, [open])

    return (
        <>

            {userId !== data?.vendor?.userId && (
                <Flex flexDir={"column"} gap={"2"} alignItems={"center"} >
                    <Button onClick={clickHandler} w='full' h='54px' borderRadius={'full'} bgColor={primaryColor} mt='40px'>
                        <Text fontWeight={500} color='white'>Get Quote</Text>
                    </Button>
                    <ServiceTermAndCondition />
                </Flex>
            )}

            <ModalLayout open={show} close={setShow} size={['full', "full", '4xl']}>
                <Flex w={"full"} flexDir={["column", "column", "row"]} position={"relative"} >
                    <Flex as={"button"} onClick={() => setShow(false)} w={"35px"} h={"35px"} zIndex={"30"} bgColor={["#D8D8D880", "#D8D8D880", "transparent"]} pos={"absolute"} rounded={"full"} top={"2"} right={"2"} shadow={["md", "md", "none"]} justifyContent={"center"} alignItems={"center"} >
                        <IoIosClose size={"25px"} />
                    </Flex>
                    <ProductImageScroller images={data?.images} createdDate={moment(data?.createdDate)?.fromNow()} rounded='0px' height={["206px", "206px", "680px"]} userData={data?.vendor} />
                    <Flex w={"full"} flexDir={"column"} p={"4"} gap={"3"} >
                        <Flex flexDir={"column"} >
                            <Text fontSize={"14px"} color={bodyTextColor} >Business Name</Text>
                            <Text fontSize={["16px", "16px", "20px"]} fontWeight={"700"} >{data?.name}</Text>
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"14px"} color={bodyTextColor} >Category</Text>
                            <Text fontSize={["16px", "16px", "20px"]} lineHeight={["17px", "17px", "25px"]} fontWeight={"700"}  >{data?.category?.replaceAll("_", " ")}</Text>
                        </Flex>
                        <Flex flexDir={"column"} >
                            <Text fontSize={"14px"} color={bodyTextColor} >Location</Text>
                            <Flex gap={"2"} alignItems={"center"}>
                                <LocationIcon_2 />
                                <Text fontSize={["12px", "12px", "14px"]} >{data?.location?.locationDetails}</Text>
                            </Flex>
                        </Flex>
                        <Flex w={"full"} gap={"4"} justifyContent={"space-between"} alignItems={"center"} >
                            <Text fontWeight={"500"} >Total Price</Text>
                            <Text fontWeight={"600"} fontSize={["20px", "20px", "20px"]} >{formatNumber(Number(price))}</Text>
                        </Flex>
                        {data?.hasFixedPrice && (
                            <Flex w={"full"} flexDir={"column"} gap={"3"} >
                                <Text fontWeight={"500"} fontSize={"14px"} >You can negotiate this price by 5%</Text>
                                <Flex w={"full"} justifyContent={"center"} >
                                    <HStack width={'180px'} height={'54px'} borderRadius={'50px'} overflow={'hidden'} backgroundColor={'#DDE2E6'}>
                                        <Flex cursor={'pointer'} onClick={() => handlePriceChange({ type: 'SUBSTRACTION', value: 0 })} w={"full"} height={'100%'} borderRightWidth={'1px'} borderRightColor={'gray'} justifyContent={'center'} alignItems={'center'}>
                                            <FiMinus size={12} color='black' />
                                        </Flex>
                                        <Flex cursor={'pointer'} onClick={() => handlePriceChange({ type: 'ADDITION', value: 0 })} w={"full"} height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                            <FiPlus size={12} color='black' />
                                        </Flex>
                                    </HStack>
                                </Flex>
                            </Flex>
                        )}
                        <Flex flexDirection={"column"} w={"full"} gap={"1"}  >
                            <Text fontSize={"14px"} >Book a date</Text>
                            <ReactDatePicker
                                // value={}
                                // disabled={name === "End" && !eventdata.startDate}
                                selected={date ? new Date(date) : new Date()}
                                dateFormat="MMM d, yyyy h:mm aa"
                                showTimeSelect
                                minDate={new Date()}
                                onChange={handleDateSelect}
                                customInput={<CustomInput />}
                            />
                        </Flex>
                        <VStack spacing={1} mt='10px' w='full' alignItems={'flex-start`'}>
                            <Text fontWeight="600" fontSize={'14px'}>Description</Text>
                            <Textarea
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                borderWidth={'1px'}
                                borderRadius={'12px'}
                                borderBottomColor={borderColor}
                                fontSize={'14px'}
                                fontWeight={400}
                            />
                        </VStack>
                        <Flex w={"full"} justifyContent={"end"} pt={"4"} mt={"auto"} gap={"4"} >
                            <CustomButton disable={date ? false : true} onClick={handleCreation} isLoading={isLoading} text={`Create Booking`} borderRadius={"999px"} height={"45px"} width={"150px"} fontSize={"14px"} />
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </>
    )
}