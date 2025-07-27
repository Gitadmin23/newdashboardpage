import PeopleCard from '@/components/search_component/other_components/people_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Button, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SelectTicketType from '../event_modal/select_ticket_type'

interface Props {
    listOfClicks: number,
    data: any,
    ticket: any
}

function ViewClickYser(props: Props) {
    const {
        listOfClicks,
        data,
        ticket
    } = props

    const [open, setOpen] = useState(false)
    const [modalTab, setModalTab] = useState(0)
    const [selectedTicketType, setSelectedTicket] = useState({} as any)

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/events/get-click-through?eventID=${data?.id}&ticketType=${selectedTicketType?.ticketType}`, limit: 10, filter: "id" })

    const DataFormater = (number: number) => {
        if (number > 1000000000) {
            return (number / 1000000000).toString() + 'B';
        } else if (number > 1000000) {
            return (number / 1000000).toString() + 'M';
        } else if (number > 1000) {
            return (number / 1000).toString() + 'K';
        } else {
            return number.toString();
        }
    } 

    // useEffect(()=> {
    //     if(selectedTicketType?.ticketType){
    //         setModalTab(2)
    //     }
    // },[selectedTicketType?.ticketType])

    const clickHandler =()=> {
        setModalTab(0)
        setOpen(true)
    } 

    return (
        <>
            <Button onClick={clickHandler} width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >{DataFormater(listOfClicks)} users Clicked </Button>
            <ModalLayout title={modalTab === 1 ? "Select Ticket Type" : 'List Of Users'} open={open} close={setOpen} >
                {modalTab === 0 &&
                    <SelectTicketType ticket={ticket} setSelectedTicket={setSelectedTicket} currency={data?.currency} click={setModalTab} />
                }
                {modalTab === 1 && (
                    <Flex width={"full"} px={"4"} pt={"6"} pb={"6"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                        <LoadingAnimation length={results?.length} loading={isLoading} refeching={isRefetching} >
                            {results?.map((person: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={person?.lastModifiedBy?.userId} width={"full"} ref={ref} >
                                            <PeopleCard block={true} person={person?.lastModifiedBy} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={person?.userId} width={"full"}>
                                            <PeopleCard block={true} person={person} />
                                        </Box>
                                    )
                                }
                            })}
                        </LoadingAnimation>
                    </Flex>
                )}
            </ModalLayout>
        </>
    )
}

export default ViewClickYser
