import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import {Box, Flex, Text, useColorMode, useToast} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import {  } from 'next/router';
import React from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import useCustomTheme from "@/hooks/useTheme";
// import EventTermAndCondition from '@/components/new_event_details/eventTermAndCondition';

interface IProps {
    name?: string
}

function CreateEventHeader({ name }: IProps) {

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { eventdata, changeTab, image, tab } = useEventStore((state) => state);

    const toast = useToast()

    const pathname = usePathname();

    const router = useRouter()

    const getValidationInfoClick = () => {
        if (pathname?.includes("edit_event_data")) {
            toast({
                description: "Complete all fields in the information section to continue.",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else {
            if (!eventdata?.startDate) {
                toast({
                    description: "Complete all fields in the information section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.endDate) {
                toast({
                    description: "Complete all fields in the information section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (eventdata?.startDate > eventdata?.endDate) {
                toast({
                    description: "Complete all fields in the information section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.location?.toBeAnnounced) {
                if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                    toast({
                        description: "Complete all fields in the information section to continue.",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    });
                    return
                } else {
                    changeTab(2)
                }
            } else {
                changeTab(2)
            }
        }
    }

    const clickHandler = () => {
        // if (pathname?.includes("edit_event_data")) {
        //     toast({
        //         description: "You can only edit the information tab because users have already bought this event",
        //         status: 'error',
        //         isClosable: true,
        //         duration: 5000,
        //         position: 'top-right',
        //     });
        //     return
        // } else {
            changeTab(0)
        // }
    }

    const getValidationThemeClick = (item?: number) => {
        if (!pathname?.includes("edit_event_data")) {
            if (!eventdata?.eventName) {
                toast({
                    description: "Complete all fields in the Themes section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventType) {
                toast({
                    description: "Complete all fields in the Themes section to continue.e",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventDescription) {
                toast({
                    description: "Complete all fields in the Themes section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!image && !eventdata?.currentPicUrl) {
                toast({
                    description: "Complete all fields in the Themes section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                if(item === 1){
                    changeTab(1)
                } else{
                    getValidationInfoClick()
                }
            }
        }
    }

    const statusHandler =(item: number)=> {
        if(tab === 0) { 
            getValidationThemeClick(item)
        } else if(tab === 2) {
            getValidationThemeClick(item)
        } else {
            getValidationInfoClick()
        }
    }

    return (
        <Flex position={"relative"} h={["fit-content", "fit-content", "fit-content", "fit-content", "100vh"]} width={["full", "full", "full", "full", "546px"]} > 
            <Flex pos={"absolute"} display={["none", "none", "none", "none", "flex"]} top={"4"} w={"full"} h={"30px"} justifyContent={"center"} alignItems={"center"} >
                <Text fontWeight={"bold"} fontSize={"20px"} >{name}</Text>
            </Flex>
            <Flex as={"button"} w={"fit-content"} onClick={()=> router?.back()} left={"6"} justifyContent={"center"} alignItems={"center"} height={"30px"} pos={"absolute"} display={["none", "none", "none", "none", "flex"]} top={"18px"}  > 
                <IoArrowBack size={"25px"} />
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"} px={["4", "4", "4", "12"]} py={"5"} h={["fit-content", "fit-content", "fit-content", "fit-content",  "100vh"]} width={["full", "full", "full", "full","546px"]}  >
                <Flex  pos={["relative", "relative", "relative", "relative", "absolute"]} top={["0px", "0px", "0px", "0px", "12"]} w={"full"} py={"3"} justifyContent={"space-around"} >
                    <Box as='button' onClick={() => clickHandler()} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 0 ? "brand.chasescrollBlue" : "#A9ABAF"} >Theme</Box>
                    <Box as='button' onClick={() => statusHandler(1)} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 1 ? "brand.chasescrollBlue" : "#A9ABAF"} >Information</Box>
                    <Box as='button' onClick={() => statusHandler(2)} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 2 ? "brand.chasescrollBlue" : "#A9ABAF"} >Ticket</Box>
                </Flex>


                <Flex maxW={["full", "full", "full", "full", "385px"]} w={"full"} fontWeight={"700"} flexDir={"column"} >
                    <Text color={"#1732F7"} fontSize={"24px"} display={["none", "none", "none", "none", "block"]} lineHeight={"33.6px"} >{tab === 0 ? "Theme" : tab === 1 ? "Information" : "Ticket"}</Text>
                    <Text color={headerTextColor} fontSize={["24px", "24px", "24px", "38px"]} lineHeight={["33.6px", "33.6px", "33.6px", "53.2px"]} >
                        {tab === 0 ? "Tell Us More about your Event" : tab === 1 ? "Discover the Details" : "Effortlessly Invite Attendees with Ticket Generation"}
                    </Text>
                    <Text mt={"4"} fontWeight={"400"} color={bodyTextColor} lineHeight={"19.6px"} fontSize={"14px"} >
                        {tab === 0 ?
                            "Whether it's a conference, seminar, or celebration, let us in on the details. Your event matters, and we're here to ensure it gets the spotlight it deserves." :
                            tab === 1 ? "We will like to know the location and schedule for your upcoming event" : "Streamline Attendance with Seamless Ticket Generation and Invitations"}
                    </Text>
                    <Text fontWeight={"400"} mt={"4"} color={"#626262"} lineHeight={"19.6px"} fontSize={"14px"} >Step {tab + 1}/3</Text>
                    <Flex w={"full"} rounded={"32px"} mt={"3"} h={"10px"} bgColor={"#D9D9D9"} >
                        <Box w={tab === 0 ? "35%" : tab === 1 ? "60%" : "100%"} bgColor={"#5465E0"} rounded={"32px"} />
                    </Flex>
                    {/* <Flex w={"full"} py={"4"} justifyContent={"center"} >
                        <EventTermAndCondition />
                    </Flex> */}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CreateEventHeader
