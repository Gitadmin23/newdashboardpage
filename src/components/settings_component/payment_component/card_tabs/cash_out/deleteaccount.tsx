import httpService from '@/utils/httpService';
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillMinusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useMutation, useQueryClient } from 'react-query';

interface Props { 
    code: string | number
}

function Deleteaccount(props: Props) {
    const { 
        code
    } = props 

    const toast = useToast() 
    const queryClient = useQueryClient()


    const deleteAccount = useMutation({
        mutationFn: () => httpService.delete("/payments/account/removeBankAccount/"+code),
        onSuccess: (data: any) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: "success",
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            }); 
            queryClient.invalidateQueries(['my-bank-list'])

        },
        onError: () => {
            toast({
                title: 'Error',
                description: "Error Creating Ticket",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const submit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        deleteAccount.mutate( )

    } 

    return (
        <Flex onClick={(e)=> submit(e)} as='button' _hover={{ bgColor: "red", color: "white" }} bgColor={"white"} zIndex={"30"} rounded={"full"} justifyContent={"center"} alignItems={"center"} borderColor={"red"} color={"red"} borderWidth={"2px"} width={"25px"} height={"25px"} position={"absolute"} right={"-6px"} top={"-6px"} >
            <Text fontWeight={"700"} fontSize={"18px"} >-</Text>
        </Flex>
    )
}

export default Deleteaccount
