import { Flex } from '@chakra-ui/react'
import EventTicketHeader from './header';
import SelectTicket from './select_ticket';
import SubmitEvent from '../submit_event';
import FunnelBtn from './funnel';
import GetCommunity from './funnel/get_community';
import { useState } from 'react';
import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import CollaboratorBtn from './collaborators';
import { usePathname } from 'next/navigation';

interface IProps {
    promotion?: boolean
}

function EventTicket(props: IProps) {

    const {
        promotion
    } = props

    const [isFree, setIsFree] = useState("")
    const { changeTab } = useEventStore((state) => state);

    const pathname = usePathname()


    return (
        <Flex width={"full"} display={"flex"} flexDirection={"column"} alignItems={"center"} pt={"10"} px={"6"} >
            <Flex width={"full"} maxWidth={["full", "full", "600px"]} flexDirection={"column"} justifyContent={"space-between"} gap={"4"} py={"6"} >
                {!promotion && (
                    <EventTicketHeader type={setIsFree} />
                )}
                <SelectTicket promotion={promotion} type={isFree} />
                <Flex flexDir={["column", "column", "row"]} justifyContent={"space-between"} gap={["4", "4", "0px"]} >
                    {!promotion && (
                        <FunnelBtn />
                    )}
                    {!pathname?.includes("edit_event") && (
                        <>
                            {!promotion && (
                                <CollaboratorBtn btn={true} addCollaborator={true} />
                            )}
                        </>
                    )}
                </Flex>
                <GetCommunity />

                <Flex w={"full"} gap={"4"} my={"4"} >
                    <CustomButton onClick={() => changeTab(1)} text={"Back"} width={"full"} backgroundColor={"#EFF1FE80"} borderRadius={"full"} color={"#5465E0"} />
                    <SubmitEvent promotion={promotion} type={isFree} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default EventTicket
