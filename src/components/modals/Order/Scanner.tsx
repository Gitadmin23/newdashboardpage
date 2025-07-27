import React, { useEffect } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, Box, VStack, Spinner, Image, Button, useToast } from "@chakra-ui/react";
import { Scanner as QrcodeScanner } from '@yudiel/react-qr-scanner';
import { useMutation } from "react-query";
import httpService from "@/utils/httpService";
import { URLS } from "@/services/urls";
import CustomText from "@/components/general/Text";
import Ticket from "@/components/event_component/ticket";
import { ITicket } from "@/models/Ticket";
import ModalLayout from '@/components/sharedComponent/modal_layout';
import { AxiosError } from 'axios';
import { dateFormat } from '@/utils/dateFormat';
import useOrderConfirmation from '@/hooks/useOrderConfirmation';

interface IProps {
    isOpen: boolean;
    onClose: any;
    id: string, 
    type?: string
}

export default function OrderScanner({
    isOpen,
    onClose,
    id, 
    type
}: IProps) {
    const [approved, setApproved] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [ticket, setTicket] = React.useState<ITicket | null>(null);
    const [scanned, setScanned] = React.useState(false);

    const userId = localStorage.getItem('user_id') + "";
    const toast = useToast()

    const { productConfirm, serviceConfirm, rentalConfirm } = useOrderConfirmation()

    const clickHandler = (index: string) => {
        if (type === "PRODUCT") {
            productConfirm?.mutate(index)
        } else if (type === "RENTAL") {
            rentalConfirm?.mutate(index)
        } else {
            serviceConfirm?.mutate({
                bookingID: index,
                completedWithIssues: false,
                userID: userId
            })
        }
    } 

    const retry = () => {
        setShow(true);
        onClose(true)
        setScanned(false);
    }
     
    return (
        <>
            <Modal isOpen={isOpen} isCentered={true} onClose={() => onClose(false)} size={scanned && (!productConfirm?.isLoading || !serviceConfirm?.isLoading || !rentalConfirm?.isLoading) && (!productConfirm?.isError || !serviceConfirm?.isError || !rentalConfirm?.isError) ? 'full' : 'full'}>
                <ModalContent bg={'grey'}>
                    {(!productConfirm?.isLoading || !serviceConfirm?.isLoading || !rentalConfirm?.isLoading) && !scanned && (
                        <ModalCloseButton size={'large'} onClick={() => onClose(false)} />
                    )}
                    <ModalBody width={'100%'} height={'400px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        {(!productConfirm?.isLoading || !serviceConfirm?.isLoading || !rentalConfirm?.isLoading) && !scanned && (
                            <Box width={'300px'} height={'300px'} bg={'black'}>
                                <Box width={'100%'} height={'100%'}>
                                    <QrcodeScanner
                                        enabled={true}
                                        onResult={(text, result) => clickHandler(text)}
                                        onError={(error) => console.log(error?.message)}
                                    />
                                </Box>
                            </Box>
                        )}
                        {(!productConfirm?.isLoading || !serviceConfirm?.isLoading || !rentalConfirm?.isLoading) && (
                            <VStack justifyContent={'center'} w={'100%'} h={'100%'}>
                                <Spinner />
                                <CustomText>Confirming Order...</CustomText>
                            </VStack>
                        )} 
                    </ModalBody>
                </ModalContent>
            </Modal>
            <ModalLayout size={"full"} open={open} close={setOpen} >
                {((!productConfirm?.isLoading || !serviceConfirm?.isLoading || !rentalConfirm?.isLoading) && (!productConfirm?.isError || !serviceConfirm?.isError || !rentalConfirm?.isError)) && (
                    <Box flex={1}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} textAlign={'center'}>An error occured while scanning the Order</CustomText>
                        <Button onClick={retry} width={'100%'} height={'45px'} color={'white'} bg={'brand.chasescrollButtonBlue'}>Retry</Button>
                    </Box>
                )}
            </ModalLayout>
        </>
    )
}
