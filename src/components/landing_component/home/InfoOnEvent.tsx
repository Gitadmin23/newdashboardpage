import CustomButton from "@/components/general/Button";
import { THEME } from "@/theme";
import { Flex, Box, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import PictureAndText from "../pictureAndText";
import { useRouter } from "next/navigation";

export default function InfoOnEvent(){ 

    const router = useRouter()

    return(
        <PictureAndText imageUrl="/images/homeone.png" >
            <Flex p={[ "0px", "0px", "12"]} gap={"6"} flexDir={"column"} >
                <Text fontSize={["20px", "20px", "32px"]} lineHeight={[ "24.2px", "24.2px", "40px" ]} fontWeight={"semibold"} color={"#2B2D31"} >Explore Events and Purchase Ticket on <span style={{ fontWeight: "bold", color: THEME?.COLORS?.chasescrollBlue }} >Chasescroll</span></Text>
                <Text fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#4B4E61"}  >Explore a diverse range of <span style={{ fontWeight: "bold" }} >events</span> tailored to your interest and <span style={{ fontWeight: "bold" }} >secure</span> your spot with ease.</Text>
                <Flex gap={"4"} w={"full"} flexDir={"column"} >
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Effortless event management made simple.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Seamless ticket sales and distribution.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Streamlined group coordination and communication.</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"2"} >
                        <Box w={"fit-content"} >
                            <FaCheckCircle size={"24px"} color="#12BC42" />
                        </Box>
                        <Text  fontSize={["12px", "12px", "19.53px"]} lineHeight={[ "17.15px", "17.15px", "28px" ]} color={"#1A202C"} >Enhanced event promotion and attendee engagement.</Text>
                    </Flex>
                </Flex>
                <CustomButton onClick={() => router.push("/auth/signup")} text={"Get Started"} mt={"6"} width={[ "full", "full", "152px"]} backgroundColor={[ "white", "white" , THEME?.COLORS?.chasescrollButtonBlue+""]} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={[THEME?.COLORS?.chasescrollBlue, THEME?.COLORS?.chasescrollBlue, "white"]} borderRadius={"8px"} />
            </Flex>
        </PictureAndText>
    )
}