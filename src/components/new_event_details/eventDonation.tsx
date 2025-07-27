import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import DonationGraph from '../donation/donationGraph'
import { IDonationList } from '@/models/donation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit' 
import { IEventType } from '@/models/Event'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IMAGE_URL } from '@/services/urls'
import ShareEvent from '../sharedComponent/share_event'
import DonationBtn from '../donation/donationBtn'
import usePr from '@/hooks/usePr'
import ModalLayout from '../sharedComponent/modal_layout'
import CustomText from '../general/Text'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation' 
import PrBtn from './prBtn'

export default function EventDonation({ checkbox, item }: { checkbox?: boolean, item: IEventType }) {

    const { borderColor, bodyTextColor, secondaryBackgroundColor, mainBackgroundColor, primaryColor } = useCustomTheme()
    const router = useRouter()

    const [eventData, setEventData] = useState({} as {
        "id": string,
        "createdDate": number,
        "lastModifiedBy": string,
        "createdBy": string,
        "lastModifiedDate": number,
        "isDeleted": boolean,
        "status": string,
        "statusCode": number,
        "returnMessage": string,
        "user": string,
        "fundRaiser": IDonationList,
        "eventID": string
    })

    const { deleteFundraising, open, setOpen } = usePr()


    // react query
    const { isLoading, isRefetching } = useQuery(['all-donation', item?.id, open], () => httpService.get(`/pinned-fundraisers/get-pinned-event-fundraising/${item?.id}`, {
        params: {
            id: item?.id
        }
    }), {
        onError: (error: any) => {
        },
        onSuccess: (data: any) => {
            if (data?.data?.length > 0) {
                setEventData(data?.data[0])
            } else {
                setEventData({} as any)
            }
        }
    })

    const removeHandler = () => {
        deleteFundraising?.mutate(eventData?.id + "")
    }

    const openHandler = (e: any) => {
        e.stopPropagation()
        setOpen(true)
    }

    const clickHandler = (item: any) => {
        // if (item?.fundRaisers?.length > 1) {
        //     // setSelected(item)
        //     router?.push("/dashboard/donation/group/" + index)
        // } else {
        router?.push("/dashboard/donation/" + item)
        // }
    }


    return (
        <Flex flexDir={"column"} w={"full"} gap={"2"} display={(eventData?.fundRaiser?.name || item?.isOrganizer) ? "flex" : "none"} >
            <Text fontSize={"14px"} fontWeight={"500"} >{item?.isOrganizer ? "Get Support for your Event" : "Fundraising available"}</Text>
            {(eventData?.fundRaiser?.name) && (
                <Flex onClick={() => clickHandler(eventData?.fundRaiser?.id)} bgColor={mainBackgroundColor} pos={"relative"} role="button" display={eventData?.fundRaiser?.name ? "flex" : "none"} flexDir={["row"]} w={"full"} rounded={"8px"} gap={["2", "2", "2"]} borderWidth={"1px"} borderColor={borderColor} px={["2", "2", "3"]} h={["auto", "auto", "130px"]} py={"2"} alignItems={"center"} >
                    {item?.isOrganizer && (
                        <Flex w={"6"} h={"6"} onClick={(e) => openHandler(e)} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"-14px"} right={"-8px"} zIndex={"50"} bg={"#F2A09B66"} color={"#F50A0A"} rounded={"full"} >
                            <IoClose size={"14px"} />
                        </Flex>
                    )}
                    <Flex w={"fit-content"} >
                        <Flex w={["80px", "80px", "150px"]} height={["80px", "80px", "100px"]} bgColor={secondaryBackgroundColor} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} >
                            <Image rounded={"8px"} objectFit="cover" alt={eventData?.fundRaiser?.name} width={"full"} height={["80px", "80px", "100px"]} src={IMAGE_URL + eventData?.fundRaiser?.bannerImage} />
                        </Flex>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={2} pr={"3"} >
                        <Flex w={"full"} justifyContent={"space-between"} gap={"3"} alignItems={"center"} >
                            <Flex flexDir={"column"} >
                                <Text fontSize={["10px", "10px", "12px"]} color={bodyTextColor} >Fundraising</Text>
                                <Text fontWeight={"600"} fontSize={["12px", "12px", "14px"]} >{textLimit(capitalizeFLetter(eventData?.fundRaiser?.name), 30)}</Text>
                            </Flex>
                            <ShareEvent newbtn={true} showText={false} size='20px' data={eventData?.fundRaiser} id={eventData?.fundRaiser?.id} type="DONATION" eventName={textLimit(eventData?.fundRaiser?.name, 17)} />
                        </Flex>
                        <DonationGraph item={eventData?.fundRaiser} IsEvent={true} />
                    </Flex>
                    {!checkbox && (
                        <DonationBtn item={eventData?.fundRaiser} user={eventData?.fundRaiser?.createdBy} event={true} />
                    )}
                </Flex>
            )}
            {item?.isOrganizer && (
                <PrBtn data={item} donation={true} />
            )}
            <ModalLayout open={open} close={setOpen} size={"xs"} >
                <VStack width='100%' justifyContent={'center'} p={"4"} height='100%' alignItems={'center'} spacing={3}>
                    <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                    <CustomText fontWeight={"700"} textAlign={'center'} fontSize={'20px'}>Remove Fundraising </CustomText>
                    <CustomText textAlign={'center'} fontSize={'14px'} >Are you sure you want to remove <span style={{ fontWeight: "bold" }} >{capitalizeFLetter(eventData?.fundRaiser?.name)}</span>, this action cannot be undone.</CustomText>
                    <Button isDisabled={deleteFundraising.isLoading} onClick={removeHandler} isLoading={deleteFundraising.isLoading} fontSize={"14px"} width='100%' height='42px' bg='red' color="white" variant='solid'>Remove</Button>
                    <Button onClick={() => setOpen(false)} width='100%' height='42px' borderWidth={'0px'} color="grey">Cancel</Button>
                </VStack>
            </ModalLayout>
        </Flex>
    )
}