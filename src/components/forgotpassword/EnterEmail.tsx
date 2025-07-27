import { useForm } from '@/hooks/useForm'
import { forgotPasswordEmailValidation } from '@/services/validations';
import { Button, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { CustomInput } from '../Form/CustomInput';
import CustomButton from '../general/Button';
import { useMutation } from 'react-query';
import httpService, { unsecureHttpService } from '@/utils/httpService';
import { URLS } from '@/services/urls';

function EnterEmail({ next }: {
    next: (page: number) => void
}) {
    const toast = useToast();
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => unsecureHttpService.post(`${URLS.SEND_VERIFICATION_EMAIL}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Code Sent!',
                description: 'A six digit verification code has been sent to your email',
                status: 'success',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
            next(2);
        },
        onError: (error: any) => {
            console.log(error);
            toast({
                title: 'An error occured',
                description: error.response.data.error,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
        }
    });
    const { renderForm } = useForm({
        defaultValues: {
            email: '',
        },
        validationSchema: forgotPasswordEmailValidation,
        submit: (data) => {
            console.log(data);
            mutate({ userEmail: data.email, emailType: 2 });
        },
    });
  return renderForm(
    <VStack width='100%' mt={"6"} >
        <CustomInput name='email' newbtn={true} isPassword={false} type='text' placeholder='Enter your email' />
        <Button type='submit' color={"white"} mt={"2"} isLoading={isLoading} isDisabled={isLoading}  _disabled={{ backgroundColor: "#233DF380" }} h={"50px"} w={"full"} bgColor={"#233DF3"} rounded={["20px", "20px", "32px"]} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >Send code</Button> 
    </VStack>   
  )
}

export default EnterEmail