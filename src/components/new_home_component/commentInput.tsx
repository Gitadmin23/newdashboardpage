import { Flex, Textarea, Box, Spinner, Text, Input } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import UserImage from '../sharedComponent/userimage'
import { NewSendIcon } from '../svg'
import { IUser } from '@/models/User'
import useComment from '@/hooks/useComment'
import { IComment, IMediaContent } from '@/models/MediaPost'
import { textLimit } from '@/utils/textlimit'
import useCustomTheme from '@/hooks/useTheme'
import { IoClose } from 'react-icons/io5'
import { useDetails } from '@/global-state/useUserDetails'

interface IProps {
    user: IUser | null
    data: IMediaContent,
    replyData: {
        user: IUser,
        data: IComment
    },
    setShow: any;
    setReplyData: any
    open: boolean,  
}

export default function CommentInput({ user, data, replyData, setShow, setReplyData, open }: IProps) {

    const { addComment, addCommentHandler, commentsInput, setCommentsInput, setPostID, addSubCommentHandler, subCommentsInput, setSubCommentsInput, createSubComment } = useComment()

    useEffect(() => {
        setPostID(data?.id)
    }, []) 

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    
    const inputRef: any = useRef(null);
  
    useEffect(() => {
      if (open && inputRef.current) {
        inputRef.current.focus();
      }
    }, [open]);

    useEffect(() => {
        setShow((prev: any) => !prev)
    }, [inputRef]);

    const changeHandler = (item: string) => {
        console.log(item);
        
        if(replyData?.data?.id){
            setSubCommentsInput(item)
        } else {
            setCommentsInput(item)
        }
    }

    const handle = (e: any) => {
        // handleFocus(e)
        changeHandler(e.target.value)
    }

    useEffect(()=> {
        if(createSubComment?.isSuccess){
            setReplyData({} as any)
        }
    }, [createSubComment?.isSuccess])

    useEffect(()=> {
        if(addComment?.isSuccess || createSubComment?.isSuccess){
            setShow((prev: any) => !prev)
        }
    }, [addComment?.isSuccess, createSubComment?.isSuccess])

    const clickHandler = () => {
        setShow(false)
        setCommentsInput("")
    }

    const { user: userdata, } = useDetails((state) => state); 

    return (
        <Flex w={"full"} gap={"1"} mt={"2"} bg={mainBackgroundColor} flexDir={"column"} >
            {replyData?.data?.id && (
                <Text fontSize={"14px"} ml={"2"} >replying to <span style={{ color: primaryColor, fontWeight: "bold" }} >{replyData?.user?.username}</span> {`"${textLimit(replyData?.data?.comment, 20)}"`}</Text>
            )}
            {/* <Box onClick={clickHandler} as='button' rounded={"full"} bgColor={primaryColor} position={"absolute"} top={"-2"} right={"1"} >
                <IoClose size={"20px"} />
            </Box> */}
            <Flex pos={"relative"} w={"full"} gap={"1"}  bg={mainBackgroundColor} h={"fit-content"} alignItems={"start"} p={"2"} rounded={"12px"} >
                {/* <Box w={"fit-content"} >
                    <UserImage size={"36px"} fontWeight={"500"} font={"14px"} border={"1.5px"} image={userdata?.data?.imgMain?.value ?? user?.data?.imgMain?.value} data={userdata ?? user} />
                </Box> */}
                <Input
                fontSize={"14px"} 
                    value={replyData?.data?.id ? subCommentsInput : commentsInput} onChange={(e) => handle(e)}
                    h={"45px"} w={"full"} bgColor={"#F2F3FB"} borderWidth={"0px"} _hover={{ borderWidth: "0px" }} focusBorderColor='transparent' color={"black"} placeholder={!replyData?.data?.id ? 'Comment' : "Reply"} _placeholder={{ color: "#00000033" }}
                    style={{
                        fontSize: '16px',
                        WebkitTextSizeAdjust: '100%',
                        position: 'relative',
                        zIndex: 4
                    }} />
                {!replyData?.data?.id && (
                    <Box as='button' w={"fit-content"} mt={"auto"} >
                        {addComment?.isLoading ?
                            <Spinner size={"sm"} /> :
                            <Box as='button' onClick={() => addCommentHandler({
                                postID: replyData?.data?.id ? replyData?.data?.id : data?.id,
                                comment: replyData?.data?.id ? subCommentsInput : commentsInput
                            })}  >
                                <NewSendIcon />
                            </Box>
                        }
                    </Box>
                )}
                {replyData?.data?.id && (
                    <Box as='button' w={"fit-content"} mt={"auto"} >
                        {createSubComment?.isLoading ?
                            <Spinner size={"sm"} /> :
                            <Box as='button' onClick={() => addSubCommentHandler({
                                commentID: replyData?.data?.id,
                                comment: subCommentsInput
                            })}  >
                                <NewSendIcon />
                            </Box>
                        }
                    </Box>
                )}
            </Flex>
        </Flex>
    )
}
