import { THEME } from "@/theme";
import { Flex, Text } from "@chakra-ui/react";


function MissionAndVision(){
    return(
        <Flex w={"full"} px={["6", "6", "12"]} py={["10", "10", "20"]} flexDir={["column", "column", "row"]} gap={"8"} bgColor={"#FCFCFCF5"} >
            <Flex w={"full"} h={[ "auto", "auto", "439px"]} py={"8"} gap={"2"} justifyContent={"center"} shadow={"lg"} rounded={"xl"} px={"8"} flexDir={"column"} >
                <Text lineHeight={"21.78px"} fontSize={["18px", "18px", "lg"]} >01</Text>
                <Text fontSize={["20px", "20px", "45px"]} fontWeight={"600"} lineHeight={["24.2px", "24.2px", "54.46px"]} color={THEME?.COLORS?.chasescrollBlue} >Our Mission</Text>
                <Text fontSize={["20px", "20px", "32px"]} lineHeight={["24.2px", "24.2px", "38.73px"]} color={"#2B2D31"} >Connecting People</Text>
                <Text fontSize={["16px", "16px", "lg"]} lineHeight={"21.78px"} mt={"4"} color={"#222222CC"} >At ChaseScroll, we value the power of connection and community. Our mission is to facilitate meaningful connections among event organisers, participants, and attendees.</Text>
            </Flex>
            <Flex w={"full"} h={[ "auto", "auto", "439px"]} py={"8"} gap={"2"} justifyContent={"center"} shadow={"lg"} rounded={"xl"} px={"8"} flexDir={"column"} >
                <Text lineHeight={"21.78px"} fontSize={["18px", "18px", "lg"]} >02</Text>
                <Text fontSize={["20px", "20px", "45px"]} fontWeight={"600"} lineHeight={["24.2px", "24.2px", "54.46px"]} color={THEME?.COLORS?.chasescrollBlue} >Our Vision</Text>
                <Text fontSize={["20px", "20px", "32px"]} lineHeight={["24.2px", "24.2px", "38.73px"]} color={"#2B2D31"} >Seamless Event Experiences</Text>
                <Text fontSize={["16px", "16px", "lg"]} lineHeight={"21.78px"} mt={"4"} color={"#222222CC"} >At ChaseScroll, we cherish the profound impact of connection and community. Our mission is to foster and facilitate genuine connections among event organizers, participants, and attendees.</Text>
            </Flex>
        </Flex>
    )
}


export default MissionAndVision