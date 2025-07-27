import { THEME } from "@/theme";
import { Flex, Text } from "@chakra-ui/react";


function MissionAndGoal(){
    return(
        <Flex w={"full"} px={["6", "6", "12"]} py={["10", "10", "20"]} flexDir={"column"} gap={"6"} >
            <Text fontSize={["20px", "20px", "32px"]} lineHeight={[ "24.2px", "24.2px", "40px" ]} fontWeight={"600"} ><span style={{color: THEME?.COLORS?.chasescrollBlue}} >MISSION</span> + GOALS</Text>
            <Text fontSize={["16px", "16px", "lg"]} lineHeight={["17.15px", "17.15px", "28px"]} >Chasescroll is a cutting-edge event management platform designed to streamline the process of organizing and participating in events.</Text>
        </Flex>
    )
}

export default MissionAndGoal