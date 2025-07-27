"use client"
import { Box, Flex, Image, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ListHeader, useCommunity } from '..'
import { textLimit } from '@/utils/textlimit'
import { ICommunity } from '@/models/Communitty'
import { timeFormat } from '@/utils/dateFormat'
import { IMAGE_URL } from '@/services/urls'
import { useCommunityPageState } from '@/components/Community/chat/state';
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useCustomTheme from '@/hooks/useTheme'
import { IoSearchOutline } from 'react-icons/io5'
import { formatTimeAgo } from '@/utils/helpers'
import { useRouter, useSearchParams } from 'next/navigation'

interface IProps {
    tab: number
    setTab?: any,
    setShow?: any
}

export default function CommunityList({ tab, setTab, setShow }: IProps) {

    const { communites, loadingCommunity, refCommunity, refectingCommunity, setSearchTextMyCommunity, searchTextMyCommunity } = useCommunity()
    const { setAll, activeCommunity } = useCommunityPageState((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();

    const [search, setSearch] = useState("")

    const clickHander = (item: any) => {
        setAll({ activeCommunity: item, pageNumber: 0, messages: [], hasNext: false })
        setShow(true)
        setTab(0)
    }

    const query = useSearchParams();
    const type = query?.get('activeID');

    const router = useRouter()

    useEffect(() => {

        {communites?.map((item: ICommunity, index: number) => {
                if (type === item?.id) {
                    clickHander(item)
                }
            })
        }
    }, [type, router, loadingCommunity])


    const ListCard = (item: ICommunity) => {

        // useEffect(() => {
        //     if (type === item?.id) {
        //         clickHander(item)
        //     }
        // }, [type])

        return (
            <Box as='button' onClick={() => router.push(`/dashboard/community?activeID=${item?.id}`)} w={"full"} pos={"relative"} zIndex={"10"} borderBottomWidth={"1px"} borderBottomColor={borderColor} py={"5"} >
                <Flex rounded={"24px"} textAlign={"left"} px={"4"} gap={"3"} py={"3"} w={"full"} _hover={{ backgroundColor: borderColor }} backgroundColor={activeCommunity?.id === item?.id ? borderColor : "transparent"}  >
                    <Box w={"42px"} pos={"relative"} h={"42px"} bgColor={"ButtonText"} borderWidth={'2px'} borderBottomLeftRadius={'20px'} borderBottomRadius={'20px'} borderTopLeftRadius={'20px'}>
                        {/* <Flex bgColor={"#5465E0"} color={"white"} pos={"absolute"} zIndex={"10"} justifyContent={"center"} alignItems={"center"} top={"-2"} right={"-2"} rounded={"full"} w={"21px"} h={"21px"} fontSize={"7px"} fontWeight={"700"}  >
                            +{item?.data?.memberCount}
                        </Flex> */}
                        <Image src={`${item?.data?.imgSrc?.includes("http") ? "" : IMAGE_URL}${item?.data?.imgSrc}`} alt='image' style={{ width: '100%', height: '100%', objectFit: "cover", borderRadius: "20px", borderTopRightRadius: "0px " }} />
                    </Box>
                    <Flex flexDir={"column"} flex={"1"} gap={"1"} >
                        <Text fontWeight={"700"} lineHeight={"24px"} >{textLimit(item?.data?.name, 25)}</Text>
                        <Text fontSize={"14px"} mt={"2px"} >{textLimit(item?.data?.description, 40)}</Text>
                        <Flex color={headerTextColor} alignItems={"center"} gap={"1"} >
                            <Box w={"8px"} h={"8px"} rounded={"full"} bgColor={primaryColor} />
                            <Text fontSize={"11px"} lineHeight={"13px"} letterSpacing={"0.07px"} >{formatTimeAgo(item?.lastModifiedDate)}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        )
    }

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} bg={mainBackgroundColor} >
            <ListHeader tab={tab} setTab={setTab} setShow={setShow} />
            <Flex w={"full"} h={"72px"} borderBottomColor={borderColor} borderBottomWidth={"1px"} px={"6"} justifyContent={"center"} alignItems={"center"} >
                <InputGroup width={["full", "full", "361px"]} position={"relative"} >
                    <InputLeftElement pointerEvents='none'>
                        <IoSearchOutline size={"25px"} color={bodyTextColor} />
                    </InputLeftElement>
                    <Input width={["full", "full", "full"]} value={searchTextMyCommunity} color={bodyTextColor} onChange={(e) => setSearchTextMyCommunity(e.target.value)} type="search" borderColor={borderColor} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} _placeholder={{ color: bodyTextColor }} bgColor={secondaryBackgroundColor} placeholder='Search for Community' />
                </InputGroup>
            </Flex>
            <LoadingAnimation loading={loadingCommunity} refeching={refectingCommunity} length={communites?.length} >
                <Flex w={"full"} h={"auto"} overflowY={"auto"} px={"5"} flexDir={"column"}  >
                    {communites?.map((item: ICommunity, index: number) => {
                        if (communites?.length === index + 1) {

                            return (
                                <Box w={"full"} key={index} >
                                    <ListCard {...item} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box w={"full"} key={index} >
                                    <ListCard {...item} />
                                </Box>
                            )
                        }
                    })}
                </Flex>
            </LoadingAnimation>
        </Flex>
    )
}
