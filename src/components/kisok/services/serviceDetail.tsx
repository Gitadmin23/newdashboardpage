"use client"
import DescriptionPage from "@/components/sharedComponent/descriptionPage";
import LoadingAnimation from "@/components/sharedComponent/loading_animation";
import ShareEvent from "@/components/sharedComponent/share_event";
import useCustomTheme from "@/hooks/useTheme";
import { IService } from "@/models/Service";
import { IMAGE_URL } from "@/services/urls";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import httpService from "@/utils/httpService";
import { textLimit } from "@/utils/textlimit";
import { Button, Flex, Grid, HStack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "react-query";
import GetCreatorData from "../getCreatorData";
import { IReview } from "@/models/product";
import { CalendarIcon } from "@/components/svg"; 
import { dateFormat, timeFormat } from "@/utils/dateFormat";
import ShareLoginModal from "@/components/sharedComponent/shareLoginModal";
import CheckoutBtn from "./checkOutBtn";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";

export function ServiceDetail({ id }: { id: string }) {

    const [data, setData] = useState({} as IService)

    const [reviewData, setReviewData] = useState<Array<IReview>>([])


    const { primaryColor, secondaryBackgroundColor, borderColor, mainBackgroundColor, bodyTextColor, headerTextColor } = useCustomTheme()

    const { back } = useRouter()

    const { isLoading } = useQuery(
        ["service", id],
        () => httpService.get(`/business-service/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            console.log();

            if (data?.data?.content?.length > 0) {
                setData(data?.data?.content[0])
            }

        }
    });

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} flexDir={"column"} gap={"6"} pos={"relative"} overflowY={"auto"} h={"full"} px={["4", "4", "6"]} pb={["6"]} py={"6"}  >
                <Flex gap={"1"} alignItems={"center"} pb={"3"} >
                    <Text role='button' onClick={() => back()} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >Service details</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >{data?.name}</Text>
                </Flex>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} h={["340px", "340px", "620px"]} bgColor={secondaryBackgroundColor} pos={"relative"} rounded={"8px"} borderWidth={"1px"} p={"1"} justifyContent={"center"} alignItems={"center"} borderColor={borderColor}  >
                        {data?.images?.length > 0 && (
                            <Image src={IMAGE_URL + data?.images[0]} alt='logo' rounded={"8px"} height={"full"} objectFit={"cover"} />
                        )}
                        <Grid templateColumns={["repeat(3, 1fr)"]} pos={"absolute"} gap={"3"} insetX={"4"} bottom={"4"} >
                            {data?.images?.map((subitem: string, index: number) => {
                                if (index !== 0 && index <= 3) {
                                    return (
                                        <Flex key={index} w={"full"} h={["100px", "150px"]} bgColor={secondaryBackgroundColor} rounded={"8px"} shadow={"md"} >
                                            <Image src={IMAGE_URL + subitem} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                        </Flex>
                                    )
                                }
                            })}
                        </Grid>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                            <Text fontSize={["24px", "24px", "32px"]} fontWeight={"700"} >{capitalizeFLetter(data?.name)}</Text>

                            <Flex w={"8"} h={"8"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"full"} > 
                                <ShareEvent newbtn={true} showText={false} data={data} name={data?.name} id={data?.id} type="SERVICE" eventName={textLimit(data?.name + "", 17)} />
                            </Flex>
                        </Flex>
                        <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                            <DescriptionPage limit={200} label='Service Details' description={data?.description + ""} />
                            <Flex w={"full"} gap={"2"}>
                                <Flex w={["fit-content", "fit-content", "full"]} >
                                    <GetCreatorData reviewdata={reviewData} userData={data?.vendor as any} item={data?.rating} />
                                </Flex>
                                <Flex bgColor={mainBackgroundColor} display={["flex", "flex", "none"]} w={"full"}  >
                                    <Flex w={"full"} >
                                        <Flex w={"full"} flexDir={'column'} p={["3", "3", '30px']} justifyContent={'center'} borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                                            <Flex flexDir={"column"} >
                                                <Text fontWeight={600} fontSize={"14px"} color={bodyTextColor}>Starting price</Text>
                                                <Text fontSize={'24px'} fontWeight={600} color={headerTextColor}>NGN {(data?.discount) && data?.discount > 0 ? data?.discount.toLocaleString() : data?.price?.toLocaleString()}</Text>
                                            </Flex>
                                            <CheckoutBtn data={data} />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex gap={"2"} alignItems={"center"}>
                                <Text fontWeight={"600"} fontSize={"14px"} w={"60px"} >Joined</Text>
                                <CalendarIcon color={primaryColor} />
                                <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(data?.createdDate)} {timeFormat(data?.createdDate)}</Text>
                            </Flex>

                            <Flex gap={"4"} alignItems={"center"}> 
                                {data.socialMediaHandles?.map((item, index) => {
                                    
                                    if(item.platform === "Facebook") {
                                        return (
                                            <a href={item?.socialMediaHandle?.includes("https") ? item?.socialMediaHandle : "https://"+item?.socialMediaHandle} target="_blank" >  
                                                <IoLogoFacebook color={primaryColor} size={"25px"} />
                                            </a>
                                        )
                                    } else if(item?.platform === "Twitter") {
                                        return(
                                            <a href={item?.socialMediaHandle?.includes("https") ? item?.socialMediaHandle : "https://"+item?.socialMediaHandle} target="_blank" >  
                                                <IoLogoTwitter color={primaryColor} size={"25px"} />
                                            </a>
                                        )
                                    }
                                })}
                                {/* <a href={} > 
                                <IoLogoFacebook size={"25px"} />
                                </a>
                                <IoLogoTwitter size={"25px"}/> */}
                            </Flex>
                            <Flex w={"full"} justifyContent={"end"} >
                                <Flex bgColor={mainBackgroundColor} maxW={"413px"} display={["none", "none", "flex"]}  >
                                    <Flex flexDir={'column'} p='30px' justifyContent={'center'} borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                                        <HStack justifyContent={'flex-start'}>
                                            <Text fontWeight={600} fontSize={"14px"} color={bodyTextColor}>Starting price</Text>
                                            <Text fontSize={'24px'} fontWeight={600} color={headerTextColor}>NGN {(data?.discount) && data?.discount > 0 ? data?.discount.toLocaleString() : data?.price?.toLocaleString()}</Text>
                                        </HStack>
                                        <CheckoutBtn data={data} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <ShareLoginModal id={data?.id} type="SERVICE" />
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
} 