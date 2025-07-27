import CustomText from "@/components/general/Text";
import { INotification } from "@/models/Notifications";
import {
  Box,
  HStack,
  useColorMode,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import useModalStore from "@/global-state/useModalSwitch";
import UserImage from "../sharedComponent/userimage";
import useNotificationHook from "@/hooks/useNotificationHook";
import { textLimit } from "@/utils/textlimit";
import ModalLayout from "../sharedComponent/modal_layout";
import { IoIosClose } from "react-icons/io";
import MyBusiness from "@/Views/dashboard/booking/MyBusiness";
import CustomButton from "../general/Button";
import useApplication from "@/hooks/useApplication";
import GetRental from "../kisok/getRental";

function NotificationCard({ notification }: { notification: INotification }) {

  const router = useRouter();
  const { userId } = useDetails((state) => state);

  const {
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
    headerTextColor,
  } = useCustomTheme();

  const { colorMode } = useColorMode();
  const { setNotifyModal } = useModalStore((state) => state)
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [selectService, setSelectService] = useState<Array<string>>([])
  const [selectRental, setSelectRental] = useState<Array<string>>([])
  const { joinEvent, rejectEvent, markAsRead, setIndex, setStatus, status, joinFundraising, rejectFundraising } = useNotificationHook()

  useEffect(() => {
    setIndex(notification?.id)
    setStatus(notification?.status)
  }, [])


  const { applyForService } = useApplication()
  const handleClick = () => {
    switch (notification.type) {
      case "CHAT": {
        router.push(`/dashboard/chats?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "GROUP_REQUEST_ACCEPTED": {
        router.push(`/dashboard/community?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "EVENT": {
        router.push(`/dashboard/event/details/${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "FRIEND_REQUEST": {
        router.push(`/dashboard/profile/${userId}/network?tab=request`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "GROUP_REQUEST": {
        router.push(`/dashboard/community?tab=request`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "COLLABORATOR_MEMBER_INVITE_ACCEPTED": {
        router.push(`/dashboard/event/details/${notification.typeID}`)
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "ADMIN_MEMBER_INVITE_ACCEPTED": {
        router.push(`/dashboard/event/details/${notification.typeID}`)
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "GROUP": {
        router.push(`/dashboard/community?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        setNotifyModal(false)
        break;
      }
      case "SERVICE_REQUEST": {
        // router.push(`/dashboard/community?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        // setNotifyModal(false)
        setOpen(true)
        break;
      }
      case "RENTAL_REQUEST": {
        // router.push(`/dashboard/community?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        // setNotifyModal(false)
        setShow(true)
        break;
      }
      default: {
        markAsRead.mutate([notification.id]); 
        break;
      }
    }
  };

  console.log(selectService);

  useEffect(() => {
    if (applyForService?.isSuccess) {
      setOpen(false)
      setShow(false)
    }
  }, [applyForService?.isSuccess])


  return (
    <Flex bg={
      status === "UNREAD"
        ? mainBackgroundColor
        : secondaryBackgroundColor
    } w={"full"} py={"3"} borderBottomWidth={"1px"} borderBottomColor={borderColor} gap={"3"}
      as={"button"}
      onClick={handleClick}
    >
      <Flex w={"fit-content"} >
        <UserImage size={"40px"} font={"20px"} border={"2px"} image={notification?.createdBy?.data?.imgMain.value} data={notification?.createdBy} />
      </Flex>
      <Flex alignItems={"start"} textAlign={"left"} flexDir={"column"} >
        <Text textAlign={"left"} fontSize={"14px"} fontWeight={status === "UNREAD" ? "semibold" : "normal"} color={colorMode === "light" ? "brand.chasescrollButtonBlue" : headerTextColor}>
          {(notification.title === "New message" ? status === "UNREAD" ? notification.title + " From " + notification?.createdBy?.firstName + " " + notification.createdBy?.lastName : notification?.createdBy?.firstName + " " + notification.createdBy?.lastName : notification.title)?.replaceAll("Collaborator", "Volunteer")?.replaceAll("collaborator", "Volunteer")?.replaceAll("_", " ")}
        </Text>
        {(notification?.type === "ADMIN_MEMBER_INVITE_REQUEST" || notification?.type === "COLLABORATOR_MEMBER_INVITE_REQUEST") ? (
          <Text textAlign={"left"} fontSize={"12px"} lineHeight={"17px"} whiteSpace="break-spaces">
            {notification.message?.replaceAll("Collaborator", "volunteer")?.replaceAll("collaborator", "volunteer")}
          </Text>
        ) : notification?.type === "EVENT_ROLE_UPDATE" ? (
          <Text textAlign={"left"} fontSize={"12px"} lineHeight={"17px"} whiteSpace="break-spaces">
            {notification.message}
          </Text>
        ) : (
          <Text textAlign={"left"} fontSize={"12px"} lineHeight={"17px"} whiteSpace="break-spaces">
            {textLimit((notification.message)?.replaceAll("New message on chat " + notification?.createdBy?.firstName + " " + notification.createdBy?.lastName, "")?.replaceAll("a pr for", "a PR for"), 70)}
          </Text>
        )}
        <Flex gap={["2", "4", "8"]} mt={"1"} flexDirection={["column", "row", "row"]} alignItems={["start", "start", "center"]} >
          {((notification?.type === "ADMIN_MEMBER_INVITE_REQUEST" || notification?.type === "COLLABORATOR_MEMBER_INVITE_REQUEST" || notification?.type === "EVENT_PR_REQUEST") && status === "UNREAD") && (
            <Flex gap={"3"} >
              <Button isLoading={joinEvent?.isLoading} isDisabled={joinEvent?.isLoading} onClick={() => joinEvent.mutate({
                id: notification.typeID,
                "resolve": true
              })} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: primaryColor }} color={"white"} bgColor={primaryColor} borderWidth={"1px"} borderColor={primaryColor} px={"6"} >Accept</Button>
              <Button isLoading={rejectEvent?.isLoading} isDisabled={rejectEvent?.isLoading} onClick={() => rejectEvent.mutate({
                id: notification?.typeID,
                "resolve": false
              })} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} color={primaryColor} bgColor={mainBackgroundColor} borderWidth={"1px"} borderColor={borderColor} px={"6"} >Decline</Button>
            </Flex>
          )}
          {(notification?.type === "DONATION_COLLABORATOR_REQUEST" && status === "UNREAD") && (
            <Flex gap={"3"} >
              <Button isLoading={joinFundraising?.isLoading} isDisabled={joinFundraising?.isLoading} onClick={() => joinFundraising.mutate({
                id: notification.typeID,
                accepted: true
              })} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: primaryColor }} color={"white"} bgColor={primaryColor} borderWidth={"1px"} borderColor={primaryColor} px={"6"} >Accept</Button>
              <Button isLoading={rejectFundraising?.isLoading} isDisabled={rejectFundraising?.isLoading} onClick={() => rejectFundraising.mutate({
                id: notification?.typeID,
                accepted: false
              })} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} color={primaryColor} bgColor={mainBackgroundColor} borderWidth={"1px"} borderColor={borderColor} px={"6"} >Decline</Button>
            </Flex>
          )}
          {(notification?.type === "SERVICE_REQUEST") && (
            <Flex gap={"3"} >
              <Button onClick={()=> setOpen(true)} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: primaryColor }} color={"white"} bgColor={primaryColor} borderWidth={"1px"} borderColor={primaryColor} px={"6"} >Provide Service</Button>
            </Flex>
          )}
          {(notification?.type === "RENTAL_REQUEST") && (
            <Flex gap={"3"} >
              <Button onClick={()=> setShow(true)} h={"30px"} rounded={"64px"} fontSize={"12px"} w={"fit-content"} outline={"none"} _hover={{ backgroundColor: primaryColor }} color={"white"} bgColor={primaryColor} borderWidth={"1px"} borderColor={primaryColor} px={"6"} >Provide Service</Button>
            </Flex>
          )}
          <CustomText fontSize={"10px"} >
            {moment(notification.createdDate).fromNow(false)}
          </CustomText>
        </Flex>
      </Flex>
      <ModalLayout open={open} close={setOpen} size={["full", "full", "5xl"]} >
        <Flex w={"full"} minH={["100vh", "100vh", "full"]} flexDir={"column"} pos={"relative"} p={"4"} flex={"1"} gap={"4"} >
          <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
            <Text fontSize={"14px"} >Select Your Service</Text>
            <Flex as={"button"} onClick={() => setOpen(false)} >
              <IoIosClose size={"25px"} />
            </Flex>
          </Flex>
          <Flex w={"full"} flexDir={"column"} h={["full", "full", "60vh"]} overflowY={"auto"} >
            <MyBusiness isSelect={true} selected={selectService} setSelected={setSelectService} />
          </Flex>
          <Flex mt={"auto"}  >
            <CustomButton borderRadius={"999px"} width={"130px"} disable={selectService?.length > 0 ? false : true} text={"Apply"} isLoading={applyForService?.isLoading} onClick={() => applyForService?.mutate({
              eventCreatorID: notification?.createdBy?.userId,
              creatorID: userId,
              services: selectService,
              rentals: [],
              eventID: notification?.typeID,
              applicationStatus: "PENDING"
            })} />
          </Flex>
        </Flex>
      </ModalLayout>

      <ModalLayout open={show} close={setShow} size={["full", "full", "5xl"]} >
        <Flex w={"full"} minH={["100vh", "100vh", "full"]} flexDir={"column"} pos={"relative"} p={"4"} flex={"1"} gap={"4"} >
          <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
            <Text fontSize={"14px"} >Select Your Rental</Text>
            <Flex as={"button"} onClick={() => setShow(false)} >
              <IoIosClose size={"25px"} />
            </Flex>
          </Flex>
          <Flex w={"full"} flexDir={"column"} pt={"4"} h={["full", "full", "60vh"]} overflowY={"auto"} >
            <GetRental myrental={true} isSelect={true} selected={selectRental} setSelected={setSelectRental} />
          </Flex>
          <Flex mt={"auto"}  >
            <CustomButton borderRadius={"999px"} width={"130px"} disable={selectService?.length > 0 ? false : true} text={"Apply"} isLoading={applyForService?.isLoading} onClick={() => applyForService?.mutate({
              eventCreatorID: notification?.createdBy?.userId,
              creatorID: userId,
              services: [],
              rentals: selectRental,
              eventID: notification?.typeID,
              applicationStatus: "PENDING"
            })} />
          </Flex>
        </Flex>
      </ModalLayout>
    </Flex>
  );
}

export default NotificationCard;
