import { useDetails } from '@/global-state/useUserDetails';
import { Box, Flex, Image, Input, Progress, Spinner, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UserImage from '../sharedComponent/userimage';
import getUser from '@/hooks/useGetUser';
import { NewPhotoIcon, NewSendIcon } from '../svg';
import ModalLayout from '../sharedComponent/modal_layout';
import { IoAdd, IoClose } from 'react-icons/io5';
import useHome from '@/hooks/useHome';
import UploadImage from './uploadImage';
import { useRouter } from 'next/navigation';
import useCustomTheme from '@/hooks/useTheme';

export default function Createpost() {

    const { user } = getUser()
    const inputRef = React.useRef<HTMLInputElement>(null);

    // const [open, setOpen] = useState(false)
    const [fileIndex, setFileIndex] = useState(0)
    const toast = useToast()
    const router = useRouter()

    const { bodyTextColor, inputColor, secondaryBackgroundColor, mainBackgroundColor, borderColor, inputBorderColor, headerTextColor, inputtextColor } = useCustomTheme();

    const { createPost, loadingCompress, isLoading, post, setPost, handleImagePicked, files, removeFile, emptyFiles, createPostWithFiles, uploadingfile, open, setOpen, setFiles, uploadProgress } = useHome()

    const handlePick = React.useCallback((data: FileList) => {
        handleImagePicked(data);
    }, [handleImagePicked]);

    const clickHandler = () => {
        if (post) {
            createPost({
                isGroup: false,
                text: post,
                type: "NO_IMAGE_POST",
                sourceId: user?.userId ?? ""
            })
        } else {
            toast({
                title: "Error",
                description: "Enter Your Post",
                position: "top-right"
            })
        }
    };

    const closeHandler = () => {
        setOpen(false)
        setPost("")
        emptyFiles()
    }

    useEffect(() => {
        setPost("")
        emptyFiles()
        setFiles([])
    }, [open])

    const { user: userdata, } = useDetails((state) => state);

    return (
        <Flex w={["full", "full", "full", "full", "619px"]} pt={["4", "4", "4", "4", "8"]} px={["4", "4", "4", "4", "8"]} roundedBottom={"16px"} >
            <Flex w={"full"} p={"4"} gap={"2"} rounded={"12px"} flexDir={"column"} style={{ boxShadow: "0px 2px 2px 0px #00000008" }} bgColor={mainBackgroundColor} h={"fit-content"} >
                <Flex pos={"relative"} w={"full"} bgColor={inputColor} gap={"1"} h={"fit-content"} alignItems={"center"} p={"2"} rounded={"12px"} >
                    <Box as={"button"} onClick={() => router?.push(`/dashboard/profile/${user?.userId}`)} w={"fit-content"} >
                        <UserImage size={"36px"} fontWeight={"500"} font={"14px"} border={"1.5px"} image={userdata?.data?.imgMain?.value ? userdata?.data?.imgMain?.value : user?.data?.imgMain?.value} data={userdata ?? user} />
                    </Box>
                    <Input value={post} onChange={(e) => setPost(e.target.value)} h={"45px"} bgColor={inputColor} color={inputtextColor} w={"full"} borderWidth={"0px"} _hover={{ borderWidth: "0px", }} focusBorderColor='transparent' placeholder={`Share your thought ${!user?.username?.includes(".com") ? user?.username : ""}`} _placeholder={{ color: "#00000033" }} />
                    <Box onClick={clickHandler} as='button' w={"fit-content"} >
                        {isLoading ?
                            <Spinner size={"sm"} /> :
                            <NewSendIcon />
                        }
                    </Box>
                </Flex>
                <Flex as={"button"} onClick={() => setOpen(true)} gap={"2"} alignItems={"center"} >
                    <NewPhotoIcon />
                    <Text mt={"3px"} fontSize={"14px"} >Add Photos /Video in your post</Text>
                </Flex>
            </Flex>
            <ModalLayout open={open} rounded='32px' size={"lg"} close={closeHandler} >
                <Flex position={"relative"} bg={mainBackgroundColor} p={"5"} flexDir={"column"} gap={"3"} >
                    {(uploadingfile) && (
                        <Flex position={"absolute"} justifyContent={"center"} px={"4"} gap={"2"} alignItems={"center"} zIndex={"30"} inset={"0px"} bgColor={"#000000c3"} >
                            <Progress w={"full"} hasStripe value={uploadProgress} h={"35px"} rounded={"2xl"} />
                            {loadingCompress ? 
                            <Text position={"absolute"} inset={"auto"} zIndex={"20"} color={"black"} >Compressing...</Text>
                                : <Text color={"white"} >{uploadProgress}%</Text>}
                        </Flex>
                    )}
                    <Box as='button' onClick={closeHandler} >
                        <IoClose size={"25px"} />
                    </Box>
                    <Flex pos={"relative"} w={"full"} bgColor={inputColor} color={inputtextColor} gap={"1"} h={"fit-content"} alignItems={"start"} p={"2"} rounded={"12px"} >
                        <Box w={"fit-content"} >
                            <UserImage size={"36px"} fontWeight={"500"} font={"14px"} border={"1.5px"} image={user?.data?.imgMain?.value} data={user} />
                        </Box>
                        <Input value={post} onChange={(e) => setPost(e.target.value)} h={"45px"} w={"full"} borderWidth={"0px"} _hover={{ borderWidth: "0px", }} focusBorderColor='transparent' placeholder={`Share your thought ${!user?.username?.includes(".com") ? user?.username : ""}`} />
                    </Flex>
                    <Flex w={"full"} h={"300px"} rounded={"8px"} >
                        <UploadImage handleImagePicked={handleImagePicked} files={files} fileIndex={fileIndex} setFileIndex={setFileIndex} />
                    </Flex>
                    <Flex w={"full"} >
                        {files && (
                            <>
                                {files.length > 0 && (
                                    <Flex w={"full"} overflowX={"auto"} >
                                        <Flex w={"fit-content"} py={"2"} gap={"3"} >
                                            {files?.map((item: File, index: number) => {
                                                return (
                                                    <Flex key={index} w={"12"} h={"12"} rounded={"md"} roundedTopRight={"0px"} borderWidth={fileIndex === index ? "2px" : "1px"} borderColor={fileIndex === index ? "#233CF3" : "gray"} pos={"relative"} justifyContent={"center"} alignItems={"center"} >
                                                        <Flex as={"button"} onClick={() => removeFile(index)} w={"4"} h={"4"} color={"white"} bg={"black"} rounded={"full"} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"-1"} right={"-1"} zIndex={"10"}  >
                                                            <IoClose size="15px" />
                                                        </Flex>
                                                        {files[index].type.startsWith('video') ? (
                                                            <video controls width={'100%'} height={'100%'}>
                                                                <source src={URL.createObjectURL(item)} type='video/*' />
                                                            </video>
                                                        ) : (
                                                            <Image src={URL.createObjectURL(item)} alt='image' width={'100%'} height={'100%'} rounded={"md"} roundedTopRight={"0px"} objectFit={'cover'} />
                                                        )}
                                                    </Flex>
                                                )
                                            })}
                                            <Flex justifyContent={"center"} alignItems={"center"} as={"button"} onClick={() => inputRef.current?.click()} w={"12"} h={"12"} rounded={"md"} roundedTopRight={"0px"} borderWidth={"1px"} pos={"relative"} >
                                                <input hidden type='file' accept="image/*, video/*" ref={inputRef as any} onChange={(e) => handlePick(e.target.files as FileList)} />
                                                {/* <Image src='/assets/images/Add.png' alt='smile' width={'24px'} height={'24px'} /> */}
                                                <IoAdd size={"24px"} />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                )}
                            </>
                        )}
                        <Box onClick={createPostWithFiles} as='button' px={"2"} w={"fit-content"} ml={"auto"} >
                            {(isLoading || uploadingfile) ?
                                <Spinner size={"sm"} /> :
                                <NewSendIcon />
                            }
                        </Box>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
