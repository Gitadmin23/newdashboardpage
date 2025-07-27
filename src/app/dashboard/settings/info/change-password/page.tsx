'use client';
import { CustomInput } from '@/components/Form/CustomInput'
import CustomText from '@/components/general/Text'
import { useForm } from '@/hooks/useForm'
import { URLS } from '@/services/urls';
import { changePasswordSchema } from '@/services/validations'
import httpService from '@/utils/httpService';
import { HStack, VStack, Image, Button, useToast, useColorMode } from '@chakra-ui/react'
import { ArrowLeft2 } from 'iconsax-react'
import React from 'react'
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import useCustomTheme from '@/hooks/useTheme';

function ChangePassword() {
    const toast = useToast();
    const router = useRouter();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { renderForm } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: changePasswordSchema,
        submit: (data: {
            oldPassword: string,
            newPassword: string,
            confirmPassword: string,
        }) => {
            console.log(data);
            const obj = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            }
            if (data?.oldPassword === data?.newPassword) {
                toast({
                    title: 'Error',
                    description: 'The new password cannot be the same as the old password.',
                    status: 'error',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                mutate(obj);
            }
        }
    });

    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.CHANGE_PASSWORD}`, data),
        onSuccess: (data: any) => {
            console.log(data?.data);
            if (data?.data?.statusCode === 1) {
                toast({
                    title: 'Error',
                    description: data?.data?.statusDescription + ", Incorrect Old Password",
                    status: 'error',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Success',
                    description: 'Your password has been changed',
                    status: 'success',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            }

        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while changing your password.',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
        }
    })
    return renderForm(
        <VStack width='100%' height={'100%'} bg={mainBackgroundColor}>
            <HStack width={'100%'} height={'50px'} paddingLeft={'20px'}>
                <ArrowLeft2 size='25px' color={bodyTextColor} variant='Outline' onClick={() => router.back()} />
                <CustomText fontSize={'20px'} fontFamily={'DM-Bold'} color={bodyTextColor}>New Password</CustomText>
            </HStack>

            <HStack width='100%' flex='1' pb={"10"} justifyContent={'center'}>
                <VStack maxW={"400px"} width={['100%']} height='100%' alignItems={'center'} spacing={5} paddingX={'20px'}>

                    {/* HEADER */}
                    <VStack>
                        <Image alt='piic' src='/assets/images/chasescroll-logo.png' width={'80px'} height={'80px'} objectFit={'contain'} />
                        <CustomText color={'brand.chasescrollBlue'} fontFamily={'DM-Bold'} fontSize={'20px'}>Chasescroll</CustomText>
                    </VStack>

                    <VStack spacing={0} width='100%' alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>Old Password</CustomText>
                        <CustomInput placeholder='' type='password' isPassword name='oldPassword' />
                    </VStack>

                    <VStack spacing={0} width='100%' alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>New Password</CustomText>
                        <CustomInput placeholder='' type='password' isPassword name='newPassword' />
                    </VStack>

                    <VStack spacing={0} width='100%' alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>Confirm Password</CustomText>
                        <CustomInput placeholder='' type='password' isPassword name='confirmPassword' />
                    </VStack>

                    <Button isLoading={isLoading} type='submit' variant={'outline'} outlineColor={'brand.chasescrollButtonBlue'} width={'100%'} height={'30px'} borderWidth={'0px'} color={bodyTextColor}>
                        Submit
                    </Button>

                </VStack>
            </HStack>
        </VStack>
    )
}

export default ChangePassword