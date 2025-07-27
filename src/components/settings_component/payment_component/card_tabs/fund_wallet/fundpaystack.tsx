import httpService from '@/utils/httpService';
import React, { useState } from 'react'
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "react-query";
import { Flex, Text, useColorMode, useToast } from '@chakra-ui/react'
import useSettingsStore from '@/global-state/useSettingsState';
import { useRouter } from 'next/navigation';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import CustomButton from '@/components/general/Button';
import { SuccessIcon } from '@/components/svg';
import useCustomTheme from "@/hooks/useTheme";
import useStripeStore from '@/global-state/useStripeState';
import useModalStore from '@/global-state/useModalSwitch';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import usePaystackStore from '@/global-state/usePaystack';

interface IMessage {
    donation: boolean,
    booking: boolean,
    product: boolean,
    rental: boolean,
    service: boolean,
    event: boolean
}

interface Props {
    config: any,
    setConfig: any,
    fund?: boolean,
    id?: any,
    message: IMessage,
    amount?: number,
    setAmount?: any
}

function Fundpaystack(props: Props) {
    const { config, setConfig, fund, id, message, amount, setAmount: setAm } = props;

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const queryClient = useQueryClient()

    const [open, setOpen] = useState(false)


    const [loading, setLoading] = useState(true)

    const initializePayment: any = usePaystackPayment(config);
    const toast = useToast()
    const { setAmount } = useSettingsStore((state) => state);
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const { push } = useRouter()

    const { setMessage } = usePaystackStore((state) => state);

    const userId = localStorage.getItem('user_id') + "";

    console.log(amount);
    

    // const [orderCode, setOrderCode] = React.useStates("")
    // mutations 
    const payStackFundMutation = useMutation({
        mutationFn: (data: any) => httpService.get(`/payments/api/wallet/verifyFundWalletWeb?transactionID=${data}`),
        onSuccess: (data) => {
            // queryClient.invalidateQueries(['EventInfo'+id]) 

            toast({
                title: 'Success',
                description: "Payment verified",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            queryClient.invalidateQueries(['get-wallet-balanceNGN'])
            setLoading(false)
            setOpen(false)
            setAmount("")
            setConfig({
                email: "",
                amount: 0,
                reference: "",
                publicKey: PAYSTACK_KEY,
            })

            if(message?.donation) {
                donateEmail?.mutate({
                    userID: userId,
                    fundRaiserID: id,
                    amount: Number(amount)
                })
                setAm(0)
            }
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: "Error Occurred",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const payStackMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/payments/verifyWebPaystackTx?orderCode=${data}`),
        onSuccess: (data: any) => {
            toast({
                title: 'Success',
                description: "Payment verified",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            queryClient.invalidateQueries(['event_ticket'])
            queryClient.invalidateQueries(['all-events-details'])
            queryClient.invalidateQueries(['order'])
            queryClient.invalidateQueries(['donationlist'])
            queryClient.invalidateQueries(['donationlistmy'])
            queryClient.invalidateQueries(['all-donation'])
            queryClient.invalidateQueries(['getDonationsingleList'])
            setLoading(false)


            if(message?.donation) {
                donateEmail?.mutate({
                    userID: userId,
                    fundRaiserID: id,
                    amount: Number(amount)
                })
                setAm(0)
            }
        },
        onError: () => {
            toast({
                title: 'Error',
                description: "Error Occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const donateEmail = useMutation({
        mutationFn: (data: {
            "userID": string,
            "fundRaiserID": string,
            "amount": number
        }) => httpService.post(`/donation/create-donation`, data),
        onSuccess: (data: any) => {  

            console.log(data);
            
        },
        onError: () => {
            toast({
                title: 'Error',
                description: "Error Occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const onSuccess = (reference: any) => {
        setOpen(true)
        setLoading(true)
        if (fund) {
            payStackFundMutation.mutate(reference?.reference)
        } else {
            payStackMutation.mutate(reference?.reference)
        }
    };


    // you can call this function anything
    const onClose = () => {
        setConfig({
            email: "",
            amount: 0,
            reference: "",
            publicKey: PAYSTACK_KEY,
        })
    }

    React.useEffect(() => {
        if (config?.reference?.length !== 0) {
            initializePayment(onSuccess, onClose)
        }
    }, [config?.reference])

    const { setModalTab } = useStripeStore((state: any) => state);
    const { setShowModal } = useModalStore((state) => state);

    const clickHandler = () => {
        if (message?.product) {
            push(`/dashboard/kisok/details-order/${id}`)
        } else if (message?.event) {
            setModalTab(5)
            setShowModal(true)
        }
        setOpen(false)
        setMessage({
            donation: false,
            product: false,
            rental: false,
            service: false,
            booking: false,
            event: false
        })
    }

    const closeHandler = () => {
        if (message?.product) {
            setOpen(true)
        } else {
            setOpen(false)
            setMessage({
                donation: false,
                product: false,
                rental: false,
                service: false,
                booking: false,
                event: false
            })
        }
    }

    return (
        <>
            <ModalLayout open={open} close={closeHandler} bg={secondaryBackgroundColor} closeIcon={message?.product ? false : true} >
                <LoadingAnimation loading={loading} >
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{message?.service ? "Booking Successful" : message?.rental ? "Rental Purchase Successful" : message?.product ? "Product Purchase Successful" : message?.donation ? "Donated Successful" : message?.event ? "Ticket Purchase Successful" : "Transaction Successful"}</Text>
                        <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{(message?.product || message?.service || message?.rental) ? "Thank you!" : message?.donation ? `Thank you! Your generous donation makes a real difference. We’re so grateful for your support!` : message?.event ? `Congratulations! you can also find your ticket on the Chasescroll app, on the details page click on the view ticket button.` : "Congratulations! Transaction was successfull"}</Text>

                        <CustomButton onClick={() => clickHandler()} color={primaryColor} text={'Close'} w={"full"} backgroundColor={"#F7F8FE"} />
                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </>
    )
}

export default Fundpaystack
