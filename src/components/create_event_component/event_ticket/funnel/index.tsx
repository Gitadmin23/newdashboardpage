import CreateCommunity from '@/app/olddashboard/communityold/create/page'
import CreateCommunityComponent from '@/components/Community/create_community'
import CommunityCard from '@/components/search_component/other_components/community_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { AddIcon, OpenFolderIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import {Box, Flex, useColorMode} from '@chakra-ui/react'
import React, { useState } from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props { }

function FunnelBtn(props: Props) {
    const { } = props

    const {
        bodyTextColor, 
        secondaryBackgroundColor,
        mainBackgroundColor, 
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const [open, setOpen] = useState(false)

    const [tab, setTab] = useState(0)
    const { userId: user_index } = useDetails((state) => state);

    const { updateEvent, eventdata } = useEventStore((state) => state);

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/group/group?creatorID=${user_index}`, limit: 10, filter: "id" })

    const clickHandler = (item: any) => {
        updateEvent({
            ...eventdata,
            eventFunnelGroupID: item
        })
        setOpen(false)
    } 

    return (
        <>
            <Flex as={"button"} onClick={() => setOpen(true)} fontWeight={"medium"} color={"green.500"} width={"fit-content"} gap={"1"} >
                <OpenFolderIcon />
                Select community funnel
            </Flex>
            <ModalLayout open={open} close={setOpen} size={"full"} title='Communities' bg={mainBackgroundColor} titlecolor={bodyTextColor}   >
                {tab === 0 && (
                    <Flex width={"full"} flexDir={"column"} px={"4"} >
                        <Flex as={"button"} color={bodyTextColor} onClick={()=> setTab(1)} width={"full"} py={"3"} justifyContent={"end"} alignItems={"center"} gap={"3"} pr={"12"} >
                            <AddIcon color={bodyTextColor} />
                            Add community
                        </Flex>
                        <Flex width={"full"} justifyContent={"center"} py={"6"}  >
                            <Flex width={["full", "600px"]} flexDirection={"column"} gap={"4"} >
                                <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                                    {results?.map((community: any, i: number) => {
                                        if (results?.length === i + 1) {
                                            return (
                                                <Box as='button' onClick={() => clickHandler(community?.id)} ref={ref} key={i} width={"full"} borderWidth={"1px"} px={"3"} _hover={{ backgroundColor: colorMode === 'light' ? "#f1f2ff":secondaryBackgroundColor }} roundedBottom={"2xl"} roundedTopLeft={"2xl"} >
                                                    <CommunityCard create={true} data={community} />
                                                </Box>
                                            )
                                        } else {
                                            return (
                                                <Box as='button' onClick={() => clickHandler(community?.id)} key={i} width={"full"} borderWidth={"1px"} px={"3"} _hover={{ backgroundColor:colorMode === 'light' ? "#f1f2ff":secondaryBackgroundColor }} roundedBottom={"2xl"} roundedTopLeft={"2xl"} >
                                                    <CommunityCard create={true} data={community} />
                                                </Box>
                                            )
                                        }
                                    })}
                                </LoadingAnimation>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {tab === 1 && (
                    <CreateCommunityComponent create={true} setTab={setTab} />
                )}
            </ModalLayout>
        </>
    )
}

export default FunnelBtn
