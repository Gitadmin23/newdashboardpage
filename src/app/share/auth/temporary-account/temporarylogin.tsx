import { CustomInput } from '@/components/Form/CustomInput'
import CustomButton from '@/components/general/Button'
import httpService, { unsecureHttpService } from '@/utils/httpService';
import { signInTemporaryValidation } from '@/services/validations';
import { Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query';
import { useForm } from '@/hooks/useForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useShareState } from '../../state';
import { useDetails } from '@/global-state/useUserDetails';

export default function Temporarylogin() {

  const toast = useToast()

  const { type, typeID, setAll: seType } = useShareState((state) => state);
  const { setAll } = useDetails((state) => state);
  const router = useRouter()
  const query = useSearchParams();
  const id = query?.get('affiliate');


  React.useEffect(() => {
    const type = query?.get('type');
    const typeID = query?.get('typeID');

    if (type && typeID) {
      seType({ type, typeID });
    }
  }, [query, seType, setAll])

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => unsecureHttpService.post(`/auth/temporary-signup`, data),
    onError: (error) => {
      toast({
        title: 'An error occured',
        description: 'Error Occured',
        status: 'error',
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
    },
    onSuccess: (data) => {
      console.log(data?.data?.message);
      if (data?.data?.message === 'You already have an account') {

        toast({
          title: 'Error',
          description: data?.data?.message,
          status: 'error',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
      } else {

        toast({
          title: 'Success',
          description: 'Login successful',
          status: 'success',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        sessionStorage.setItem('tp_token', data?.data?.access_token);
        sessionStorage.setItem('refresh_token', data?.data?.refresh_token);
        sessionStorage.setItem('user_id', data?.data?.user_id);
        sessionStorage.setItem('expires_in', data?.data?.expires_in);
        setAll({
          firstName: data?.data?.firstName,
          lastName: data?.data?.firstName,
          username: data?.data?.user_name,
          userId: data?.data?.user_id,
        })
        const typee = sessionStorage.getItem('type');
        const typeIDD = sessionStorage.getItem('typeID');
        if(type  === "DONATION"){
          router.push(`/donation/${typeID}`);
        } else {
          router.push(`/event/${id ? `${id}?type=affiliate` : typeID}`);
        }
      }
    }
  });

  const { renderForm } = useForm({
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
    },
    validationSchema: signInTemporaryValidation,
    submit: (data) => mutate(data)
  });

  return renderForm(
    <Flex w={"full"} justifyContent={"center"} alignItems={"center"} >
      <Flex w={"400px"} flexDir={"column"} alignItems={"center"} gap={"3"} >
        <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='chasescroll logo' />

        <Text fontSize={"20px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Fill in your infomation to buy ticket</Text>
        {/* <Text textAlign={"center"} fontSize={"24"} fontWeight={"700"} color={"#5465E0"} >Fill in your infomation to buy ticket</Text> */}

        <Flex flexDir={"column"} mt={"4"} gap={"1"} w={"full"} >
          <Text color={"#1F1F1F"} ml={"1"} >First Name</Text>
          <CustomInput newbtn={true} name='firstName' type='text' placeholder='Enter your First Name' />
        </Flex>
        <Flex flexDir={"column"} gap={"1"} w={"full"} >
          <Text color={"#1F1F1F"} ml={"1"} >Last Name</Text>
          <CustomInput newbtn={true} name='lastName' type='text' placeholder='Enter your Last Name' />
        </Flex>
        <Flex flexDir={"column"} gap={"1"} w={"full"} >
          <Text color={"#1F1F1F"} ml={"1"} >Email</Text>
          <CustomInput newbtn={true} name='email' type='text' placeholder='Enter your Email' />
        </Flex>
        <Button type='submit' color={"white"} isLoading={isLoading} isDisabled={isLoading} mt={"4"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
          <Text textAlign={"center"} fontWeight={"600"} >Submit</Text>
        </Button>
        {/* <CustomInput name='firstName' isPassword={false} type='text' placeholder='Enter your First Name' />
        <CustomInput name='lastName' isPassword={false} type='text' placeholder='Enter your Last Name' />
        <CustomInput name='email' isPassword={false} type='text' placeholder='Enter your Email' /> */}
        {/* <CustomButton type='submit' text='Proceed' isLoading={isLoading} color='white' width='100%' borderRadius='10px' /> */}
      </Flex>
    </Flex>
  )
}
