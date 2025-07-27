'use client';
import { Box, Button, HStack, Image, Spinner, VStack, useColorMode, useToast } from '@chakra-ui/react'
import React, { use, useEffect } from 'react'
import { ArrowLeft2, ArrowRight2, Camera } from 'iconsax-react'
import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { useForm } from '@/hooks/useForm'
import { editProfileSchema } from '@/services/validations'
import { CustomInput } from '@/components/Form/CustomInput'
import Link from 'next/link';
import { useDetails } from '@/global-state/useUserDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, URLS } from '@/services/urls';
import { IUser } from '@/models/User';
import AWSHook from '@/hooks/awsHook';
import { useRouter } from 'next/navigation'
import { isValid } from 'zod';
import useCustomTheme from '@/hooks/useTheme';
import UserImage from '@/components/sharedComponent/userimage';

function EditProfile() {
    const [user, setUser] = React.useState<IUser | null>(null);
    const [pic, setPic] = React.useState("");
    const [showEmail, setShowEmail] = React.useState(false);
    const { userId, firstName, lastName, username } = useDetails((state) => state);
    const { uploadedFile, fileUploadHandler, loading, reset } = AWSHook();
    const queryClient = useQueryClient();

    const ref = React.useRef<HTMLInputElement>(null);
    const router = useRouter();
    const toast = useToast();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { renderForm, setValue, formState: { isDirty, }, watch, values } = useForm({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            username: user?.username,
            website: user?.data?.webAddress?.value,
            aboutme: user?.data?.about?.value,
            image: user?.data?.imgMain?.value
        },
        validationSchema: editProfileSchema,
        submit: (data: {
            firstName: string,
            lastName: string,
            username: string,
            website: string,
            aboutme: string,
            image: string
        }) => {
            if (loading || isLoading || !isValid) {
                return;
            }
            else {
                const dataOb = {
                    "firstName": data.firstName,
                    "showEmail": showEmail,
                    "lastName": data.lastName,
                    "publicProfile": true,
                    // "username": data.username,
                    "data": {
                        "imgMain": {
                            objectPublic: true,
                            "value": pic ? pic : data?.image
                        },
                        "webAddress": {
                            objectPublic: true,
                            "value": data.website === null ? null : data.website ?? null
                        },
                        "about": {
                            objectPublic: true,
                            "value": data.aboutme === null ? null : data.aboutme ?? null
                        },
                    }
                }
                editProfile.mutate(dataOb);
            }
        },
    });

    // watching variables
    const website = watch('website');
    const about = watch('aboutme'); 

    const { isLoading, isError, refetch } = useQuery(['getUserDetails', userId], () => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`), {
        onSuccess: (data) => {
            console.log(data.data);
            setUser(data.data);
            setValue('firstName', data?.data?.firstName);
            setValue('lastName', data?.data?.lastName);
            setValue('username', data?.data?.username);
            setValue('image', data?.data?.data?.imgMain?.value);
            setValue('website', data?.data?.data?.webAddress.value === ' ' ? null : data?.data?.data?.webAddress.value === null ? null : data?.data?.data?.webAddress.value);
            setValue('aboutme', data?.data?.data.about.value === ' ' ? null : data?.data?.data.about.value === null ? null : data?.data?.data.about.value);
        },
        onError: (error) => {
            console.log(error);
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
            refetch()
            queryClient.invalidateQueries(['getUserDetails'])
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

    React.useEffect(() => {
        if (!loading) {
            console.log(uploadedFile);

            if (uploadedFile.length > 0) {
                setPic(uploadedFile[0] as any);
                // reset()
            }
        }
    }, [uploadedFile, loading])


    const handleChange = (files: FileList) => {
        fileUploadHandler(files);
    }

    if (isLoading) {
        return (
            <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'} bg={mainBackgroundColor}>
                <Spinner />
                <CustomText fontSize={'18px'}>Loading Details</CustomText>
            </VStack>
        )
    }

    return renderForm(
        <VStack width={'100%'} height={'100%'} bg={mainBackgroundColor}>
            <input ref={ref} onChange={(e) => handleChange(e.target.files as FileList)} hidden type='file' accept='image/*' />
            <Box overflowY='auto' width={['100%']} height={'100vh'} paddingY='20px' paddingX={['20px', '0px']}>


                <VStack width='100%' height={'100%'} alignItems={'center'}>


                    <VStack width={['100%', '30%']} height='100%'>


                        {/* HEADER */}
                        <HStack width={'100%'} height={'50px'} justifyContent={'space-between'}>
                            <ArrowLeft2 role='button' size={'30px'} color={bodyTextColor} onClick={() => router.back()} />
                            <CustomText fontSize={'18px'}>Edit Profile</CustomText>
                            <Box></Box>
                        </HStack>

                        <VStack flex='1' width={'100%'} alignItems={'center'} paddingBottom='20px' spacing={0}>

                            {/* IMAGE */}
                            <Box width='144px' height='144px' overflow={'hidden'} position={'relative'}>
                                <Box width={'144px'} height={'144px'} overflow={'hidden'} >
                                    {pic ?

                                        <UserImage size={"144px"} data={user} rounded='50px' image={pic?.startsWith('https://') ? pic : IMAGE_URL + pic} /> :
                                        values?.image ?
                                        <UserImage size={"144px"} data={user} rounded='50px' image={values?.image?.startsWith('https://') ? values?.image : IMAGE_URL + values?.image} />:
                                        <UserImage size={"144px"} data={user} rounded='50px' image={null} />
                                    }
                                    {/* <UserImage size={"144px"} data={user} rounded='50px' image={null} /> */}
                                </Box>

                                <Box onClick={() => ref.current?.click()} position={'absolute'} right={'0px'} bottom='0px' width='30px' height={'30px'} borderRadius={'15px'} bg='white' shadow='lg' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    {loading && <Spinner size='xs' color='blue' />}
                                    {!loading && <Camera size='15px' variant='Bold' color='lightgrey' />}
                                </Box>
                            </Box>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>FirstName</CustomText>
                                <CustomInput name='firstName' value={values?.firstName ?? firstName} isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>LastName</CustomText>
                                <CustomInput name='lastName' value={values?.lastName ?? lastName} isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>Username</CustomText>
                                <CustomInput name='username' disable={true} isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>Website</CustomText>
                                <CustomInput name='website' isPassword={false} type='text' placeholder={website === null ? 'www.example.com' : ''} />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontSize={'16px'}>About me</CustomText>
                                <CustomInput name='aboutme' isPassword={false} type='text' placeholder={about === null ? 'A short description about me' : ''} />
                            </VStack>

                            <Link href='/dashboard/settings/info/personalinfo' style={{ width: '100%', marginTop: '20px' }}>
                                <HStack width={'100%'} justifyContent={'space-between'}>
                                    <CustomText color='brand.chasescrollButtonBlue'>Personal Information</CustomText>
                                    <ArrowRight2 size={'25px'} color={THEME.COLORS.chasescrollButtonBlue} variant='Outline' />
                                </HStack>
                            </Link>

                            <Button marginTop={'20px'} marginBottom='100px' width='100%' type='submit' isLoading={editProfile.isLoading} variant={'ghost'} borderWidth={'1px'} borderColor='brand.chasescrollButtonBlue' color='brand.chasescrollButtonBlue'>Save Changes</Button>

                        </VStack>

                    </VStack>


                </VStack>


            </Box>
        </VStack>
    )
}

export default EditProfile