import { PayStackLogo } from '@/components/svg'
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Button, Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import usePaystackStore from '@/global-state/usePaystack';
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import useStripeStore from '@/global-state/useStripeState'
import useModalStore from '@/global-state/useModalSwitch'
import CustomButton from '@/components/general/Button';
// import useModalStore from '@/global-state/useModalSwitch';
// import { useRouter } from 'next/navigation';

interface Props {
    selectedCategory: any,
    ticketCount: any,
    datainfo: any,
}

function PayStackBtn(props: Props) {
    const {
        selectedCategory,
        ticketCount,
        datainfo
    } = props

    const toast = useToast()
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const { setShowModal } = useModalStore((state) => state);


    const { setPaystackConfig } = usePaystackStore((state) => state);

    const payForTicket = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_TICKET, data),
        onSuccess: (data: any) => {
            setPaystackConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
            setShowModal(false)


        },
        onError: (error) => {
            // console.log(error);
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

    const clickHandler = React.useCallback(() => {
        payForTicket.mutate({
            eventID: datainfo?.id,
            ticketType: selectedCategory,
            numberOfTickets: ticketCount
        })
    }, [payForTicket]) 

    return (
        <>
            {/* <Button isDisabled={payForTicket?.isLoading} isLoading={payForTicket?.isLoading} onClick={clickHandler} as={"button"} mt={"4"} width={"full"} h={"full"} >
                <Flex h={"100px"} justifyContent={"center"} alignItems={"center"} >
                    <PayStackLogo />
                </Flex>
            </Button> */}

            <CustomButton isDisabled={payForTicket?.isLoading} isLoading={payForTicket?.isLoading} onClick={clickHandler} text='Pay now' width={["full", "full"]} />
        </>
    )
}

export default PayStackBtn
