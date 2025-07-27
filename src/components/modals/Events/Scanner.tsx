import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, Box, VStack, Spinner, Image, Button, useToast } from "@chakra-ui/react";
import { Scanner as QrcodeScanner } from '@yudiel/react-qr-scanner';
import { useMutation } from "react-query";
import httpService from "@/utils/httpService";
import { URLS } from "@/services/urls";
import CustomText from "@/components/general/Text";
import Ticket from "@/components/event_component/ticket";
import { ITicket } from "@/models/Ticket";
import ModalLayout from '@/components/sharedComponent/modal_layout'; 

interface IProps {
    isOpen: boolean;
    onClose: (by?: boolean) => void;
    eventID: string,
    startDate: number,
    endDate: number
}

export default function Scanner({
    isOpen,
    onClose,
    eventID,
    startDate,
    endDate
}: IProps) {
    const [approved, setApproved] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [ticket, setTicket] = React.useState<ITicket | null>(null);
    const [scanned, setScanned] = React.useState(false);

    const toast = useToast()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (data: string) => httpService.get(`${URLS.VALIDATE_TICKET(eventID, data)}`),
        onSuccess: (data) => {
            setTicket(data?.data?.ticket);
            setApproved(data?.data?.validate);
            onClose(false)
            setOpen(true)
        },
        onError: (error: any) => {

            toast({
                status: "error",
                title: error.response?.data?.message,
                position: "top-right"
            });

            onClose(false)
        }
    })

    const handleScanner = (str: string) => {
        setShow(false);
        mutate(str);
    }

    const retry = () => {
        setShow(true);
        onClose(true)
        setScanned(false);
    }

    const closeHandler = () => {
        setOpen(false)
    }

    const checkEventDay =(item: any)=> { 
        return (new Date(item)?.getDate() >= new Date(startDate)?.getDate()) && (new Date(item)?.getDate() <= new Date(endDate)?.getDate())
    }

    const checkPreviousDate = () => { 
        return (new Date((ticket?.scanTimeStamp) ? (ticket?.scanTimeStamp[ticket?.scanTimeStamp?.length - 1]) : "")?.getDay() !== new Date((ticket?.scanTimeStamp) ?( ticket?.scanTimeStamp[ticket?.scanTimeStamp?.length - 2]) : "")?.getDay())
    }   

    return (
        <>
            <Modal isOpen={isOpen} isCentered={true} onClose={() => onClose(false)} size={scanned && !isLoading && !isError ? 'full' : 'full'}>
                <ModalContent bg={'grey'}>
                    {!isLoading && !scanned && (
                        <ModalCloseButton size={'large'} onClick={() => onClose(false)} />
                    )}
                    <ModalBody width={'100%'} height={'400px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        {!isLoading && !scanned && (
                            <Box width={'300px'} height={'300px'} bg={'black'}>
                                <Box width={'100%'} height={'100%'}>
                                    <QrcodeScanner
                                        enabled={true}
                                        onResult={(text, result) => handleScanner(text)}
                                        onError={(error) => console.log(error?.message)}
                                    />
                                </Box>
                            </Box>
                        )}
                        {isLoading && (
                            <VStack justifyContent={'center'} w={'100%'} h={'100%'}>
                                <Spinner />
                                <CustomText>Verifing Ticket...</CustomText>
                            </VStack>
                        )} 
                    </ModalBody>
                </ModalContent>
            </Modal>
            <ModalLayout size={"full"} open={open} close={setOpen} >
                {(!isLoading && isError) && (
                    <Box flex={1}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} textAlign={'center'}>An error occured while scanning the ticket</CustomText>
                        <Button onClick={retry} width={'100%'} height={'45px'} color={'white'} bg={'brand.chasescrollButtonBlue'}>Retry</Button>
                    </Box>
                )}
                {(!isLoading && !isError) &&
                    <Ticket close={closeHandler} showQrCode={true} approved={checkEventDay(ticket?.scanTimeStamp ? (ticket?.scanTimeStamp[ticket?.scanTimeStamp?.length - 1]) : "") && (approved || checkPreviousDate())} ticket={ticket as ITicket} />
                }
            </ModalLayout>
        </>
    )
}
