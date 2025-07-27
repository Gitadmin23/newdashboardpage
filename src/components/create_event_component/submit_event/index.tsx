import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout';
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState';
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Button, Flex, VStack, useColorMode, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import SuccessMessageCreateEvent from '../success_message';
import { IUser } from '@/models/User';
import useCustomTheme from "@/hooks/useTheme";
import CustomText from '@/components/general/Text';
import { Warning2 } from 'iconsax-react';

interface Iprops {
    type?: any,
    promotion?: boolean,
}

function SubmitEvent(props: Iprops) {

    const {
        type,
        promotion,
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();

    const { eventdata, image, tab, updateEvent, changeTab, rental, service, state } = useEventStore((state) => state);
    const { userId: user_index } = useDetails((state) => state);
    const router = useRouter()
    const [ createdEvent, setCreatedEvent ] = useState({} as any)
    const pathname = usePathname();

    const [open, setOpen] = useState(false)
    const [openEarlyBird, setOpenEarlyBird] = useState(false)

    // const []
    const toast = useToast()

    const getValidationTheme = () => {
        if (!eventdata?.eventName) {
            toast({
                description: "Please Enter Event Name",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else
            if (!eventdata?.startDate) {
                toast({
                    description: "Please Enter Event Starting Date",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.endDate) {
                toast({
                    description: "Please Enter Event Ending Date",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (eventdata?.startDate > eventdata?.endDate) {
                toast({
                    description: "End date and time cannot be earlier than Start date and time",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventType) {
                toast({
                    description: "Please Enter Event Type",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventDescription) {
                toast({
                    description: "Please Enter Event Description",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!image && !eventdata?.currentPicUrl) {
                toast({
                    description: "Please Enter Event Image",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                if (pathname?.includes("edit_event")) {
                    changeTab(1)
                } else {
                    if (image) {
                        const fd = new FormData();
                        fd.append("file", image);
                        uploadImage.mutate(fd)
                    } else {
                        saveToDraft.mutate(eventdata)
                    }
                }
            }
    }

    const getValidationInfo = () => {
        if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                toast({
                    description: "Please Enter Event Location",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {

                if (getValidationLinkBtn() === false && eventdata?.location?.link) {
                    toast({
                        description: "Please Enter a Valid Event Link",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    });
                } else {
                    if (pathname?.includes("edit_event_data")) {
                        changeTab(2)
                    } else if (pathname?.includes("edit_event")) {
                        changeTab(2)
                    } else {
                        saveToDraft.mutate(eventdata)
                    }
                }

            }
        } else {
            if (pathname?.includes("edit_event")) {
                changeTab(2)
            } else {
                saveToDraft.mutate(eventdata)
            }
        }
    }


    const getValidationThemeBtn = () => {
        if (!eventdata?.eventName) {
            return true
        } else if (!eventdata?.eventType) {
            return true
        } else if (!eventdata?.startDate) {
            return true
        } else if (!eventdata?.endDate) {
            return true
        } else if (eventdata?.startDate > eventdata?.endDate) {
            return true
        } else if (!eventdata?.eventDescription) {
            return true
        } else if (!image && !eventdata?.currentPicUrl) {
            return true
        } else {
            return false
        }
    }

    const getValidationInfoBtn = () => {
        if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                return true
            }
        } else {
            return false
        }
    }

    const getValidationAll = () => {
        if (tab === 0) {
            return getValidationThemeBtn()
        } else if (tab === 1) {
            return getValidationInfoBtn()
        } else {
            return getValidationTicketBtn()
        }
    }


    const getValidationTicket: any = () => {
        return eventdata?.productTypeData?.every((item: any, index: number) => {

            if (item.totalNumberOfTickets === "0" || !item.totalNumberOfTickets) {

                if (item.ticketType === "Early Bird") {
                    toast({
                        description: "Please Enter Early Bird Total Number Of Tickets",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    }); return

                } else {
                    toast({
                        description: eventdata?.productTypeData[0]?.ticketType ? "Please Enter Total Number Of Tickets" : "Please fill in Other Ticket details",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    }); return
                }
            } else if (!item.ticketType) {
                toast({
                    description: "Please Enter Ticket Type Or Name",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); return
            } else if (!item.minTicketBuy) {


                if (item.ticketType === "Early Bird") {
                    toast({
                        description: "Please Enter Early Bird Minimum Ticket Buy",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    }); return

                } else {
                    toast({
                        description: eventdata?.productTypeData[0]?.ticketType ? "Please Enter Minimum Ticket Buy" : "Please Enter Other Tickets Minimum Ticket Buy",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    }); return

                }
            } else if (!item.maxTicketBuy || Number(item.maxTicketBuy) === 0) {

                if (item.ticketType === "Early Bird") {
                    toast({
                        description: "Please Enter Early Bird maximum number of ticket an attendee can purchase",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    }); return

                } else {
                    toast({
                        description: eventdata?.productTypeData[0]?.ticketType ? "Please enter maximum number of ticket an attendee can purchase." : "Please Enter Other Tickets maximum ticket purchase",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    }); return
                }
            } else if (!item.startDate && item.ticketType === "Early Bird") {
                toast({
                    description: "Please Enter Start Date For Early Bird ",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); return
            } else if (!item.endDate && item.ticketType === "Early Bird") {
                toast({
                    description: "Please Enter End Date For Early Bird ",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); return
            } else if (getValidationTicketBtn()) {
                toast({
                    description: "Please Fill Ticket Information ",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                if (getValidationTicketNotification() === false) {
                    toast({
                        status: "error",
                        title: "Error",
                        description: "The price for ticket cannot be zero(0) ",
                        position: "top-right"
                    })
                } else {
                    if (item.ticketType === "Early Bird" && item.ticketPrice === 0) {
                        setOpenEarlyBird(true)
                        return
                    } else if (pathname?.includes("edit_event")) {
                        if (image) {
                            const fd = new FormData();
                            fd.append("file", image);
                            uploadImage.mutate(fd)
                        } else {
                            updateUserEvent.mutate(eventdata)
                        }
                    } else {
                        createEventFromDraft.mutate(eventdata)
                    }
                }
            }
        })
    }

    const submitEarlyBird = () => {

        if (pathname?.includes("edit_event")) {
            if (image) {
                const fd = new FormData();
                fd.append("file", image);
                uploadImage.mutate(fd)
            } else {
                updateUserEvent.mutate(eventdata)
            }
        } else {
            createEventFromDraft.mutate(eventdata)
        }
    }

    const getValidationTicketBtn: any = () => {

        return eventdata?.productTypeData?.every((item: any, index: number) => {

            if (Number(item.totalNumberOfTickets) === 0 || !item.totalNumberOfTickets) {
                return true
            } else if (eventdata?.productTypeData[0].totalNumberOfTickets === "0" && item.ticketType === "Early Bird") {
                return true
            } else if (!item.ticketType) {
                return true
            } else if (!item.minTicketBuy) {
                return true
            } else if (!item.maxTicketBuy) {
                return true
            } else if (eventdata?.donationEnabled) {
                if (!eventdata?.donationName || !eventdata?.donationTargetAmount) {
                    return true
                }
            } else if (promotion) {
                if (!item.rerouteURL) {
                    return true
                }
            } else if (eventdata?.productTypeData?.length === index + 1) {
                return false
            } else {
                return true
            }
        })
    }

    const getValidationLinkBtn: any = () => {

        return eventdata?.location?.links?.every((item, index) => {
            if ((item?.includes("https://")) || (item?.includes("http://")) || (item?.includes("www."))) {
                return true
            } else {
                return false
            }
        })
    }


    const getValidationTicketNotification: any = () => {
        return eventdata?.productTypeData?.every((item: any) => {
            if (type !== "Free") {
                if (item.ticketType === "Early Bird" && Number(item.ticketPrice) === 0) {
                    return true
                } else {
                    return (Number(item.ticketPrice) === 0 || !item.ticketPrice) ? false : true
                }
            } else {
                return true
            }
        })
    }

    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.UPLOAD_IMAGE + "/" + user_index, data,
            {
                headers: {
                    'Content-Type': image.type,
                }
            }),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: any) => {
            let newObj: any = { ...eventdata, picUrls: [data?.data?.fileName], currentPicUrl: data?.data?.fileName }
            if (pathname?.includes("edit_event")) {
                updateUserEvent?.mutate(newObj)
            } else {
                if (image && !eventdata?.currentPicUrl) {
                    createDraft.mutate(newObj)
                    setOpenEarlyBird(false)
                } else if (image && eventdata?.currentPicUrl) {
                    saveToDraft.mutate(newObj)
                    setOpenEarlyBird(false)
                }
            }
        }
    });

    // Create Draft 
    const createDraft = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_DRAFT, data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            updateEvent(data?.data)
            changeTab(1)
            toast({
                title: 'Success',
                description: "Event Saved",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    // Save To Draft
    const saveToDraft = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_DRAFT, data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {

            const clone: CreateEvent = {
                id: data?.data?.id,
                picUrls: data?.data?.picUrls,
                eventType: data?.data?.eventType,
                eventName: data?.data?.eventName,
                eventDescription: data?.data?.eventDescription,
                joinSetting: data?.data?.joinSetting,
                locationType: data?.data?.locationType,
                currency: data?.data?.currency,
                currentPicUrl: data?.data?.currentPicUrl,
                eventFunnelGroupID: data?.data?.eventFunnelGroupID,
                mediaType: data?.data?.mediaType,
                currentVideoUrl: data?.data?.currentVideoUrl,
                isPublic: data?.data?.isPublic,
                isExclusive: data?.data?.isExclusive,
                mask: data?.data?.mask,
                attendeesVisibility: data?.data?.attendeesVisibility,
                minPrice: data?.data?.minPrice,
                maxPrice: data?.data?.maxPrice,
                startTime: data?.data?.startTime,
                endTime: data?.data?.endTime,
                startDate: data?.data?.startDate,
                endDate: data?.data?.endDate,
                // expirationDate: "",
                location: data?.data?.location,
                productTypeData: data?.data?.productTypeData,
                collaborators: data?.data?.collaborators,
                admins: data?.data?.admins,
                acceptedAdmins: data?.data?.acceptedAdmins,
                acceptedCollaborators: data?.data?.acceptedCollaborators,
                affiliates: data?.data?.affiliates,
            }


            const admin: any = []
            const collaborator: any = []

            clone?.admins?.map((item: IUser) => {
                return admin.push(item?.userId)
            })
            clone?.collaborators?.map((item: IUser) => {
                return collaborator.push(item?.userId)
            })

            clone.admins = admin

            clone.collaborators = collaborator
            updateEvent(clone)
            changeTab(tab !== 1 ? 1 : 2)
            toast({
                title: 'Success',
                description: "Event Saved",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    // Create Event From Draft
    const createEventFromDraft = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_EVENT_FROM_DRAFT, data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            console.log(data?.data);
            setCreatedEvent(data?.data);
            if(service?.length > 0 && rental?.length > 0) {
                tagServiceAndRental?.mutate({
                    serviceCategories: service,
                    rentalCategories: rental,
                    state: state,
                    eventID: eventdata?.id+""
                })
            }

            setOpen(true)
        }
    });  

    // Create Event From Draft
    const tagServiceAndRental = useMutation({
        mutationFn: (data: {
            "serviceCategories":  Array<any>,
            "rentalCategories": Array<any>,
            "eventID": string,
            "state": string
        }) => httpService.post("/tags/create-request", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            setOpen(true)
        }
    });

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_EVENT, data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            
            router.push("/dashboard/product")

            toast({
                title: 'Success',
                description: "Event has been updated successfully",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });


    function clean(obj: any) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
            if (obj[propName] === "location") {
                for (var propName in obj?.location) {
                    if (obj?.location[propName] === null || obj?.location[propName] === undefined || obj?.location[propName] === "") {
                        delete obj?.location[propName];
                    }
                }
            }
        }
        return obj
    }

    const handleClick = React.useCallback(() => {
        if (tab === 0) {
            getValidationTheme()
        } else if (tab === 1) {
            getValidationInfo()
        } else {

            getValidationTicket()
            // if (eventdata?.productTypeData[0].ticketType === "Early Bird") {
            //     if (eventdata?.productTypeData[0].ticketPrice === 0) {
            //         setOpenEarlyBird(true)
            //     } else {
            //         getValidationTicket()
            //     }
            // } else {
            //     getValidationTicket()
            // }
        }
    }, [saveToDraft, uploadImage, createEventFromDraft])

    return (
        <Flex w={"full"} alignItems={"center"} justifyContent={"center"} fontSize={["md", "lg"]} fontWeight={"bold"} >

            <CustomButton borderWidth={tab === 2 ? "2px" : "0px"} backgroundColor={getValidationAll() ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={uploadImage?.isLoading || uploadImage?.isLoading || saveToDraft?.isLoading || createEventFromDraft?.isLoading || updateUserEvent?.isLoading} onClick={handleClick} _disabled={{ cursor: "not-allowed" }} borderRadius={"999px"} width={"full"}
                text={(pathname?.includes("edit_event_data") && tab === 2) ? "Update Event" : pathname?.includes("edit_event") && tab === 2 ? "Update Event" : tab === 2 ? 'Submit' : 'Continue'} />

            <ModalLayout close={setOpen} open={open} bg={secondaryBackgroundColor} >
                <SuccessMessageCreateEvent eventData={createdEvent} update={(pathname?.includes("edit_event_data") || pathname?.includes("edit_event")) ? true : false} />
            </ModalLayout>
            <ModalLayout close={setOpenEarlyBird} open={openEarlyBird} size={"sm"} bg={secondaryBackgroundColor} >
                <VStack
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"center"}
                    spacing={6}
                    bgColor={mainBackgroundColor}
                    p={"6"}
                >
                    <VStack
                        width="60px"
                        height={"60px"}
                        borderRadius={"30px"}
                        justifyContent={"center"}
                        bg="#df26263b"
                    >
                        <Warning2 color="red" size="30px" variant="Outline" />
                    </VStack>
                    <CustomText fontFamily={"DM-Medium"} textAlign={"center"} fontSize={"18px"}>
                        Are you sure you want to set your Early Bird price to N0.00?
                    </CustomText>
                    <VStack justifyContent={"center"} width={"100%"}>
                        <Button
                            // outlineColor={"brand.chasescrollButtonBlue"}
                            borderColor={"brand.chasescrollButtonBlue"}
                            borderWidth={"1px"}
                            width="100%"
                            outline={"none"}
                            _hover={{ backgroundColor: "white" }}
                            bg={"white"}
                            height={"32px"}
                            color="brand.chasescrollButtonBlue"
                            onClick={() => setOpenEarlyBird(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            borderColor={primaryColor}
                            borderWidth={"1px"}
                            _hover={{ backgroundColor: primaryColor }}
                            bg={primaryColor}
                            width="100%"
                            height={"40px"}
                            color="white"
                            isLoading={uploadImage?.isLoading || uploadImage?.isLoading || saveToDraft?.isLoading || createEventFromDraft?.isLoading || updateUserEvent?.isLoading}
                            onClick={submitEarlyBird}
                        >
                            Yes
                        </Button>
                    </VStack>
                </VStack>
            </ModalLayout>
        </Flex>
    )
}

export default SubmitEvent
