"use client";
import React from 'react'
import Image from 'next/image';
import { HStack, VStack, useToast, PinInput, PinInputField } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls'
import { useRouter, useSearchParams } from 'next/navigation'

function VerifyAccount() {
    const [code, setCode] = React.useState('');
    const router = useRouter(); 

    const query = useSearchParams();
    const type = query?.get('type');
    const typeID = query?.get('typeID');
    
    const toast = useToast();
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: { token: string }) => httpService.post(`${URLS.VERIFY_TOKEN}`, data),
        onError: (error: any) => {
            toast({
                title: 'An error occured',
                description: error.response.data.statusDescription,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess:(data) => {
            toast({
                title: 'Success',
                description: 'verification successful',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            router.push(`/share/auth/login?type=${type}&typeID=${typeID}`);
        }
    });

    const hanldeSubmit = React.useCallback(() => {
        mutate({ token: code })
    }, [code, mutate])

  return (
    <VStack width='100%' height='100vh' justifyContent={'center'} padding={['20px', '0px']}>
      <Image src='/assets/images/chasescroll-logo.png' width={100} height={100} alt='chasescroll logo' />
      <CustomText color='brand.chasescrollBlue' fontSize='xl' marginY='10px'>Verify Email</CustomText>

      <VStack width={['100%', '100%', '25%', '25%']}>
            <CustomText fontSize={'md'} fontFamily={'Satoshi-Regular'} textAlign={'center'}>
                A six digits code has been sent to your email for verification.
            </CustomText>

            <HStack marginY='20px'>
                <PinInput size='lg' otp value={code} onChange={(e) => setCode(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>

            <CustomButton onClick={hanldeSubmit} type='button' text='Verify Code' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />
      </VStack>
    </VStack>
  )
}

export default VerifyAccount;