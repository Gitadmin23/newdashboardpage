import { Box, Button, Checkbox, Flex, Heading, Input, InputGroup, InputLeftElement, Spinner, Text, VStack, useColorMode, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CloseIcon, CollaboratorIcon, QuestionTwoIcon } from '../svg'
import useDonationStore from '@/global-state/useDonationState'
import { IDonation, IDonationList } from '@/models/donation'
import ModalLayout from '../sharedComponent/modal_layout'
import { IoSearchOutline } from 'react-icons/io5'
import useCustomTheme from '@/hooks/useTheme'
import UserImage from '../sharedComponent/userimage'
import { textLimit } from '@/utils/textlimit'
import { IUser } from '@/models/User'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import LoadingAnimation from '../sharedComponent/loading_animation'
import CustomButton from '../general/Button'
import { useMutation } from 'react-query'
import httpService from '@/utils/httpService'
import { AxiosError } from 'axios'

interface IProps{ 
    fundRaiserID: string,
    userID: string
}

export default function DonationCollaborator({ index, update, btn, singleData }: { index: number, btn?: boolean, update?: boolean, singleData?: IDonationList }) {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [tab, setTab] = useState(false)
    const [search, setSearch] = React.useState('');
    const [payload, setPayload] = React.useState<Array<IProps>>([]);

    const { data, updateDontion } = useDonationStore((state) => state)

    const { colorMode, toggleColorMode } = useColorMode();

    const {
        secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        borderColor,
        mainBackgroundColor
    } = useCustomTheme()

    const changeTabHandler = (item: boolean) => {
        setTab(item)
        setSearch("")

    }

    const toast = useToast()

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/user/search-users?searchText=${search}`, limit: 10, filter: "userId", name: "all-event", search: search })

    // Create Draft 
    const editDonation = useMutation({
        mutationFn: (payload: any) => httpService.put(`/fund-raiser/edit/${singleData?.id}`, payload),
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
        onSuccess: () => {
            toast({
                title: 'Success',
                description: "Updated Fundraisier",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            setOpen(false)
        }
    });


    // Create Draft 
    const addCollaboratorDonation = useMutation({
        mutationFn: (payload: any) => httpService.post(`/collaborator-request/create`, payload),
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
        onSuccess: () => {
            toast({
                title: 'Success',
                description: "Updated Fundraisier",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            setOpen(false)
        }
    }); 

    const UserCard = (props: IUser & { collaborator?: boolean }) => {
        const { username, userId, firstName, lastName, collaborator } = props;

        const [show, setShow] = useState(false)
        const removeHandler = (userIndex: string) => {
            let clone: any = [...data] 
            let clonenew: any = [...payload] 

            let users = clone[index].collaborators

            if (users?.includes(userIndex)) {

                const indexId = users.indexOf(userIndex);
                const indexnewId = clonenew.findIndex((item: any) => item.userID === userIndex);
                clone[index]?.collaborators.splice(indexId, 1);
                clonenew.splice(indexnewId, 1);

                setPayload(clonenew)
                updateDontion(clone)
            } else {
                users = [...clone[index]?.collaborators, userIndex]

                clone[index] = { ...clone[index], collaborators: users }

                clonenew = [...clonenew, {
                    fundRaiserID: singleData?.id,
                    userID: userIndex
                }]

                updateDontion(clone)
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
                        </VStack>
                    </Flex>
                    <Checkbox isChecked={show || data[index]?.collaborators?.includes(userId)} rounded={"full"} onChange={(e) => removeHandler(userId)} />
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex>
            {data[0]?.collaborators && (
                <> 
                    {update && (
                        <Flex gap={"3"} alignItems={"center"} >
                            <Button onClick={() => setOpen(true)} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>{data[0]?.collaborators?.length > 0 ? "Edit" : "Invite"} Collaborator</Button>
                            {/* <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                            <QuestionTwoIcon />
                        </Box> */}
                        </Flex>
                    )}
                    {btn && (
                        <Flex gap={"3"} alignItems={"center"} >
                            <Button onClick={() => setOpen(true)} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>{data[0]?.collaborators?.length > 0 ? "Edit" : "Invite"} Collaborator</Button>
                            <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                                <QuestionTwoIcon />
                            </Box>
                        </Flex>
                    )}
                </>
            )}
            {/* {!update && (
                <Flex flexDir={"column"} w={"fit-content"} gap={"3"} alignItems={"end"} >
                    <Flex gap={"3"} alignItems={"center"} >
                        {(data[index].collaborators) && (
                            <Flex onClick={() => setOpen(true)} as={'button'} gap={"1"} alignItems={"center"} mr={"auto"} >
                                <CollaboratorIcon />
                                {(data[index]?.collaborators?.length < 0) && (
                                    <Text color={"#1732F7"} lineHeight={"22px"} >Invite Collaborators and Teams</Text>
                                )}
                                {(payload[0]?.collaborators?.length > 0) && (
                                    <Flex alignItems={"center"} gap={"2"} >
                                        <Text color={"#1732F7"} lineHeight={"22px"} >Edit Collaborators and Teams</Text>
                                    </Flex>
                                )}
                            </Flex>

                        )}
                        <Box onClick={() => setShow(true)} color={"gray.500"} as='button' >
                            <QuestionTwoIcon />
                        </Box>
                    </Flex>
                    <Flex gap={"3"} >
                        {data[index]?.collaborators?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                {data[index]?.collaborators?.length + " Admin" + (data[index]?.collaborators.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )} */}
            <ModalLayout open={open} close={setOpen} closeIcon={false} bg={secondaryBackgroundColor} >
                <Flex w={"full"} px={"6"} pt={"8"} bg={secondaryBackgroundColor} >
                    <Box>
                        <Text color={colorMode === 'light' ? "#121212" : headerTextColor} fontSize={"24px"} lineHeight={"31.25px"} fontWeight={"bold"} >Invite Collaborators</Text>
                        <Text color={colorMode === 'light' ? "#626262" : bodyTextColor} lineHeight={"20.83px"} >Kindly select users to collaborate with on this Fundraising.</Text>
                    </Box>
                    <Box w={"fit-content"} >
                        <Box onClick={() => setOpen(false)} as='button'>
                            <CloseIcon second={true} />
                        </Box>
                    </Box>
                </Flex>

                <Flex px={"6"} py={"4"} flexDir={"column"} gap={"2"} bg={secondaryBackgroundColor}  >
                    {update && (
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
                {!tab && (
                    <LoadingAnimation loading={isLoading} >
                        <Flex flexDir={"column"} gap={"4"} maxH={"300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                            <>
                                {results?.map((item: IUser, index: number) => {
                                    if (results.length === index + 1) {
                                        return (
                                            <Box key={index.toString()} width={"full"} ref={ref} >
                                                <UserCard {...item} collaborator={data[index]?.collaborators?.includes(item.userId)} />
                                            </Box>
                                        )
                                    } else {
                                        return (
                                            <Box key={index.toString()} width={"full"} >
                                                <UserCard {...item} collaborator={data[index]?.collaborators?.includes(item.userId)} />
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
                    <Flex flexDir={"column"} gap={"4"} maxH={"300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                        {singleData?.collaborators?.map((item: any, index: number) => {
                            return (
                                <Box key={index.toString()} width={"full"} >
                                    <UserCard {...item} collaborator={data[index]?.collaborators?.includes(item.userId)} />
                                </Box>
                            )
                        })}
                    </Flex>
                )}
                {!update && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                        <CustomButton text='Done' onClick={() => setOpen(false)} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}
                {update && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg={mainBackgroundColor} py={'20px'} >
                        <CustomButton text='Update' isLoading={editDonation?.isLoading} isDisabled={editDonation?.isLoading} onClick={() => editDonation?.mutate({ collaborators: data[0].collaborators })} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}
            </ModalLayout>


            <ModalLayout open={show} close={setShow} titleAlign='left' titlecolor='brand.chasescrollButtonBlue' title={"Adding Collaborator"}>
                <Box px={"6"} pb={"6"} >
                    <Text color={"gray.500"} >{"Fundraising organizers can manage individual and team access to the fundraising dashboard."}</Text>
                    <Text mt={"6"} color={"gray.500"} >{"When you make someone an Admin to your fundraising, they have full access to your fundraising dashboard such as donors lists and donation records."}</Text>
                </Box>
            </ModalLayout>
        </Flex>
    )
}
