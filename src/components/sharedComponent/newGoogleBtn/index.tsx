import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Image, Text, useToast } from '@chakra-ui/react';
import { URLS } from '@/services/urls';
import httpServiceGoogle from '@/utils/httpServiceGoogle';
import router from 'next/router';
import { useMutation } from 'react-query';
import CustomText from '@/components/general/Text';
import { GoogleIcon } from '@/components/svg';
import { useDetails } from '@/global-state/useUserDetails';

interface Props {
    title: string,
    fixedwidth?: string,
    height?: string,
    bgColor?: string,
    id?: boolean,
    index?: string,
    border?: string,
    newbtn?: boolean
}

export default function NewGoogleButton(props : Props) {

    const {
        title,
        fixedwidth,
        height,
        bgColor,
        id,
        index,
        border,
        newbtn
    } = props
 
    const toast = useToast()

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse)
        // {
            // signinWithGoogle.mutate(tokenResponse.access_token); 
        // }
    });
    
    const { email, setAll } = useDetails((state) => state);


    const signinWithGoogle = useMutation({

        mutationFn: (data: string) => httpServiceGoogle.get(`${URLS.SIGN_IN_WTIH_CREDENTIALS}`, {
            headers: {
                Authorization: `Bearer ${data}`,
            }
        }),
        onSuccess: (data) => {
            //console.log(data.data); 
            localStorage.setItem('token', data?.data?.access_token);
            toast({
                title: 'Success',
                description: 'Google Signin Successful',
                status: 'success',
                position: 'top-right'
            })
            localStorage.setItem('token', data?.data?.access_token);
            localStorage.setItem('refresh_token', data?.data?.refresh_token);
            localStorage.setItem('user_id', data?.data?.user_id);
            localStorage.setItem('expires_in', data?.data?.expires_in);
            setAll({
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                username: data?.data?.user_name,
                userId: data?.data?.user_id,
            })

            if (id) {
                router.push(`/dashboard/event/details/${index}`);
            } else {
                if (data?.data?.user_id) {
                    router.push('/dashboard/event')
                }
            }
        },
        onError: (error: any) => {

            toast({
                title: 'Erroor',
                description: 'An error occured, please try again',
                status: 'error',
            })
        }
    })

    return (
        // <>
        //     {/* <GoogleOneTapLogin onError={(error) => console.log(error)} onSuccess={(response) => console.log(response)} googleAccountConfigs={{ client_id: "727859404694-0c3ti1r9ndvqk6f2tq817lsbvas8aqt4.apps.googleusercontent.com" }} /> */}
        //     <div onClick={() => login()} role='button' className=' lg:w-full flex items-center  bg-[#F2F4F7] rounded h-[45px]  justify-center font-medium text-[#344054] mt-4 lg:mt-8 gap-2 ' >
        //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        //             <path d="M22.5005 12.2336C22.5005 11.3702 22.4291 10.7402 22.2744 10.0869H12.2148V13.9835H18.1196C18.0006 14.9519 17.3577 16.4102 15.9291 17.3902L15.9091 17.5206L19.0897 19.9354L19.3101 19.9569C21.3338 18.1252 22.5005 15.4302 22.5005 12.2336Z" fill="#4285F4" />
        //             <path d="M12.212 22.4996C15.1048 22.4996 17.5334 21.5662 19.3072 19.9562L15.9263 17.3895C15.0215 18.0078 13.8072 18.4395 12.212 18.4395C9.37874 18.4395 6.974 16.6079 6.11678 14.0762L5.99113 14.0866L2.68388 16.595L2.64062 16.7128C4.4025 20.1428 8.02155 22.4996 12.212 22.4996Z" fill="#34A853" />
        //             <path d="M6.119 14.0765C5.89281 13.4232 5.76191 12.7231 5.76191 11.9998C5.76191 11.2764 5.89281 10.5765 6.1071 9.92313L6.10111 9.78398L2.75239 7.23535L2.64283 7.28642C1.91667 8.70977 1.5 10.3081 1.5 11.9998C1.5 13.6915 1.91667 15.2897 2.64283 16.7131L6.119 14.0765Z" fill="#FBBC05" />
        //             <path d="M12.2121 5.55997C14.224 5.55997 15.5811 6.41163 16.3549 7.12335L19.3787 4.23C17.5216 2.53834 15.1049 1.5 12.2121 1.5C8.02158 1.5 4.40251 3.85665 2.64062 7.28662L6.1049 9.92332C6.97403 7.39166 9.37878 5.55997 12.2121 5.55997Z" fill="#EB4335" />
        //         </svg>
        //         <p>{title}</p>
        //     </div>
        // </>

        (<>
            {newbtn && (
                <Button onClick={()=> login()} as={"button"} mt={"4"} h={"50px"} w={"full"} bgColor={"#F7F7F7"} rounded={"32px"} gap={"3"} justifyContent={"center"} alignItems={"center"} >
                    <GoogleIcon />
                    <Text fontSize={"14px"} color={"#111111"} textAlign={"center"} fontWeight={"500"} >Signup with Google</Text>
                </Button>
            )}
            {!newbtn && (
                <Button onClick={()=> login()} width={['100%', fixedwidth ? fixedwidth : '100%']} height={height ? height : '40px'} borderRadius={'8px'} border={border} _hover={{ backgroundColor: bgColor ? bgColor : "#1018280D" }} bg={bgColor ? bgColor : '#1018280D'} padding='8px 16px 8px 16px'>
                    <Image alt='google' src='/assets/svg/googlelogo.svg' />
                    <CustomText marginLeft={'20px'} fontFamily={'DM-Medium'} fontSize={'16px'} color={'grey'} fontWeight={'700'}>{title} with Google</CustomText>
                </Button>
            )}
            {/* <PageLoader show={googlesign || localStorage.getItem('google') === "true"} /> */}
        </>)
    );
}