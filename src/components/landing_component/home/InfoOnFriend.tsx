import CustomButton from "@/components/general/Button";
import { THEME } from "@/theme";
import { Flex, Box, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import PictureAndText from "../pictureAndText";
import { useRouter } from "next/navigation";

export default function InfoOnFriend(){

    const router = useRouter()

    return(
        <PictureAndText imageUrl="/images/hometwo.png" reverse={true} >
            <Flex p={[ "0px", "0px", "12"]} gap={"6"} flexDir={"column"} >
                <Text fontSize={["20px", "20px", "32px"]} lineHeight={[ "24.2px", "24.2px", "40px" ]} fontWeight={"semibold"} color={"#2B2D31"} >Connect with friends via chat on <span style={{ fontWeight: "bold", color: THEME?.COLORS?.chasescrollBlue }} >Chasescroll</span></Text>
                <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#4B4E61"}  >{`Connect and Engage: Enhance Event Collaboration with Chasescroll's Interactive Messaging and Chat Functionality`}</Text>
                <Flex gap={"4"} w={"full"} flexDir={"column"} >
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Chat with friends.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Engage Collaboratively.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Seamless teamwork and coordination.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Real-time communication and engagement.</Text>
                    </Flex>
                </Flex>
                <CustomButton onClick={() => router.push("/auth/signup")} text={"Get Started"} mt={"6"} width={[ "full", "full", "152px"]} backgroundColor={[ "white", "white" , THEME?.COLORS?.chasescrollButtonBlue+""]} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={[THEME?.COLORS?.chasescrollBlue, THEME?.COLORS?.chasescrollBlue, "white"]} borderRadius={"8px"} />
            </Flex>
        </PictureAndText>
    )
}