import ModalLayout from '@/components/sharedComponent/modal_layout'
import { GallaryIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Input, Radio, RadioGroup, Select, Text, Textarea, Image, Box, useToast, Checkbox, HStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { FiX } from 'react-icons/fi'
import { DayAvaliable } from '.'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { useForm } from '@/hooks/useForm'
import { createBusinessValidation } from '@/services/validations'
import { CustomInput } from '@/components/Form/CustomInput'
import { uniq } from 'lodash'
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { error } from 'console'
import { useDetails } from '@/global-state/useUserDetails'
import { CustomTextArea } from '@/components/Form/CustomTextarea'
import SubmitButton from '@/components/Form/SubmitButton'
import { IBuisness } from '@/models/Business'
import { IDayOfTheWeek } from '../createServices'

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

export default function InformationTab() {

    const {
        borderColor,
        primaryColor,
        bodyTextColor,
        headerTextColor,
    } = useCustomTheme()

    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [isOnline, setIsOnline] = useState<'physical'|'online'|'both'|null>(null);
    const [imageUrl, setImageUrl] = useState<string|null>('');
    const [image, setImage] = useState<File|null>(null)
    const [business, setBusiness] = useState<IBuisness|null>(null);
    const [both, setBoth] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState("")



    const inputRef = useRef<HTMLInputElement>(null);
    let fileReader = React.useRef<FileReader | null>(null);
    const router = useRouter();
    const toast = useToast();
    const details = useDetails((state) => state);

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

    const { renderForm, values, watch } = useForm({
        defaultValues: {
            businessName: '',
            description: '',
            phone: '',
            email: '',
            address: '',
            website: '',
        },
        validationSchema: createBusinessValidation,
        submit: (data) => {
            const activeDays = days.filter((item) => item.checked);

            if (activeDays.length < 1) {
                toast({
                    title: 'Warning',
                    description: 'You have to select your opening hours for at least 3 days of the week',
                    status: 'error',
                    position: 'top-right',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            if (imageUrl === '' || image === null) {
                toast({
                    title: 'Warning',
                    description: 'You have to pick a banner image to continue',
                    status: 'error',
                    position: 'top-right',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            if (isOnline === null) {
                toast({
                    title: 'Warning',
                    description: 'You have to select a location type',
                    status: 'error',
                    position: 'top-right',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            const formdata = new FormData()
            formdata.append('file', image);
            uploadImageMutation.mutate(formdata);
        }
    });

    React.useEffect(() => {
        if (both) {
            setIsOnline(null);
        }
    }, [both])



    // mutations
    const createBusinessMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/business/create`, data),
        onSuccess: (data) => {
            console.log('-----BUSINESS DETAILS------');
            console.log(data?.data);
            setBusiness(data?.data);
            setModal(true);
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
        mutationFn: (data: FormData) => httpService.post(`${URLS.UPLOAD_IMAGE}/update`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: (data) => {
            console.log(data.data)
            const fileName = data?.data?.fileName;
            const obj = {
                ...values,
                isOnline: isOnline === 'online' ? true : false,
                bannerImage: fileName,
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
        onError: (error) => {}
    });

    // effects
    React.useEffect(() => {
        fileReader.current = new FileReader();
    }, []);

    React.useEffect(() => {
        if (fileReader !== null) {
            (fileReader.current as FileReader).onload = () => {
                setImageUrl(fileReader?.current?.result as string);
                console.log(`URL -> ${fileReader?.current?.result}`)
            }
        }
    }, [fileReader])

    // functions
    const onSocialMediaHandlePress = () => {
        const obj = {
            socialMediaHandle: handle,
            details: handle,
            platform: !platform ? 'facebook':platform,
        }

        setHandles((prev) => uniq([...prev, obj]));
        setHandle("");
        setPlatform("");
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const formdata = new FormData();
        const objectUrl = file ? URL.createObjectURL(file) : null;
        if (file) {
            console.log(objectUrl?.split("blob:")[1] as string);
            setImage(file);
            fileReader?.current?.readAsDataURL(file); 
        }
    };

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


    return renderForm(
        <Flex w={"full"} h={"full"} >
            <input type='file' accept='image/*' hidden onChange={(e) => {handleFileChange(e)}} ref={inputRef} />
            <Flex w={"full"} h={"full"} display={['none', 'flex']} flexDir={"column"} justifyContent={"center"} alignItems={"center"} borderRightWidth={"1.03px"} borderColor={borderColor} >
                <Flex maxW={"402px"} w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"bold"} fontSize={"18px"} >Hello,  <span style={{ color: primaryColor }} >{details?.firstName}</span></Text>
                    <Text fontSize={"32px"} lineHeight={"37.58px"} >Welcome to Chasescroll Business</Text>
                    <Text fontSize={"14px"} fontWeight={"500"} >Your gateway to seamless service bookings,</Text>
                </Flex>
            </Flex>
            <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} overflowY={"auto"}  >
                <Flex maxW={["full", "438px"]} w={"full"} height={"full"} gap={"5"} flexDir={"column"} pt={["20px", "10px"]} px={['20px', '0px']} >
                    <Flex flexDir={"column"} gap={"3"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >{`Let’s get you started`}</Text>
                        <Text fontSize={"14px"} fontWeight={"400"} >{`Your address will be provided to client  only after they've booked for your services`}</Text>
                    </Flex>
                    {imageUrl === '' && image === null && (
                         <Flex w={"full"} py={"8"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}
                         onClick={() => inputRef?.current?.click()} cursor={'pointer'}  >
                             <GallaryIcon />
                             <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Click here to upload</Text>
                             <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                         </Flex>
                    )}
                    {imageUrl !== '' && image !== null &&(
                        <Flex w={"full"}  flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} 
                        onClick={() => inputRef?.current?.click()} cursor={'pointer'}  >
                            <Image src={imageUrl as string} alt="banner image" width="100%" height='200px' rounded='16px' objectFit='cover' />
                        </Flex>
                    )}
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="businessName" placeholder="" label="Business Name" isPassword={false} type='text' required />
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"400"} fontSize={"14px"} >Business Description <sup style={{ color: 'red' }}>*</sup></Text>
                        <Textarea value={description} onChange={(e) => {
                            if(description.length < 300) {
                                setDescription(e.target.value)
                            }
                        }} h={"84px"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} />
                        <Text>{description.length}/300</Text>
                    </Flex>
                    <RadioGroup >
                        <Flex direction='row' gap={"4"}>
                            <Radio value='1' isChecked={isOnline === 'physical'} onChange={() => setIsOnline('physical')}>Physical Venue</Radio>
                            <Radio value='2' isChecked={isOnline === 'online'} onChange={() => setIsOnline('online')}>Online</Radio>
                            <Radio value='3' isChecked={isOnline === 'both'} onChange={() => setIsOnline('physical')}>Both</Radio>
                           {/* <HStack>
                                <Checkbox isChecked={both} onChange={() => setBoth((prev) => !prev)} aria-label='Both' />
                                <Text>Has both</Text>
                           </HStack> */}
                        </Flex>
                    </RadioGroup>
                    {isOnline !== 'online' && (
                        <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                            <CustomInput name="address" placeholder='' label='Business Address' isPassword={false} type='text' required={false} />
                        </Flex>
                    )}
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="phone" placeholder='' label='Business Phone Number' isPassword={false} type='phone' required />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="email" placeholder='' label='Business Email Address' isPassword={false} type='email' required />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <CustomInput name="website" placeholder='' label='Business Website (optional)' isPassword={false} type='text' hint="The link must start with https://" />

                        
                    </Flex>

                    <Flex gap={"2"} mt={"2"} as={"button"} alignItems={"center"} onClick={() => setShowModal(true)} >
                        <IoAdd size={"25px"} color={primaryColor} />
                        <Text>Operating Hours and time  <sup style={{ color: 'red' }}>*</sup></Text>
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
                            <Select h={"44px"} value={platform} onChange={(e) => setPlatform(e.target.value)} >
                                {SOCIAL_MEDIA_PLATFORMS.map((media, index) => (
                                    <option selected={index === 0} value={media} key={index.toString()}>{media}</option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                            <Text>Social Media handle</Text>
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
                        <Button type='submit' isLoading={uploadImageMutation.isLoading ?? createBusinessMutation.isLoading} onClick={() => setOpen(true)} w={"full"} bg={primaryColor} color={"white"} rounded={"full"} h={"49px"} _hover={{ backgroundColor: primaryColor }} >
                            Create Business
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
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} >{`You’ve successfully Create your Business. Kindly click on the create services to get started.`}</Text>
                    <Button onClick={()=> router?.push(`/dashboard/newbooking/create/${business?.id}/services`)} height={"50px"} mt={"4"} borderWidth={"1px"} w={"200px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{ backgroundColor: primaryColor }} >Create services </Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
} 
