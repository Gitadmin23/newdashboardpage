import CustomButton from "@/components/general/Button";
import { THEME } from "@/theme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

type IProps = {
    hide?: boolean
}

export default function DiscoverApp(props: IProps) {

    const {
        hide
    } = props

    const router = useRouter()
    
    return (
        <Flex w={"full"} flexDir={"column"}>
            <Flex w={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} gap={["8", "8", "10"]} py={["10", "10px", "20"]} px={["6", "6", "12"]} >
                <Flex w={"fit-content"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} gap={[ "1", "1", "3"]} textAlign={"center"} >
                    <Text fontSize={["20px", "20px", "45px"]} fontWeight={"semibold"} lineHeight={"40px"} >Discover <span style={{ color: THEME?.COLORS?.chasescrollBlue }} >Chasescroll</span></Text>
                    <Text fontSize={["12px", "12px", "24px"]} lineHeight={"36px"} color={"#222222CC"} >Embark on an exciting journey of event exploration.</Text>
                    {/* {hide && (
                        <CustomButton text={"Watch Video"} fontWeight={"semibold"} mt={"6"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                    )} */}
                </Flex>
                {!hide && (
                    <Flex w={"full"} display={["none", "none", "flex"]} pos={"relative"} h={["317px", "317px", "606px"]} justifyContent={"center"} alignItems={"center"} >
                        <Image src="/images/discoverapp.png" alt="discoverApp" pos={"absolute"} w={"full"} height={["317px", "317px", "auto"]} inset={"0px"} rounded={"8px"} />
                        <CustomButton onClick={() => router.push("/auth/signup")} text={"Sign-up"} width={"175px"} backgroundColor={[THEME?.COLORS?.chasescrollBlue, THEME?.COLORS?.chasescrollBlue, "white"]} height={"60px"} borderWidth={["0px", "0px", "1px"]} color={["white", "white", THEME?.COLORS?.chasescrollBlue]} borderRadius={"8px"} />
                    </Flex>
                )}
            </Flex>

            <Flex w={"full"} display={hide ? ["none", "none", "none"] : ["flex", "flex", "none"]} pos={"relative"} h={["317px", "317px", "606px"]} justifyContent={"center"} alignItems={"center"} >
                <Image src="/images/discoverapp.png" alt="discoverApp" pos={"absolute"} w={"full"} height={["317px", "317px", "606px"]} inset={"0px"} rounded={"8px"} />
                <CustomButton onClick={() => router.push("/auth/signup")} text={"Sign-up"} width={"175px"} backgroundColor={[THEME?.COLORS?.chasescrollBlue, THEME?.COLORS?.chasescrollBlue, "white"]} height={"60px"} borderWidth={["0px", "0px", "1px"]} color={["white", "white", THEME?.COLORS?.chasescrollBlue]} borderRadius={"8px"} />
            </Flex>
            {!hide && (
                <Flex width={"full"} alignItems={"center"} gap={"3"} px={["6", "6", "12"]}  height={[ "150px", "150px", "250px"]} >
                    <Text maxW={["full", "full", "913px"]} alignItems={"center"} fontSize={["20px", "20px", "45px"]} lineHeight={["24px", "24px", "58px"]} letterSpacing={"-2.5px"} textAlign={["left", "left", "center"]} fontWeight={"semibold"} ><span style={{ color: THEME?.COLORS?.chasescrollBlue }} >Loved</span> by our users</Text>
                    <FaHeart color="red" size="35px" />
                    {/* <CustomButton text={"Leave a Review"} fontWeight={"semibold"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} /> */}
                </Flex>
            )}
        </Flex>
    )
}