import React from 'react'
import { Flex, Grid } from '@chakra-ui/react' 
import { IBooking } from '@/models/Booking';
import BookingCard from '@/components/booking_component/BookingCard';
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import usePaystackStore from '@/global-state/usePaystack';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { cleanup } from '@/utils/cleanupObj';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';

function Bookings({ name, state, category }: { name?: string, state?: string, category?: string }) {
    
    const userId = localStorage.getItem('user_id');
    const { configPaystack, setPaystackConfig, dataID, message } = usePaystackStore((state) => state);

    // const { isLoading, } = useQuery(['get-my-bookings', page], () => httpService.get('/booking/search', {
    //     params: {
    //         userID: userId,
    //         page,
    //         size: 20,
    //     }
    // }), {
    //     onSuccess: (data) => {
    //         console.log(data?.data?.content)
    //         const item: PaginatedResponse<IBooking> = data.data;
    //         setBusinesses((prev) => uniqBy([...prev, ...item?.content], 'id'));
    //         if (item?.last) {
    //             setHasMore(false);
    //         }
    //     }
    // }) 

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/booking/search`, limit: 20, filter: "id", name: "getProduct", paramsObj: cleanup({
            name: name,
            category: category,
            state: state, 
            userID: userId,
        })
    })

    return (
        <LoadingAnimation loading={isLoading} refeching={refetchingList} length={results?.length} > 
            <Flex w='full' h='full' flexDir={"column"} pos={"relative"} >
                {!isLoading && results.length > 0 && (
                    <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["4", "4", "6"]} pb={"10"} >
                        {results.map((item: any, index: number) => (
                            <BookingCard key={index} booking={item} business={item?.vendor} isVendor={false} />
                        ))}
                    </Grid>
                )} 
            </Flex>
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} message={message} />
        </LoadingAnimation>
    )
}

export default Bookings
