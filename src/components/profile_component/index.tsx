"use client"
import { Box, Flex, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ProfileImage from './profile_image'
import ProfileHeader from './profile_header'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IMAGE_URL, URLS } from '@/services/urls'
import PostThreads from './post_component'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { useLocalModalState } from './modalstate'
import ModalLayout from '../sharedComponent/modal_layout'
import { PostCard } from '../new_home_component'
import { IMediaContent } from '@/models/MediaPost'
import ImageSlider from '../modals/mediapostPages/ImageSlider'
import VideoPlayer from '../general/VideoPlayer'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter, useSearchParams } from 'next/navigation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { count } from 'console'
import moment from 'moment'
import router from 'next/router'
import { IoIosMore } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'
import ShareBtn from '../sharedComponent/new_share_btn'
import UserImage from '../sharedComponent/userimage'
import { HomeHeartIcon, HomeHeartFillIcon, HomeCommentIcon } from '../svg'
import useHome from '@/hooks/useHome'
import httpService from '@/utils/httpService'
import { useQuery } from 'react-query'
import CommentSection from '../new_home_component/commentSection'
import BottomSheetComment from '../new_home_component/bottomSheetComment'
import CommentList from '../new_home_component/commentList'
import useGetUser from '@/hooks/useGetUser'
import CommentInput from '../new_home_component/commentInput'
import { useDetails } from '@/global-state/useUserDetails'

interface Props {
    user_index: string | number
}

function ProfileComponent(props: Props) {
    const {
        user_index
    } = props

    // moving this to a global state
    // for some reason react setState doesn't work as expected in modal

    const { push } = useRouter()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();

    const { setAll, typeID } = useLocalModalState((state) => state);
    const { results, isLoading, ref, isRefetching, data } = InfiniteScrollerComponent({ url: URLS.GET_MEDIA_POST + user_index, limit: 10, filter: "id" })

    const { likesHandle, loadingLikes, liked, setLiked, setLikeCount, likeCount: count, deletePost, deletingPost, deleteModal, setDeleteModal } = useHome()

    const [open, setOpen] = useState(false)
    const [singlePost, setSinglePost] = useState({} as any)
    const query = useSearchParams();
    const [textSize, setTextSize] = useState(100)
    const [numberComments, setNumberComments] = useState("")
    const [openComments, setOpenComments] = useState(false)
    const [openMobile, setOpenMobile] = useState(false)
    // const { user } = useGetUser()

    const { user } = useDetails((state) => state);
    const closeHandler = () => {
        setOpen(false)
    }
    const clickHandler = (item: any) => {
        // console.log(item);
        // setAll({ typeID: item?.id, open: true });
        setOpen(true)
        setSinglePost(item)
        // push("?open=true")
    }

    const clickHandleLike = (id: string) => {
        likesHandle(id)
    }

    const clickHandleComment = () => {
        setOpenComments(true)
    }


    const { } = useQuery(
        [`getPostById-${singlePost?.id}`, singlePost?.id],
        () => httpService.get(`${URLS.GET_POST_BY_ID}/${singlePost?.id}`),
        {
            onSuccess: (data: any) => {
                setLikeCount(data?.data?.likeCount)
                setLiked(data?.data?.likeStatus);
                setNumberComments(data?.data?.comments?.numberOfElements);
            },
            enabled: !!singlePost?.id
        },
    )



    const clickHandleCommentMobile = () => {
        setOpenMobile(true)
    }

    const [show, setShow] = useState(true)
    const [replyData, setReplyData] = useState({} as any)

    console.log(singlePost);

    console.log(user);
    

    return (
        <LoadingAnimation withimg={true} loading={isLoading} refeching={isRefetching} length={results?.length} >
            <Flex width={"full"} justifyContent={"center"} px={"6"} >
                <Grid width={"full"} templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={6} >
                    {results.filter((item: any) => item?.joinStatus !== "SELF")?.map((item: IMediaContent, index: number) => {
                        return (
                            <GridItem onClick={() => clickHandler(item)} as={"button"} key={index} width={"full"} height={"200px"} rounded={"24px"} roundedTopRight={"none"} shadow={"lg"} bgColor={mainBackgroundColor}  >
                                {item?.type === "WITH_IMAGE" && (
                                    <ImageSlider links={item?.multipleMediaRef} type="feed" />
                                )}
                                {item.type === 'WITH_VIDEO_POST' && (item?.mediaRef || item?.multipleMediaRef[0]) &&
                                    <VideoPlayer
                                        src={`${item?.mediaRef ? item?.mediaRef : item?.multipleMediaRef[0]}`}
                                        measureType="px"
                                        rounded='24px'
                                    />
                                }
                            </GridItem>
                        )
                    })}
                </Grid>
                <ModalLayout size={"lg"} open={open} title={"My Post"} close={closeHandler} >
                    <Flex w={"full"} px={"4"} pb={"4"} >
                        {/* <PostCard {...item} /> */}
                        <Flex w={"full"} gap={"3"} flexDir={"column"} >
                            <Flex alignItems={"center"} gap={"3"} h={"fit-content"} w={"full"} rounded={"full"} borderWidth={"0px"} borderColor={borderColor}>
                                <Flex alignItems={"center"} gap={["1", "1", "1"]} >
                                    {/* {(pathname?.includes("share") && data?.email) && (
                                        <Box as='button' onClick={() => router.push("/dashboard")} >
                                            <IoArrowBack role="button" size={"25px"} />
                                        </Box>
                                    )} */}
                                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${singlePost?.user?.userId}`)} gap={"3"} >
                                        <UserImage size={"42px"} data={singlePost?.user} font={"18px"} border={"1px"} image={singlePost?.user?.data?.imgMain?.value} />
                                        <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                            {/* <Text color={"#233DF3"} >{textLimit(capitalizeFLetter(user?.firstName) + " " + capitalizeFLetter(user?.lastName), 15)}</Text> */}
                                            <Text fontSize={"14px"} >{textLimit(capitalizeFLetter(singlePost?.user?.firstName), 20)}</Text>
                                            <Text fontSize={"8px"} color={bodyTextColor} >{moment(singlePost?.timeInMilliseconds).fromNow()}</Text>
                                        </Flex>
                                        <Flex display={["block", "block", "none"]} flexDir={"column"} textAlign={"left"}  >
                                            <Text color={"#233DF3"} fontSize={"14px"} >{textLimit(capitalizeFLetter(singlePost?.user?.firstName) + " " + capitalizeFLetter(singlePost?.user?.lastName), 15)}</Text>
                                            <Text mt={"-4px"} fontSize={"10px"} >@{textLimit(singlePost?.user?.username, 12)}</Text>
                                            <Text fontSize={"8px"} color={bodyTextColor} >{moment(singlePost?.timeInMilliseconds).fromNow()}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                {data?.email && (
                                    <Flex onClick={() => setOpen(true)} as={"button"} ml={"auto"} pr={"1"} >
                                        <IoIosMore size={"25px"} />
                                    </Flex>
                                )}
                            </Flex>
                            {(singlePost?.type === "WITH_IMAGE" || singlePost?.type === "WITH_VIDEO_POST") &&
                                <Flex w={"full"} h={["236px", "236px", "236px", "350px", "500px"]} rounded={"16px"} borderWidth={"1px"} roundedTopRight={"0px"}>
                                    {singlePost?.type === "WITH_VIDEO_POST" && (
                                        <VideoPlayer
                                            src={`${singlePost?.mediaRef ? singlePost?.mediaRef : singlePost?.multipleMediaRef[0]}`}
                                            measureType="px"
                                        />
                                    )}
                                    {singlePost?.type === "WITH_IMAGE" && (
                                        <Flex w={"full"} as={"button"} >
                                            <ImageSlider links={singlePost?.multipleMediaRef} type="feed" />
                                        </Flex>
                                    )}
                                </Flex>
                            }

                            <Flex w={"full"} borderTopWidth={"0px"} alignContent={"center"} justifyContent={"space-between"} >
                                <Flex
                                    justifyContent={"center"}
                                    h={["26px", "26px", "30px"]}
                                    alignItems={"center"} w={"fit-content"} gap={["3px", "2px", "2px"]} >
                                    {/* {!loadingLikes ? */}
                                    <Flex
                                        as={"button"}
                                        disabled={loadingLikes}
                                        onClick={() => clickHandleLike(singlePost?.id)}
                                        width={"fit-content"} h={"fit-content"} >
                                        <Flex
                                            width={["20px", "20px", "24px"]}
                                            display={["none", "block", "block"]}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                        >
                                            {liked !== "LIKED" && (
                                                <HomeHeartIcon color={bodyTextColor} />
                                            )}
                                            {liked === "LIKED" && <HomeHeartFillIcon />}
                                        </Flex>
                                        <Flex
                                            width={["20px", "20px", "24px"]}
                                            h={["26px", "26px", "30px"]}
                                            display={["block", "none", "none"]}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            as={"button"}
                                            disabled={loadingLikes}
                                            onClick={() => clickHandleLike(singlePost?.id)}
                                        >
                                            {liked !== "LIKED" && (
                                                <HomeHeartIcon size='20px' color={bodyTextColor} />
                                            )}
                                            {liked === "LIKED" && <HomeHeartFillIcon size='20px' />}
                                        </Flex>
                                    </Flex>
                                    <Text fontSize={"12px"} fontWeight={"bold"} >{count}</Text>
                                </Flex>
                                <Flex as={"button"}
                                    pt={"2px"}
                                    justifyContent={"center"}
                                    h={["26px", "26px", "30px"]}
                                    display={["none", "none", "flex"]}
                                    alignItems={"center"}
                                    onClick={() => clickHandleComment()} w={"fit-content"} gap={["3px", "2px", "2px"]} >
                                    <Flex
                                        width={["20px", "20px", "24px"]}
                                        display={["none", "block", "block"]}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        color={bodyTextColor}
                                    >
                                        <HomeCommentIcon color={bodyTextColor} />
                                    </Flex>
                                    <Flex
                                        width={["20px", "20px", "24px"]}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        color={bodyTextColor}
                                        display={["block", "none", "none"]}
                                    >
                                        <HomeCommentIcon size='20px' color={bodyTextColor} />
                                    </Flex>
                                    <Text fontSize={"12px"} fontWeight={"bold"} >{numberComments}</Text>
                                </Flex>
                                <Flex as={"button"}
                                    pt={"2px"}
                                    justifyContent={"center"}
                                    display={["flex", "flex", "none"]}
                                    h={["26px", "26px", "30px"]}
                                    alignItems={"center"}
                                    onClick={() => clickHandleCommentMobile()} w={"fit-content"} gap={["3px", "2px", "2px"]} >
                                    <Flex
                                        width={["20px", "20px", "24px"]}
                                        display={["none", "block", "block"]}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        color={bodyTextColor}
                                    >
                                        <HomeCommentIcon color={bodyTextColor} />
                                    </Flex>
                                    <Flex
                                        width={["20px", "20px", "24px"]}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        color={bodyTextColor}
                                        display={["block", "none", "none"]}
                                    >
                                        <HomeCommentIcon size='20px' color={bodyTextColor} />
                                    </Flex>
                                    <Text fontSize={"12px"} fontWeight={"bold"} >{numberComments}</Text>
                                </Flex>
                                <Flex w={"fit-content"} cursor={data?.email ? "pointer" : "not-allowed"} pr={"3"} alignItems={"center"}
                                    h={["26px", "26px", "30px"]} gap={"2px"} >
                                    <ShareBtn type="POST" id={singlePost?.id} />
                                </Flex>
                            </Flex>
                            <Flex px={"2"} >

                                {(singlePost?.text?.includes("https://") || singlePost?.text?.includes("http://") || singlePost?.text?.includes("www.")) ?
                                    (
                                        <Link wordBreak="break-all" href={singlePost?.text} target={"_blank"} textDecor={"underline"} color={primaryColor} fontSize={["14px", "14px", "16px"]} >{textLimit(singlePost?.text, 50)}</Link>
                                    ) :
                                    (
                                        <Text wordBreak="break-all" fontSize={["12px", "12px", "14px"]} >{capitalizeFLetter(textLimit(singlePost?.text, 100))} {singlePost?.text?.length > 100 && <span style={{ color: primaryColor, fontWeight: "700", fontSize: "14px" }} onClick={() => setTextSize((prev) => prev === 100 ? (10 * 100000000000) : 100)} role='button' >{textSize === 100 ? "more" : "less"}</span>}</Text>
                                    )
                                }
                            </Flex>

                            <ModalLayout size={["full", "full", "6xl"]} open={openComments} close={setOpenComments} >
                                <Flex w={"full"} h={["100vh", "100vh", "70vh"]} gap={"4"} bg={mainBackgroundColor} position={"relative"} overflowY={"hidden"} flex={"1"} justifyContent={"space-between"} alignItems={"center"} px={"4"} pt={"4"} >
                                    <Flex w={"full"} h={"full"} alignItems={"center"} flexDirection={"column"} pb={"4"} gap={"4"}  >
                                        <Flex w={"full"} borderWidth={"0.5px"} rounded={"36px"} p={"4"} roundedTopRight={"0px"} borderColor={"#EEEEEE"} h={"full"} flexDir={"column"} >
                                            {/* <Text >{content?.text}</Text> */}
                                            {(singlePost?.type === "WITH_IMAGE" || singlePost?.type === "WITH_VIDEO_POST") &&
                                                <Flex w={"full"} h={["236px", "236px", "236px", "full", "full"]} bgColor={"red"} rounded={"16px"} roundedTopRight={"0px"}>
                                                    {singlePost?.type === "WITH_VIDEO_POST" && (
                                                        <VideoPlayer
                                                            src={`${IMAGE_URL}${singlePost?.mediaRef}`}
                                                            measureType="px"
                                                        />
                                                    )}
                                                    {singlePost?.type === "WITH_IMAGE" && (
                                                        <ImageSlider links={singlePost?.multipleMediaRef} type="feed" />
                                                    )}
                                                </Flex>
                                            }
                                        </Flex>
                                    </Flex>
                                    <Flex w={"full"} flexDir={"column"} h={"full"} position={"relative"} >
                                        <CommentList replyData={replyData} setReply={setReplyData} data={singlePost} showInput={setShow} user={user} />

                                        <Flex w={"full"} h={"fit-content"} zIndex={"60"} mt={"auto"} bg={mainBackgroundColor} position={"sticky"} borderTopColor={borderColor} borderTopWidth={"1px"} bottom={"0px"} pt={"2"} pb={"3"} flexDir={"column"} gap={"0px"} alignItems={"start"} >

                                            <CommentInput setShow={setShow} replyData={replyData} setReplyData={setReplyData} data={singlePost} user={user} open={false} />

                                        </Flex>
                                    </Flex>
                                </Flex>
                            </ModalLayout>
                            <BottomSheetComment open={openMobile} setOpen={setOpenMobile} count={count} liked={liked} likesHandle={clickHandleLike} loadingLikes={loadingLikes} content={singlePost} numberComments={numberComments+""}  />
                        </Flex>
                    </Flex>
                </ModalLayout>
            </Flex>
        </LoadingAnimation>
    )
}

export default ProfileComponent
