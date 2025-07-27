import EventLocationDetail from "@/components/sharedComponent/event_location";
import EventImage from "@/components/sharedComponent/eventimage";
import SaveOrUnsaveBtn from "@/components/sharedComponent/save_unsave_event_btn";
import { dateFormat } from "@/utils/dateFormat";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import EventPrice from "../event_price";
import DeleteEvent from "../delete_event";
import useEventStore from "@/global-state/useCreateEventState";
import InterestedUsers from "../interested_users";
import ShareEvent from "../share_event";
import useSearchStore from "@/global-state/useSearchData";
import { useDetails } from "@/global-state/useUserDetails";
import BlurredImage from "../blurred_image";
import useCustomTheme from "@/hooks/useTheme";
import moment from "moment";
import { textLimit } from "@/utils/textlimit";
import ModalLayout from "../modal_layout";
import CustomButton from "@/components/general/Button";
import ViewTicket from "@/components/event_details_component/event_modal/view_ticket";
import { capitalizeFLetter } from "@/utils/capitalLetter";

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
    upcoming?: boolean
}

function ExploreEventCard(props: Props) {
    const {
        event,
        page,
        draft,
        my_event,
        search,
        searchbar,
        date,
        profile,
        past,
        dashboard,
        landing,
        limit,
        eventdashboard,
        landingcolor,
        upcoming
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

    const [showModal, setShowModal] = useState(false)

    const viewTicket = (event: any) => {
        event.stopPropagation();
        setShowModal((prev) => !prev)
    }

    // useEffect(()=> {
    //     setSearchValue("");
    // }, [])

    return (
        <Flex
            // boxShadow={page ? "md" : "none"}
            cursor={"pointer"}
            bg={secondaryBackgroundColor}
            onClick={clickHandler}
            py={searchbar ? ((landing || upcoming) ? "0px" : "2") : upcoming ? "0px" : ["6", "6", "4"]}
            roundedBottom={"32px"}
            roundedTopLeft={"32px"}
            borderColor={borderColor}
            color={landingcolor ? "black" : headerTextColor}
            borderBottomWidth={searchbar ? " " : "0.5px"}
            width={"full"}
            height={"full"}
            position={"relative"}
        >
            <Flex
                flexDirection={[searchbar ? "row" : "column", searchbar ? "row" : "column", page ? "column" : "row"]}
                width={"full"}
                alignItems={"center"}
                color={landingcolor ? "black" : ""}
            >
                <Box position={"relative"} width={[searchbar ? "fit-content" : "full", searchbar ? "fit-content" : "full", page ? "full" : "fit-content"]}>
                    {page ? (
                        <BlurredImage
                            height={
                                searchbar
                                    ? "100px"
                                    : [
                                        "230px",
                                        "230px",
                                        page ? "220px" : my_event ? "180px" : "150px",
                                    ]
                            }
                            image={event?.currentPicUrl}
                        />
                    ) : (
                        <EventImage
                            date={date}
                            data={event}
                            searchbar={searchbar}
                            width={searchbar ? "110px" : ["full", "full", page ? "full" : "230px"]}
                            height={
                                searchbar
                                    ? "100px"
                                    : [
                                        "230px",
                                        "230px",
                                        page ? "220px" : my_event ? "180px" : "150px",
                                    ]
                            }
                        />
                    )}
                    {(landing && !upcoming && token) && (
                        <Flex rounded={"full"} zIndex={"50"} p={"2"} shadow={"lg"} backgroundColor={secondaryBackgroundColor} position={"absolute"} bottom={"5"} right={"5"} >
                            <SaveOrUnsaveBtn color={headerTextColor} event={event} />
                        </Flex>
                    )}
                </Box>
                {(!landing && !eventdashboard && !upcoming) && (
                    <Box
                        width={
                            searchbar ? "full" : ["full", "full", page ? "full" : "full"]
                        }
                        px={searchbar ? "2" : "4"}
                        mt={["10px", "10px", page ? "10px" : "0px", page ? "10px" : "0px"]}
                        ml={searchbar ? "2" : ["0px", "0px", page ? "0px" : "10px", page ? "0px" : "10px"]}
                    >
                        <Flex
                            fontWeight={"semibold"}
                            width={"full"}
                            flexDir={"column"}
                            justifyContent={"space-between"}
                            borderBottomColor={"#D0D4EB"}
                            borderBottom={search ? "1px" : "0px"}
                            pb={"1"}
                        >
                            <Text fontSize={searchbar ? ["14px", "14px", "14px"] : "18px"}>
                                {event.eventName?.length >= 17
                                    ? event.eventName.slice(0, 13) + "..."
                                    : event.eventName}
                            </Text>
                            <Box fontSize={searchbar ? ["13px", "13px", "14px"] : "14px"}>
                                <EventPrice
                                    font={["13px", "13px", "13px"]}
                                    minPrice={event?.minPrice}
                                    maxPrice={event?.maxPrice}
                                    currency={event?.currency}
                                />
                            </Box>
                        </Flex>
                        {!date && (
                            <Flex
                                alignItems={"center"}
                                width={"full"}
                                mt={searchbar ? "4px" : "10px"}
                                mb={"4px"}
                                gap={"1"}
                            >
                                <Box width={"fit-content"}>
                                    <Box
                                        width={searchbar ? "16px" : "20px"}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <IoCalendarOutline size={searchbar ? "16px" : "20px"} />
                                    </Box>
                                </Box>
                                <Text
                                    color={landingcolor ? "black" : colorMode === "light" ? "gray.600" : bodyTextColor}
                                    fontSize={searchbar ? "13px" : "16px"}
                                    fontWeight={"medium"}
                                >
                                    {dateFormat(event.startDate)}
                                </Text>
                            </Flex>
                        )}
                        {!eventdashboard && (
                            <Flex
                                alignItems={"center"}
                                width={"full"}
                                pb={"1"}
                                gap={"3"}
                                justifyContent={"space-between"}
                            >
                                <EventLocationDetail
                                    landingcolor={landingcolor}
                                    iconsize={searchbar ? "16px" : "20px"}
                                    fontWeight={"medium"}
                                    fontsize={searchbar ? "13px" : page ? "14px" : "16px"}
                                    color={landingcolor ? "black" : "rgba(18, 18, 18, 0.80)"}
                                    location={event?.location}
                                    locationType={event?.locationType}
                                    isLimited={true}
                                    height="fit-content"
                                    length={25}
                                />
                                {(!draft && !profile && !my_event && !searchbar) && (
                                    <Flex alignItems={"center"} gap={"3"}>
                                        <ShareEvent
                                            data={event}
                                            type="EVENT"
                                            size="18px"
                                            id={event?.id}
                                        />
                                        {userId && email && !past && (
                                            <SaveOrUnsaveBtn color={headerTextColor} event={event} />
                                        )}
                                    </Flex>
                                )}
                                {my_event &&
                                    !profile &&
                                    event?.isOrganizer &&
                                    !event?.isBought && <DeleteEvent draft={draft} event={event} />}
                                {draft && <DeleteEvent draft={draft} event={event} />}
                            </Flex>
                        )}
                        {page && (
                            <>
                                {event?.attendeesVisibility && (
                                    <InterestedUsers
                                        fontSize={14}
                                        event={event}
                                        border={"2px"}
                                        size={"28px"}
                                    />
                                )}
                            </>
                        )}

                        {(my_event || past) && (
                            <Flex flexDir={"column"} gap={"2"} w={["full", "full", "fit-content", "fit-content"]} >
                                <Text fontSize={["lg", "lg", "32px"]} fontWeight={"semibold"} >{textLimit(capitalizeFLetter(event?.eventName), 20)}</Text>
                                <Box  >
                                    <InterestedUsers fontSize={15} event={event} border={"2px"} size={"30px"} />
                                </Box>
                                <Flex minW={["100px", "100px", "150px"]} gap={"2"} alignItems={"center"} maxW={["full", "full", "200px", "200px"]} >
                                    <Flex w={"fit-content"} flexDir={"column"} fontWeight={"bold"}>
                                        <Flex
                                            width={"50px"}
                                            flexDir={"column"}
                                            py={"2px"}
                                            borderWidth={"1px"}
                                            alignItems={"center"}
                                            roundedBottom={"2xl"}
                                            roundedTopLeft={"2xl"}
                                        >
                                            <Text
                                                fontSize={"11.37px"}
                                                lineHeight={"14.81px"}
                                                color={"#3D37F1"}
                                            >
                                                {moment(event?.startDate).format("MMM")}
                                            </Text>
                                            <Text fontSize={"28.43px"} mt={"-1"} lineHeight={"37.01px"}>
                                                {moment(event?.startDate).format("D")}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Text fontSize={"14px"} display={["flex", "flex", "none", "none"]} >{textLimit(event.eventDescription, 100)}</Text>
                                    <Text fontSize={"14px"} display={["none", "none", "flex", "flex"]} >{textLimit(event.eventDescription, 50)}</Text>
                                </Flex>
                            </Flex>
                        )}
                    </Box>
                )}
                {(landing && !upcoming) && (
                    <Flex flexDir={"column"} w={"full"} height={"full"} px={"4"} pt={"6"}>
                        <Flex
                            w={"full"}
                            gap={"4"}
                            py={"1"}
                            pb={"4"}
                            alignItems={"center"}
                        >
                            <Flex w={"fit-content"} flexDir={"column"} fontWeight={"bold"}>
                                <Flex
                                    width={"50px"}
                                    flexDir={"column"}
                                    py={"2px"}
                                    borderWidth={"1px"}
                                    alignItems={"center"}
                                    roundedBottom={"2xl"}
                                    roundedTopLeft={"2xl"}
                                >
                                    <Text
                                        fontSize={"11.37px"}
                                        lineHeight={"14.81px"}
                                        color={"#3D37F1"}
                                    >
                                        {moment(event?.startDate).format("MMM")}
                                    </Text>
                                    <Text fontSize={"28.43px"} mt={"-1"} lineHeight={"37.01px"}>
                                        {moment(event?.startDate).format("D")}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex w={"full"} flexDir={"column"}>
                                <Text lineHeight={"24px"} fontWeight={"700"} textAlign={"left"}>
                                    {textLimit(event?.eventName, limit ? 30 : 16)}
                                </Text>
                                <Text fontSize={"14px"}>
                                    {textLimit(event?.eventDescription, limit ? 70 : 35)}
                                </Text>
                            </Flex>
                            {/* {eventdashboard && ( */}
                                <Box width={"fit-content"} >
                                    <ShareEvent
                                        data={event}
                                        type="EVENT"
                                        // size="18px"
                                        showText={false}
                                        id={event?.id}
                                    />
                                </Box>
                            {/* )} */}
                        </Flex>
                        <Flex
                            w={"full"}
                            h={"40px"}
                            mt={"auto"}
                            pt={"2"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            borderTopWidth={"1px"}
                            borderTopColor={borderColor}
                        >
                            {event?.attendeesVisibility && (
                                <InterestedUsers
                                    fontSize={16}
                                    color={["white", "white", "#1732F7", "#1732F7", "#1732F7"]}
                                    event={event}
                                    border={"2px"}
                                    size={"32px"}
                                />
                            )}
                            <Flex ml={"auto"}>
                                <EventPrice
                                    minPrice={event?.minPrice}
                                    maxPrice={event?.maxPrice}
                                    currency={event?.currency}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {(!landing && upcoming) && (
                    <Flex flexDir={"column"} w={"full"} height={"full"} px={"4"} pb={"4"} pt={"4"}>
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
                                    width={"60px"}
                                    flexDir={"column"}
                                    py={"4px"}
                                    bgColor={"#5D70F9"}
                                    alignItems={"center"}
                                    roundedBottom={"20px"}
                                    roundedTopLeft={"20px"}
                                    color={"white"}
                                >
                                    <Text fontSize={"28.43px"} lineHeight={"37.01px"}>
                                        {moment(event?.startDate).format("D")}
                                    </Text>
                                    <Text
                                        fontSize={"11.37px"}
                                        lineHeight={"14.81px"}
                                        mt={"-1"}
                                    >
                                        {moment(event?.startDate).format("MMM")}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex w={"fit-content"} flexDir={"column"}>
                                <Text lineHeight={"24px"} fontWeight={"700"} textAlign={"left"}>
                                    {textLimit(event?.eventName, limit ? 30 : 16)}
                                </Text>
                                <Text fontSize={"14px"}>

                                    <EventLocationDetail
                                        landingcolor={landingcolor}
                                        iconsize={"17px"}
                                        fontWeight={"medium"}
                                        fontsize={"14px"}
                                        height="auto"
                                        color={landingcolor ? "black" : "rgba(18, 18, 18, 0.80)"}
                                        location={event?.location}
                                        locationType={event?.locationType}
                                        isLimited={true}
                                    />
                                </Text> 
                            </Flex>
                            {eventdashboard && (
                                <Box width={"fit-content"} >
                                    <Text color={primaryColor} display={["block", "block", "block", "none", "none"]} fontWeight={"600"} fontSize={"14px"} >

                                        <EventPrice
                                            minPrice={event?.minPrice}
                                            maxPrice={event?.maxPrice}
                                            currency={event?.currency}
                                        />
                                    </Text>
                                    <Box display={["none", "none", "none", "block", "block"]} >
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
                                </Box>
                            )}
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
                            // mt={"auto"}
                            // pt={"2"}

                            justifyContent={"space-between"}
                            alignItems={"center"}
                        // borderTopWidth={"1px"}
                        // borderTopColor={"#EFF1FE"}
                        >
                            <CustomButton borderColor={primaryColor} borderWidth={"1px"} backgroundColor={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? "white" : primaryColor} color={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? primaryColor : "white"} text={((event?.minPrice === 0 && event?.maxPrice === 0) || (!event?.minPrice && !event?.maxPrice)) ? "Register" : "Buy Ticket"} width={["full", "full", "full", "130px", "130px"]} height={"45px"} fontSize={"sm"} borderRadius={"full"} />
                            {/* <Flex gap={"4"} display={["none", "none", "none", "flex", "flex"]}
                                pr={"3"}  >
                                <SaveOrUnsaveBtn color={headerTextColor} event={event} />

                                <ShareEvent
                                    data={event}
                                    type="EVENT"
                                    // size="18px"
                                    showText={false}
                                    id={event?.id}
                                />
                            </Flex> */}
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
            <ModalLayout size={["md", "md", "3xl"]} open={showModal} close={setShowModal} >
                <ViewTicket
                    user_index={userId}
                    click={viewTicket}
                    data={event} />
            </ModalLayout>
        </Flex>
    );
}

export default ExploreEventCard;
