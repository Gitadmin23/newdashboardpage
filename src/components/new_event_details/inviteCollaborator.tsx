import useCustomTheme from '@/hooks/useTheme'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import CustomButton from '../general/Button'

export default function InviteCollaborator() {

    const { mainBackgroundColor, primaryColor } = useCustomTheme()

    return (
        <Flex w={"fit-content"} bgColor={mainBackgroundColor} rounded={"16px"} p={"3"} style={{boxShadow: "0px 20px 70px 0px #C2C2C21A"}} > 
            <CustomButton text={"Invite Collaborators"} height={"40px"} borderRadius={"25px"} fontSize={"12px"} width={"150px"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} backgroundColor={mainBackgroundColor} />
        </Flex>
    )
}
