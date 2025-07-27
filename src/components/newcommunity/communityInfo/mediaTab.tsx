import { Box, Flex, Grid, GridItem, HStack, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useCommunity } from '..'
import { FILE_FORMATS } from '@/utils/acceptedMediatypes'
import { IMediaContent } from '@/models/MediaPost'
import { IMAGE_URL } from '@/services/urls'
import useCustomTheme from '@/hooks/useTheme'
import { RiFolderVideoLine } from 'react-icons/ri'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { IoMdCloudDownload } from 'react-icons/io'
import VideoPlayer from '@/components/general/VideoPlayer'

export default function MediaTab() {

    const [tab, setTab] = useState(0)
    const [show, setShow] = useState(false)
    const [currentInfo, setCurrentInfo] = useState({} as IMediaContent)

    const { mediaPosts, loadingMediaPosts, refMediaPosts, refectingMediaPosts } = useCommunity()

    // console.log(media());
    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();


    const clickHandler = (item: IMediaContent) => {
        setCurrentInfo(item)
        setShow(true)
    }


    const downloadFile = (url: string) => {
        const name = url.split('amazonaws.com/')[1]
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = name;
        anchor.click();
    };

    const FileExtentions = (url: string) => {
        const __format__ = url.split('.');
        const format = __format__[__format__.length - 1];
        return format.toUpperCase();
    }

    const MediaCard = (item: IMediaContent) => {
        const __format__ = item.mediaRef?.split('.');
        const format = __format__[__format__?.length - 1];
        if (FILE_FORMATS.IMAGE_FORM.includes(format)) {
            return <GridItem as={"button"} onClick={() => clickHandler(item)} borderRadius={'5px'} overflow='hidden' width='100%' marginBottom='20px' height={'120px'} >
                {item.mediaRef.startsWith('https://') && <Image src={item.mediaRef} alt='image' />}
                {!item.mediaRef.startsWith('https://') && <Image src={`${IMAGE_URL}${item.mediaRef}`} alt='image' />}
            </GridItem>
        } else if (FILE_FORMATS.VIDEO_FORM.includes(format)) {
            return <GridItem borderRadius={'5px'} maxH={'150px'} overflow='hidden' width='100%' height={'125px'} >
                <VideoPlayer
                    src={`${item.mediaRef}`}
                    measureType="px"
                />
                <Flex as={"button"} onClick={() => clickHandler(item)} w={"100%"} h={"120px"} justifyContent={"center"} alignItems={"center"} rounded={"2xl"} bgColor={primaryColor} >
                    <RiFolderVideoLine size={"40px"} color={"white"} />
                    {/* {} */}
                </Flex>
            </GridItem>
        } else if (item.type === 'WITH_FILE') {
            console.log(item);

            return (
                <Flex as={"button"} shadow={"lg"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} rounded={"5px"} width='100%' height={'120px'} >
                    <Box w={"fit-content"} onClick={() => downloadFile(item.mediaRef)}>
                        <IoMdCloudDownload color={THEME.COLORS.chasescrollButtonBlue} fontSize='40px' />
                    </Box>
                    <Box width="">
                        <CustomText color="brand.chasescrollButtonBlue" fontFamily={'DM-Bold'} fontSize={'16px'}>{FileExtentions(item.mediaRef)}</CustomText>
                    </Box>
                </Flex>
            )
        }
    }

    return (
        <Flex py={"6"} w={"full"} flexDir={"column"} >
            <Flex w={"full"} h={"48px"} bgColor={"#F1F2F9"} >
                <Flex as={"button"} onClick={() => setTab(0)} w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} fontSize={"14px"} fontWeight={"700"} color={tab === 0 ? "#5D70F9" : "#B3B3B3"} >
                    Media
                </Flex>
                {/* <Flex as={"button"} disabled={true} cursor={"not-allowed"} onClick={() => setTab(1)} w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} fontSize={"14px"} fontWeight={"700"} color={tab === 1 ? "#5D70F9" : "#B3B3B3"} >
                    Files
                </Flex>
                <Flex as={"button"} disabled={true} cursor={"not-allowed"} onClick={() => setTab(2)} w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} fontSize={"14px"} fontWeight={"700"} color={tab === 2 ? "#5D70F9" : "#B3B3B3"} >
                    Links
                </Flex> */}
            </Flex>
            {tab === 0 && (
                <Grid templateColumns='repeat(2, 1fr)' mt={"6"} gap={"4"}>
                    {mediaPosts?.filter((item: any) => (item.type === 'WITH_IMAGE' || item.type === 'WITH_VIDEO_POST' || item.type === 'WITH_FILE'))?.map((item: IMediaContent, index: number) => {
                        if (mediaPosts?.filter((item: any) => (item.type === 'WITH_IMAGE' || item.type === 'WITH_VIDEO_POST')).length === index + 1) {
                            return (
                                <GridItem ref={refMediaPosts} key={index} w='100%' h={"125px"} >
                                    <MediaCard {...item} />
                                </GridItem>
                            )
                        } else {
                            return (
                                <GridItem key={index} w='100%' h={"125px"} >
                                    <MediaCard {...item} />
                                </GridItem>
                            )
                        }
                    })}
                </Grid>
            )}

            <ModalLayout title={"Media"} open={show} close={setShow} size={"lg"} >
                <Flex h={"400px"} >

                    {currentInfo.type === 'WITH_VIDEO_POST' && (
                        <video controls width={'100%'} height={'100px'} style={{ borderRadius: '20px' }}>
                            <source height={"100px"} src={currentInfo.mediaRef} />
                        </video>
                    )}
                    {currentInfo.type === 'WITH_IMAGE' && (
                        <Image onClick={() => setShow(true)} src={`${currentInfo?.mediaRef}`} alt='img' width={'100%'} height={'100%'} objectFit={'cover'} borderRadius={'20px'} />
                    )}
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
