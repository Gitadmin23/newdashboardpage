import ModalLayout from '@/components/sharedComponent/modal_layout'
import { GallaryIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Input, Radio, RadioGroup, Select, Text, Textarea, Image, Box, useToast, Checkbox, HStack, Spinner } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { FiX } from 'react-icons/fi'
import { DayAvaliable } from '.'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from '@/hooks/useForm'
import { createBusinessValidation } from '@/services/validations'
import { CustomInput } from '@/components/Form/CustomInput'
import { uniq } from 'lodash'
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService'
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls'
import { error } from 'console'
import { useDetails } from '@/global-state/useUserDetails'
import { CustomTextArea } from '@/components/Form/CustomTextarea'
import SubmitButton from '@/components/Form/SubmitButton'
import { IBuisness } from '@/models/Business'
import { IDayOfTheWeek } from '../createServices'
import ProductImagePicker from '@/components/kisok/productImagePicker'
import useProductStore from '@/global-state/useCreateProduct'
import ProductMap from '@/components/kisok/productMap'

interface ISocialMediaTypes {
    socialMediaHandle: string;
    platform: string;
    details: string;
}

const SOCIAL_MEDIA_PLATFORMS = [
    'Facebook',
    'Twitter',
    'Instagram',
    'LinkedIn',
    'Threads',
    'Whatsapp'
]

export default function EditBusinessPage() {

    const {
        borderColor,
        primaryColor,
        bodyTextColor,
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [isOnline, setIsOnline] = useState<'physical' | 'online' | 'both' | null>(null);
    const [index, setIndex] = useState("");
    const [both, setBoth] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hasFixedPrice, setHasFixedPrice] = useState(true);
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("") 
    const [name, setName] = useState("")
    const [business, setBusiness] = useState<IBuisness | null>(null);
    const { imagePreview, updateImagePreview, rentaldata, updateRental, image } = useProductStore((state) => state);

    const inputRef = useRef<HTMLInputElement>(null);
    let fileReader = React.useRef<FileReader | null>(null);
    const router = useRouter();
    const details = useDetails((state) => state);
    const toast = useToast();
    const param = useParams();
    const id = param?.id;

    // social media state
    const [platform, setPlatform] = useState("");
    const [handle, setHandle] = useState("");
    const [handles, setHandles] = useState<ISocialMediaTypes[]>([])

    const [days, setDays] = useState<IDayOfTheWeek[]>([
        {
            dayOFTheWeek: 0,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 1,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 2,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 3,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 4,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 5,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 6,
            startTime: '',
            endTime: '',
            checked: false,
        }
    ]);

    const getDay = (day: number) => {
        switch (day) {
            case 0: {
                return 'Sunday';
            }
            case 1: {
                return 'Monday';
            }
            case 2: {
                return 'Tuesday';
            }
            case 3: {
                return 'Wednesday';
            }
            case 4: {
                return 'Thursday';
            }
            case 5: {
                return 'Friday';
            }
            case 6: {
                return 'Saturday';
            }
        }
    }

    console.log(name);
    

    const { renderForm, values, watch, setValue } = useForm({
        defaultValues: {
            description: business?.description ?? '',
            phone: business?.phone?.toString() ?? '',
            email: business?.email ?? '',
            website: business?.website ?? '',
        },
        validationSchema: createBusinessValidation,
        submit: (data) => { 

            if (!rentaldata?.location?.state) {
                toast({
                    title: 'Warning',
                    description: 'You have to pick a location to continue',
                    status: 'error',
                    position: 'top-right',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }  
            if (values.phone?.length !== 11) {
                toast({
                    title: 'Warning',
                    description: 'Please Enter a Valid Phone',
                    status: 'warning',
                    duration: 5000,
                    position: 'top-right',

                });
                return;
            }

            if (image?.length === 0) {
                const obj = {
                    ...values,
                    name: name,
                    isOnline: isOnline === 'online' ? true : false,
                    bannerImage: imagePreview,
                    socialMediaHandles: handles, 
                    description,
                    "state": rentaldata?.location?.state,
                    "location": rentaldata?.location,
                    price: price
                }

                console.log(obj);
                
                createBusinessMutation.mutate(obj);
            } else {
                const formdata = new FormData()
                image.forEach((file) => {
                    formdata.append('files[]', file);
                });
                uploadImageMutation.mutate(formdata);
            }

        }
    }); 

    const { isLoading, data } = useQuery([`get-business-by-id-${id}`, id], () => httpService.get(`/business-service/search`, {
        params: {
            id,
        }
    }), {
        onSuccess: (data) => {
            if(!name) {
                setBusiness(data?.data?.content[0]);
                setDescription(data?.data?.content[0]?.description)
                setHasFixedPrice(data?.data?.content[0]?.hasFixedPrice)
                setPrice(data?.data?.content[0]?.price + "")
                setName(data?.data?.content[0]?.name)
                setIndex(data?.data?.content[0]?.id)
                setValue("email", data?.data?.content[0]?.email);
                setValue("phone", data?.data?.content[0]?.phone);
                setValue("address", data?.data?.content[0]?.address);
                setValue("website", data?.data?.content[0]?.website);
                setIsOnline(data?.data?.content[0]?.isOnline ? 'online' : data?.data?.content[0]?.address !== '' ? 'physical' : 'both');
                updateImagePreview(data?.data?.content[0]?.images);
                updateRental({ ...rentaldata, location: data?.data?.content[0]?.location })
            }
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
        },
        enabled: index ? false : true
    }); 

    console.log(values?.phone);

    React.useEffect(() => {
        if (both) {
            setIsOnline(null);
        }
    }, [both])

    // mutations
    const createBusinessMutation = useMutation({
        mutationFn: (data: any) => httpService.put(`/business-service/edit/${id}`, data),
        onSuccess: (data) => {
            console.log('-----BUSINESS DETAILS------');
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
            setModal(true)
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
        }
    }); 

    const uploadImageMutation = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${URLS.UPLOAD_IMAGE_ARRAY}/service`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: (data) => {
            const images: string[] = [];
            const data_obj = data?.data;

            // Loop through the object values and add to images array
            if (data_obj && typeof data_obj === 'object') {
                Object.values(data_obj).forEach(value => {
                    if (typeof value === 'string') {
                        images.push(value);
                    }
                });
            } 
            const obj = {
                ...values,
                name: name,
                isOnline: isOnline === 'online' ? true : false,
                images: [...images, ...imagePreview],
                socialMediaHandles: handles,
                openingHours: days.filter((item) => { if (item.checked) { return item; } }).map((item) => ({
                    startTime: parseInt(item.startTime.replace(':', '')),
                    endTime: parseInt(item.endTime.replace(':', '')),
                    availabilityDayOfWeek: item?.dayOFTheWeek
                })),
                description,
            }
            createBusinessMutation.mutate(obj);
        },
        onError: (error) => {
            toast({
                title: 'Warning',
                description: 'An error occured while uploading images',
                status: 'warning',
                duration: 5000,
                position: 'top-right',

            });
        }
    });


    // functions
    const onSocialMediaHandlePress = () => {
        const obj = {
            socialMediaHandle: handle,
            details: handle,
            platform: !platform ? 'facebook' : platform,
        }

        setHandles((prev) => uniq([...prev, obj]));
        setHandle("");
        setPlatform("");
    }

    const handleDayChange = ({ index, type, isChecked, value }: { index: number, type: 'startTime' | 'endTime' | 'dayOfTheWeek' | 'checked', isChecked: boolean, value: string }) => {
        setDays(days.map((day, i) => {
            if (i === index) {
                if (type === 'checked') {
                    return {
                        ...day,
                        checked: isChecked,
                    }
                } else {
                    return {
                        ...day,
                        [type]: value
                    }
                }

            }
            return day;
        }));
    }

    const handleRemoveHandles = (index: number) => {
        setHandles((prev) => {
            return prev.filter((_, indx) => index != indx)
        })
    }

    if (isLoading) {
        return (
            <Flex width='100%' height={'200px'} justifyContent={'center'} alignItems={'center'}>
                <Spinner colorScheme="blue" />
                <Text>Loading Business Details</Text>
            </Flex>
        )
    }


    return renderForm(
        <Flex w={"full"} h={"full"} >
            <Flex w={"full"} h={"full"} display={['none', 'flex']} flexDir={"column"} justifyContent={"center"} alignItems={"center"} borderRightWidth={"1.03px"} borderColor={borderColor} >
                <Flex maxW={"402px"} w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"bold"} fontSize={"18px"} >Hello,  <span style={{ color: primaryColor }} >{details?.firstName}</span></Text>
                    <Text fontSize={"32px"} lineHeight={"37.58px"} >Edit your Chasescroll Business</Text>
                    <Text fontSize={"14px"} fontWeight={"500"} >Edit Your Business Details</Text>
                </Flex>
            </Flex>
            <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} overflowY={"auto"}  >
                <Flex maxW={["full", "438px"]} w={"full"} height={"full"} gap={"5"} flexDir={"column"} pt={["20px", "10px"]} px={['20px', '0px']} >
                    <Flex flexDir={"column"} gap={"3"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >{`Let’s get you started`}</Text>
                        <Text fontSize={"14px"} fontWeight={"400"} >{`You can change some basic details of your business`}</Text>
                    </Flex>
                    <ProductImagePicker /> 
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontSize={"14px"} >Business Name <span style={{ color: 'red', fontSize: '12px' }}>*</span></Text>
                        <Input
                            bgColor={mainBackgroundColor}
                            type='text'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            h={"44px"}
                            borderWidth={"1px"}
                            borderColor={borderColor}
                            rounded={"16px"}
                            placeholder='Enter your business name'

                        />
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"400"} fontSize={"14px"} >Business Description <sup style={{ color: 'red' }}>*</sup></Text>
                        <Textarea bgColor={mainBackgroundColor} value={description} onChange={(e) => {
                            if (description.length < 300) {
                                setDescription(e.target.value)
                            }
                        }} h={"84px"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} />
                        <Text>{description.length}/300</Text>
                    </Flex>
                    {hasFixedPrice && (
                        <> 
                            <Flex flexDir={"column"} w={"full"} gap={"2"} >
                                <Text  fontSize={"14px"} >{`Let’s set your Price`} <span style={{ color: 'red', fontSize: '12px' }}>*</span></Text>
                                <Text fontWeight={"400"} fontSize={"12px"} >You are free to make adjustment anytime</Text>
                                <Input
                                    bgColor={mainBackgroundColor}
                                    value={price}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setPrice(value);
                                        }
                                    }}
                                    h={"44px"}
                                    borderWidth={"1px"}
                                    borderColor={borderColor}
                                    rounded={"16px"}
                                    placeholder='₦ 232,435'
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </Flex>
                        </>
                    )} 
                    <Flex flexDir={"column"} gap={"3px"} >
                        <Text fontSize={"14px"} >{"Location"}</Text>
                        <Flex flexDirection={"column"} w={"full"} h={"45px"} gap={"3px"} >
                            <ProductMap location={rentaldata?.location} />
                        </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="phone" value={values?.phone ? values?.phone : business?.phone} placeholder='' labelTextSize='14px' label='Business Phone Number' isPassword={false} type='phone' required />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="email" placeholder='' labelTextSize='14px' label='Business Email Address' isPassword={false} type='email' required />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="website" placeholder='' labelTextSize='14px' label='Business Website (optional)' isPassword={false} type='text' hint="The link must start with https://" />
                    </Flex>

                    <Flex overflowX="auto" w="full" css={{
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }}>
                        {days.filter((item) => {
                            if (item?.checked) {
                                return item;
                            }
                        }).map((day, index) => (
                            <HStack key={index} minW="fit-content" mr={4} justifyContent={'space-between'} alignItems={'center'} rounded={'full'} borderWidth={'1px'} py='5px' px='8px' borderColor={borderColor}>
                                <Text color={bodyTextColor}>{getDay(day.dayOFTheWeek)}</Text>
                                <Text color={bodyTextColor}>{new Date(`2000-01-01T${day.startTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - </Text>

                                <Text color={bodyTextColor}>{new Date(`2000-01-01T${day.endTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
                            </HStack>
                        ))}
                    </Flex>

                    <Flex gap={"2"} >
                        <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                            <Text  fontSize={"14px"} >Select your socials type</Text>
                            <Select h={"44px"} value={platform} onChange={(e) => setPlatform(e.target.value)} >
                                {SOCIAL_MEDIA_PLATFORMS.map((media, index) => (
                                    <option selected={index === 0} value={media} key={index.toString()}>{media}</option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                            <Text  fontSize={"14px"} >Social Media handle</Text>
                            <Input
                                h={"44px"}
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        // Add your function call here
                                        onSocialMediaHandlePress();
                                    }
                                }}
                            />
                            <Text color={primaryColor} fontSize='14px'>Press enter to add to list</Text>
                        </Flex>
                    </Flex>

                    <Flex flexDir="column" gap={2} mt="2px">
                        {handles.length > 0 && (
                            <Flex overflowX="auto" gap={2} pb={2}>
                                {handles.map((handle, index) => (
                                    <Flex
                                        key={index}
                                        px={3}
                                        py={1}
                                        borderWidth={1}
                                        borderRadius="full"
                                        alignItems="center"
                                        minW="fit-content"
                                    >
                                        <Text fontSize="sm" fontWeight="SemiBold" mr={"6px"}>{handle.platform}: {handle.socialMediaHandle}</Text>
                                        <FiX size={'20px'} color={bodyTextColor} onClick={() => handleRemoveHandles(index)} />
                                    </Flex>
                                ))}
                            </Flex>
                        )}

                    </Flex>

                    <Flex w={"full"} h={"100px"} pb={"9"} >
                        {/* <SubmitButton isDisabled={false} title='Create Business' isLoading={uploadImageMutation.isLoading ?? createBusinessMutation.isLoading} /> */}
                        <Button type='submit' isLoading={uploadImageMutation.isLoading || createBusinessMutation.isLoading} isDisabled={!name || !description || !price || !rentaldata?.location?.state || uploadImageMutation.isLoading || createBusinessMutation.isLoading || !values?.email ? true : false} _disabled={{ opacity: "30%", cursor: "not-allowed" }}  onClick={() => setOpen(true)} w={"full"} bg={primaryColor} color={"white"} rounded={"full"} h={"49px"} _hover={{ backgroundColor: primaryColor }} >
                            Save
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            <ModalLayout size={["md", "xl"]} open={showModal} close={setShowModal}>
                <DayAvaliable close={setShowModal} setTab={setShowModal} days={days} handleCheck={handleDayChange} />
            </ModalLayout>

            <ModalLayout open={modal} close={setModal} closeIcon={true} onOverLay={false}>
                <Flex w={"full"} flexDir={"column"} alignItems={"center"} py={"5"} >
                    <IoIosCheckmarkCircle size={"100px"} color={"#46CC6B"} />
                    <Text fontWeight={"600"} fontSize={"24px"} >Congratulations {details?.firstName}!</Text>
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} >{`You’ve successfully Edited your Business.`}</Text>
                    <Button onClick={() => router?.push(`/dashboard/kisok?type=myservice`)} height={"50px"} mt={"4"} borderWidth={"1px"} w={"200px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{ backgroundColor: primaryColor }} >View services </Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
} 
