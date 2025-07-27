import useCustomTheme from '@/hooks/useTheme';
import { IMediaContent, IComment } from '@/models/MediaPost'
import { Button, Flex, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { IoHeart } from 'react-icons/io5';
import { FiTrash2 } from 'react-icons/fi';
import { IUser } from '@/models/User';
import useComment from '@/hooks/useComment';
import LoadingAnimation from '../sharedComponent/loading_animation';
import { useRouter } from 'next/navigation';
import { textLimit } from '@/utils/textlimit';
import ModalLayout from '../sharedComponent/modal_layout';
import CustomText from '../general/Text';
import { VscReply } from "react-icons/vsc";
import { capitalizeFLetter } from '@/utils/capitalLetter';

interface IProps {
    data: IMediaContent,
    showInput: any,
    setReply: any,
    replyData: any,
    mobile?: boolean,
    user?: IUser | null
}

export default function CommentList({
    data,
    showInput,
    setReply,
    replyData,
    mobile,
    user
}: IProps) {


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor,
        inputBorderColor
    } = useCustomTheme();

    const [replyCountData, setReplyCountData] = useState(0)
    const [showAction, setShowAction] = useState("")
    const [showText, setShowText] = useState("")
    const [showReplies, setShowReplies] = useState("")
    const [showActionReply, setShowActionReply] = useState("")
    const [open, setOpen] = useState(false)
    const [commentID, setCommentID] = useState("")
    const [contentType, setContentType] = useState("")
    const contentRef = useRef<HTMLDivElement>(null);

    const deleteCommentHandler = (item: string, type: "Comment" | "Reply") => {
        setOpen(true)
        setCommentID(item)
        setContentType(type)
    }

    const [showReply, setShowReply] = useState("")

    const { setPostID, commentsData, hasNextPage, likeComment, deleteComment, likeSubComment, deleteSubComment, isLoading, isRefetching } = useComment()

    useEffect(() => {
        setPostID(data?.id)
    }, [])

    useEffect(() => {
        if (deleteComment?.isSuccess) {
            setOpen(false)
        }
        if (deleteSubComment?.isSuccess) {
            setOpen(false)
        }
    }, [deleteComment?.isSuccess, deleteSubComment?.isSuccess])

    const Id = localStorage.getItem('user_id');

    const clickReplyHandler = (data: IComment, user: IUser) => {
        setReply({
            user: user,
            data: data
        })

        setShowReply(data?.id)

        showInput(true)
    }

    const router = useRouter()

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        // setReply({} as any)
    }, [isRefetching])

    const onMouseOver = (item: any) => {
        if (!mobile) {
            setShowAction(item)
        }
    }

    const onMouseOut = () => {
        if (!mobile) {
            setShowAction("")
        }
    }

    return (
        <Flex w={"full"} maxW={"578px"} px={mobile ? "4" : "0px"} py={"4"} bg={mainBackgroundColor} flexDir={"column"} position={"relative"} overflowY={"auto"} alignItems={"start"} >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} >
                <Flex w={"full"} gap={"4"} bg={mainBackgroundColor} flexDirection={"column"} >
                    {commentsData?.map((item, index) => {
                        return (
                            <Flex onMouseOver={() => onMouseOver(item?.id)} onMouseLeave={() => onMouseOut()} key={index} flexDirection={"column"} gap={"6"}  >
                                <Flex w={"full"} gap={"0px"} >
                                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} w={"fit-content"} >
                                        <UserImage border="1.3px" font={"14px"} size={"33px"} image={item?.user?.data?.imgMain?.value} data={item?.user} />
                                    </Flex>
                                    <Flex flexDirection={"column"} w={"full"} maxW={["fit-content", "200px", "300px"]}  >
                                        <Flex position={"relative"} flexDir={"column"} bg={mainBackgroundColor} w={"full"} maxW={["fit-content", "200px", "300px"]} rounded={"16px"} pb={"1"} px={"2"} >
                                            <Flex alignItems={"center"} gap={"1"} >
                                                <Text fontSize={"10px"} role='button' onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} fontWeight={"600"} >{textLimit(item?.user?.username, 15)}</Text>
                                                <Flex w={"full"} justifyContent={"space-between"} >
                                                    <Text fontSize={"10px"}>{moment(item?.timeInMilliseconds).fromNow()?.replace("ago", "")}</Text>
                                                </Flex>
                                            </Flex>
                                            <Text color={headerTextColor} fontSize={"12px"} mt={"1"} >{(item?.comment?.length > 100 && showText !== item?.id) ? textLimit(capitalizeFLetter(item?.comment), 100) : capitalizeFLetter(item?.comment)} {item?.comment?.length > 100 && <p style={{ color: primaryColor, fontWeight: "bold" }} role='button' onClick={() => setShowText((prev) => prev === item?.id ? "" : item?.id)} >{item?.id === showText ? "show less" : "show more"}</p>}</Text>
                                        </Flex>
                                        <Flex w={"full"} maxW={["fit-content", "200px", "300px"]} gap={"6"} px={"3"} >
                                            <VscReply onClick={() => clickReplyHandler(item, item?.user)} fontSize='15px' color={headerTextColor} cursor='pointer' />
                                            {item?.user?.userId === user?.userId && (
                                                <FiTrash2
                                                    onClick={() => deleteCommentHandler(item?.id, "Comment")}
                                                    fontSize='15px' color={'red'} cursor='pointer' />
                                            )}
                                        </Flex>

                                        {item?.subComments?.totalElements > 0 && (
                                            <>
                                                {showReply !== item?.id ?
                                                    <Flex as={"button"} mt={"2"} fontSize={"12px"} gap={"2"} onClick={() => setShowReply((prev) => prev === item?.id ? "" : item?.id)} w={"full"} alignItems={"center"}  >
                                                        <Flex w={"50px"} h={"1px"} bgColor={"#B6B6B6"} />view {item?.subComments?.totalElements} more {item?.subComments?.totalElements > 1 ? "replies" : "reply"}
                                                    </Flex>
                                                    :
                                                    <Flex as={"button"} mt={"2"} fontSize={"12px"} gap={"2"} onClick={() => setShowReply((prev) => prev === item?.id ? "" : item?.id)} w={"full"} alignItems={"center"}  >
                                                        <Flex w={"50px"} h={"1px"} bgColor={"#B6B6B6"} />hide rely
                                                    </Flex>
                                                }
                                            </>
                                        )}
                                        <Flex position={"absolute"} zIndex={"10"} right={"4"} w={"30px"} insetY={"auto"} alignItems={"center"} >

                                            <IoHeart
                                                onClick={() => likeComment.mutate(item?.id)}
                                                cursor='pointer' fontSize='20px' color={
                                                    item?.likeStatus === 'LIKED' ? 'red' : 'grey'} width={'20px'} height={'20px'} />
                                            {item?.likeCount > 0 && (
                                                <Text fontSize={"12px"} as={"button"} >{item?.likeCount}</Text>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Flex>
                                {showReply === item?.id && (
                                    <Flex w={"full"} flexDir={"column"} gap={"4"} pl={"40px"} backgroundColor={mainBackgroundColor} >
                                        {item?.subComments?.content?.map((subitem, subindex) => {
                                            return (
                                                <Flex key={subindex} w={"full"} position={"relative"} onMouseOver={() => setShowActionReply(subitem?.id)} onMouseLeave={() => setShowActionReply("")} gap={"1"} >
                                                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} w={"fit-content"} >
                                                        <UserImage border="1.3px" font={"14px"} size={"33px"} image={subitem?.user?.data?.imgMain?.value} data={subitem?.user} />
                                                    </Flex>
                                                    <Flex flexDirection={"column"} w={"full"} maxW={["fit-content", "200px", "300px"]}  >
                                                        <Flex flexDir={"column"} w={"full"} maxW={["fit-content", "200px", "300px"]} rounded={"16px"} >
                                                            <Flex position={"relative"} flexDir={"column"} bg={mainBackgroundColor} w={"full"} maxW={["fit-content", "200px", "300px"]} rounded={"16px"} pb={"1"} px={"2"} >
                                                                <Flex alignItems={"center"} gap={"1"} >
                                                                    <Text fontSize={"10px"} role='button' onClick={() => router?.push(`/dashboard/profile/${subitem?.user?.userId}`)} fontWeight={"600"} >{textLimit(subitem?.user?.username, 15)}</Text>
                                                                    <Flex w={"full"} justifyContent={"space-between"} >
                                                                        <Text fontSize={"10px"}>{moment(subitem?.timeInMilliseconds).fromNow()?.replace("ago", "")}</Text>
                                                                    </Flex>
                                                                </Flex>
                                                                <Text color={headerTextColor} fontSize={"12px"} mt={"1"} ><span style={{ fontWeight: "600" }} >@{textLimit(item?.user?.username, 15)}</span> {(subitem?.comment?.length > 100 && showText !== subitem?.id) ? textLimit(capitalizeFLetter(subitem?.comment), 100) : capitalizeFLetter(subitem?.comment)} {subitem?.comment?.length > 100 && <p style={{ color: primaryColor, fontWeight: "bold" }} role='button' onClick={() => setShowText((prev) => prev === subitem?.id ? "" : subitem?.id)} >{subitem?.id === showText ? "show less" : "show more"}</p>}</Text>
                                                            </Flex>
                                                        </Flex>
                                                        {subitem?.user?.userId === user?.userId && (
                                                            <Flex w={"full"} mt={"1"} maxW={["fit-content", "200px", "300px"]} gap={"6"} px={"3"} >
                                                                <FiTrash2
                                                                    onClick={() => deleteCommentHandler(subitem?.id, "Reply")}
                                                                    fontSize='15px' color={'red'} cursor='pointer' />
                                                            </Flex>
                                                        )}
                                                        <Flex position={"absolute"} zIndex={"10"} right={["0.5px", "0.5px", "4"]} w={"30px"} insetY={"auto"} alignItems={"center"} >

                                                            <IoHeart
                                                                onClick={() => likeSubComment.mutate(subitem?.id)}
                                                                cursor='pointer' fontSize='20px' color={
                                                                    subitem?.likeStatus === 'LIKED' ? 'red' : 'grey'} width={'20px'} height={'20px'} />
                                                            {subitem?.likeCount > 0 && (
                                                                <Text fontSize={"12px"} as={"button"} >{subitem?.likeCount}</Text>
                                                            )}
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                )}
                            </Flex>
                        )
                    })}
                    {(hasNextPage && commentsData?.length > 0) && (
                        <Text as={"button"} fontWeight={"500"} color={primaryColor} >View more comments</Text>
                    )}
                </Flex>
            </LoadingAnimation>
            <ModalLayout open={open} close={setOpen} size={"xs"}>

                <VStack width='100%' justifyContent={'center'} height='100%' p={"6"} alignItems={'center'} spacing={3}>
                    <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                    <CustomText fontFamily='DM-Bold' textAlign={'center'} fontSize={'20px'}>Delete Your {contentType === "Comment" ? "Comment" : "Reply"}</CustomText>
                    <CustomText fontFamily={'DM-Regular'} textAlign={'center'} fontSize={'16px'} color='grey'>Are you sure you want to delete this comment ? this action cannot be undone.</CustomText>
                    {contentType === "Comment" ? (
                        <Button isLoading={deleteComment?.isLoading} onClick={() => deleteComment.mutate(commentID)} width='100%' height='42px' bg='red' color="white" _hover={{ backgroundColor: "red" }} >Delete</Button>
                    ) : (

                        <Button isLoading={deleteSubComment?.isLoading} onClick={() => deleteSubComment.mutate(commentID)} width='100%' height='42px' bg='red' color="white" >Delete</Button>
                    )}
                    <Button onClick={() => setOpen(false)} width='100%' height='42px' borderWidth={'0px'} color="grey" >Cancel</Button>
                </VStack>
            </ModalLayout>
        </Flex>
    )
}
