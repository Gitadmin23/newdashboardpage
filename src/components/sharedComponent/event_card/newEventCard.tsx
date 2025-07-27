import { IEventType } from '@/models/Event';
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import EventImage from '../eventimage';
import CustomButton from '@/components/general/Button';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { textLimit } from '@/utils/textlimit';
import moment from 'moment';
import InterestedUsers from '../interested_users';
import useCustomTheme from '@/hooks/useTheme';
import { usePathname, useRouter } from 'next/navigation';
import DeleteEvent from '../delete_event';
import { formatNumber } from '@/utils/numberFormat';
import EventPrice from '../event_price';

export default function NewEventCard(props: IEventType) {

    const {
        eventDescription,
        eventName,
        isOrganizer,
        id,
        endDate,
        eventMemberRole
    } = props;

    const {
        primaryColor,
        borderColor,
        secondaryBackgroundColor
    } = useCustomTheme();

    const router = useRouter()
    const pathname = usePathname()

    const [open, setOpen] = useState(false)

    const clickHandler = () => {
        if (pathname?.includes("draft")) {
            router?.push(`/dashboard/event/edit_draft/${id}`)
        } else if (new Date(endDate) < (new Date())) {
            router?.push(`/dashboard/event/pastdetails/${id}`)
        } else {
            router?.push(`/dashboard/event/details/${id}`)
        }
    }

    const openHandler = (item: any) => {
        item.stopPropagation();
        setOpen(true)
    }

    return (
        <Flex as={"button"} onClick={clickHandler} w={"full"} flexDir={["row"]} rounded={"16px"} pos={"relative"} >

            {/* <DeleteEvent draft={pathname?.includes("draft") ? true : false} event={props} /> */}
            <Flex width={["full", "full", "full", "full"]} borderWidth={"1px"} rounded={"16px"} borderColor={borderColor} gap={"3"} flexDirection={["row", "row", "row", "row"]} pos={"relative"} p={"4"} >
                <Flex w={["full", "full", "fit-content", "fit-content"]} >
                    <EventImage data={props} width={["full", "full", "247px", "247px"]} borderWidth='2px' height={["150px", "300px", "170px", "170px"]} />
                </Flex>
                <Flex flexDir={"column"} gap={"2"} textAlign={"left"} height={"fit-content"} my={"auto"} w={["full", "full", "fit-content", "full"]} flex={"1"}  >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Text fontSize={["lg", "lg", "25px"]} lineHeight={["20px", "20px", "30px"]} fontWeight={"semibold"} >{textLimit(capitalizeFLetter(eventName), 20)}</Text>
                        <EventPrice
                            font={["13px", "13px", "14px"]}
                            minPrice={props?.minPrice}
                            maxPrice={props?.maxPrice}
                            currency={props?.currency}
                        />
                    </Flex>
                    <Flex alignItems={"center"} gap={"4"}  >
                        <InterestedUsers fontSize={15} event={props} border={"2px"} size={"30px"} />
                        {/* <SaveOrUnsaveBtn event={props} /> */}
                    </Flex>
                    {/* <Flex>
                        {formatNumber(props?.)}
                    </Flex> */}
                    <Flex gap={"2"} alignItems={"center"} w={"full"} >
                        {props?.startDate && (
                            <Flex flexDir={"column"} fontWeight={"bold"}>
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
                                        {moment(props?.startDate).format("MMM")}
                                    </Text>
                                    <Text fontSize={"28.43px"} mt={"-1"} lineHeight={"37.01px"}>
                                        {moment(props?.startDate).format("D")}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                        <Text fontSize={"14px"} display={["flex", "flex", "none", "none"]} >{textLimit(eventDescription, 100)}</Text>
                        <Text fontSize={"14px"} display={["none", "none", "flex", "flex"]} >{textLimit(eventDescription, 50)}</Text>
                    </Flex>
                </Flex>
                <Flex w={"fit-content"} display={["none", "none", "flex", "flex"]}>
                    <Box w={["50px"]} ml={"auto"}  pos={"relative"} >
                        <Box w={["fit-content"]} position={"relative"} top={"0px"} >
                            {(!isOrganizer && (eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("draft")) && (
                                <CustomButton text={new Date(endDate) < (new Date()) ? "Attended" : pathname?.includes("save") ? "Saved" : pathname?.includes("draft") ? "Draft" : "Attending"} backgroundColor={new Date(endDate) < (new Date()) ? "#FBCDCD" : "#EFF1FE"} transform={["rotate(-90deg)"]} left={["-45px"]} top={["60px"]} position={["relative", "relative", "absolute"]} color={new Date(endDate) < (new Date()) ? "red" : "#5D70F9"} height={"45px"} fontSize={"xs"} width={"140px"} roundedBottom={"4px"} />
                            )}
                            {pathname?.includes("draft") && (
                                <CustomButton text={"Draft"} backgroundColor={"#EFF1FE"} transform={["rotate(-90deg)"]} left={["-45px"]} top={["60px"]} position={["relative", "relative", "absolute"]} color={"#5D70F9"} height={"45px"} fontSize={"xs"} width={"140px"} roundedBottom={"4px"} />
                            )}
                            {((isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR") && !pathname?.includes("draft")) && (
                                <CustomButton text={isOrganizer ? "Organizer" : eventMemberRole === "ADMIN" ? "Admin" : eventMemberRole === "COLLABORATOR" ? "Volunteer" : ""} backgroundColor={new Date(endDate) < (new Date()) ? "#FBCDCD" : "#EFF1FE"} transform={["rotate(-90deg)"]} left={["-45px"]} top={["60px"]} position={["relative", "relative", "absolute"]} color={new Date(endDate) < (new Date()) ? "red" : "#5D70F9"} height={"45px"} fontSize={"xs"} width={"140px"} roundedBottom={"4px"} />
                            )}
                        </Box>
                    </Box>
                </Flex>
                <Flex w={"full"} display={["flex", "flex", "none", "none"]} >
                    <Box w={["full"]} position={"relative"} top={"0px"} >
                        {(!isOrganizer && (eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("draft")) && (
                            <CustomButton text={new Date(endDate) < (new Date()) ? "Attended" : pathname?.includes("save") ? "Saved" : pathname?.includes("draft") ? "Draft" : "Attending"} backgroundColor={new Date(endDate) < (new Date()) ? "#FBCDCD" : "#EFF1FE"} color={new Date(endDate) < (new Date()) ? "red" : "#5D70F9"} height={"45px"} fontSize={"xs"} width={"full"} roundedBottom={"4px"} />
                        )}
                        {pathname?.includes("draft") && (
                            <CustomButton text={"Draft"} backgroundColor={"#EFF1FE"} color={"#5D70F9"} height={"45px"} fontSize={"xs"} width={"full"} roundedBottom={"4px"} />
                        )}
                        {((isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR") && !pathname?.includes("draft")) && (
                            <CustomButton text={isOrganizer ? "Organizer" : eventMemberRole === "ADMIN" ? "Admin" : eventMemberRole === "COLLABORATOR" ? "Volunteer" : ""} backgroundColor={new Date(endDate) < (new Date()) ? "#FBCDCD" : "#EFF1FE"} color={new Date(endDate) < (new Date()) ? "red" : "#5D70F9"} height={"45px"} fontSize={"xs"} width={"full"} roundedBottom={"4px"} />
                        )}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}
