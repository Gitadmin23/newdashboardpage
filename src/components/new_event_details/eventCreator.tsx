import { IEventType } from '@/models/Event'
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserImage from '../sharedComponent/userimage'
import { usePathname, useRouter } from 'next/navigation'
import { useDetails } from '@/global-state/useUserDetails'
import { formatNumberWithK } from '@/utils/formatNumberWithK'
import ModalLayout from '../sharedComponent/modal_layout'
import Chatcollaborator from './chatcollaborator'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import ChatBtn from '../sharedComponent/chat_btn'
import AddOrRemoveUserBtn from '../sharedComponent/add_remove_user_btn'
import CollaboratorBtn from '../create_event_component/event_ticket/collaborators'
import useCustomTheme from '@/hooks/useTheme'
import InterestedUsers from '../sharedComponent/interested_users'
import PrBtn from './prBtn'

export default function EventCreator(props: IEventType) {

    const {
        collaborators,
        admins,
        acceptedAdmins,
        acceptedCollaborators,
        createdBy,
        id
    } = props

    const [isFriend, setisFriend] = useState(createdBy?.joinStatus)

    const [open, setOpen] = useState(false)

    const router = useRouter()

    const pathname = usePathname();

    const isAdmin = props?.isOrganizer || props?.eventMemberRole === "ADMIN" || props?.eventMemberRole === "COLLABORATOR"
    const { userId: user_index } = useDetails((state) => state);

    const clickHandler = () => {
        if (!user_index) {
            router.push("/share/auth/login?type=EVENT&typeID=" + id)
        } else {
            router.push("/dashboard/profile/" + createdBy?.userId)
        }
    }

    const {
        headerTextColor,
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme();

    return (
        <Flex w={["130px", "fit-content", isAdmin ? "full" : "full"]} gap={"6"} bgColor={[mainBackgroundColor, mainBackgroundColor, secondaryBackgroundColor]} rounded={"64px"} alignItems={["center"]} h={["fit-content", "fit-content", "86px"]} px={["0px", "0px", "4"]} py={["0px", "0px", "3"]} >
            <Flex as={"button"} onClick={clickHandler} position={"relative"} border={"0px solid #CDD3FD"} rounded={"full"} alignItems={"center"} gap={"3"} >
                <Flex width={"fit-content"} position={"relative"} >
                    <Flex display={["none", "flex", "flex"]} >
                        <UserImage border={"1px"} size={"50px"} font={"16px"} image={createdBy?.data?.imgMain?.value} data={createdBy} />
                    </Flex>
                    <Flex display={["flex", "none", "none"]} >
                        <UserImage border={"1px"} size={"32px"} font={"14px"} image={createdBy?.data?.imgMain?.value} data={createdBy} />
                    </Flex> 
                </Flex>
                <Box >
                    <Text textAlign={"left"} display={["none", "block"]} fontWeight={"medium"} >{capitalizeFLetter(createdBy?.firstName) + " " + capitalizeFLetter(createdBy?.lastName)}</Text>
                    <Text textAlign={"left"} display={["block", "none"]} fontWeight={"medium"} fontSize={"12px"} >{textLimit(capitalizeFLetter(createdBy?.firstName) + " " + capitalizeFLetter(createdBy?.lastName), 10)}</Text>
                    <Text textAlign={"left"} mt={"-2px"} fontSize={["13px", "13px", "sm"]} >{createdBy?.username?.includes("@gmail") ? textLimit(createdBy?.username, 4) : textLimit(createdBy?.username, 10)}</Text>
                </Box>
            </Flex>
            <Flex display={["none", "none", "flex"]} ml={["0px", "0px", "auto"]} alignContent={"center"} gap={"3"} >

                <Flex rounded={"64px"} display={["none", "none", createdBy?.userId !== user_index ? "flex" : "none"]} h={"47px"} bgColor={mainBackgroundColor} px={["3", "3", "5", "5"]} py={"12px"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                    {createdBy?.userId !== user_index ? (
                        <Flex color={"#5465E0"} rounded={"32px"} justifyContent={"center"} alignItems={"center"} gap={["3", "3", "3", "3"]} py={"8px"} >
                            <ChatBtn userId={createdBy?.userId ?? ""} />
                            <AddOrRemoveUserBtn icon={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={createdBy?.userId} />
                            {/* <Flex> */}
                            {/* </Flex> */}
                        </Flex>
                    ) :
                        (
                            <>
                                {/* {((collaborators || admins) && !pathname?.includes("pastdetails")) && (
                                <CollaboratorBtn update={true} collaborate={acceptedCollaborators?.length !== 0 || acceptedAdmins?.length !== 0} btn={true} data={props} />
                            )} */}
                            </>
                        )
                    }
                </Flex>
                {props?.attendeesVisibility && (
                    <InterestedUsers fontSize={16} event={props} border={"2px"} size={"38px"} refund={true} />
                )}
            </Flex>

            <ModalLayout open={open} close={setOpen} title='Event Organizers' >
                <Chatcollaborator admins={acceptedAdmins} collaborators={acceptedCollaborators} />
            </ModalLayout>
        </Flex>
    )
}
