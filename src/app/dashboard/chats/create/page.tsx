'use client'
import { Modal, ModalOverlay, ModalContent, ModalBody, useToast, Box, HStack, VStack, Switch, Image, Button } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { FiFolderPlus, FiX } from 'react-icons/fi';
import CustomText from '@/components/general/Text';
import { useForm } from '@/hooks/useForm';
import { communitySchema, groupChatSchema } from '@/services/validations';
import { CustomInput } from '@/components/Form/CustomInput';
import { useMutation, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { useDetails } from '@/global-state/useUserDetails';
import { useRouter } from 'next/navigation'
import { IUser } from '@/models/User';
import GetUserModal from '@/components/modals/chat/GetUserModal';

function CreateChat() {
    const [file, setFile] = React.useState<File | null>(null);
    const [description, setDescription] = React.useState('');
    const [user, setUsers] = React.useState<IUser[]>([])
    const [url, setUrl] = React.useState('');
    const [isPublic, setIsPublic] = React.useState(true);
    const obj = React.useRef<{ name: string, description: string } | null>(null);
    const [ids, setIds] = React.useState<string[]>([]);
    const [showModal, setShowModal] = React.useState(false);

    const { userId, email, } = useDetails((state) => state);
    const queryClient = useQueryClient();
    let fileReader = React.useRef<FileReader|null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();
    const router = useRouter();

    React.useEffect(() => {
        fileReader.current = new FileReader();
    }, []);

    // mutations
    const createCommunity = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.CHAT_MESSGAE}`, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getMyCommunities']);
            toast({
                title: 'success',
                description: 'Group created',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'success',
            });
            setUrl('');
            setFile(null);
            setIds([]);
            queryClient.invalidateQueries(['getChats'])
            router.back()
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'An error occured while trying to create a community',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'error',
            });
        }
    })
    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${URLS.UPLOAD_IMAGE}/${userId}`, data),
        onSuccess: (data) => {
            const dataa = {
                "image": data.data.fileName,
                "name": obj?.current?.name,
                "type": "GROUP",
                "typeID": userId,
                "users": ids,
              }
            console.log(dataa);
            createCommunity.mutate(dataa);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while trying to upload image',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'error',
            });
        },
    });

    const { renderForm } = useForm({
        defaultValues: {
            name: '',
        },
        validationSchema: groupChatSchema,
        submit(data) {
            handleSubmit(data);
        },
    });



    React.useEffect(() => {
        if(fileReader !== null) {
            (fileReader.current as FileReader).onload = () => {
                setUrl(fileReader?.current?.result as string);
                console.log(`URL -> ${fileReader?.current?.result}`)
            }
        }
    }, [fileReader])

    // functitons
    const handleFilePicked = (file: FileList) => {
        const image = file[0];
        console.log(file);
        if (!image.type.startsWith('image')) {
            toast({
                title: 'Warning',
                description: 'You can only pick an image',
                position: 'top-right',
                isClosable: true,
                status: 'warning',
                duration: 5000,
            });
            return;
        }
        setFile(image);
        fileReader?.current?.readAsDataURL(image);
    }

    const handleSubmit = (data: any) => {
        const dd = data;
        console.log(data);
        if (url === '') {
            toast({
                title: 'warning',
                description: 'You must select an image',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'warning',
            });
            return
        }
        obj.current = data;
        const formData = new FormData();
        formData.append('file', file as any);
        uploadImage.mutate(formData);
    }

    const handlePick = (id: string) => {
        if (ids.includes(id)) {
            setIds(prev => prev.filter((item) => item !== id))
        } else {
            setIds(prev => [...prev, id]);
        }
    }
    return renderForm(
        <VStack width='100%' height='100%' overflow={'hidden'} padding={['20px', '0px']} >

            {/* MODAL */}
            <GetUserModal userIds={ids} addID={handlePick} isOpen={showModal} onClose={() => setShowModal(false)} />

            <VStack width={['100%', '40%']}>

                <input hidden type='file' accept='image/*' ref={inputRef as any} onChange={(e) => handleFilePicked(e.target.files as FileList)} />
                <HStack width='100%' height={'60px'} justifyContent={'flex-start'} alignItems={'center'}>
                    <FiX fontSize={'25px'} onClick={() => router.back()} />
                </HStack>

                <Box cursor={'pointer'} onClick={() => inputRef.current?.click()} width='100%' height="200px" borderWidth='2px' borderColor='grey' borderRadius={'20px'} borderStyle={'dashed'} overflow={'hidden'} bg='whitesmoke' >
                    {url === '' && file === null && (
                        <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                            <Image src='/assets/svg/folder-cloud.svg' alt='icon' width={50} height={50} />
                            <CustomText color='white' fontSize={'md'}>Upload image here</CustomText>
                        </VStack>
                    )}
                    {
                        url !== '' && file !== null && (
                            <Image src={url} alt='image' objectFit={'cover'} style={{ width: '100%', height: '100%' }} />
                        )
                    }
                </Box>

                <VStack marginY={'20px'} width='100%' spacing={5} >
                    <CustomInput name='name' placeholder='Group name' type='text' isPassword={false} />
                    <VStack width='100%'>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{
                            width: '100%', height: 'auto', backgroundColor: 'transparent',
                            outline: 'none', resize: 'none', borderWidth: '1px', borderColor: 'lightgrey',
                            borderRadius: '8px', padding: '10px'
                            }} placeholder={`Group Descriptioon`} />
                            <CustomText>{description.length}/50</CustomText>
                    </VStack>
                </VStack>

                <Box width='100%' minHeight={'50px'} maxHeight={'260px'} borderWidth={'1px'} borderColor={'brand.chasescrollButtonBlue'} borderRadius={'10px'} position={'relative'}>
                    <VStack alignItems={'center'} justifyContent={'center'} width={'100%'} height='100%'>
                        { ids.length < 1 && <CustomText>No member selected</CustomText>}
                        { ids.length > 0 && <CustomText>{ids.length} members selected</CustomText>}
                    </VStack>
                    <VStack bg='white' justifyContent={'center'} position={'absolute'} top='-20px' left={'20px'} width='150px' height={'20px'}>
                        <CustomText onClick={() => setShowModal(true)} fontFamily={'DM-Bold'} fontSize={'16px'} color='brand.chasescrollButtonBlue' cursor={'pointer'}>Select Member</CustomText>
                    </VStack>
                </Box>

                <Button type='submit' marginTop={'20px'} variant={'solid'} bg={'brand.chasescrollButtonBlue'} isLoading={uploadImage.isLoading || createCommunity.isLoading} width='100%' borderRadius={'10px'} color='white' > Submit</Button>

            G</VStack>

        </VStack>
    )
}

export default CreateChat;