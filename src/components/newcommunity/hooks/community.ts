"use client"
import { useDetails } from "@/global-state/useUserDetails";
import InfiniteScrollerComponent from "@/hooks/infiniteScrollerComponent";
import useDebounce from "@/hooks/useDebounce";
import { IComment } from "@/models/Comment";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { URLS } from "@/services/urls";
import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import { uniqBy } from "lodash";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCommunityPageState } from '@/components/Community/chat/state';
import { IMediaContent } from '@/models/MediaPost';
import AWSHook from "@/hooks/awsHook";
import { ICommunity } from "@/models/Communitty";


const useCommunity = () => {

    const [searchTextMyCommunity, setSearchTextMyCommunity] = React.useState('');
    const [postID, setpostID] = React.useState('');
    const [comment, setComment] = React.useState<string>('');
    const [commentData, setCommentData] = React.useState(Array<any>);
    const [showEmoji, setShowEmoi] = React.useState(false);
    const intObserver = React.useRef<IntersectionObserver>();
    const queryClient = useQueryClient();
    const toast = useToast()
    const [img, setImg] = React.useState('');
    const [communityName, setCommunityName] = React.useState('');
    const [communityDescirption, setCommunityDescirption] = React.useState('');
    const [isPublic, setIsPublic] = React.useState(false);

    const { uploadedFile, loading: loadingImage, fileUploadHandler } = AWSHook();

    const { setAll, activeCommunity, activeMessageId, commentHasNext, commentPage, comments } = useCommunityPageState((state) => state);

    const debounceValue = useDebounce(searchTextMyCommunity, 500);
    const { userId } = useDetails((state) => state)

    const { results: communites, isLoading: loadingCommunity, ref: refCommunity, isRefetching: refectingCommunity, refetch: refetchCommunity } = InfiniteScrollerComponent({ url: `${URLS.JOINED_GROUPS}?userID=${userId}&searchText=${debounceValue ?? ""}`, limit: 15, filter: "id", newdata: debounceValue })

    const { results: members, isLoading: loadingMembers, ref: refMembers, isRefetching: refectingMembers, refetch } = InfiniteScrollerComponent({ url: `${URLS.GET_GROUP_MEMBERS}?groupID=${activeCommunity?.id}`, limit: 15, filter: "id" })

    const { results: mediaPosts, isLoading: loadingMediaPosts, ref: refMediaPosts, isRefetching: refectingMediaPosts } = InfiniteScrollerComponent({ url: `${URLS.GET_GROUP_MESSAGES}?groupID=${activeCommunity?.id}`, limit: 15, filter: "id" })

    const { results: communityRequest, isLoading: loadingCommunityRequest, ref: refCommunityRequest, isRefetching: refectingCommunityRequest, refetch: requestRefetch } = InfiniteScrollerComponent({ url: `${URLS.GET_GROUP_REQUESTS}/${userId}`, limit: 15, filter: "id" })

    const { results: communityEvent, isLoading: loadingCommunityEvent, ref: refCommunityEvent, isRefetching: refectingCommunityEvent, refetch: refectEvent } = InfiniteScrollerComponent({ url: `/events/get-saved-events?typeID=${activeCommunity?.id}`, limit: 15, filter: "id" })

    const media = () => {
        if (mediaPosts.length < 1) return [];
        return mediaPosts.filter((item: IMediaContent) => {
            if (item.type === 'WITH_IMAGE' || item.type === 'WITH_VIDEO_POST') {
                return item;
            }
        })
    } 

    const getComments = useQuery(['getMessageComments', postID, commentPage], () => httpService.get(`${URLS.GET_ALL_COMMENTS}`, {
        params: {
            postID: postID,
            page: commentPage,
        }
    }), {
        enabled: postID !== null,
        onSuccess: (data) => {
            const item: PaginatedResponse<IComment> = data.data;
            if (item.content.length > 0) {
                if (item.content[0].id !== postID) {
                    setAll({ comments: item.content });
                } else {
                    if (comments.length > 0) {
                        const arr = [...comments, ...item?.content];
                        setAll({ comments: uniqBy(arr, 'id'), commentHasNext: item.last ? false : true })
                        setCommentData(uniqBy(arr, 'id'))
                    } else {
                        setAll({ comments: uniqBy(item?.content, 'id'), commentHasNext: item.last ? false : true })
                        setCommentData(uniqBy(item?.content, 'id'))
                    }
                }
            }
        },
        onError: () => { }
    });

    const updateGroup = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.UPDATE_GROUP}`, data),
        onSuccess: (data: any) => {
            toast({
                title: 'Success',
                description: 'Update Successful',
                status: 'success',
                position: 'top-right',
                duration: 5000,
            }) 
            community?.refetch()
            refetchCommunity()
            refetch()
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while trying to update community info',
                status: 'error',
                position: 'top-right',
                duration: 5000,
            })
        }
    });

    const handleUpdateGroup = async (data: {
        groupID: string,
        groupData: {
            imgSrc: string,
            name: string,
            description: string,
            isPublic: boolean
        }
    }) => {
        const image = img !== '' ? img : activeCommunity?.data.imgSrc;
        if (data?.groupData?.name === '') {
            toast({
                title: 'Warning',
                description: 'Name cannot be empty',
                status: 'warning',
                position: 'top-right',
                duration: 5000,
            })
            return;
        }
        updateGroup.mutate(data)
    }

    const createComment = useMutation({
        mutationFn: (data: {
            postID: string,
            comment: string
        }) => httpService.post(`${URLS.ADD_COMMENT}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['getMessageComments']);
            queryClient.invalidateQueries([`getSinglePost-${activeMessageId}`]);
            setComment('');
        },
    });

    const commentlastChildRef = React.useCallback((post: any) => {
        if (getComments.isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && commentHasNext) {
                setAll({ commentPage: commentPage + 1 });
            }
        });
        if (post) intObserver.current.observe(post);
    }, [getComments.isLoading, commentHasNext, setAll, commentPage]);

    const leaveGroup = useMutation({
        mutationFn: () => httpService.delete(`${URLS.LEAVE_GROUP}`, {
            params: {
                groupID: activeCommunity?.id,
                userID: userId
            }
        }),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Successfully left the group',
                status: 'success',
                position: 'top-right',
                duration: 5000,
            })
            // queryClient.invalidateQueries(['getJoinedGroups']);
            // refetchCommunity()
            setAll({ activeCommunity: null })
        },
        onError: () => {
            toast({
                title: 'Error'
            })
        }
    });

    const deleteGroup = useMutation({
        mutationFn: () => httpService.delete(`${URLS.DELETE_GROUP}/${activeCommunity?.id}`, {
        }),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Community deleted',
                status: 'success',
                position: 'top-right',
                duration: 5000,
            })
            queryClient.invalidateQueries(['getJoinedGroups']);
            // refetchCommunity()
            setAll({ activeCommunity: null })
        },
        onError: () => {
            toast({
                title: 'Error'
            })
        }
    });

    const handleCreateComment = (data: {
        postID: string,
        comment: string
    }) => {
        if (comment === '') return;
        createComment.mutate(data);
    }

    const community = useQuery(['getCommunity', activeCommunity?.id], () => httpService.get(`${URLS.GET_GROUP_BY_ID}`, {
        params: {
            groupID: activeCommunity?.id,
        }
    }), {
        enabled: activeCommunity?.id ? true : false,
        onSuccess: (data) => {
            const item: PaginatedResponse<ICommunity> = data.data;
            // setDetails(item.content[0]);
            setAll({ activeCommunity: item.content[0]})
            queryClient.invalidateQueries([`getMessage-${activeCommunity?.id}`]);
            // `}`
        }
    });

    return {
        communites,
        searchTextMyCommunity,
        loadingCommunity,
        refectingCommunity,
        refCommunity,
        refetchCommunity,
        setSearchTextMyCommunity,
        handleCreateComment,
        commentlastChildRef,
        getComments,
        comment,
        setComment,
        showEmoji,
        setShowEmoi,
        createComment,
        commentData,
        setpostID,
        members,
        loadingMembers,
        refectingMembers,
        refMembers,
        media,
        loadingMediaPosts,
        refMediaPosts,
        refectingMediaPosts,
        communityRequest,
        requestRefetch,
        loadingCommunityRequest,
        refCommunityRequest,
        refectingCommunityRequest,
        handleUpdateGroup,
        fileUploadHandler,
        setCommunityName,
        setCommunityDescirption,
        setIsPublic,
        isPublic,
        updateGroup,
        leaveGroup,
        deleteGroup,
        activeCommunity,
        communityName,
        communityDescirption,
        uploadedFile,
        loadingImage,
        communityEvent,
        loadingCommunityEvent,
        refectEvent, 
        mediaPosts,
    };
}

export default useCommunity