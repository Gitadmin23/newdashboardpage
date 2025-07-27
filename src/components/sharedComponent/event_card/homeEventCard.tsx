import CustomButton from '@/components/general/Button';
import { ViewTicket } from '@/components/svg';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { dateFormat } from '@/utils/dateFormat';
import { textLimit } from '@/utils/textlimit';
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import moment from 'moment';
import email from 'next-auth/providers/email';
import React, { useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5';
import BlurredImage from '../blurred_image';
import DeleteEvent from '../delete_event';
import EventLocationDetail from '../event_location';
import EventPrice from '../event_price';
import EventImage from '../eventimage';
import InterestedUsers from '../interested_users';
import ModalLayout from '../modal_layout';
import SaveOrUnsaveBtn from '../save_unsave_event_btn';
import ShareEvent from '../share_event';
import useSearchStore from '@/global-state/useSearchData';
import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';


interface Props {
    event: any;
    page?: boolean;
    draft?: boolean;
    search?: boolean;
    my_event?: boolean;
    searchbar?: boolean;
    date?: boolean;
    profile?: boolean;
    past?: boolean;
    dashboard?: boolean;
    eventdashboard?: boolean;
    landing?: boolean;
    limit?: boolean,
    landingcolor?: boolean,
    upcoming?: boolean,
    mobile?: boolean
}

export default function HomeEventCard(props: Props) {

    const {
        event,
        page,
        draft,
        searchbar,
        past,
        dashboard,
        limit,
        landingcolor,
        upcoming,
        mobile
    } = props;

    const router = useRouter();
    const { setSearchValue } = useSearchStore((state) => state);

    const { userId, email } = useDetails((state) => state);

    let token = localStorage.getItem("token");

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor,
    } = useCustomTheme();

    const { colorMode } = useColorMode();

    const clickHandler = () => {
        if (draft) {
            router.push("/dashboard/event/edit_draft/" + event?.id);
        } else if (dashboard) {
            router.push("/dashboard/settings/event-dashboard/" + event?.id);
        } else if (past) {
            router.push("/dashboard/event/pastdetails/" + event?.id);
        } else if (token) {
            router.push("/dashboard/event/details/" + event?.id);
        } else if (!userId && !email) {
            sessionStorage.setItem("clicked", "true") + "";
            router.push("/event/" + event?.id);
        } else {
            router.push("/dashboard/event/details/" + event?.id);
        }
    };

    return (
        <>
            {mobile && (
                <Flex w={"full"} h={"400px"} position={"relative"} roundedBottom={"16px"} roundedTopLeft={"16px"} >
                    <EventImage
                        data={event}
                        searchbar={searchbar}
                        width={"full"}
                        height={"100%"}
                        rounded='16px'
                        borderWidth='1px'
                    />
                    <Flex position={"absolute"} inset={"0px"} bg={"linear-gradient(183.36deg, rgba(0, 0, 0, 0) -23.28%, rgba(0, 0, 0, 0.3) 36.57%)"} zIndex={"10"} roundedBottom={"16px"} roundedTopLeft={"16px"} />
                    <Flex position={"absolute"} flexDir={"column"} bottom={"0px"} zIndex={"20"} w={"full"} insetX={"0px"} roundedBottom={"16px"} >
                        <Flex backdropFilter={"blur(4px)"} w={"full"} justifyContent={"space-between"} py={"2"} px={"4"} >
                            <Flex w={"fit-content"} color={"white"} flexDir={"column"}>
                                <Text fontWeight={"500"} textAlign={"left"}>
                                    {textLimit(event?.eventName, limit ? 30 : 16)}
                                </Text>
                                <Text fontSize={"14px"}>
                                    <EventLocationDetail
                                        landingcolor={landingcolor}
                                        iconsize={"17px"}
                                        fontWeight={"medium"}
                                        fontsize={"14px"}
                                        height="auto"
                                        color={"white"}
                                        location={event?.location}
                                        locationType={event?.locationType}
                                        isLimited={true}
                                        length={25}
                                    />
                                </Text>
                            </Flex>
                            <InterestedUsers refund={true} border='1px' event={event} size={"36px"} fontSize={16} />
                        </Flex>
                        <Flex roundedBottom={"16px"} w={"full"} h={"64px"} bg={primaryColor} px={"4"} justifyContent={"space-between"} alignItems={"center"} >
                            <CustomButton onClick={() => router.push("/dashboard/event/details/" + event?.id)} borderColor={"white"} borderWidth={"1px"} backgroundColor={primaryColor} color={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? "white" : "white"} text={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? "Register" : "Buy Ticket"} width={["130px", "130px"]} height={"45px"} fontSize={"sm"} borderRadius={"full"} />
                            <Flex gap={"4"} alignItems={"center"}  bgColor={"#ffffffce"} p={"2"} rounded={"full"} justifyContent={"center"} >
                                {/* <SaveOrUnsaveBtn color={"white"} event={event} /> */}

                                <ShareEvent
                                    data={event}
                                    type="EVENT"
                                    // size="18px"
                                    color={primaryColor}
                                    showText={false}
                                    id={event?.id}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            )}
            {!mobile && (
                <Flex
                    cursor={"pointer"}
                    bg={mainBackgroundColor}
                    onClick={clickHandler}
                    p={"3"}
                    roundedBottom={"32px"}
                    roundedTopLeft={"32px"}
                    borderColor={borderColor}
                    color={landingcolor ? "black" : headerTextColor}
                    borderWidth={"1px"}
                    width={"full"}
                    height={"full"}
                    position={"relative"}
                >
                    <Flex
                        flexDirection={[searchbar ? "row" : "column", searchbar ? "row" : "column", page ? "column" : "row"]}
                        width={"full"}
                        alignItems={"center"}
                        position={"relative"}
                        color={landingcolor ? "black" : ""}
                    >
                        <Box position={"relative"} width={[searchbar ? "fit-content" : "full", searchbar ? "fit-content" : "full", page ? "full" : "fit-content"]}>
                            <EventImage
                                // date={date}
                                data={event}
                                searchbar={searchbar}
                                width={searchbar ? "110px" : ["full", "full", page ? "full" : "230px"]}
                                height={"165px"}
                                borderWidth='1px'
                            />
                            <Flex p={"2"} rounded={"full"} bgColor={"#ffffffce"} justifyContent={"center"} alignItems={"center"} position={"absolute"} bottom={"4"} right={"4"} >
                                <ShareEvent
                                    data={event}
                                    type="EVENT"
                                    // size="18px"
                                    color={primaryColor}
                                    showText={false}
                                    id={event?.id}
                                />
                            </Flex>
                        </Box>
                        {(upcoming) && (
                            <Flex flexDir={"column"} w={"full"} height={"full"} pb={"1"} pt={2} >
                                <Flex
                                    w={"full"}
                                    gap={"2"}
                                    py={"1"}
                                    pb={"4"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                >
                                    <Flex w={"fit-content"} position={"absolute"} top={"4"} right={"4"} flexDir={"column"} zIndex={"20"} fontWeight={"bold"}>
                                        <Flex
                                            width={"50px"}
                                            flexDir={"column"}
                                            py={"4px"}
                                            bgColor={"#5D70F9"}
                                            alignItems={"center"}
                                            roundedBottom={"20px"}
                                            roundedTopLeft={"20px"}
                                            color={"white"}
                                        >
                                            <Text fontSize={"16px"}>
                                                {moment(event?.startDate).format("D")}
                                            </Text>
                                            <Text
                                                fontSize={"12px"}
                                                mt={"-1"}
                                            >
                                                {moment(event?.startDate).format("MMM")}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex alignItems={"center"} w={"full"} justifyContent={"space-between"} gap={"3"} >
                                        <Flex w={"fit-content"} flexDir={"column"}>
                                            <Text fontWeight={"500"} textAlign={"left"}>
                                                {textLimit(event?.eventName, limit ? 30 : 16)}
                                            </Text>
                                            <Text fontSize={"14px"}>
                                                <EventLocationDetail
                                                    // landingcolor={landingcolor}
                                                    iconsize={"17px"}
                                                    fontWeight={"medium"}
                                                    fontsize={"14px"}
                                                    height="auto"
                                                    color={landingcolor ? headerTextColor :headerTextColor}
                                                    location={event?.location}
                                                    locationType={event?.locationType}
                                                    isLimited={true}
                                                    length={25}
                                                />
                                            </Text>
                                        </Flex>
                                        <InterestedUsers refund={true} border='1px' event={event} size={"36px"} fontSize={16} />
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} justifyContent={"space-between"} gap={"4"} pb={"2"} display={["flex", "flex", "flex", "none", "none"]}  >

                                    <Box width={"fit-content"}  >
                                        {event?.attendeesVisibility && (
                                            <InterestedUsers
                                                fontSize={16}
                                                // color={["#1732F7", "#1732F7", "#1732F7", "#1732F7", "#1732F7"]}
                                                event={event}
                                                border={"2px"}
                                                size={"32px"}
                                                refund={true}
                                            />
                                        )}
                                    </Box>
                                    <Flex gap={"4"} alignItems={"center"} >
                                        <SaveOrUnsaveBtn color={headerTextColor} event={event} />

                                        <ShareEvent
                                            data={event}
                                            type="EVENT"
                                            // size="18px"
                                            showText={false}
                                            id={event?.id}
                                        />
                                    </Flex>
                                </Flex>
                                <Flex
                                    w={"full"}
                                    h={"auto"}

                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                >
                                    <CustomButton borderColor={primaryColor} borderWidth={"1px"} backgroundColor={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? "white" : primaryColor} color={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? primaryColor : "white"} text={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? "Register" : "Buy Ticket"} width={["full", "full", "full", "130px", "130px"]} height={"45px"} fontSize={"sm"} borderRadius={"full"} />

                                    <Text color={primaryColor} display={["none", "none", "none", "block", "block"]} fontWeight={"600"} fontSize={"14px"} >
                                        <EventPrice
                                            minPrice={event?.minPrice}
                                            maxPrice={event?.maxPrice}
                                            currency={event?.currency}
                                        />
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                    {/* <ModalLayout size={["md", "md", "3xl"]} open={showModal} close={setShowModal} >
            <ViewTicket
                user_index={userId}
                click={viewTicket}
                data={event} />
        </ModalLayout> */}
                </Flex>
            )}
        </>
    )
}
