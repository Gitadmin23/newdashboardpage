import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import ProductImageScroller from '@/components/sharedComponent/productImageScroller'
import { CalendarIcon, LocationIcon_2 } from '@/components/svg'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { IService } from '@/models/Service'
import { IMAGE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat'
import { Flex, Text, VStack, HStack, Textarea, useToast, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiCalendar, FiPlus, FiMinus } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import DatePicker from "react-datepicker";
import { useMutation } from 'react-query'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import "react-datepicker/dist/react-datepicker.css";

interface IAction {
    value: number;
    type: 'ADDITION' | 'SUBSTRACTION',
}

function CreateBookingModal({
    show,
    onClose,
    service
}: {
    show: boolean,
    onClose: () => void,
    service: IService,
}) {
    const {
        borderColor,
        bodyTextColor,
    } = useCustomTheme();

    // states
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(service?.price + "");
    const [percentage, setPercentage] = useState(0)
    const [date, setDate] = React.useState<string>("")

    const { userId } = useDetails((state) => state);

    // utils
    const router = useRouter();
    const toast = useToast()

    useEffect(() => {
        setDate("")
        setDescription("")
    }, [])

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
            const Percentage = service?.price * (percentage + 0.05)
            const newPrice = service?.price + Percentage;
            setPrice(newPrice.toString());
            setPercentage(percentage + 0.05)
        } else {
            // calculate 5% fo the inital price
            const Percentage = service?.price * (percentage - 0.05);
            const newPrice = service?.price + Percentage;
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
            onClose();
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

        if (!service?.hasFixedPrice && price === "0") {
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
            vendorID: service?.vendor?.userId,
            serviceID: service?.id,
            bookingType: "Busy",
            price: parseInt(price),
            date: new Date(date).toISOString(),
        }

        mutate(obj);
    }, [description, service, userId, toast, mutate, price]);

    useEffect(() => {
        setPercentage(0)
    }, [open])

    return (
        <ModalLayout open={show} close={onClose} size={['full', "full", '4xl']}>
            <Flex w={"full"} flexDir={["column", "column", "row"]} position={"relative"} >
                <Flex as={"button"} onClick={() => onClose()} w={"35px"} h={"35px"} zIndex={"30"} bgColor={["#D8D8D880", "#D8D8D880", "transparent"]} pos={"absolute"} rounded={"full"} top={"2"} right={"2"} shadow={["md", "md", "none"]} justifyContent={"center"} alignItems={"center"} >
                    <IoIosClose size={"25px"} />
                </Flex>
                <ProductImageScroller images={service?.images} createdDate={moment(service?.createdDate)?.fromNow()} rounded='0px' height={["206px", "206px", "680px"]} userData={service?.vendor} />
                <Flex w={"full"} flexDir={"column"} p={"4"} gap={"3"} >
                    <Flex flexDir={"column"} >
                        <Text fontSize={"14px"} color={bodyTextColor} >Business Name</Text>
                        <Text fontSize={["16px", "16px", "20px"]} fontWeight={"700"} >{service?.name}</Text>
                    </Flex>
                    <Flex flexDir={"column"} >
                        <Text fontSize={"14px"} color={bodyTextColor} >Category</Text>
                        <Text fontSize={["16px", "16px", "20px"]} lineHeight={["17px", "17px", "25px"]} fontWeight={"700"}  >{service?.category?.replaceAll("_", " ")}</Text>
                    </Flex>
                    <Flex flexDir={"column"} >
                        <Text fontSize={"14px"} color={bodyTextColor} >Location</Text>
                        <Flex gap={"2"} alignItems={"center"}>
                            <LocationIcon_2 />
                            <Text fontSize={["12px", "12px", "14px"]} >{service?.location?.locationDetails}</Text>
                        </Flex>
                    </Flex>
                    <Flex w={"full"} gap={"4"} justifyContent={"space-between"} alignItems={"center"} >
                        <Text fontWeight={"500"} >Total Price</Text>
                        <Text fontWeight={"600"} fontSize={["20px", "20px", "20px"]} >{formatNumber(Number(price))}</Text>
                    </Flex>
                    {service?.hasFixedPrice && (
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
                        <DatePicker
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
                    <Flex w={"full"} justifyContent={"end"} gap={"4"} >
                        <CustomButton disable={date ? false : true} onClick={handleCreation} isLoading={isLoading} text={`Create Booking`} borderRadius={"999px"} height={"45px"} width={"150px"} fontSize={"14px"} />
                    </Flex>
                </Flex>
            </Flex>
        </ModalLayout>
    );
}

export default CreateBookingModal


// {/* <Flex flexDir={["column-reverse", 'row-reverse']} pb='20px' px={['3px', '20px']} gap={["1", "1", "6"]} bg={mainBackgroundColor}>
//                 <VStack w='full' h='full' px={'10px'} alignItems={'flex-start'}>
//                     {/* <Text fontSize="12px" color={'grey'}>List your order</Text> */}

//                     {/* <VStack w='full' py='10px' alignItems="flex-start" borderBottomWidth={'1px'} borderBottomColor={borderColor}>
//                         <Text fontWeight="600" fontSize={'14px'}>Business Name</Text>
//                         <Text>{service?.name}</Text>

//                     </VStack> */}


//                     <Box w='full' py='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor}>
//                         <Text fontWeight="600" fontSize={'14px'}>Service Type</Text>
//                         <Text color={headerTextColor} fontSize={"14px"} >{service?.category.toUpperCase()}</Text>
//                     </Box>

//                     {/* <Box w='full' py='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor}>
//                         <Text fontWeight="600" fontSize={'14px'}>Date</Text>
//                         <Text fontSize={16} color={headerTextColor}>{moment().format('MMMM Do, YYYY')}</Text>
//                     </Box> */}

//                     {/* {service?.hasFixedPrice && (
//                         <HStack justifyContent={'space-between'} w='full' alignItems={'center'}>
//                             <Text fontSize={'14px'}>Service Price</Text>
//                             <Text fontSize={'16px'} fontWeight={600} color={primaryColor}>NGN {service?.price?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
//                         </HStack>
//                     )} */}

//                     <VStack spacing={1} mt='10px' w='full' alignItems={'flex-start`'}>
//                         <Text fontWeight="600" fontSize={'14px'}>Service Description</Text>
//                         <Textarea value={description} onChange={(e) => setDescription(e.target.value)} w='full' h='80px' fontSize={"14px"} placeholder='Tell us how we can serve you' />
//                     </VStack>

//                     <Button onClick={handleCreation} isLoading={isLoading} w='full' h='42px' backgroundColor={primaryColor} borderRadius={'full'} mt='20px'>
//                         <Text fontWeight={600} fontSize={'14px'} color='white'>{'Create Booking'}</Text>
//                     </Button>
//                 </VStack>
//                 <Flex w='full' h='full' p={["6px", "6px", '15px']} flexDir='column'>
//                     <Box w='full' h='full' borderWidth={'1.5px'} borderColor={borderColor} borderRadius={'10px'} py={["6px", "6px", "20px"]} p={['12px', "12px", '20px']}>
//                         <Flex gap={3} pb='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor} alignItems='center'>
//                             <Box w='100px' h='100px' borderRadius={'15px'} overflow={'hidden'} py='5px'>
//                                 <Image src={service?.images[0].startsWith('http') ? service?.images[0] : IMAGE_URL + service?.images[0]} alt='banner image' w='100%' h='full' objectFit={'cover'} />
//                             </Box>
//                             <VStack alignItems='flex-start' spacing={-2}>
//                                 <Text fontWeight={700}>{service?.name}</Text>
//                                 <Text fontSize={'12px'} color="grey">{service?.address}</Text>
//                             </VStack>
//                         </Flex>

//                         {service?.hasFixedPrice && (
//                             <Flex flexDir='row' justifyContent={"space-between"} mt='30xp' py={""} >
//                                 <Text fontWeight={500} fontSize={'14px'} color={headerTextColor}  >Starting price:</Text>
//                                 <Text fontSize={'14px'} fontWeight={"600"} >NGN {service?.price?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>

//                                 {/* <HStack justifyContent={'space-between'} h='40px'>
//                                     <Text color={bodyTextColor} fontSize="12px">{service?.service?.category}</Text>
//                                 </HStack> */}

//                                 {/* <HStack justifyContent={'space-between'} h='40px'>
//                                     <Text fontSize='12px'>Service Fee:</Text>
//                                     <Text fontSize={'14px'}>NGN {(service?.price * 0.02)?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
//                                 </HStack>


//                                 <HStack justifyContent={'flex-end'} h='40px'>
//                                     <Text fontSize='12px'>Total Price</Text>
//                                     <Text fontSize={'14px'}>NGN {(service?.price + (service?.price * 0.02)).toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
//                                 </HStack> */}
//                             </Flex>
//                         )}


// <Divider />
//                         <VStack spacing={1} mt='10px' w='full' alignItems={'flex-start`'}>
//                             <Text fontWeight="600" fontSize={'14px'}>Book a date</Text>
//                             <InputGroup width='100%'>
//                                 <InputLeftElement>
//                                     <CalendarIcon />
//                                 </InputLeftElement>
//                                 <Input
//                                     type='date'
//                                     value={date}
//                                     onChange={(e) => {
//                                         console.log(e.target.value)
//                                         setDate(e.target.value)
//                                     }}
//                                     borderWidth={'1px'}
//                                     height="45px"
//                                     borderRadius={'8px'}
//                                     borderBottomColor={borderColor}
//                                     placeholder='Pick Date'
//                                     fontSize={'14px'}
//                                     fontWeight={400}
//                                 />
//                             </InputGroup>
//                         </VStack>

//                     </Box>

//                 </Flex>
//             </Flex> */}