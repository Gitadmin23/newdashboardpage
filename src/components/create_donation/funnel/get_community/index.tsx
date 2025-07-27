import CommunityCard from '@/components/search_component/other_components/community_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import useEventStore from '@/global-state/useCreateEventState';
import useDonationStore from '@/global-state/useDonationState';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { Flex, Box } from '@chakra-ui/react';
import React from 'react'
import { IoClose } from 'react-icons/io5';

interface Props { 
    index: number
}

function GetCommunity(props: Props) {
    const { index } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);


    const { data, updateDontion } = useDonationStore((state) => state)
    const { results, isLoading, ref } = InfiniteScrollerComponent({ url: `/group/group?groupID=${data[index]?.funnelID ? data[index]?.funnelID : ""}`, limit: 10, filter: "id" })

    const clickHandler = () => {
        const clone = [...data]

        clone[index] = {...clone[index], funnelID: ""}

        updateDontion(clone)
    } 

    return (
        <Flex width={["full", "full"]} pb={"5"} flexDirection={"column"} >
            {data[index]?.funnelID && (
                <LoadingAnimation loading={isLoading} >
                    {results?.map((community: any, i: number) => {
                        return (
                            <Box ref={ref} key={i} width={"full"} borderWidth={"1px"} mt={"4"} position={"relative"} px={"3"} shadow={"xl"} roundedBottom={"2xl"} roundedTopLeft={"2xl"} >
                                <Box position={"absolute"} top={"2"} right={"3"} onClick={() => clickHandler()} as='button' >
                                    <IoClose />
                                </Box>
                                <CommunityCard create={true} data={community} />
                            </Box>
                        )
                    })}
                </LoadingAnimation>
            )}
        </Flex>
    )
}

export default GetCommunity
