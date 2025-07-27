import useCustomTheme from '@/hooks/useTheme'
import { Button, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerCloseButton, DrawerContent, Flex, Spinner, Text, Drawer, DrawerBody } from '@chakra-ui/react'
import { count } from 'console'
import React, { useEffect, useRef, useState } from 'react'
import { Sheet } from 'react-modal-sheet'
import CommentInput from './commentInput'
import CommentList from './commentList'
import { IMediaContent } from '@/models/MediaPost'
import useGetUser from '@/hooks/useGetUser'
import { useDetails } from '@/global-state/useUserDetails'

export default function BottomSheetComment({ open, setOpen, content, liked, loadingLikes, count, likesHandle, numberComments }: {
    open: boolean, 
    setOpen: any,
    content: IMediaContent,
    loadingLikes?: any,
    likesHandle?: any,
    liked?: any,
    numberComments?: string
    count?: any,
}) {


    const {
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
 
    const { user } = useDetails((state) => state);
    const [show, setShow] = useState(true)
    const [replyData, setReplyData] = useState({} as any)

    return ( 
        <Drawer
            isOpen={open}
            placement="bottom"
            size={"full"}
            onClose={setOpen}
        >
            <DrawerOverlay />
            <DrawerContent paddingX={"0px"} >
                <DrawerCloseButton />
                <DrawerHeader><Text fontWeight={"500"} fontSize={"16px"} >Comments</Text></DrawerHeader>

                <DrawerBody>
                    <CommentList user={user} mobile={true} replyData={replyData} setReply={setReplyData} data={content} showInput={setShow} />
                </DrawerBody>

                <DrawerFooter>

                    <CommentInput
                        open={open}
                        setShow={setShow}
                        replyData={replyData}
                        data={content}
                        user={user}
                        setReplyData={setReplyData}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
