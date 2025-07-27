"use client"
import CustomButton from '@/components/general/Button'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import UserImage from '@/components/sharedComponent/userimage'
import { CloseIcon, CollaboratorIcon, QuestionTwoIcon } from '@/components/svg'
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState'
import { useDetails } from '@/global-state/useUserDetails'
import useDebounce from '@/hooks/useDebounce'
import { IUser } from '@/models/User'
import httpService from '@/utils/httpService'
import { textLimit } from '@/utils/textlimit'
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Text,
    VStack,
    useToast,
    useColorMode
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useMutation, useQueryClient } from 'react-query'
import { URLS } from '@/services/urls'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import useCustomTheme from "@/hooks/useTheme";
import { IEventType } from '@/models/Event'

type IProps = {
    btn?: boolean,
    data?: IEventType,
    collaborate?: boolean,
    addCollaborator?: boolean
}

export default function CollaboratorBtn(props: IProps) {

    const {
        btn,
        data,
        collaborate,
        addCollaborator
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)
    const [search, setSearch] = React.useState('');
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [usersFilter, setUserFilter] = React.useState<IUser[]>([]);
    const { eventdata, updateEvent } = useEventStore((state) => state);
    const [show, setShow] = useState(false)

    const router = useRouter()

    const queryClient = useQueryClient()

    const { userId } = useDetails((state) => state);
    // const toast = useToast()


    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/user/search-users?searchText=${search}`, limit: 10, filter: "userId", name: "all-event", search: search })

    const AddAdmin = (userIndex: string) => {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }

        if (eventdata?.collaborators?.includes(userIndex)) {


            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            if (!eventdata?.admins?.includes(userIndex)) {

                clone.admins = [...admin, userIndex]
            } else {

                const index = admin.indexOf(userIndex);
                clone?.admins.splice(index, 1);
            }

            updateEvent(clone);

        } else if (eventdata?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            updateEvent(clone);
        } else {

            if (!clone.admins) {
                clone.admins = [userIndex]
            } else {
                clone.admins = [...admin, userIndex]
            }

            updateEvent(clone);

        }
    }

    const AddCollaborators = (userIndex: string) => {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }

        if (eventdata?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            if (!eventdata?.collaborators?.includes(userIndex)) {

                clone.collaborators = [...collaborators, userIndex]
            } else {


                const index = collaborators.indexOf(userIndex);
                clone?.collaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex) 
            }
            updateEvent(clone);


        } else if (eventdata?.collaborators?.includes(userIndex)) {

            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            // clone?.collaborators?.filter((id) => id !== userIndex)

            updateEvent(clone);
        } else {

            clone.collaborators = [...collaborators, userIndex]
            // clone.collaborators.push(item)

            updateEvent(clone);

        }
        console.log(clone);


    }

    const AddActiveAdmin = (userIndex: string) => {

        let admin = !eventdata?.acceptedAdmins ? [] : [...eventdata?.acceptedAdmins]
        let collaborators = !eventdata?.acceptedCollaborators ? [] : [...eventdata?.acceptedCollaborators]

        let clone: any = { ...eventdata }

        if (eventdata?.acceptedCollaborators?.includes(userIndex)) {


            const index = collaborators.indexOf(userIndex);
            clone?.acceptedCollaborators.splice(index, 1);

            if (!eventdata?.acceptedAdmins?.includes(userIndex)) {

                clone.acceptedAdmins = [...admin, userIndex]
            } else {

                const index = admin.indexOf(userIndex);
                clone?.acceptedAdmins.splice(index, 1);
                clone.acceptedCollaborators = [...collaborators, userIndex]
            }

            updateEvent(clone)


        } else if (eventdata?.acceptedAdmins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.acceptedAdmins.splice(index, 1);

            updateEvent(clone);
        } else {

            clone.acceptedAdmins = [...admin, userIndex]


            updateEvent(clone);

        }
    }

    const AddActiveCollaborators = (userIndex: string) => {

        let admin = !eventdata?.acceptedAdmins ? [] : [...eventdata?.acceptedAdmins]
        let collaborators = !eventdata?.acceptedCollaborators ? [] : [...eventdata?.acceptedCollaborators]

        let clone: any = { ...eventdata }

        if (eventdata?.acceptedAdmins?.includes(userIndex)) {

            const index = admin.indexOf(userIndex);
            clone?.acceptedAdmins.splice(index, 1);

            if (!eventdata?.acceptedCollaborators?.includes(userIndex)) {

                clone.acceptedCollaborators = [...collaborators, userIndex]
            } else {
                const index = collaborators.indexOf(userIndex);
                clone?.acceptedCollaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex)
                clone.acceptedCollaborators = [...collaborators, userIndex]
            }
            updateEvent(clone);

        } else if (eventdata?.acceptedCollaborators?.includes(userIndex)) {

            const index = collaborators.indexOf(userIndex);
            clone?.acceptedCollaborators.splice(index, 1);
            updateEvent(clone);
        } else {

            clone.acceptedCollaborators = [...collaborators, userIndex]
            updateEvent(clone);

        }
    }


    const UserCard = (props: IUser & { collaborators: boolean, admin: boolean, active?: boolean, collaborator?: boolean }) => {
        const { username, userId, data, firstName, lastName, collaborators, admin, active, collaborator } = props;

        const [show, setShow] = useState(false)
        const removeHandler = (userIndex: string) => {
            let clone: any = { ...eventdata }

            let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
            let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]
            let acceptedAdmins = !eventdata?.acceptedAdmins ? [] : [...eventdata?.acceptedAdmins]
            let acceptedCollaborators = !eventdata?.acceptedCollaborators ? [] : [...eventdata?.acceptedCollaborators]


            if (show || collaborators || admin) {
                if (eventdata?.admins?.includes(userIndex)) {


                    const index = admin.indexOf(userIndex);
                    clone?.admins.splice(index, 1);

                    updateEvent(clone);
                } else if (eventdata?.collaborators?.includes(userIndex)) {

                    const index = collaborators.indexOf(userIndex);
                    clone?.collaborators.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    updateEvent(clone);
                } else if (eventdata?.acceptedAdmins?.includes(userIndex)) {

                    const index = acceptedAdmins.indexOf(userIndex);
                    clone?.acceptedAdmins.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    updateEvent(clone);
                } else if (eventdata?.acceptedCollaborators?.includes(userIndex)) {

                    const index = acceptedCollaborators.indexOf(userIndex);
                    clone?.acceptedCollaborators.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    updateEvent(clone);
                }
            }

            setShow((prev) => !prev)
        }

        return (
            <Flex bgColor={mainBackgroundColor} width='100%' height={'fit-content'} flexDir={"column"} rounded={"16px"} borderColor={borderColor} borderWidth={"1px"} justifyContent={'space-between'} padding='15px'>
                <Flex as={"button"} onClick={() => removeHandler(userId)} justifyContent={'space-between'} w={"full"} alignItems={"center"}  >
                    <Flex gap={"2"} height={"full"} alignItems={"center"} >
                        <Box w={"fit-content"} >
                            <UserImage data={props} image={props?.data?.imgMain?.value} size={"50px"} border={"2px"} font={"20px"} />
                        </Box>
                        {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                        <VStack alignItems={'flex-start'} spacing={0}>
                            <Heading fontSize={'16px'} color={headerTextColor}>{firstName || ''} {lastName || ''}</Heading>
                            <Text fontSize={'14px'} color={bodyTextColor}>@{textLimit(username, 12) || ''}</Text>
                            {collaborator && (
                                <Text fontSize={'14px'} color={headerTextColor}>Status: <span style={{ color: active ? "#3EC30F" : "#FDB806" }} >{!active ? "Pending" : "Active"}</span></Text>
                            )}
                        </VStack>
                    </Flex>
                    <Checkbox isChecked={show || admin || collaborators} rounded={"full"} onChange={(e) => removeHandler(userId)} />
                </Flex>
                {((show || admin || collaborators) && !collaborator) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddAdmin(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddCollaborators(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Volunteer</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {((show || admin || collaborators) && (collaborator && !active)) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddAdmin(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddCollaborators(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Volunteer</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {((show || collaborators || admin) && (collaborator && active)) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddActiveAdmin(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddActiveCollaborators(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Volunteer</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        )
    }

    const toast = useToast()

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (newdata: any) => httpService.put(URLS.UPDATE_EVENT, newdata),
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
        onSuccess: (message: AxiosResponse<any>) => {
            queryClient.invalidateQueries(['all-events-details'])

            toast({
                title: 'Success',
                description: "Event Role Updated",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setOpen(false)
        }
    });


    const updateEventCollaboration = React.useCallback((item: any) => {
        updateUserEvent.mutate(item)
    }, [])

    useEffect(() => {
        if (!isLoading) {

            let userData: Array<IUser> = []

            let admin: any = results?.admins
            let collaborator: any = results?.collaborators


            if (admin?.length > 0 && collaborator?.length > 0) {
                userData = users.filter((obj1: IUser) =>
                    results?.admins.every((obj2: IUser) => obj1?.userId !== obj2?.userId) &&
                    results?.collaborators.every((obj2: IUser) => obj1?.userId !== obj2?.userId)
                );

            } else if (admin?.length > 0 && collaborator?.length <= 0) {
                userData = users.filter((obj1: IUser) =>
                    results?.admins.every((obj2: IUser) => obj1?.userId !== obj2?.userId && obj1?.firstName !== obj2?.firstName)
                );
            } else {
                userData = users.filter((obj1: IUser) =>
                    results?.collaborators.every((obj2: IUser) => obj1?.userId !== obj2?.userId)
                );
            }

            setUserFilter(userData)

        }
    }, [results, open])

    const changeTabHandler = (item: boolean) => {
        setTab(item)
        setSearch("")
    }

    return (
        <>
            {/* {btn && (
                <>
                    <Button onClick={() => clickHandler()} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>{collaborate ? "Edit" : "Invite"} Collaborator</Button>
                </>
            )} */}
            {!btn && (
                <Flex flexDir={"column"} w={"fit-content"} gap={"3"} alignItems={"end"} >
                    <Flex gap={"3"} alignItems={"center"} >
                        <Flex onClick={() => setOpen(true)} as={'button'} gap={"1"} alignItems={"center"} mr={"auto"} >
                            <CollaboratorIcon />
                            {(eventdata?.admins?.length <= 0 && eventdata?.collaborators?.length <= 0) && (
                                <Text color={"#1732F7"} lineHeight={"22px"} >Invite Collaborators and Teams</Text>
                            )}
                            {(eventdata?.admins?.length > 0 || eventdata?.collaborators?.length > 0) && (
                                <Flex alignItems={"center"} gap={"2"} >
                                    <Text color={"#1732F7"} lineHeight={"22px"} >Edit Collaborators and Teams</Text>
                                </Flex>
                            )}
                        </Flex>

                        <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                            <QuestionTwoIcon />
                        </Box>
                    </Flex>
                    <Flex gap={"3"} >

                        {eventdata?.admins?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                {eventdata?.admins?.length + " Admin" + (eventdata?.admins?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                        {eventdata?.collaborators?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#FDF3CF6B"} color={"#FDB806"} >
                                {eventdata?.collaborators?.length + " Volunteer" + (eventdata?.collaborators?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )}
            <ModalLayout open={open} close={setOpen} closeIcon={false} bg={secondaryBackgroundColor} >
                <Flex w={"full"} px={"6"} pt={"8"} bg={secondaryBackgroundColor} >
                    <Box>
                        <Text color={colorMode === 'light' ? "#121212" : headerTextColor} fontSize={"24px"} lineHeight={"31.25px"} fontWeight={"bold"} >Invite Collaborators</Text>
                        <Text color={colorMode === 'light' ? "#626262" : bodyTextColor} lineHeight={"20.83px"} >Fundraising organizers can manage individual and team access to the fundraising dashboard.
                            <br /><br />
                            When you make someone an Admin to your fundraising, they have full access to your fundraising dashboard such as donors lists and donation records.</Text>
                    </Box>
                    <Box w={"fit-content"} >
                        <Box onClick={() => setOpen(false)} as='button'>
                            <CloseIcon second={true} />
                        </Box>
                    </Box>
                </Flex>

                <Flex px={"6"} py={"4"} flexDir={"column"} gap={"2"} bg={secondaryBackgroundColor}  >
                    {btn && (
                        <Flex rounded={"lg"} w={"full"} bg={"#EFF1FE"} py={"3px"} px={"9px"} >
                            <Button onClick={() => changeTabHandler(false)} _hover={{ backgroundColor: !tab ? "white" : "transparent" }} borderBottom={!tab ? "1px solid #5465E0" : ""} width={"full"} bgColor={!tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >Network</Button>
                            <Button onClick={() => changeTabHandler(true)} _hover={{ backgroundColor: tab ? "white" : "transparent" }} borderBottom={tab ? "1px solid #5465E0" : ""} width={"full"} bgColor={tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >Collaborators</Button>
                        </Flex>
                    )}
                    <InputGroup width={["full", "full", "full"]} zIndex={"20"} position={"relative"} >
                        <InputLeftElement pointerEvents='none'>
                            <IoSearchOutline size={"25px"} color='#B6B6B6' />
                        </InputLeftElement>
                        <Input width={["full", "full", "full"]} value={search} onChange={(e) => setSearch(e.target.value)} type='text' borderColor={borderColor} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} bgColor={mainBackgroundColor} placeholder='Search for users' />
                    </InputGroup>
                </Flex>
                {addCollaborator && (
                    <LoadingAnimation loading={isLoading} >
                        <Flex flexDir={"column"} gap={"4"} maxH={btn ? "200px" : "300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                            <>
                                {results?.map((item: IUser, index: number) => {
                                    if (results.length === index + 1) {
                                        return (
                                            <Box key={index.toString()} width={"full"} ref={ref} >
                                                <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} />
                                            </Box>
                                        )
                                    } else {
                                        return (
                                            <Box key={index.toString()} width={"full"} >
                                                <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} />
                                            </Box>
                                        )
                                    }
                                })}
                                {isRefetching && (
                                    <Flex w={"full"} justifyContent={"center"} alignItems={"center"} py={"4"} >
                                        <Spinner size={"sm"} />
                                    </Flex>
                                )}
                            </>
                        </Flex>
                    </LoadingAnimation>
                )}

                {!addCollaborator && (
                    <>
                        {!tab && (
                            <LoadingAnimation loading={isLoading} >
                                <Flex flexDir={"column"} gap={"4"} maxH={btn ? "200px" : "300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                    <>
                                        {results?.map((item: IUser, index: number) => {
                                            if (results.length === index + 1) {
                                                return (
                                                    <Box key={index.toString()} width={"full"} ref={ref} >
                                                        <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} />
                                                    </Box>
                                                )
                                            } else {
                                                return (
                                                    <Box key={index.toString()} width={"full"} >
                                                        <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} />
                                                    </Box>
                                                )
                                            }
                                        })}
                                        {isRefetching && (
                                            <Flex w={"full"} justifyContent={"center"} alignItems={"center"} py={"4"} >
                                                <Spinner size={"sm"} />
                                            </Flex>
                                        )}
                                    </>
                                </Flex>
                            </LoadingAnimation>
                        )}

                        {tab && (
                            <>
                                {(data?.admins && data?.collaborators && data?.acceptedAdmins && data?.acceptedCollaborators) && (
                                    <>
                                        {(data?.admins?.length > 0 || data.collaborators.length > 0 || data.acceptedAdmins.length > 0 || data.acceptedCollaborators.length > 0) ? (
                                            <>
                                                {search ? (
                                                    <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                        {data?.admins?.filter((item: IUser) => item.firstName?.toLowerCase().includes(search?.toLowerCase()) || item.lastName?.toLowerCase().includes(search?.toLowerCase()) || item.email?.toLowerCase().includes(search?.toLowerCase()) || item.username?.toLowerCase().includes(search?.toLowerCase()))?.map((item, index) => (
                                                            <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                        ))}
                                                        {data?.collaborators?.filter((item: IUser) => item.firstName?.toLowerCase().includes(search?.toLowerCase()) || item.lastName?.toLowerCase().includes(search?.toLowerCase()) || item.email?.toLowerCase().includes(search?.toLowerCase()) || item.username?.toLowerCase().includes(search?.toLowerCase()))?.map((item, index) => (
                                                            <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                        ))}
                                                    </Flex>
                                                ) : (
                                                    <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                        {data?.admins?.map((item, index) => (
                                                            <UserCard collaborator={true} {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                        ))}
                                                        {data?.collaborators?.map((item, index) => (
                                                            <UserCard collaborator={true} {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                        ))}
                                                        {data?.acceptedAdmins?.map((item, index) => (
                                                            <UserCard collaborator={true} active={true} {...item} collaborators={eventdata?.acceptedCollaborators?.includes(item.userId)} admin={eventdata?.acceptedAdmins?.includes(item.userId)} key={index.toString()} />
                                                        ))}
                                                        {data?.acceptedCollaborators?.map((item, index) => (
                                                            <UserCard collaborator={true} active={true} {...item} collaborators={eventdata?.acceptedCollaborators?.includes(item.userId)} admin={eventdata?.acceptedAdmins?.includes(item.userId)} key={index.toString()} />
                                                        ))}
                                                    </Flex>
                                                )}
                                            </>
                                        ) : (
                                            <Flex flexDir={"column"} gap={"4"} maxH={"250px"} h={"full"} justifyContent={"center"} alignItems={"center"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                <Text lineHeight={"20.83px"} >You don’t have any collaborators for this event, please go to your <span style={{ fontWeight: "bold" }} >network tab</span> to select collaborators </Text>
                                            </Flex>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                {btn && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                        <CustomButton text={tab ? 'Update Role' : 'Assign Role'} disable={(eventdata?.admins?.length === data?.admins?.length) && (eventdata?.collaborators?.length === data?.collaborators?.length) && (eventdata?.acceptedAdmins?.length === data?.acceptedAdmins?.length) && (eventdata?.acceptedCollaborators?.length === data?.acceptedCollaborators?.length)} isLoading={updateUserEvent?.isLoading} onClick={() => updateEventCollaboration({ admins: eventdata?.admins, collaborators: eventdata?.collaborators, id: eventdata?.id, acceptedAdmins: eventdata?.acceptedAdmins, acceptedCollaborators: eventdata?.acceptedCollaborators })} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}

                {!btn && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                        <CustomButton text='Send invite' onClick={() => setOpen(false)} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}
            </ModalLayout>


            <ModalLayout open={show} close={setShow} titleAlign='left' titlecolor='brand.chasescrollButtonBlue' title={"Adding Collaborator"}>
                <Box px={"6"} pb={"6"} >
                    <Text color={"gray.500"} >{"Event owners can manage individual and team access to the event dashboard. When you make someone an Admin to your event, they have full access to your event dashboard such as attendees lists, ticket sales, transactions and also the event scanner to assist with scanning the tickets at the event. "}</Text>
                    <Text mt={"6"} color={"gray.500"} >{"When you make them volunteers, they can only have access to the event scanner in order to assist with validating and checking in attendee’s tickets using their mobile phone camera."}</Text>
                </Box>
            </ModalLayout>
        </>
    )
}
