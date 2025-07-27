"use client"
import React from 'react'
import { Box, Grid} from '@chakra-ui/react' 
import BusinessCard from '@/components/booking_component/BusinessCard'; 
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { cleanup } from '@/utils/cleanupObj';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import { useParams } from 'next/navigation';

function MyBusiness({ name, state, category, isSelect, selected, setSelected }: { name?: string, state?: string, category?: string, isSelect?: boolean, selected?: Array<string>, setSelected?: any }) {

    const userId = localStorage.getItem('user_id'); 
    const param = useParams();
    const id = param?.slug ?? param?.id;

    const { results, isLoading, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/business-service/search`, limit: 20, filter: "id", name: "mybusinessservice", paramsObj: cleanup({
            name: name,
            vendorID: id ? id : userId,
            category: category,
            state: state
        })
    })

    return (
        <LoadingAnimation loading={isLoading} refeching={refetchingList} length={results?.length} > 
            <Box w='full' h='full' >
                {!isLoading && results.length > 0 && (
                    <Grid w={"full"} templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["2", "2", "2"]} >
                        {results.map((item: any, index: number) => (
                            <BusinessCard key={index.toString()} business={item} mybusiness={true} selected={selected} setSelected={setSelected} isSelect={isSelect} />
                        ))}
                    </Grid>
                )} 
            </Box>
        </LoadingAnimation>
    )
}

export default MyBusiness
