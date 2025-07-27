import { IEvent } from "@/models/Events";
import {Box, Flex, HStack, useColorMode} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import useCustomTheme from "@/hooks/useTheme";
import UserImage from "@/components/sharedComponent/userimage";
import React from "react";
import BlurredImage from "@/components/sharedComponent/blurred_image";
import EventImage from "@/components/sharedComponent/eventimage";
import CustomText from "@/components/general/Text";
import InterestedUsers from "@/components/sharedComponent/interested_users";
import EventLocationDetail from "@/components/sharedComponent/event_location";
import EventPrice from "../sharedComponent/event_price";

interface IProps {
    event: IEvent;
}

export default function EventCard({event}: IProps) {
    const router = useRouter()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
    const handleClick = () => {
        router.push(`/dashboard/event/details/${event.id}`);
    }
    return (
        <Box onClick={handleClick} alignItems={"center"} flexDirection={"column"} width={"full"} height={'full'} roundedBottom={"24px"} roundedTopLeft={"24px"} shadow={"lg"} p={"12px"} pb={"24px"} bg={secondaryBackgroundColor}>
            <Box width={["full", "full",  "full"]} height={'60%'} overflow={'hidden'}>
                {
                    <EventImage date={false} data={event} searchbar={false} width={"100%"} height={"100%"} />
                }
            </Box>
            <CustomText fontFamily={'DM-Medium'} fontSize={'15px'} textAlign={'center'} marginTop={'10px'} color={primaryColor}>{event?.eventName?.length > 20 ? event?.eventName.substring(0, 20) + '...': event?.eventName}</CustomText>

            <HStack width={'full'} justifyContent={'space-between'}>
                <HStack>
                    <EventLocationDetail iconsize={"16px"} fontWeight={"medium"} fontsize={"13px"} color={"rgba(18, 18, 18, 0.80)"} location={event?.location} locationType={event?.locationType} length={20} />
                </HStack>
                <CustomText fontSize={'12px'} color={primaryColor} fontFamily={'DM-Bold'}>
                    
                <EventPrice
                                    minPrice={event?.minPrice}
                                    maxPrice={event?.maxPrice}
                                    currency={event?.currency}
                                /> 
                             </CustomText>
            </HStack>

            <InterestedUsers fontSize={16} event={event} border={"2px"} size={"25px"} color={primaryColor} />
        </Box>
    )
}