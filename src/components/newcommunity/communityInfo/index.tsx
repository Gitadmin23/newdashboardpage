import { useCommunityPageState } from '@/components/Community/chat/state';
import CommunityImage from '@/components/sharedComponent/community_image'
import { DeleteButton, EditButton, ExitButton, PhotoIcon, SettingButton, ShareButton } from '@/components/svg';
import useCustomTheme from '@/hooks/useTheme';
import { Box, Button, Flex, Image, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { useCommunity } from '..';
import PeopleCard from '@/components/search_component/other_components/people_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import MediaTab from './mediaTab';
import { useDetails } from '@/global-state/useUserDetails';
import ShareEvent from '@/components/sharedComponent/share_event';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import CustomText from '@/components/general/Text';
import { textLimit } from '@/utils/textlimit';
import { capitalizeFLetter } from '@/utils/capitalLetter';

interface IProps {
    setTab?: any
}

export default function CommunityInfo({ setTab }: IProps) {

    const { members, loadingMembers, refectingMembers, refMembers, deleteGroup, leaveGroup, activeCommunity } = useCommunity()
    // const { activeCommunity } = useCommunityPageState((state) => state);
    const [open, setOpen] = useState(false)
    const [leave, setLeave] = useState(false)
    const { userId } = useDetails((state) => state);

    const [search, setSearchValue] = useState("")
    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();


    const self = userId === activeCommunity?.creator.userId;


    return (
        <Flex flexDir={"column"} py={"8"} alignItems={"center"} >
            <Box w={"fit-content"} pos={"relative"} >
                <CommunityImage src={activeCommunity?.data?.imgSrc} rounded='36px' size={"97px"} />
                {/* <Box pos={"absolute"} bottom={"2"} right={"0"} >
                    <PhotoIcon />
                </Box> */} 
                {/* <Button width='100%' height='30px' variant={'solid'} isLoading={updateGroup.isLoading} onClick={handleUpdateGroup} >Save</Button> */}
            </Box>
            <Text fontWeight={"700"} fontSize={"18px"} mt={"2"} >{activeCommunity?.data?.name}</Text>
            <Text color={"#2E2B2BB2"} pb={"3"} fontSize={"12px"} >{activeCommunity?.data?.memberCount} Members</Text>

            <Box rounded={"2px"} bg={activeCommunity?.data?.isPublic ? "brand.chasescrollPalePurple" : "#FBCDCD"} fontWeight={"semibold"} color={activeCommunity?.data?.isPublic ? "brand.chasescrollBlue" : "#E90303"} fontSize={"12px"} py={"1"} display={"flex"} justifyContent={"center"} width={"70px"} >
                {activeCommunity?.data?.isPublic ? 'Public' : 'Private'}
            </Box>
            <Flex w={"fit-content"} gap={"3"} py={"6"} >
                {!self && (
                    <Button w={"76px"} bgColor={mainBackgroundColor} h={"64px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"0px"} rounded={"12px"} style={{ boxShadow: "0px 1px 3px 1px #0000001A" }} onClick={() => setLeave(true)} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} >
                        <Flex justifyContent={"center"} alignItems={"center"} w={"30px"} h={"30px"} >
                            <ExitButton />
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"13px"} textAlign={"center"} color={"red"} >Leave</Text>
                    </Button>
                )}
                {self && (
                    <Button w={"76px"} bgColor={mainBackgroundColor} h={"64px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"0px"} rounded={"12px"} style={{ boxShadow: "0px 1px 3px 1px #0000001A" }} onClick={() => setOpen(true)} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} >

                        <Flex justifyContent={"center"} alignItems={"center"} w={"30px"} h={"30px"} >
                            <DeleteButton />
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"13px"} color={"red"} textAlign={"center"} >Delete</Text>
                    </Button>
                )}
                <ShareEvent community={true} type='COMMUNITY' id={activeCommunity?.id} showText={false} />
                {self && (
                    <Button onClick={() => setTab(true)} w={"76px"} bgColor={mainBackgroundColor} h={"64px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"0px"} rounded={"12px"} style={{ boxShadow: "0px 1px 3px 1px #0000001A" }} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} >
                        <Flex justifyContent={"center"} alignItems={"center"} w={"30px"} h={"30px"} >
                            <EditButton />
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"13px"} textAlign={"center"} color={"#5D70F9"} >Edit</Text>
                    </Button>
                )}
            </Flex>
            <Flex w={"full"} rounded={"32px"} maxH={"309px"} overflowY={"auto"} borderWidth={"1px"} p={"4"} borderColor={"#D0D4EB"} flexDir={"column"}  >
                <LoadingAnimation length={members?.length} loading={loadingMembers} refeching={refectingMembers} >
                    {members?.map((person: any, i: number) => {
                        if (members.length === i + 1) {
                            return (
                                <Box key={person?.userId} width={"full"} ref={refMembers} >
                                    <PeopleCard community={true} role={person?.role} search={true} person={person?.user} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box key={person?.userId} width={"full"}>
                                    <PeopleCard community={true} role={person?.role} search={true} person={person?.user} />
                                </Box>
                            )
                        }
                    })}
                </LoadingAnimation>
            </Flex>
            <MediaTab />
            <ModalLayout open={open} close={setOpen} size={"xs"} >
                <Flex width='100%' justifyContent={'center'} height='100%' alignItems={'center'} gap={"3"} p={"5"} flexDir={"column"} >
                    <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                    <CustomText fontFamily='DM-Bold' textAlign={'center'} fontSize={'20px'}>Delete Group</CustomText>
                    <CustomText fontFamily={'DM-Regular'} textAlign={'center'} fontSize={'16px'} color='grey'>Are you sure you want to delete this Group ? this action cannot be undone.</CustomText>

                    <Button isDisabled={deleteGroup?.isLoading} isLoading={deleteGroup?.isLoading} onClick={() => deleteGroup.mutate()} width='100%' height='42px' bg='red' color="white" variant='solid'>Delete</Button>
                    <Button onClick={() => setOpen(false)} width='100%' height='42px' borderWidth={'0px'} color="grey" variant='outline' outlineColor={'lightgrey'}>Cancel</Button>
                </Flex>
            </ModalLayout>
            <ModalLayout open={leave} close={setLeave} size={"xs"} >
                <Flex width='100%' justifyContent={'center'} height='100%' alignItems={'center'} gap={"3"} p={"5"} flexDir={"column"}>
                    <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                    <CustomText fontFamily='DM-Bold' textAlign={'center'} fontSize={'20px'}>Leave Group</CustomText>
                    <CustomText fontFamily={'DM-Regular'} textAlign={'center'} fontSize={'16px'} color='grey'>Are you sure you want to leave this Group ? this action cannot be undone.</CustomText>

                    <Button isDisabled={leaveGroup?.isLoading} isLoading={leaveGroup?.isLoading} onClick={() => leaveGroup.mutate()} width='100%' height='42px' bg='red' color="white" variant='solid'>Leave</Button>
                    <Button onClick={() => setLeave(false)} width='100%' height='42px' borderWidth={'0px'} color="grey" variant='outline' outlineColor={'lightgrey'}>Cancel</Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
