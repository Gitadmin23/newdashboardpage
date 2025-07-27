"use client"
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { Grid, GridItem, Flex, Text, Image } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { IoClose, IoInformationCircleOutline } from 'react-icons/io5'
import CustomButton from '../general/Button'
import LoadingAnimation from '../sharedComponent/loading_animation' 
import DonationGraph from './donationGraph'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import ModalLayout from '../sharedComponent/modal_layout'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import DonationGroupModal from './donationGroupModal' 
import DonationBtn from './donationBtn'
import ShareEvent from '../sharedComponent/share_event'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import DeleteEvent from '../sharedComponent/delete_event'
import useSearchStore from '@/global-state/useSearchData'
import BlurredImage from '../sharedComponent/blurred_image'
import ProductImageScroller from '../sharedComponent/productImageScroller'
import CircularProgressBar from '../sharedComponent/circleGraph'
import { formatNumber } from '@/utils/numberFormat'
import { formatNumberWithK } from '@/utils/formatNumberWithK'



export default function DonationItemList({ details, singleData, creator, pasted }: { details?: boolean, singleData?: IDonationList, creator?: boolean, publicData?: boolean, pasted?: boolean }) {

    const {
        bodyTextColor,
        borderColor,
        mainBackgroundColor
    } = useCustomTheme()


    const { search } = useSearchStore((state) => state);
    const param = useParams();
    const id = param?.slug ?? param?.id;
    const query = useSearchParams();
    const textColor = query?.get('textColor'); 
    const brandColor = query?.get('brandColor');
    const cardColor = query?.get('cardColor'); 

    const userId = localStorage.getItem('user_id') + "";
    const [selected, setSelected] = useState({} as IDonationList)
    const { data: groupData, isLoading: loading, isRefetching } = useGetDonationGroup(singleData?.fundRasingGroupId?.id)
    const [open, setOpen] = useState(false)

    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: pasted ? `/fund-raiser/passed?userID=${id ? id : userId}${search ? `&name=${search.toLowerCase()}` : ``}` : (creator && id) ? `/fund-raiser/search?creatorID=${id}` : creator ? `/fund-raiser/user-fund-raisers${search ? `?name=${search.toLowerCase()}` : ``}` : `/fund-raiser/search${id ? `?creatorID=${id}` : ``}`, limit: 20, filter: "id", name: "donationlistmy", search: search })

    const router = useRouter()

    const clickHander = (item: IDonationList, index: string) => {
        if (creator || pasted) {
            router?.push("/dashboard/donation/" + index)
        } else if (item?.fundRasingGroupId?.id) {
            // setSelected(item)
            router?.push("/dashboard/donation/group/" + index)
        } else {
            router?.push("/dashboard/donation/" + index)
        }
    }

    return (
        (<Flex w={"full"} flexDir={"column"} gap={"5"} px={"4"} >
            {!details && (
                <LoadingAnimation loading={loadingList} refeching={refetchingList} length={results?.length} withimg={true} >
                    <Grid w={"full"} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={["2", "2", "3"]} >
                        {results?.map((item: IDonationList, index: number) => {
                            if (results?.length === index + 1) {
                                return (
                                    <Flex as={"button"} ref={ref} flexDir={"column"} pos={"relative"} bgColor={cardColor ? cardColor?.replace("hex", "#") : mainBackgroundColor} onClick={() => clickHander(item, item?.id)} borderWidth={"1px"} rounded={"10px"} key={index} w={"full"} h={"fit-content"} >
                                        {(item?.user?.userId === userId && item?.total === 0) && (
                                            <DeleteEvent donation={true} id={item?.id} isOrganizer={item?.user?.userId === userId} name={item?.name} />
                                        )}
                                        <Flex w={"full"} h={"fit-content"} pos={"relative"} >
                                            <ProductImageScroller images={[item?.bannerImage]} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.createdBy} />
                                            {!pasted && (
                                                <Flex w={"8"} zIndex={"40"} justifyContent={"center"} alignItems={"center"} h={"8"} bgColor={mainBackgroundColor} rounded={"full"} pos={"absolute"} bottom={"3"} right={"3"} >
                                                    <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="DONATION" eventName={textLimit(item?.name, 17)} />
                                                </Flex>
                                            )}
                                        </Flex>
                                        <Flex w={"full"} flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"2"} pb={["2", "2", userId !== item?.createdBy?.userId && !pasted ? "0px" : "3"]} >
                                            <Flex w={"full"} >
                                                <Flex w={"full"} alignItems={"start"} flexDir={"column"} >
                                                    <Text fontSize={"12px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Fundraising Title</Text>
                                                    <Text fontWeight={"700"} fontSize={"14px"} >{textLimit(capitalizeFLetter(item?.name), 15)}</Text>
                                                </Flex>
                                                <Flex w={"full"} alignItems={"end"} flexDir={"column"} >
                                                    <Text fontSize={"12px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Target </Text>
                                                    <Text fontWeight={"700"} fontSize={"14px"} >{formatNumberWithK(item?.goal)}</Text>
                                                </Flex>
                                            </Flex>
                                            <Flex w={"full"} >
                                                <Flex w={"full"} alignItems={"start"} flexDir={"column"} >
                                                    <Text fontSize={"12px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Amount Raised</Text>
                                                    <Text fontWeight={"700"} fontSize={"14px"} >{formatNumber(item?.total)}</Text>
                                                </Flex>
                                                <Flex w={"full"} alignItems={"end"} flexDir={"column"}  >
                                                    <CircularProgressBar fontSize={"10px"} isEvent={true} size={35} strokeWidth={3} progress={((Number(item?.total) === 0) && (Number(item?.goal) === 0)) ? 0 : (Number(item?.total) / Number(item?.goal)) * 100 > 100 ? 100 : Number(((Number(item?.total) / Number(item?.goal)) * 100)?.toFixed(2))} />
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                        {(userId !== item?.createdBy?.userId && !pasted) && (
                                            <Flex as={"button"} w={"full"} display={["none", "none", "flex"]} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} px={"3"} fontWeight={"600"} py={"4"} justifyContent={"center"} >
                                                <DonationBtn item={item} user={item?.user} />
                                            </Flex>
                                        )}
                                    </Flex>
                                );
                            } else {
                                return (
                                    <Flex as={"button"} flexDir={"column"} pos={"relative"} bgColor={cardColor ? cardColor?.replace("hex", "#") : mainBackgroundColor} onClick={() => clickHander(item, item?.id)} borderWidth={"1px"} rounded={"10px"} key={index} w={"full"} h={"fit-content"} >
                                        {(item?.user?.userId === userId && item?.total === 0) && (
                                            <DeleteEvent donation={true} id={item?.id} isOrganizer={item?.user?.userId === userId} name={item?.name} />
                                        )}
                                        <Flex w={"full"} h={"fit-content"} pos={"relative"} >
                                            <ProductImageScroller images={[item?.bannerImage]} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.createdBy} />
                                            {!pasted && (
                                                <Flex w={"8"} zIndex={"40"} justifyContent={"center"} alignItems={"center"} h={"8"} bgColor={mainBackgroundColor} rounded={"full"} pos={"absolute"} bottom={"3"} right={"3"} >
                                                    <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="DONATION" eventName={textLimit(item?.name, 17)} />
                                                </Flex>
                                            )}
                                        </Flex>
                                        <Flex w={"full"} flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"2"} pb={["2", "2", userId !== item?.createdBy?.userId && !pasted ? "0px" : "3"]} >
                                            <Flex w={"full"} >
                                                <Flex w={"full"} alignItems={"start"} flexDir={"column"} >
                                                    <Text fontSize={"12px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Fundraising Title</Text>
                                                    <Text fontWeight={"700"} fontSize={"14px"} >{textLimit(capitalizeFLetter(item?.name), 15)}</Text>
                                                </Flex>
                                                <Flex w={"full"} alignItems={"end"} flexDir={"column"} >
                                                    <Text fontSize={"12px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Target </Text>
                                                    <Text fontWeight={"700"} fontSize={"14px"} >{formatNumberWithK(item?.goal)}</Text>
                                                </Flex>
                                            </Flex>
                                            <Flex w={"full"} >
                                                <Flex w={"full"} alignItems={"start"} flexDir={"column"} >
                                                    <Text fontSize={"12px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Amount Raised</Text>
                                                    <Text fontWeight={"700"} fontSize={"14px"} >{formatNumber(item?.total)}</Text>
                                                </Flex>
                                                <Flex w={"full"} alignItems={"end"} flexDir={"column"}  >
                                                    <CircularProgressBar fontSize={"10px"} isEvent={true} size={35} strokeWidth={3} progress={((Number(item?.total) === 0) && (Number(item?.goal) === 0)) ? 0 : (Number(item?.total) / Number(item?.goal)) * 100 > 100 ? 100 : Number(((Number(item?.total) / Number(item?.goal)) * 100)?.toFixed(2))} />
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                        {(userId !== item?.createdBy?.userId && !pasted) && (
                                            <Flex as={"button"} w={"full"} display={["none", "none", "flex"]} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} px={"3"} fontWeight={"600"} py={"4"} justifyContent={"center"} >
                                                <DonationBtn item={item} user={item?.user} />
                                            </Flex>
                                        )}
                                    </Flex>
                                );
                            }
                        })}
                    </Grid>
                </LoadingAnimation>
            )}
            {details && (
                <Text fontWeight={"700"} >Other fund  Raising Available in {singleData?.name} </Text>
            )}
            {details && (
                <LoadingAnimation loading={loading} >
                    <Flex w={"full"} gap={6} overflowX={"auto"} pb={"4"} >
                        {groupData?.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <Flex key={index} minW={"400px"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >
                                        <Flex as={"button"} onClick={() => clickHander(item, item?.id)} w={'full'} h={"200px"} rounded={"8px"} >

                                            <BlurredImage height={["200px"]} image={item?.bannerImage} />
                                            {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                                        </Flex>
                                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex flexDir={"column"} >
                                                <Text fontSize={"14px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Fundraising Title</Text>
                                                <Text fontWeight={"700"} >{textLimit(capitalizeFLetter(item?.name), 35)}</Text>
                                            </Flex>
                                            <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="DONATION" eventName={textLimit(item?.name, 17)} />
                                        </Flex>
                                        <Flex w={"full"} borderWidth={item?.fundRasingGroupId?.id ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                            {item?.fundRasingGroupId?.id && (
                                                <Flex gap={"1"} alignItems={"center"} >
                                                    <IoInformationCircleOutline />
                                                    <Text fontSize={"12px"} >{item?.totalInGroup - 1} More fundraising available</Text>
                                                </Flex>
                                            )}
                                            <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                        </Flex>
                                        <DonationGraph item={item} />
                                        {(userId !== singleData?.createdBy?.userId && !pasted) && (
                                            <DonationBtn item={item} user={item?.user} />
                                        )}
                                    </Flex>
                                )
                            }
                        })}
                    </Flex>
                </LoadingAnimation>
            )}
            <ModalLayout open={open} close={setOpen} size={"xl"} >
                <Flex flexDir={"column"} w={"full"} p={"5"} pt={"0px"} pos={"relative"} >
                    <Flex position={"relative"} zIndex={"50"} w={"full"} justifyContent={"space-between"} pt={"5"} pb={"2"} bgColor={mainBackgroundColor} pos={"sticky"} top={"0px"} gap={"3"} alignItems={"center"} >
                        <Flex flexDirection={"column"} >
                            <Text fontSize={"14px"} color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} >Chasescroll Fundraising</Text>
                            <Text fontWeight={"600"} >Fundraising Available in {selected?.name}</Text>
                        </Flex>
                        <Flex as={"button"} onClick={() => setOpen(false)} >
                            <IoClose size="20px" color={textColor ? textColor?.replace("hex", "#") :bodyTextColor} />
                        </Flex>
                    </Flex>
                    <Flex mt={"6"} flexDirection={"column"} gap={"4"} >
                        <DonationGroupModal selectedData={selected} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>)
    );
}