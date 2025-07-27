import { useDetails } from '@/global-state/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { IEventType } from '@/models/Event';
import { IDonationList } from '@/models/donation';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Image, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Spinner, useToast, VStack } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { IoIosClose, IoIosMore } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';
import ModalLayout from '../modal_layout';
import CustomText from '@/components/general/Text';
import { IoClose } from 'react-icons/io5';
import { capitalizeFLetter } from '@/utils/capitalLetter';

interface Props {
    isOrganizer: boolean,
    id: string,
    draft?: boolean,
    isEvent?: boolean,
    donation?: boolean,
    isProduct?: boolean,
    isRental?: boolean,
    isServices?: boolean,
    name: string
}

function DeleteEvent(props: Props) {
    const {
        id,
        isOrganizer,
        isProduct,
        isRental,
        isServices, 
        draft,
        isEvent,
        name,
        donation
    } = props

    const pathname = usePathname()
    const toast = useToast()
    const queryClient = useQueryClient()
    const { userId: user_index } = useDetails((state) => state);

    const {
        secondaryBackgroundColor,
        mainBackgroundColor
    } = useCustomTheme();

    // detete event
    const deleteEvent = useMutation({
        mutationFn: () => httpService.delete((draft ? `/events/delete-draft/${id}` : donation ? `/fund-raiser/${id}?id=${id}` : isEvent  ? `/events/delete-event/${id}` : isServices ?  `/business-service/delete/${id}` : isRental ? `/rental/delete/${id}` : isProduct ? `/products/${id}` : "")),
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
            if (data?.data?.message === "Could not delete event") {
                toast({
                    title: 'Error',
                    description: "Event can't be deleted, someone has registered for this event.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
            } else {

                toast({
                    title: 'Success',
                    description: "Fundraiser Deleted",
                    status: 'success',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
            }
            queryClient.refetchQueries(URLS.GET_DRAFT + "?createdBy=" + user_index)
            queryClient.refetchQueries("/events/drafts")
            queryClient.refetchQueries("donationlist")
            queryClient.refetchQueries("mybusinessservice")
            queryClient.refetchQueries("getMyProduct")
            queryClient.refetchQueries("getMyrental")
            queryClient.refetchQueries("donationlistmy")
            

            queryClient.refetchQueries(URLS.JOINED_EVENT + user_index)
            setOpen(false)
        }
    });

    const [open, setOpen] = useState(false)

    const handleDelete = React.useCallback((e: any) => {
        e.stopPropagation();
        deleteEvent.mutate()
    }, [deleteEvent])

    const openHandler = (item: any) => {
        item.stopPropagation();
        setOpen(true)
    }


    return (
        <>
            {((isOrganizer && !pathname?.includes("past")) || pathname?.includes("draft") || pathname?.includes("mydonation")) && (
                <Flex w={"6"} h={"6"} onClick={openHandler} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"-14px"} right={"-8px"} zIndex={"50"} bg={"#F2A09B66"} color={"#F50A0A"} rounded={"full"} >
                    <IoClose size={"14px"} />
                </Flex>
            )}
            <ModalLayout open={open} close={setOpen} size={"xs"} >
                <VStack width='100%' justifyContent={'center'} p={"4"} height='100%' alignItems={'center'} spacing={3}>
                    <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                    <CustomText fontWeight={"700"} textAlign={'center'} fontSize={'20px'}>Delete {pathname?.includes("mydonation") ? "Fundraising" : isServices ? "Business" : isProduct ? "Product" : isRental ? "Rental" : "Event"}</CustomText>
                    <CustomText textAlign={'center'} fontSize={'14px'} >Are you sure you want to delete <span style={{ fontWeight: "bold" }} >{capitalizeFLetter(name)}</span>, this action cannot be undone.</CustomText>
                    <Button isDisabled={deleteEvent.isLoading} onClick={handleDelete} isLoading={deleteEvent.isLoading} fontSize={"14px"} width='100%' height='42px' bg='red' color="white" variant='solid'>Delete</Button>
                    <Button onClick={() => setOpen(false)} width='100%' height='42px' borderWidth={'0px'} color="grey">Cancel</Button>
                </VStack>
            </ModalLayout>

            {/* <Button onClick={handleDelete} fontSize={pathname?.includes("mydonation") ? "12px" : "14px"} isLoading={deleteEvent.isLoading} color={"red"} isDisabled={deleteEvent.isLoading} bg={"transparent"} px={pathname?.includes("mydonation") ? "3" : "6"} >Delete  {pathname?.includes("mydonation") ? "Fundraising" : "Event"}</Button> */}
        </>
    )
}

export default DeleteEvent
