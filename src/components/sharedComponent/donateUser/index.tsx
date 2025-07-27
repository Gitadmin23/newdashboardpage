import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import UserImage from '../userimage'
import { formatNumberWithK } from '@/utils/formatNumberWithK'
import useCustomTheme from "@/hooks/useTheme";
import CustomText from "@/components/general/Text";
import httpService from '@/utils/httpService';
import { IEventType } from '@/models/Event';
import { useQuery } from 'react-query';
import { IUser } from '@/models/User';
import { formatNumber } from '@/utils/numberFormat';
import LoadingAnimation from '../loading_animation';

interface Props {
    event: any,
    size?: any,
    border?: string,
    fontSize: number,
    refund?: boolean,
    color?: any,
    donationDetail?: boolean
}

function DonateUsers(props: Props) {
    const {
        event,
        size,
        border,
        fontSize,
        donationDetail
    } = props

    const { primaryColor } = useCustomTheme();


    // react query
    const { isLoading, isRefetching, data } = useQuery(['donation', event?.id], () => httpService.get('/payments/orders', {
        params: {
            typeID: event?.id,
            orderStatus: "PAID", 
            size: 10,
            page: 0,
        }
    }))

    const {
        bodyTextColor
    } = useCustomTheme()

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={donationDetail ? "full" : "fit-content"} flexDir={"column"} alignItems={"center"} >
                {donationDetail && (
                    <Flex flexDir={"column"} >
                        <Text fontWeight={"600"} fontSize={"11px"} >People who donated</Text>
                        {/* <Text fontSize={"12px"} color={bodyTextColor} >{formatNumber(data?.data?.totalElements, "")} users donated already</Text> */}
                    </Flex>
                )}

                <Flex alignItems={"center"} >
                    {data?.data?.content?.map((item: {
                        buyer: IUser
                    }, index: number) => {
                        if (index <= 2) {
                            return (
                                <Box key={index} ml={index === 0 ? "0px" : "-20px"} >
                                    <UserImage data={item?.buyer} size={size} image={item?.buyer?.data?.imgMain?.value} font={fontSize + "px"} border={border} />
                                </Box>
                            )
                        }
                    })}
                    {data?.data?.totalElements >= 3 &&
                        <Box roundedBottom={"64px"} width={size} fontWeight={"bold"} height={size} fontSize={(fontSize - 2) + "px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-35px"} display={'flex'} bgColor={"#3C41F0"} color={"#fff"} justifyContent={"center"} alignItems={"center"} >
                            {"+" + formatNumberWithK(data?.data?.totalElements - 3)}
                        </Box>
                    }
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
}

export default DonateUsers
