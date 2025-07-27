/* eslint-disable react/no-unescaped-entities */
"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Checkbox, Flex, HStack, Image, Input, Radio, RadioGroup, Select, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import ModalLayout from '../sharedComponent/modal_layout'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import DayAvaliable from './createBookTabs/dayAvaliable'
import { useMutation, useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { uniq } from 'lodash'
import { Add } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import { URLS } from '@/services/urls'
import { FiX } from 'react-icons/fi'
import { createBusinessValidation } from '@/services/validations'
import { useForm } from '@/hooks/useForm'
import { CustomInput } from '../Form/CustomInput'
import useProductStore from '@/global-state/useCreateProduct'
import ProductMap from '../kisok/productMap'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import ProductImagePicker from '../kisok/productImagePicker'
import VendorTermAndCondition from '../kisok/VendorTermAndCondition'


export interface IDayOfTheWeek {
    dayOFTheWeek: number;
    startTime: string;
    endTime: string;
    checked: boolean;
}

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
export default function CreateServices({ id }: { id: string }) {

    const {
        primaryColor,
        borderColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    // states
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [discount, setDiscount] = useState(0);
    const [hasFixedPrice, setHasFixedPrice] = useState(true);
    const [price, setPrice] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [serviceId, setServiceId] = useState<string | null>(null)
    const { rentaldata, updateRental, image } = useProductStore((state) => state);
    const [description, setDescription] = useState("")
    const [website, setWebsite] = useState("")
    const [isOnline, setIsOnline] = useState<'physical' | 'online' | 'both' | null>(null);


    let fileReader = React.useRef<FileReader | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const toast = useToast();

    // social media state
    const [platform, setPlatform] = useState("");
    const [handle, setHandle] = useState("");
    const [handles, setHandles] = useState<ISocialMediaTypes[]>([])
    const [checked, setChecked] = useState(false)

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

    const { renderForm, values, watch, setValue } = useForm({
        defaultValues: {
            phone: '',
            email: '',
        },
        validationSchema: createBusinessValidation,
        submit: (data) => {
            if (image.length < 1) {
                toast({
                    title: 'Warning',
                    description: 'You must select at least one Image',
                    status: 'warning',
                    duration: 5000,
                    position: 'top-right',

                });
                return;
            }
            if (hasFixedPrice === true && parseInt(price) === 0) {
                toast({
                    title: 'Warning',
                    description: 'You must put a price',
                    status: 'warning',
                    duration: 5000,
                    position: 'top-right',

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

            if (description === "") {
                toast({
                    title: 'Warning',
                    description: 'You must enter a description',
                    status: 'warning',
                    duration: 5000,
                    position: 'top-right',

                });
                return;
            }


            const formdata = new FormData();
            image.forEach((file) => {
                formdata.append('files[]', file);
            });

            uploadImageMutation.mutate(formdata);
        }
    });

    //mutation 
    const createBusinessMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/business-service/create`, data),
        onSuccess: (data) => {
            setServiceId(data?.data?.id);
            setOpen(true);
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
            const cat = categories.filter((item) => item === selectedCategory)[0]

            // Loop through the object values and add to images array
            if (data_obj && typeof data_obj === 'object') {
                Object.values(data_obj).forEach(value => {
                    if (typeof value === 'string') {
                        images.push(value);
                    }
                });
            }
            const obj = {
                vendorID: id,
                category: !cat ? categories[0] : cat,
                images,
                price,
                hasFixedPrice,
                discount,
                description,
                website: website ? website?.includes("https://") ? website : "https://" + website : "",
                ...values,
                isOnline: isOnline === 'online' ? true : false,
                socialMediaHandles: handles,
                "state": rentaldata?.location?.state,
                "location": rentaldata?.location,
                name,
            }
            console.log(obj);
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

    const { isLoading, data } = useQuery(['get-business-categories'], () => httpService.get('/business-service/categories'), {
        refetchOnMount: true,
        onSuccess: (data) => {
            console.log(data?.data);
            setCategories(data?.data);
        },
        onError: (error: any) => { },
    });

    //effect
    React.useEffect(() => {
        fileReader.current = new FileReader();
    }, []);

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

    const handleRemoveHandles = (index: number) => {
        setHandles((prev) => {
            return prev.filter((_, indx) => index != indx)
        })
    }

    const clickHandler = () => { }

    console.log(values.phone);


    return renderForm(
        <Flex w={"full"} h={"full"} >
            <Flex w={"full"} h={"full"} display={['none', 'none', 'flex']} flexDir={"column"} alignItems={"center"} py={"8"} borderRightWidth={"1.03px"} borderColor={borderColor} overflowY={"auto"} >
                <Flex px={"14"} w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex as={"button"} onClick={() => router.back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} top={"4"} zIndex={"30"} left={"4"}  >
                        <IoArrowBack size={"20px"} />
                    </Flex>
                    <Text fontSize={["16px", "16px", "24px"]} fontWeight={"600"} >Upload clear photos of your Services </Text>
                    <Text fontWeight={"500"} mb={"5"} >Upload upto 5 clear images that describe your service</Text>
                    <ProductImagePicker />
                </Flex>
            </Flex>

            {/* RIGHT PART OF THE SCREEN */}

            <Flex w={"full"} h={"auto"} justifyContent={"center"} pb={'30px'} pt={'20px'} overflowY={"auto"} >

                <Flex px={["3", "14"]} w={"full"} flexDir={"column"} gap={"5"} >

                    {/* SMALL SCREEN IMAGE PICKER */}

                    <Flex px={"0px"} w={"full"} flexDir={"column"} gap={"3"} display={['flex', 'flex', 'none']} >
                        <Flex as={"button"} onClick={() => router.back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} top={"4"} zIndex={"30"} left={"4"}  >
                            <IoArrowBack size={"20px"} />
                        </Flex>
                        <Text fontSize={["16px", "16px", "24px"]} fontWeight={"600"} >Upload clear photos of your Services </Text>
                        <Text fontSize={["14px", "14px", "16px"]} fontWeight={"500"} >you can upload upto 5 clear images that describe your service</Text>
                        <ProductImagePicker /> 
                    </Flex>

                    <Flex flexDir={"column"} w={"full"} gap={"2"} >

                        <Flex flexDir={"column"} w={"full"} gap={"2"} >
                            <Text fontWeight={"600"} >Business Name <span style={{ color: 'red', fontSize: '12px' }}>*</span></Text>
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

                        <Text fontWeight={"600"} >Select from the list of services</Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >You are free to make adjustment anytime</Text>
                        <Select bgColor={mainBackgroundColor} value={selectedCategory} placeholder='Select Categories' onChange={(e) => setSelectedCategory(e.target.value)} h={"44px"} borderWidth={"1px"} borderColor={primaryColor} rounded={"16px"}  >
                            {!isLoading && categories.length > 0 && categories?.sort((a: string, b: string) => {
                                if (a > b) {
                                    return 1
                                } else {
                                    return -1;
                                }
                                return 0;
                            })?.map((item, index) => (
                                <option key={index.toString()} selected={index === 0} value={item} >{item?.replaceAll("_", " ")}</option>
                            ))}
                        </Select>
                        {/* <SearchableDropdown options={categories} id='' label='category' handleChange={(e) => console.log(e)} selectedVal={''}  /> */}
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"400"} fontSize={"14px"} >Service Description <sup style={{ color: 'red' }}>*</sup></Text>
                        <Textarea bgColor={mainBackgroundColor} value={description} onChange={(e) => {
                            if (description.length < 300) {
                                setDescription(e.target.value)
                            }
                        }} h={"100px"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} />
                        <Text>{description.length}/300</Text>
                    </Flex>
                    {/* {hasFixedPrice && (
                        <> */}

                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"600"} >{`Let’s set your Price`} <span style={{ color: 'red', fontSize: '12px' }}>*</span></Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >You are free to make adjustment anytime</Text>
                        <Input
                            bgColor={mainBackgroundColor}
                            value={price}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setPrice(value);
                                }
                            }} 
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                            h={"44px"}
                            borderWidth={"1px"}
                            borderColor={borderColor}
                            rounded={"16px"}
                            placeholder='₦ 232,435'
                        />
                    </Flex>
                    {/* </>
                    )} */}
                    {/* <Flex gap={"2"} alignItems={"center"} >
                        <MdEdit size={"25px"} color={primaryColor} />
                        <Text textDecoration={"underline"} color={primaryColor} >Edit</Text>
                    </Flex> */}
                    {/* <Flex flexDirection={"column"} gap={"2"} > 
                        <Flex gap={"3"} alignItems={"center"}  >
                            <Checkbox isChecked={!hasFixedPrice} onChange={() => setHasFixedPrice((prev) => !prev)} />
                            <Text color={primaryColor} >{`Negotiation`}</Text>
                        </Flex>
                    </Flex> */}

                    <Flex flexDirection={"column"} w={"full"} h={"45px"} gap={"3px"} >
                        <ProductMap location={rentaldata?.location} />
                    </Flex>
                    {/* )} */}
                    <Flex id='business' flexDir={"column"} gap={"1"} w={"full"} >
                        <CustomInput name="phone" placeholder='' label='Phone Number' isPassword={false} type='tel' required />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="email" placeholder='' label='Business Email Address' isPassword={false} type='email' required />
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"600"} >Business Website (optional)</Text>
                        <Input
                            bgColor={mainBackgroundColor}
                            type='text'
                            value={website}
                            onChange={(e) => {
                                setWebsite(e.target.value)
                            }}
                            h={"44px"}
                            borderWidth={"1px"}
                            borderColor={borderColor}
                            rounded={"16px"}
                            placeholder='Enter your business Website'
                        />
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
                            <Text>Select your socials type</Text>
                            <Select bgColor={mainBackgroundColor} h={"44px"} value={platform} onChange={(e) => setPlatform(e.target.value)} >
                                {SOCIAL_MEDIA_PLATFORMS.map((media, index) => (
                                    <option selected={index === 0} value={media} key={index.toString()}>{media}</option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                            <Text>Social Media handle</Text>
                            <Input
                                bgColor={mainBackgroundColor}
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

                    <Flex w="full" flexDir={"column"} gap={"4"} h="fit-content" mt={"6"} pb='20px'>
                        <VendorTermAndCondition checked={checked} setChecked={setChecked} type="SERVICE" />
                        <Button type='submit' isDisabled={!name || !description || !price || !rentaldata?.location?.state || uploadImageMutation.isLoading || createBusinessMutation.isLoading || !checked ? true : false} _disabled={{ opacity: "30%", cursor: "not-allowed" }} isLoading={uploadImageMutation.isLoading || createBusinessMutation.isLoading} w={"full"} bg={primaryColor} color={"white"} rounded={"full"} h={"45px"} _hover={{ backgroundColor: primaryColor }} >
                            Submit
                        </Button>
                        <Flex w={"full"} h={"50px"} />
                    </Flex>
                </Flex>
            </Flex>

            <ModalLayout size={["md", "xl"]} open={showModal} close={setShowModal}>
                <DayAvaliable close={setShowModal} setTab={setShowModal} days={days} handleCheck={handleDayChange} />
            </ModalLayout>

            <ModalLayout open={open} close={clickHandler} >
                <Flex w={"full"} flexDir={"column"} alignItems={"center"} pb={"14"} py={"5"} >
                    <IoIosCheckmarkCircle size={"100px"} color={"#46CC6B"} />
                    <Text fontWeight={"600"} fontSize={"24px"} color={headerTextColor} >Congratulations!</Text>
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} color={bodyTextColor} >{`Services created Successfully`}</Text>
                    <Button onClick={() => { router.push(`/dashboard/product/kiosk?type=myservice`) }} height={"50px"} mt={"4"} borderWidth={"1px"} w={"200px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{ backgroundColor: primaryColor }} >View Services</Button>
                </Flex>
            </ModalLayout>
        </Flex>
    );
}
