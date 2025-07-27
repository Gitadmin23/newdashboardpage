import useCustomTheme from '@/hooks/useTheme'
import { ICommunityRequest } from '@/models/Communitty'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Button, Flex, useColorMode, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useCommunity } from '../newcommunity'

interface IProps {
    index: string,
    setIndex: any,
    data: ICommunityRequest
}

interface IRequest {
    id: string,
    resolve: boolean
}

export default function CommunityRequestBtn(props: IProps) {

    const {
        setIndex,
        index,
        data: dataInfo
    } = props

    const [loading, setLoading] = useState("0") 
    const toast = useToast() 

    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
    const queryClient = useQueryClient();

    const { requestRefetch } = useCommunity()

    const resolveRequest = useMutation({
        mutationFn: (data: IRequest) => httpService.post("/group/resolve-request", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: data.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setLoading("0") 

            const clone = []
            clone?.push(dataInfo)
            // setIndex(clone)
			queryClient.invalidateQueries(["getMyCommunities"])  
            requestRefetch()
        }
    });
 

    const handleAcceptRequest = React.useCallback((event: any) => { 
        event.stopPropagation();
        setLoading("accept")
        resolveRequest.mutate({id: index, resolve: true})
    }, [index])


    const handleRejectRequest = React.useCallback((event: any) => { 
        event.stopPropagation();
        setLoading("decline")
        resolveRequest.mutate({id: index, resolve: false})
    }, [index])  


    return (
        <Flex gap={"3"} fontSize={"sm"} >
            <Button isDisabled={(resolveRequest?.isLoading && loading === "accept")} onClick={(e) => handleAcceptRequest(e)} fontSize={"sm"} maxW={"120px"} width={"full"} bgColor={primaryColor} color={'white'} height={"30px"} >
                {(resolveRequest?.isLoading && loading === "accept") ? "Loading..." : "Accept"}
            </Button>
            <Button isDisabled={(resolveRequest?.isLoading && loading === "decline")} onClick={(e) => handleRejectRequest(e)} fontSize={"sm"} maxW={"120px"} width={"full"} bgColor={"#FCE7F3"} height={"30px"} color={"#DD2B2C"} >
                {(resolveRequest?.isLoading && loading === "decline") ? "Loading..." : "Decline"}
            </Button>
        </Flex>
    )
}