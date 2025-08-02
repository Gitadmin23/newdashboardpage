/* eslint-disable react/display-name */
import { IMediaContent, IMediaPost } from "@/models/MediaPost";
import {
  Avatar,
  HStack,
  VStack,
  Box,
  Spinner,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Image,
  useToast,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiMoreHorizontal,
  FiHeart,
  FiMessageSquare,
  FiShare2,
} from "react-icons/fi";
import React from "react";
import CustomText from "../general/Text";
import { useMutation, useQuery, useQueryClient } from "react-query";
import httpService from "@/utils/httpService";
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from "@/services/urls";
import moment from "moment";
import Link from "next/link";
import { useDetails } from "@/global-state/useUserDetails";
import ReportUserModal from "../modals/Home/ReportModal";
import LikeUserModal from "../modals/Home/LikeUsers";

import { Heart, MessageAdd, Share, DocumentDownload } from "iconsax-react";
import VideoPlayer from "../general/VideoPlayer";
import ImageModal from "../general/ImageModal";
import { useImageModalState } from "../general/ImageModal/imageModalState";
import ShareEvent from "../sharedComponent/share_event";
import { useRouter } from "next/navigation";
import { handleLinks } from "../general/LinkExtractor";
import { THEME } from "@/theme";
import { formatTimeAgo } from "@/utils/helpers";
import ImageSlider from "../modals/mediapostPages/ImageSlider";
import { HomeCommentIcon, HomeHeartFillIcon, HomeHeartIcon } from "../svg";
import useCustomTheme from "@/hooks/useTheme";

const longText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis repudiandae incidunt consectetur suscipit sunt velit nostrum expedita dignissimos saepe aperiam neque, repellendus laudantium distinctio eveniet. Et error corrupti, perspiciatis similique, eaque dolores animi reiciendis delectus odio ex laborum ratione dolor odit maiores aperiam ipsam. Reprehenderit, labore voluptatem. Earum, hic voluptatibus?";

interface IProps {
  post?: IMediaContent;
  id?: string;
  shared?: boolean;
  close?: any;
  closeIcon?: boolean;
}

const ThreadCard = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [showlikes, setShowLikes] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);
  const queryClient = useQueryClient();
  const { userId } = useDetails((state) => state);
  const { setAll } = useImageModalState((state) => state);
  const [post, setPost] = React.useState<IMediaContent>(
    props.post as IMediaContent,
  );

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();
  const toast = useToast();

  const { isLoading, isError } = useQuery(
    [`getPostById-${post?.id}`, post?.id],
    () => httpService.get(`${URLS.GET_POST_BY_ID}/${post?.id}`),
    {
      onSuccess: (data) => {
        setPost(data?.data);
      },
    },
  );

  // MUTATIONS
  const likeMutation = useMutation({
    mutationFn: () => httpService.post(`${URLS.LIKE_POST}/${post?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([`getPostById-${post?.id}`]);
    },
    onError: () => {},
  });

  const deleteMutation = useMutation({
    mutationFn: () => httpService.delete(`${URLS.DELETE_POST}/${post?.id}`),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post deleted",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["getPostss"]);
      queryClient.invalidateQueries([`getPostById-${post?.id}`]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occured while trying to delete post",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const handleJoin = () => {
    const userId = localStorage.getItem("user_id");
    if ((props.shared && !userId) || userId === "") {
      const type = sessionStorage.getItem("type");
      const typeID = sessionStorage.getItem("typeID");
      router.push(`/share/auth/login?type=${type}&typeID=${typeID}`);
    } else {
      likeMutation.mutate();
    }
  };

  const handleComment = () => {
    const userId = localStorage.getItem("user_id");
    if ((props.shared && !userId) || userId === "") {
      const type = sessionStorage.getItem("type");
      const typeID = sessionStorage.getItem("typeID");
      router.push(`/share/auth/login?type=${type}&typeID=${typeID}`);
    } else {
      router.push(`/dashboard/home/comment/${post?.id}`);
    }
  };

  const handleImageClick = () => {
    // setAll({ images: [post.mediaRef, ...post.multipleMediaRef], isOpen: true })
  };

  return (
    <Flex
      direction={"column"}
      id={props.id}
      alignItems={"flex-start"}
      ref={ref}
      marginTop={"40px"}
      width={"100%"}
      height={"auto"}
      bg={secondaryBackgroundColor}
      borderBottomLeftRadius={"20px"}
      borderBottomRightRadius={"20px"}
      borderTopLeftRadius={"20px"}
      borderWidth="0px"
      shadow="md"
      boxShadow={"lg"}
      borderColor={"lightgrey"}
      color="black"
      padding="20px"
    >
      {/* MODALS SECTION */}
      <ReportUserModal
        typeID={post?.id}
        REPORT_TYPE="REPORT_USER"
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
      <LikeUserModal
        typeID={post?.id}
        isOpen={showlikes}
        onClose={() => setShowLikes(false)}
      />

      {/* HEADER SECTION */}
      <HStack
        width="100%"
        height="60px"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <HStack>
          <Link href={`/dashboard/profile/${post?.user?.userId}`}>
            <Box
              width="42px"
              height="42px"
              borderRadius={"20px 0px 20px 20px"}
              borderWidth={"2px"}
              borderColor={"#D0D4EB"}
              overflow={"hidden"}
            >
              {post?.user?.data.imgMain.value === null && (
                <VStack
                  width={"100%"}
                  height="100%"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CustomText fontFamily={"DM-Regular"} color={bodyTextColor}>
                    {post?.user?.firstName[0].toUpperCase()}
                    {post?.user?.lastName[0].toUpperCase()}
                  </CustomText>
                </VStack>
              )}
              {post?.user?.data.imgMain.value && (
                <>
                  {post?.user?.data?.imgMain?.value?.startsWith("https://") && (
                    <Image
                      src={`${post?.user?.data.imgMain.value}`}
                      alt="image"
                      width={"100%"}
                      height={"100%"}
                      objectFit={"cover"}
                    />
                  )}

                  {!post?.user?.data?.imgMain?.value?.startsWith("https://") && (
                    <Image
                      src={`${IMAGE_URL}${post?.user?.data.imgMain.value}`}
                      alt="image"
                      width={"100%"}
                      height={"100%"}
                      objectFit={"cover"}
                    />
                  )}
                </>
              )}
            </Box>
          </Link>

          <VStack spacing={0} alignItems={"flex-start"}>
            <Link href={`/dashboard/profile/${post?.user?.userId}`}>
              <CustomText
                fontSize={"14px"}
                fontFamily={"DM-Medium"}
                color={bodyTextColor}
              >
                {post?.user?.username[0].toUpperCase()}
                {post?.user?.username.substring(1)}
              </CustomText>
            </Link>
            {/* <CustomText fontSize='md' fontFamily={'DM-Regular'}>o2 Areana London</CustomText> */}
            <CustomText
              fontSize="xs"
              fontFamily={"Satoshi-Light"}
              color={bodyTextColor}
            >
              {formatTimeAgo(post?.timeInMilliseconds)}
            </CustomText>
          </VStack>
        </HStack>
        <Menu>
          <MenuButton>
            <FiMoreHorizontal
              color={colorMode === "light" ? "blue" : bodyTextColor}
              fontSize={25}
            />
          </MenuButton>
          <MenuList zIndex={10} bg={mainBackgroundColor}>
            {userId === post?.user?.userId && (
              <MenuItem
                onClick={() =>
                  deleteMutation.isLoading ? null : deleteMutation.mutate()
                }
                color={"red"}
                width={"100%"}
                borderBottomWidth={"0.3px"}
                borderBottomColor={borderColor}
                bg={secondaryBackgroundColor}
              >
                {!deleteMutation.isLoading && (
                  <CustomText
                    fontFamily={"Satoshi-Light"}
                    fontSize={"sm"}
                    textAlign={"center"}
                    width={"100%"}
                  >
                    Delete Post
                  </CustomText>
                )}
                {deleteMutation.isLoading && <Spinner size="sm" />}
              </MenuItem>
            )}
            {/* <MenuItem color={'grey'} width={'100%'} borderBottomWidth={1} borderBottomColor={'lightgrey'}>
                    <CustomText fontFamily={'Satoshi-Light'} fontSize={'sm'} textAlign={'center'} width={'100%'}>Share Post</CustomText>
                  </MenuItem> */}
            {/* <MenuItem color={'red'} width={'100%'} borderBottomWidth={1} borderBottomColor={'lightgrey'}>
                    <CustomText fontFamily={'Satoshi-Light'} fontSize={'sm'} textAlign={'center'} width={'100%'}>Report Post</CustomText>
                  </MenuItem> */}
            <MenuItem
              onClick={() => setShowReportModal(true)}
              color={"red"}
              width={"100%"}
              borderBottomWidth={"0.3px"}
              borderBottomColor={borderColor}
              bg={secondaryBackgroundColor}
            >
              <CustomText
                fontFamily={"DM-Medium"}
                fontSize={"sm"}
                textAlign={"center"}
                width={"100%"}
              >
                Report User
              </CustomText>
            </MenuItem>
            <MenuItem color={"red"} width={"100%"}     borderBottomWidth={"0.3px"}
                      borderBottomColor={borderColor}
                      bg={secondaryBackgroundColor}>
              <CustomText
                fontFamily={"Satoshi-Light"}
                fontSize={"sm"}
                textAlign={"center"}
                width={"100%"}
              >
                Cancel
              </CustomText>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* BODY SECTION */}
      <CustomText
        fontFamily={"Satoshi-Regular"}
        color={bodyTextColor}
        fontSize={"16px"}
        width="100%"
        marginY={"20px"}
      >
        {showAll
          ? handleLinks(post?.text, true)
          : post?.text?.length > 130
            ? handleLinks(post?.text)
            : handleLinks(post?.text, true)}
        {post?.text?.length > 130 && (
          <span
            style={{
              fontFamily: "DM-Bold",
              color: THEME.COLORS.chasescrollButtonBlue,
              fontSize: "16px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </span>
        )}
      </CustomText>

      {post?.type === "WITH_IMAGE" && (
        <Box
          onClick={handleImageClick}
          width="100%"
          minHeight={"250px"}
          maxHeight={"550px"}
          bg="whitesmoke"
          borderBottomLeftRadius={"20px"}
          borderBottomRightRadius={"20px"}
          borderTopLeftRadius={"20px"}
          overflow={"hidden"}
        >
          <ImageSlider links={post?.multipleMediaRef} type="feed" />
        </Box>
      )}

      {post?.type === "WITH_VIDEO_POST" && (
        <Box
          width="100%"
          maxHeight={"250px"}
          bg="whitesmoke"
          borderBottomLeftRadius={"20px"}
          borderBottomRightRadius={"20px"}
          borderTopLeftRadius={"20px"}
          overflow={"hidden"}
        >
          {post?.mediaRef?.startsWith("https://") && (
            <VideoPlayer src={`${post?.mediaRef}`} measureType="px" />
          )}
          {!post?.mediaRef?.startsWith("https://") && (
            <VideoPlayer
              src={`${IMAGE_URL}${post.mediaRef}`}
              measureType="px"
            />
          )}
          <VideoPlayer src={`${IMAGE_URL}${post.mediaRef}`} measureType="px" />
          {/* <video controls width={'100%'} style={{ maxHeight: '250px'}}>
            <source  type='video/mp4' src={`${IMAGE_URL}${post.mediaRef}`} />
          </video> */}
        </Box>
      )}

      {/* FOOTER SECTION */}
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        width="100%"
        height={"50px"}
        marginTop={"20px"}
      >
        <VStack cursor={"pointer"}>
          {!likeMutation.isLoading && (
            <Flex
              w={"41px"}
              height={"44px"}
              justifyContent={"center"}
              flexDir={"column"}
              alignItems={"center"}
            >
              {/* <Heart onClick={() => likeMutation.mutate()} color={post?.likeStatus === 'LIKED' ? 'red' : 'grey'} size={'25px'} variant={post?.likeStatus === 'LIKED' ? 'Bold': 'Outline'} /> */}
              <Flex
                width={"24px"}
                h={"30px"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={() => likeMutation.mutate()}
              >
                {post?.likeStatus !== "LIKED" && (
                  <HomeHeartIcon color={bodyTextColor} />
                )}
                {post?.likeStatus === "LIKED" && <HomeHeartFillIcon />}
              </Flex>
              {/* <FiHeart onClick={() => likeMutation.mutate()} color={post?.likeStatus === 'LIKED' ? 'red' : 'grey'} fontSize={15} /> */}
              <CustomText
                onClick={() => setShowLikes(true)}
                fontFamily={"DM-Bold"}
                fontSize="14px"
                color={post?.likeStatus === "LIKED" ? "red" : bodyTextColor}
              >
                {post?.likeCount}
              </CustomText>
            </Flex>
          )}
          {likeMutation.isLoading && (
            <Flex
              w={"41px"}
              height={"44px"}
              justifyContent={"center"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Spinner size="xs" colorScheme="blue" />
            </Flex>
          )}
        </VStack>

        {!props.shared && (
          <Link href={`/dashboard/home/comment/${post?.id}`}>
            <Flex
              w={"41px"}
              height={"44px"}
              justifyContent={"center"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Flex
                width={"24px"}
                h={"30px"}
                justifyContent={"center"}
                alignItems={"center"}
                color={bodyTextColor}
              >
                <HomeCommentIcon color={bodyTextColor} />
              </Flex>
              {/* <FiMessageSquare color='black' fontSize={15} /> */}
              <CustomText
                textColor={bodyTextColor}
                fontFamily={"DM-Bold"}
                fontSize="14px"
              >
                {post?.commentCount}
              </CustomText>
            </Flex>
          </Link>
        )}

        {props.shared && (
          <Flex
            onClick={handleComment}
            w={"41px"}
            height={"44px"}
            justifyContent={"center"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <Flex
              width={"24px"}
              h={"30px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <HomeCommentIcon color={bodyTextColor} />
            </Flex>
            {/* <FiMessageSquare color='black' fontSize={15} /> */}
            <CustomText
              textColor={bodyTextColor}
              fontFamily={"DM-Bold"}
              fontSize="14px"
            >
              {post?.commentCount} Comments
            </CustomText>
            {/* </VStack> */}
          </Flex>
        )}

        <VStack>
          {/* <ShareEvent home={true} id={post.id} type="POST" showText={true} /> */}
          {/* <FiShare2 color='black' fontSize={15} /> */}
          {/* <CustomText fontFamily={'Satoshi-Light'} fontSize='xs' color='grey'>Share</CustomText> */}
        </VStack>
      </HStack>
    </Flex>
  );
});
export default ThreadCard;
