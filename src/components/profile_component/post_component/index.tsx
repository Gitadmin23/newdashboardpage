import ThreadCard from '@/components/home/ThreadCard'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useLocalModalState } from '../modalstate'
import { IMediaContent } from '@/models/MediaPost'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { uniq } from 'lodash' 

interface Props {
    user_index: string | number,
}

function PostThreads(props: Props) {
    const {
        user_index,
    } = props

    const [posts, setPosts] = React.useState<IMediaContent[]>([]);
    const [hasNextPage, setHasNextPage] = React.useState(false);
    const [newIttem, setNew] = React.useState<IMediaContent[]>([]);
    const [page, setPage] = React.useState(0);


    const { setAll, typeID, open } = useLocalModalState((state) => state);
    const intObserver = React.useRef<IntersectionObserver>();

    const { isLoading, isError, refetch } = useQuery(['getUsersPosts', page], () => httpService.get(`${URLS.GET_MEDIA_POST}${user_index}`, {
        params: {
            page,
        }
    }), {
        onSuccess: (data) => {
            setPosts(uniq([...posts, ...data?.data?.content]));
            setHasNextPage(data.data.last ? false : true);
        },
    });

    const lastChildRef = React.useCallback((post: any) => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && hasNextPage) {
                setPage(prev => prev + 1);
            }
        });
        if (post) intObserver.current.observe(post);
    }, [isLoading, hasNextPage, setPage]);

    //const { results, isLoading, ref, isRefetching, data } = InfiniteScrollerComponent({ url: URLS.GET_MEDIA_POST + user_index, limit: 10, filter: "id" })

    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (itemRef.current !== null && typeID && posts.length > 0 && !isLoading) {
            itemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isLoading, itemRef, posts.length, posts, typeID]);

    const handleClose = React.useCallback(() => {
        setAll({ typeID: null, open: false })
        itemRef.current === null;
    }, [setAll])

    return (
        <Box >
            <ModalLayout bg={"transparent"} size={"xl"} scrollBehavior="outside" open={open} close={handleClose} >
                <Flex flexDir={"column"} gap={"4"} >
                    {posts.map((item: any, i: number) => {
                        if (i === posts.length - 1) {
                            return (
                                <Box key={i.toString()} ref={item?.id === typeID ? itemRef : null}> 
                                    <ThreadCard closeIcon={true} close={handleClose} id={item?.id} ref={lastChildRef} post={item} />
                                </Box>
                            )
                        }
                        return (
                            <Box key={i.toString()} ref={item?.id === typeID ? itemRef : null}> 
                                <ThreadCard closeIcon={true} close={handleClose} post={item} />
                            </Box>
                        )
                    })}
                </Flex>
            </ModalLayout>
        </Box>
    )
}

export default PostThreads
