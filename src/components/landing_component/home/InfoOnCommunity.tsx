import CustomButton from "@/components/general/Button";
import { THEME } from "@/theme";
import { Flex, Box, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import PictureAndText from "../pictureAndText";
import { useRouter } from "next/navigation";

export default function InfoOnCommunity() {

    const router = useRouter()

    return (
        <PictureAndText imageUrl="/images/hometwo.png" >
            <Flex p={["0px", "0px", "12"]} gap={"6"} flexDir={"column"} >
                <Text fontSize={["20px", "20px", "32px"]} lineHeight={["24.2px", "24.2px", "40px"]} fontWeight={"semibold"} color={"#2B2D31"} >Build and Belong: Embrace Community on <span style={{ fontWeight: "bold", color: THEME?.COLORS?.chasescrollBlue }} >Chasescroll.</span></Text>
                <Text fontSize={["12px", "12px", "19.53px"]} lineHeight={["17.15px", "17.15px", "28px"]} color={"#4B4E61"}  >
                    Experience the Power of Community: Join ChaseScroll and connect with others who share your interests.
                    <br /><br />
                    Create, engage, and be a part of thriving communities where you can foster meaningful connections and discover new opportunities.
                </Text>
                <Flex gap={"4"} w={"full"} flexDir={"column"} >
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text fontSize={["12px", "12px", "19.53px"]} lineHeight={["17.15px", "17.15px", "28px"]} color={"#1A202C"} >Connect and Discover.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text fontSize={["12px", "12px", "19.53px"]} lineHeight={["17.15px", "17.15px", "28px"]} color={"#1A202C"} >Engage with Like-Minded.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text fontSize={["12px", "12px", "19.53px"]} lineHeight={["17.15px", "17.15px", "28px"]} color={"#1A202C"} >Thrive in vibrant communities.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text fontSize={["12px", "12px", "19.53px"]} lineHeight={["17.15px", "17.15px", "28px"]} color={"#1A202C"} >{`Experience ChaseScroll's vitality.`}</Text>
                    </Flex> 
                </Flex>
                <CustomButton onClick={() => router.push("/auth/signup")} text={"Get Started"} mt={"6"} width={["full", "full", "152px"]} backgroundColor={["white", "white", THEME?.COLORS?.chasescrollButtonBlue + ""]} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={[THEME?.COLORS?.chasescrollBlue, THEME?.COLORS?.chasescrollBlue, "white"]} borderRadius={"8px"} />
            </Flex>
        </PictureAndText>
    )
}