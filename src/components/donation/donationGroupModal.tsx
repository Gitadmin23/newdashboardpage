import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import { IDonationList } from '@/models/donation'
import React from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { Flex, Image, Text } from '@chakra-ui/react'
import DonationGraph from './donationGraph'
import { useRouter } from 'next/navigation'
import useCustomTheme from '@/hooks/useTheme'
import { IMAGE_URL } from '@/services/urls'
import ShareEvent from '../sharedComponent/share_event'
import { textLimit } from '@/utils/textlimit'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { isDateInPast } from '@/utils/isPast'

export default function DonationGroupModal({ selectedData, notAuth }: { selectedData: IDonationList, notAuth?: boolean }) {

    const { data, isLoading, isRefetching } = useGetDonationGroup(selectedData?.fundRasingGroupId?.id)

    const router = useRouter()

    const {
        bodyTextColor,
        borderColor,
        mainBackgroundColor
    } = useCustomTheme() 


    return (

        <LoadingAnimation loading={isLoading} >
            {data?.filter((item)=> isDateInPast(item?.endDate))?.map((items, index) => {
                return (
                    <Flex bgColor={mainBackgroundColor} role="button" flexDir={["column", "column", "row"]} onClick={() => router?.push(notAuth ?`/donation/${items?.id}` : `/dashboard/donation/group/${items?.id}`)} key={index} w={"full"} rounded={"16px"} gap={"4"} borderWidth={"1px"} borderColor={borderColor} p={"4"} alignItems={"center"} >
                        <Flex w={"fit-content"} >
                            <Flex w={["full", "full", "183px"]} height={"150px"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} >
                                <Image rounded={"8px"} objectFit="cover" alt={items?.name} width={"full"} height={"150px"} src={IMAGE_URL + items?.bannerImage} />
                            </Flex>
                        </Flex>
                        <Flex w={"full"} flexDir={"column"} gap={2} >
                            <Flex w={"full"} justifyContent={"space-between"} gap={"3"} alignItems={"center"} >
                                <Flex flexDir={"column"} >
                                    <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
                                    <Text fontWeight={"600"} >{textLimit(capitalizeFLetter(items?.name), 30)}</Text>
                                </Flex>
                                <ShareEvent newbtn={true} showText={false} size='20px' data={items} id={items?.id} type="EVENT" eventName={textLimit(items?.name, 17)} />
                            </Flex>
                            <DonationGraph item={items} />
                        </Flex>
                    </Flex>
                )
            })}
        </LoadingAnimation>
    )
}
