import { ShareType } from '@/app/share/page';
import CustomButton from '@/components/general/Button';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import UserImage from '@/components/sharedComponent/userimage';
import { useDetails } from '@/global-state/useUserDetails';
import useDebounce from '@/hooks/useDebounce';
import useCustomTheme from '@/hooks/useTheme';
import { Chat } from '@/models/Chat';
import { IUser } from '@/models/User';
import { URLS, WEBSITE_URL } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Avatar, Box, Button, Checkbox, Flex, HStack, Heading, Input, InputGroup, InputLeftElement, Spinner, Text, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'; 
import { useMutation, useQuery } from 'react-query';

interface Props { }

const UserCard = (props: IUser & { checked: boolean, handleCheck: (e: string) => void }) => {
    const { username, userId, data: { imgMain: { value: imgMain } }, firstName, lastName } = props;
    return (
        <HStack width='100%' height={'60px'} pr={"5"} justifyContent={'space-between'} >
            <HStack>
                <UserImage data={props} image={props?.data?.imgMain?.value} size={"40px"} border={"2px"} font={"20px"} />
                {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                <VStack alignItems={'flex-start'} spacing={0}>
                    <Heading fontSize={'16px'} >{firstName || ''} {lastName || ''}</Heading>
                    <Text color='grey' fontSize={'14px'}>@{username || ''}</Text>
                </VStack>
            </HStack>

            <Checkbox isChecked={props.checked} onChange={(e) => props.handleCheck(userId)} />
        </HStack>
    )
}

function SendMesageModal({ onClose, id, isprofile, type }: {
    onClose: () => void,
    id: string,
    isprofile?: boolean,
    type: ShareType
}) {

    const [search, setSearch] = React.useState('');
    const searchText = useDebounce(search, 1000);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [userIds, setUserIds] = React.useState<string[]>([]);

    const { userId } = useDetails((state) => state);
    const toast = useToast()

    const { isLoading, isError } = useQuery(['getUserFriends', searchText, userId], () => httpService.get(`/user/get-users-connections/${userId}`, {
        params: {
            searchText
        }
    }), {
        onSuccess: (data) => {
            setUsers(data?.data.content);
        }
    });

    const { isLoading: chatCreationLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/chat`, data),
        onSuccess: (data) => {
            const chat = data?.data as Chat;
            const obj = {
                message: type === "EVENT" ? `${WEBSITE_URL}/share/event/${id}` : `${WEBSITE_URL}/share?type=${type}&typeID=${id}`,
                chatID: chat?.id,
            }
            sendMessage.mutate(obj)
        }

    });

    const sendMessage = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/message`, data),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Message Sent',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            onClose()
        }
    });

    const handleShare = () => {
        userIds.forEach((idd) => {
            mutate({
                type: 'ONE_TO_ONE',
                typeID: userId,
                name: idd,
                users: [
                    idd
                ]
            });
        })
    }

    const handleCheck = (iem: string) => {
        if (userIds.includes(iem)) {
            setUserIds(userIds.filter((id) => id !== iem));
        } else {
            setUserIds([...userIds, iem]);
        }
    }

    const { bodyTextColor, mainBackgroundColor, borderColor } = useCustomTheme();

    return (
        <Flex width={"full"} h={"full"} pb={"50px"} position={"relative"} flexDir={"column"}  > 
            <Box  marginY='20px' w={"full"} > 
                <InputGroup width={["full", "full", "full"]} h={"45px"} zIndex={"20"} position={"relative"} >
                    <InputLeftElement pointerEvents='none' mt={"3px"} pl={"4px"} >
                        <FiSearch size={"25px"} color={bodyTextColor} />
                    </InputLeftElement>
                    <Input width={["full", "full", "full"]} h={"45px"} value={search} color={bodyTextColor} onChange={(e) => setSearch(e.target.value)} type='text' borderColor={borderColor} rounded={"full"} focusBorderColor={'brand.chasescrollBlue'} _placeholder={{ color: bodyTextColor }} bgColor={mainBackgroundColor} placeholder='Search for users' />
                </InputGroup>
            </Box>

            <Flex width='100%' height={"full"} flexDir={"column"} overflowY='auto'>
                <Flex w={"full"} h={"fit-content"} flexDirection={"column"} >
                <LoadingAnimation loading={isLoading} length={users?.length} >
                    {users.map((item, index) => (
                        <UserCard {...item} checked={userIds.includes(item.userId)} handleCheck={(e) => handleCheck(e)} key={index.toString()} />
                    ))}
                </LoadingAnimation>
                </Flex>
            </Flex>
            <Box mt={"auto"} position={"sticky"}  bottom={"-40px"} paddingTop={'20px'} zIndex={10} paddingBottom={'20px'} >
                <CustomButton text='Share' borderRadius={"full"} onClick={handleShare} disable={userIds.length === 0} isLoading={chatCreationLoading || sendMessage.isLoading} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
            </Box>
        </Flex>
    )
}

export default SendMesageModal
