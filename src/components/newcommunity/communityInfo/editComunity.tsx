import CommunityImage from '@/components/sharedComponent/community_image'
import { PhotoIcon } from '@/components/svg'
import { Box, Button, Flex, HStack, Input, Spinner, Switch, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCommunity } from '..'
import CustomText from '@/components/general/Text'

export default function EditComunity() {

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [imgSrc, setImgSrc] = useState("")

    const { updateGroup, activeCommunity, handleUpdateGroup, setCommunityName, communityName, fileUploadHandler, uploadedFile, loadingImage, setCommunityDescirption, communityDescirption, isPublic, setIsPublic } = useCommunity()

    useEffect(() => {
        if (uploadedFile[0]?.url) {
            setImgSrc(uploadedFile[0].url)
        } else if (activeCommunity?.data?.imgSrc) {
            setImgSrc(activeCommunity?.data?.imgSrc)
        }
    }, [uploadedFile, activeCommunity?.data?.imgSrc])

    useEffect(() => {
        setCommunityName(activeCommunity?.data?.name ?? "")
        setCommunityDescirption(activeCommunity?.data?.description ?? ""),
            setIsPublic(activeCommunity?.data?.isPublic ?? false)
    }, [])

    return (
        <Flex flexDir={"column"} alignItems={"center"} w={"full"} py={"8"} gap={"5"} >

            <input type='file' ref={inputRef} onChange={(e) => fileUploadHandler(e.target.files as FileList)} accept='image/png, image/jpeg, image/jpg, video/mp4' hidden />

            <Button isDisabled={loadingImage} onClick={() => inputRef.current?.click()} outline={"none"} w={"fit-content"} h={"fit-content"} bg={"transparent"} _hover={{ backgroundColor: "transparent" }} pos={"relative"} >
                <CommunityImage src={imgSrc} rounded='36px' size={"140px"} />
                <Box pos={"absolute"} bottom={"2"} right={"2"} >
                    {!loadingImage && (
                        <PhotoIcon />
                    )}
                    {loadingImage && (
                        <Spinner size={"sm"} />
                    )}
                </Box>
            </Button>
            <Flex w={"full"} flexDir={"column"} gap={"2"} >
                <CustomText fontFamily={'Satoshi-Bold'}>Community Name</CustomText>
                <Input w={"full"} h={"45px"} value={communityName ? communityName : activeCommunity?.data?.name} onChange={(e) => setCommunityName(e.target?.value)} />
            </Flex>
            <Flex w={"full"} flexDir={"column"} gap={"2"} >
                <CustomText fontFamily={'Satoshi-Bold'}>Community Descirption</CustomText>
                <Textarea w={"full"} h={"100px"} value={communityDescirption ?? activeCommunity?.data?.description} onChange={(e) => setCommunityDescirption(e.target?.value)} />
            </Flex>

            <VStack width='100%' alignItems={'center'} marginBottom={'20px'} >
                <CustomText fontFamily={'Satoshi-Regular'} >Visibiltiy</CustomText>
                <HStack spacing={6} alignItems={'center'} marginTop={'10px'}>
                    <CustomText>Private</CustomText>
                    <Switch isChecked={isPublic === false} onChange={() => setIsPublic(prev => !prev)} />
                </HStack>

                <HStack spacing={6} alignItems={'center'} marginTop={'10px'}>
                    <CustomText>Public</CustomText>
                    <Switch isChecked={isPublic} onChange={() => setIsPublic(prev => !prev)} />
                </HStack>
            </VStack>
            <Button isDisabled={imgSrc ? false : true} width='100%' height='45px' mt={"3"} variant={'solid'} isLoading={updateGroup.isLoading} onClick={() => handleUpdateGroup({
                groupID: activeCommunity?.id ?? "",
                groupData: {
                    name: communityName,
                    imgSrc: imgSrc,
                    description: communityDescirption,
                    isPublic: isPublic
                }
            })} >Update</Button>
        </Flex>
    )
}
