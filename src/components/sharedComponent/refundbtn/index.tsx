import CustomButton from '@/components/general/Button'
import httpService from '@/utils/httpService'
import { useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios' 
import { useRouter } from 'next/navigation'
import React from 'react'
import { useQueryClient, useMutation } from 'react-query'

interface Props {
    index?: any,
    person?: any
}

function RefundBtn(props: Props) {
    const {
        index,
        person
    } = props 
    
    const router = useRouter()
    const toast = useToast()
    // const [loading, setLoading] = React.useState("")
    const queryClient = useQueryClient()   

    const refundUser = useMutation({
        mutationFn: () => httpService.get('/payments/refundEvent?eventID='+index+"&userID="+person?.userId),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: "Error Refunding All Users",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: "Refunded All Users",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            queryClient.invalidateQueries(['all-events-details'+index])  
            queryClient.invalidateQueries(['/events/get-event-members/'+index]) 
            
        }
    });  

    const clickHandler = React.useCallback((e: any) => { 
        e.stopPropagation();
        refundUser.mutate()
    }, [refundUser])

    return ( 
        <CustomButton isLoading={refundUser.isLoading} borderRadius={"md"} onClick={clickHandler} text='refund' color={"white"} backgroundColor={"rgb(220 38 38)"} height={"43px"} px={"4"} width={"fit-content"} />
    )
}

export default RefundBtn
