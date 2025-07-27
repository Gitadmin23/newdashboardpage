import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import UserImage from '../userimage'
import { formatNumberWithK } from '@/utils/formatNumberWithK'
import useCustomTheme from "@/hooks/useTheme";
import CustomText from "@/components/general/Text";
import { useSearchParams } from 'next/navigation';

interface Props {
    event: any,
    size?: any,
    border?: string,
    fontSize: number,
    refund?: boolean,
    color?: any
}

function InterestedUsers(props: Props) {
    const {
        event,
        size,
        border,
        fontSize,
        refund,
        color
    } = props

    const { primaryColor } = useCustomTheme();
    const query = useSearchParams();
    const textColor = query?.get('brandColor');

    return (
        <>
            {event?.interestedUsers?.length > 0 && (
                <Flex alignItems={"center"} >
                    {event?.interestedUsers?.map((item: any, index: number) => {
                        if (index <= 3) {
                            return (
                                <Box key={index} ml={index === 0 ? "0px" : "-10px"} >
                                    <UserImage data={item} size={size} image={item?.data?.imgMain?.value} font={fontSize + "px"} border={border} />
                                </Box>
                            )
                        }
                    })}
                    {event?.memberCount >= 4 &&
                        <Box roundedBottom={"64px"} width={size} fontWeight={"bold"} height={size} fontSize={(fontSize - 2) + "px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-10px"} display={'flex'} bgColor={textColor ?? "#3C41F0"} color={"#fff"} justifyContent={"center"} alignItems={"center"} >
                            {"+" + formatNumberWithK(event?.memberCount - 3)}
                        </Box>
                    }
                    {!refund && (
                        <CustomText color={textColor ?? primaryColor} ml={"2"} fontSize={(fontSize - 2) + "px"} >
                            Interested
                        </CustomText>
                    )}
                </Flex>
            )}
        </>
    )
}

export default InterestedUsers
