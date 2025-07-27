import CustomText from "@/components/general/Text";
import { INotification } from "@/models/Notifications";
import {
  Avatar,
  Box,
  HStack,
  VStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import { IMAGE_URL, URLS } from "@/services/urls";
import { useRouter } from "next/navigation";
import { useDetails } from "@/global-state/useUserDetails";
import { useMutation, useQueryClient } from "react-query";
import httpService from "@/utils/httpService";
import { User } from "iconsax-react";
import useCustomTheme from "@/hooks/useTheme";

function NotificationCard({ notification }: { notification: INotification }) {
  const router = useRouter();
  const { userId } = useDetails((state) => state);
  const queryClient = useQueryClient();

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
    headerTextColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const markAsRead = useMutation({
    mutationFn: (data: string[]) =>
      httpService.put(
        `${URLS.MARK_NOTIFICATIONS_AS_READ}?notificationIDs=${data}&read=true`,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getNotifications"]);
    },
    onError: () => {},
  });

  const handleClick = () => {
    switch (notification.type) {
      case "CHAT": {
        router.push(`/dashboard/chats?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        break;
      }
      case "EVENT": {
        router.push(`/dashboard/event/details/${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        break;
      }
      case "FRIEND_REQUEST": {
        router.push(`/dashboard/profile/${userId}/network?tab=request`);
        markAsRead.mutate([notification.id]);
        break;
      }
      case "GROUP_REQUEST": {
        router.push(`/dashboard/community?tab=request`);
        markAsRead.mutate([notification.id]);
        break;
      }
      case "GROUP": {
        router.push(`/dashboard/community?activeID=${notification.typeID}`);
        markAsRead.mutate([notification.id]);
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <HStack
      onClick={handleClick}
      alignItems={"center"}
      spacing={0}
      justifyContent={"space-between"}
      width="100%"
      height={"auto"}
      paddingY={"10px"}
      borderBottomWidth={"1px"}
      borderBottomColor={borderColor}
      paddingX="10px"
      bg={
        notification.status === "UNREAD"
          ? mainBackgroundColor
          : secondaryBackgroundColor
      }
    >
      <Box
        width="32px"
        height="32px"
        borderRadius={"36px 0px 36px 36px"}
        borderWidth={"1px"}
        borderColor={borderColor}
        overflow={"hidden"}
      >
        {notification?.createdBy?.data !== null &&
          !notification?.createdBy?.data?.imgMain?.value === null && (
            <VStack
              width="100%"
              height="100%"
              color="red"
              justifyContent={"center"}
              alignItems="center"
            >
              <CustomText
                color={bodyTextColor}
                fontSize={"18px"}
                fontFamily={"DM-Bold"}
              >
                {notification?.createdBy?.firstName[0].toUpperCase()}{" "}
                {notification?.createdBy?.lastName[0].toUpperCase()}
              </CustomText>
            </VStack>
          )}
        {notification?.createdBy?.data !== null &&
          notification?.createdBy?.data?.imgMain?.value !== null && (
            <>
              {notification?.createdBy?.data.imgMain.value.startsWith(
                "https://",
              ) && (
                <Image
                  alt="img"
                  src={`${notification?.createdBy?.data?.imgMain?.value}`}
                  width="100%"
                  height={"100%"}
                  objectFit={"cover"}
                />
              )}

              {!notification?.createdBy?.data.imgMain.value.startsWith(
                "https://",
              ) && (
                <Image
                  alt="img"
                  src={`${IMAGE_URL}${notification?.createdBy?.data?.imgMain?.value}`}
                  width="100%"
                  height={"100%"}
                  objectFit={"cover"}
                />
              )}
            </>
          )}
        {notification.createdBy.data === null && (
          <VStack
            width="100%"
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <User size={"20px"} variant="Outline" />
          </VStack>
        )}
      </Box>
      <VStack
        alignItems={"flex-start"}
        spacing={0}
        width="70%"
        flexWrap={"wrap"}
        paddingX="10px"
      >
        <CustomText
          fontSize={"14px"}
          fontFamily={"DM-Medium"}
          color={
            colorMode === "light"
              ? "brand.chasescrollButtonBlue"
              : headerTextColor
          }
        >
          {notification.title}
        </CustomText>
        <CustomText fontSize={"14px"} fontFamily={"DM-Regular"} width="100%">
          {notification.message.length > 50
            ? notification.message.substring(0, 50) + "..."
            : notification.message}
        </CustomText>
      </VStack>
      <CustomText fontSize={"12px"} fontFamily={"DM-Regular"}>
        {moment(notification.createdDate).fromNow(false)}
      </CustomText>
    </HStack>
  );
}

export default NotificationCard;
