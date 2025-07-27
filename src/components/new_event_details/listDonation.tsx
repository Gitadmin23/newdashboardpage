import { Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EventDonationPicker from './eventDonationPicker'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IDonationList } from '@/models/donation'
import { useQuery } from 'react-query'
import { IEventType } from '@/models/Event'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'
import usePr from '@/hooks/usePr'
import { useRouter } from 'next/navigation'
import CustomButton from '../general/Button'

export default function ListDonation({ item, length, setOpen }: { setSelectDonation: any, setSelectInitialDonation: any, selectDonation: string, initialDonation: string, item: IEventType, length: any, setOpen: any}) {


    const search = ""

    const router = useRouter()
    const [selectDonation, setSelectDonation] = useState("")
    const [selectDonationInitial, setSelectDonationInitial] = useState("")

    const toast = useToast()
    const { createPr, tagServiceAndRental, createFundraising, updateUserEvent, updateEvent } = usePr()
    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/fund-raiser/user-fund-raisers${search ? `?name=${search}` : ``}`, limit: 20, filter: "id", name: "donationlist", search: search })


    // react query
    const { isLoading } = useQuery(['all-donation', item?.id], () => httpService.get(`/pinned-fundraisers/get-pinned-event-fundraising/${item?.id}`, {
        params: {
            id: item?.id
        }
    }), {
        onError: (error: any) => {
        },
        onSuccess: (data: any) => {
            if (data?.data?.length !== 0) {
                setSelectDonation(data?.data[0]?.fundRaiser?.id + "")
                setSelectDonationInitial(data?.data[0]?.fundRaiser?.id + "")
            }
        }
    })

    useEffect(() => {
        length(results?.length)
    }, [loadingList])

    const clickHander = () => {

        if (results?.length === 0) {
            router?.push(`/dashboard/donation/create?event=${item?.id}`)
        } else if (!selectDonation) {
            toast({
                status: "warning",
                title: "Select a Fundraising",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            })
        } else if (selectDonation === selectDonationInitial) {
            toast({
                status: "warning",
                title: "This Fundraising is Pinned",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            })
        } else {
            if (selectDonation) {
                createFundraising?.mutate({
                    fundRaiserID: selectDonation,
                    eventID: item?.id,
                    userID: item?.createdBy?.userId
                })
                setOpen(false)
            }
        }
    }

    return (
        <Flex flexDirection={"column"} gap={"3"} > 
            <LoadingAnimation loading={loadingList || isLoading} length={results?.length} >
                <Flex w={"full"} maxH={"60vh"} flexDir={"column"} overflowY={"auto"} gap={"3"} >
                    {results?.map((item: IDonationList, index: number) => {
                        return (
                            <Flex key={index} >
                                <EventDonationPicker items={item} selectDonation={selectDonation} setSelectDonation={setSelectDonation} />
                            </Flex>
                        )
                    })}
                </Flex>
            </LoadingAnimation>
            <Flex w={"full"} py={"1"} position={"sticky"} bottom={"-4px"} >
                <CustomButton onClick={clickHander} isLoading={createFundraising?.isLoading} text={"Add"} width={"150px"} height={"40px"} fontSize={"14px"} borderRadius={"999px"} />
            </Flex>
        </Flex>
    )
}
