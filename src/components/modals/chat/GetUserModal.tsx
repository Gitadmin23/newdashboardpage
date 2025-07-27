import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalContent, HStack, Select, VStack, Flex, Textarea, Button, useToast, Box, Spinner, Image, Checkbox } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
import CustomText from '@/components/general/Text';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls';
import { IUser } from '@/models/User';
import { useDetails } from '@/global-state/useUserDetails';


interface IProps {
    isOpen: boolean;
    userIds: string[];
    addID: (id: string) => void;
    onClose: () => void
}


function GetUserModal({isOpen, onClose, userIds, addID }:IProps) {
    const [users, setUsers] = React.useState<IUser[]>([])
    const toast = useToast();
    const { userId } = useDetails((state) => state)


    const { isLoading, isError } = useQuery([`getConnections`, userId], () => httpService.get(`${URLS.GET_USER_CONNECTION_LIST}/${userId}`),
     {
        onSuccess: (data) => {
            setUsers(data.data);
        },
        onError: () => {}
    })

if (isError) {
    return (
        <VStack width='100%' height="100%" justifyContent={'center'} alignItems={'center'}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'20px'}>An error occured</CustomText>
        </VStack>
    )
}

if (isLoading) {
    return (
        <VStack width='100%' height="100%" justifyContent={'center'} alignItems={'center'}>
            <Spinner color='brand.chasescrollButtonBlue' />
            <CustomText fontFamily={'DM-Medium'} fontSize={'20px'}>Loading...</CustomText>
        </VStack>
    )
}
  return (
    <Modal isOpen={isOpen} onClose={() => {
        onClose()
        }} closeOnEsc={true} closeOnOverlayClick={true} size='md' isCentered>
        <ModalOverlay />
        <ModalContent width={'100%'} bg='white' padding='0px' overflow={'hidden'} borderRadius={'10px'}>
            <ModalBody width='100%' height='100%' paddingX='20px' overflow={'hidden'} paddingY='20px'>

              <Flex width={'100%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

                <HStack justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                    <FiX fontSize={'25px'} onClick={() => onClose()} />
                    <CustomText color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Medium'}>Users</CustomText>
                </HStack>

                <Box width='100%' height="300px" overflowY={'auto'}>
                    {
                        users.length < 1 && (
                            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                <CustomText>No user has liked this post.</CustomText>
                            </VStack>
                        )
                    }
                    {
                        users.length > 0 && users.map((item, index) => (
                            <HStack width='100%' paddingTop={'10px'} justifyContent={'space-between'} height='60px' key={index.toString()} borderBottom={'1px'} borderBottomColor={'lightgrey'} alignItems={'center'}>
                                 <HStack>
                                    <Box width='42px' height='42px' borderRadius={'20px 0px 20px 20px'} borderWidth={index === users.length - 1 ? '0px':'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                                            { item?.data.imgMain.value === null && (
                                                <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                                    <CustomText fontFamily={'DM-Regular'}>{item.firstName[0].toUpperCase()} {item.lastName[0].toUpperCase()}</CustomText>
                                                </VStack>
                                            )}
                                            {
                                                item.data.imgMain.value && (
                                                    <Image src={`${IMAGE_URL}${item.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                                                )
                                            }
                                    </Box>
                                    <VStack alignItems={'flex-start'} spacing={0}>
                                        <CustomText color='brand.chasescrollButtonBlue' fontFamily={'DM-Bold'} fontSize={'14px'}>{item.firstName} {item.lastName}</CustomText>
                                        <CustomText color='brand.chasescrollButtonBlue' fontFamily={'DM-Regular'} fontSize={'12px'}>@{item.username}</CustomText>
                                    </VStack>
                                 </HStack>
                                 <Checkbox onChange={() => addID(item.userId)} isChecked={userIds.includes(item.userId)} checked={userIds.includes(item.userId)} size={'md'} colorScheme='blue' />
                            </HStack>
                        ))
                    }
                </Box>

              </Flex>

            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default GetUserModal