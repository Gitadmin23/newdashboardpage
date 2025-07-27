import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { HomeCommentIcon, HomeHeartIcon, LocationIcon } from '../svg'
import ShareBtn from '../sharedComponent/new_share_btn' 
import { CgMore } from 'react-icons/cg'
import { useRouter } from 'next/navigation'

export default function BookingList({ small }: { small?: boolean }) {

    const {
        borderColor,
        primaryColor,
        bodyTextColor
    } = useCustomTheme()
    
    const router = useRouter()

    const BookingCard = () => {
        return (
            <Flex w={"full"} style={{ boxShadow: "0px 4px 4px 0px #0000000A" }} pt={small ? "8": "4"} p={"4"} rounded={"32px"} gap={"4"} flexDir={"column"} roundedTopRight={"0px"} borderWidth={"1px"} borderColor={borderColor} >
                {!small && (
                    <Flex w={"full"} rounded={"full"} borderWidth={"1px"} borderColor={borderColor} p={"3"} >
                        <Flex alignItems={"center"} w={"full"} gap={"3"} pr={"4"} >
                            <Flex w={"55px"} h={"55px"} rounded={"full"} roundedTopRight={"0px"} borderWidth={"1px"} borderColor={primaryColor} />
                            <Text color={primaryColor} fontWeight={"600"} >Miracle Jason</Text>
                            <Box as="button" ml={"auto"} >
                                <CgMore size={"30px"} />
                            </Box>
                        </Flex>
                    </Flex>
                )}
                <Flex w={"full"} h={small? "192px": "275px"} bgColor={"ActiveCaption"} rounded={"8px"} >
                    <Flex w={"full"} mt={"auto"} p={"4"} gap={"4"} >
                        <Flex w={"full"} h={small ? "56px" : "80px"} bgColor={"blue"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} />
                        <Flex w={"full"} h={small ? "56px" : "80px"} bgColor={"blue"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} />
                        <Flex w={"full"} h={small ? "56px" : "80px"} bgColor={"blue"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} />
                        <Flex w={"full"} h={small ? "56px" : "80px"} bgColor={"blue"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} />
                        <Flex w={"full"} h={small ? "56px" : "80px"} bgColor={"blue"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} />
                    </Flex>
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                    <Text fontSize={small ? "16px" : "24px"} fontWeight={"700"} >Next Generation Barbers</Text>
                    <Button onClick={()=> router?.push("/dashboard/newbooking/details")} bgColor={primaryColor} _hover={{ backgroundColor: primaryColor }} color={"white"} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={small ? "37px" : "50px"} w={small ? "124px" : "160px"} >Book now</Button>
                </Flex>
                <Flex alignItems={"center"} gap={"3"} >
                    <LocationIcon />
                    <Text fontSize={"14px"} fontWeight={"400"} >143 Historic Town square, Lancaster, 75146</Text>
                </Flex>
                <Flex w={"full"} borderTopWidth={"1px"} pt={"4"} alignContent={"center"} justifyContent={"space-between"} >
                    <Flex
                        justifyContent={"center"}
                        h={["26px", "26px", "30px"]}
                        alignItems={"center"} w={"fit-content"} gap={["3px", "2px", "2px"]} >
                        {/* {!loadingLikes ? */}
                        <Flex
                            as={"button"} width={"fit-content"} h={"fit-content"} >
                            <Flex
                                width={["20px", "20px", "24px"]}
                                display={["none", "block", "block"]}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                {/* {liked !== "LIKED" && ( */}
                                <HomeHeartIcon color={bodyTextColor} />
                                {/* )} */}
                                {/* {liked === "LIKED" && <HomeHeartFillIcon />} */}
                            </Flex>
                            <Flex
                                width={["20px", "20px", "24px"]}
                                h={["26px", "26px", "30px"]}
                                display={["block", "none", "none"]}
                                justifyContent={"center"}
                                alignItems={"center"}
                                as={"button"}
                            >
                                {/* {liked !== "LIKED" && ( */}
                                <HomeHeartIcon size='20px' color={bodyTextColor} />
                                {/* // )} */}
                                {/* {liked === "LIKED" && <HomeHeartFillIcon size='20px' />} */}
                            </Flex>
                        </Flex>
                        {/* :
                            <Flex
                                width={"24px"}
                                h={"30px"}
                                justifyContent={"center"}
                                alignItems={"center"}>
                                <Spinner size={"sm"} />
                            </Flex> */}
                        {/* } */}
                        <Text>4</Text>
                    </Flex>
                    <Flex as={"button"}
                        pt={"2px"}
                        justifyContent={"center"}
                        h={["26px", "26px", "30px"]}
                        alignItems={"center"}
                        w={"fit-content"} gap={["3px", "2px", "2px"]} >
                        <Flex
                            width={["20px", "20px", "24px"]}
                            display={["none", "block", "block"]}
                            justifyContent={"center"}
                            alignItems={"center"}
                            color={bodyTextColor}
                        >
                            <HomeCommentIcon color={bodyTextColor} />
                        </Flex>
                        <Flex
                            width={["20px", "20px", "24px"]}
                            justifyContent={"center"}
                            alignItems={"center"}
                            color={bodyTextColor}
                            display={["block", "none", "none"]}
                        >
                            <HomeCommentIcon size='20px' color={bodyTextColor} />
                        </Flex>
                        <Text>3</Text>
                    </Flex>
                    <Flex w={"fit-content"} cursor={"pointer"} alignItems={"center"}
                        h={["26px", "26px", "30px"]} gap={"2px"} >
                        <ShareBtn type="POST" id={12} />
                    </Flex>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex flexDir={"column"} gap={"5"} w={"full"} >
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
        </Flex>
    )
}
