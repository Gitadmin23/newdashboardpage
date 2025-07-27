"use client";
import React from 'react'
import Image from 'next/image';
import { HStack, VStack, useToast, PinInput, PinInputField, Text, Button, Flex } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls'
import { useRouter } from 'next/navigation';
import { FaCircleInfo } from 'react-icons/fa6';

function VerifyCode({ next }: {
    next: (page: number) => void
}) {
    const [code, setCode] = React.useState('');

    const router = useRouter();

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
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'verification successful',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            router.replace('/auth/forgotpassword?token=' + code);
            next(3);
        }
    });

    const hanldeSubmit = React.useCallback(() => {
        mutate({ token: code })
    }, [code, mutate])

    return (
        <Flex flexDirection={"column"} width='100%' gap={"3"} >
            <Text fontSize={"15px"} textAlign={"center"} color={"#4B4B4D"} >A six digits code has been sent to your email for verification.</Text>

            <Flex gap={"3"} >
                <PinInput size='lg' otp value={code} onChange={(e) => setCode(e)}> 
                    <PinInputField rounded={"full"} w={["40px", "40px", "50px"]} h={["40px", "40px", "50px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "50px"]} h={["40px", "40px", "50px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "50px"]} h={["40px", "40px", "50px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "50px"]} h={["40px", "40px", "50px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "50px"]} h={["40px", "40px", "50px"]} />
                    <PinInputField rounded={"full"} w={["40px", "40px", "50px"]} h={["40px", "40px", "50px"]} />
                </PinInput>
            </Flex>

            <Flex alignItems={"center"} justifyContent={"start"} gap={"2"} >
                <Flex w={"fit-content"} >
                <FaCircleInfo color='red' size={"24px"} />
                </Flex>
                <Text fontSize={"14px"} textAlign={"left"} lineHeight={"120%"} >Please also check your spam or junk mail folder in case the verification code was filtered there.</Text>
            </Flex>

            <Button onClick={hanldeSubmit} type='button' color={"white"} mt={"2"} isLoading={isLoading} isDisabled={isLoading}  _disabled={{ backgroundColor: "#233DF380" }} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={["20px", "20px", "32px"]} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >Send code</Button> 
            {/* <CustomButton onClick={hanldeSubmit} type='button' text='Verify Code' isLoading={isLoading} color='white' width='100%' borderRadius='10px' /> */}
        </Flex>
    )
}

export default VerifyCode;