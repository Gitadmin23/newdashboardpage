'use client';
import { Box, Button, Checkbox, HStack, Select, Spinner, Switch, Text, VStack, useColorMode, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { ArrowLeft2 } from 'iconsax-react'
import CustomText from '@/components/general/Text'
import { useForm } from '@/hooks/useForm'
import { editPersonalInfoSchema, editProfileSchema } from '@/services/validations'
import { CustomInput } from '@/components/Form/CustomInput'
import { useDetails } from '@/global-state/useUserDetails';
import { IUser } from '@/models/User';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { CustomSelect } from '@/components/Form/CustomSelect';
import { useRouter } from 'next/navigation'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css' 
import useCustomTheme from '@/hooks/useTheme';


function EditProfile() {

    const [user, setUser] = React.useState<IUser | null>(null);
    const [showEmail, setShowEmail] = React.useState(false);
    const { userId, firstName, lastName, username } = useDetails((state) => state);
    const [month, setmonth] = React.useState('');
    const [day, setday] = React.useState('');
    const [year, setyear] = React.useState('');

    const toast = useToast();
    const router = useRouter();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        inputColor,
        inputtextColor
    } = useCustomTheme();

    console.log(user);
    

    const { colorMode, toggleColorMode } = useColorMode();

    const { renderForm, setValue, formState: { isDirty, }, values } = useForm({
        defaultValues: {
            mobilePhone: user?.data?.mobilePhone?.value,
            gender: user?.data.gender,
            dob: user?.dob,
            email: user?.email
        },
        validationSchema: editPersonalInfoSchema,
        submit: (data: {
            gender: string,
            dob: string,
            mobilePhone: string
        }) => {
            if (isLoading) {
                return;
            }
            else {
                const dataOb = {
                    dob: data.dob,
                    "showEmail": showEmail,
                    "data": {
                        gender: {
                            objectPublic: true,
                            value: data.gender,
                        },
                        mobilePhone: {
                            objectPublic: true,
                            value: data.mobilePhone,
                        }
                    }
                }
                editProfile.mutate(dataOb);
            }
        },
    });

    const listofmonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    useEffect(()=> {
        if(values?.dob){
            setmonth(listofmonth[new Date(values.dob)?.getMonth()])
            setyear(new Date(values.dob)?.getFullYear()+"")
            setday(new Date(values.dob)?.getDate()+"")
        }
    }, [values])


    const dataOb = {
        dob: values.dob,
        "showEmail": showEmail,
        "data": {
            gender: {
                objectPublic: true,
                value: values.gender,
            },
            mobilePhone: {
                objectPublic: true,
                value: values.mobilePhone,
            }
        }
    }



    const { isLoading, isError } = useQuery(['getUserPersonalDetails', userId], () => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`), {
        onSuccess: (data) => {
            setUser(data.data);
            setValue('dob', data?.data?.dob);
            setValue('gender', data?.data?.data.gender.value);
            setValue('mobilePhone', data?.data?.data?.mobilePhone.value);
            setValue('email', data?.data?.email);
            setShowEmail(data?.data.showEmail);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
    });

    const editProfile = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.UPDATE_PROFILE}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Your profile has been updated',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        }
    })
    if (isLoading) {
        return (
            <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                <Spinner />
                <CustomText fontSize={'18px'}>Loading Details</CustomText>
            </VStack>
        )
    }

    const formatDate = (item: any, name: string) => {

        if (name === "month") {

            if (item && item && day) {
                setValue('dob', [year, listofmonth.indexOf(item) + 1 > 9 ? listofmonth.indexOf(item) + 1 : "0" + (listofmonth.indexOf(item) + 1), day].join("-"));
            }
            setmonth(item)
        } else if (name === "year") {

            if (item && month && day) {
                setValue('dob', [item, listofmonth.indexOf(month) + 1 > 9 ? listofmonth.indexOf(month) + 1 : "0" + (listofmonth.indexOf(month) + 1), day].join("-"));
            }
            setyear(item)
        } else {
            if (year && month && item) {
                setValue('dob', [year, listofmonth.indexOf(month) + 1 > 9 ? listofmonth.indexOf(month) + 1 : "0" + (listofmonth.indexOf(month) + 1), item].join("-"));
            }
            setday(item)
        }

    }

    console.log(values);


    return renderForm(
        <VStack width={'100%'} height={'100%'} bg={mainBackgroundColor}>
            <input hidden type='file' accept='image/*' />
            <Box overflowY='auto' width={['100%', '100%']} height={'100%'} paddingY='20px' paddingX={['20px', '0px']}>

                <VStack width='100%' height='100%' alignItems={'center'}>


                    <VStack width={['100%', '400px']} pb={"12"} height='auto'>

                        {/* HEADER */}
                        <HStack width={'100%'} height={'50px'} justifyContent={'space-between'}>
                            <ArrowLeft2 size={'30px'} color={bodyTextColor} onClick={() => router.back()} />
                            <CustomText fontSize={'18px'}>Edit Personal Information</CustomText>
                            <Box></Box>
                        </HStack>


                        <VStack width={'100%'} height={'100%'} alignItems={'center'} spacing={6}>

                            <VStack mt={"6"} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>Email</CustomText>
                                <CustomInput name='email' isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <HStack width={'100%'} justifyContent={'space-between'}>
                                <CustomText fontSize={'12px'} color='brand.chasescrollButtonBlue'>Show Email</CustomText>
                                <Switch isChecked={showEmail} onChange={() => setShowEmail(prev => !prev)} />
                            </HStack>

                            <VStack alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>Phone</CustomText>
                                <PhoneInput
                                    country={'us'}
                                    enableSearch
                                    // style={{ width: '100%', height: '45px', borderWidth: '1px', borderRadius: '5px', borderColor: 'lightgrey', padding: '10px' }}
                                    containerStyle={{ width: '100%', height: '45px', }}
                                    inputStyle={{ width: "100%", height: "45px", borderWidth: '1px', borderColor: borderColor, background: mainBackgroundColor, borderRadius: "999px" }}
                                    dropdownStyle={{ backgroundColor: mainBackgroundColor }}
                                    searchStyle={{ background: secondaryBackgroundColor }}
                                    buttonStyle={{ color: bodyTextColor }}
                                value={values?.mobilePhone}
                                onChange={(phone: any) => setValue('mobilePhone', phone)}
                                />
                                {/* <CustomInput name='mobilePhone' isPassword={false} type='text' placeholder='' /> */}
                            </VStack>

                            <VStack alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>Gender</CustomText>
                                <CustomSelect name='gender' option={['Male', 'Female']} isPassword={false} type='text' placeholder='Select Gender' />
                            </VStack>

                            <VStack alignItems={'flex-start'} width={'100%'} spacing={1}>
                                <Text fontSize={'16px'}>Date of birth</Text> 
                            </VStack>

                            {/* <CustomButton onClick={() => editProfile.mutate(dataOb)} type='submit' variant={'outline'} text='Create Account' isLoading={editProfile.isLoading} color='white' width='100%' borderRadius='10px' fontFamily={'Satoshi-Regular'} /> */}
                            <Button  onClick={() => editProfile.mutate(dataOb)} type='submit' isLoading={editProfile.isLoading} borderWidth={'0px'} variant={'outline'} width='99%' outlineColor={'brand.chasescrollButtonBlue'} color='brand.chasescrollButtonBlue'>Save Changes</Button>


                        </VStack>

                    </VStack>

                </VStack>

            </Box>
        </VStack>
    )
}

export default EditProfile