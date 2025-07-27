import ProfileComponent from '@/components/profile_component'
import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {
    profile_index: any
}

function GetProfile(props: Props) {
    const {
        profile_index
    } = props

    return (
        <Box width={"full"} > 
            <ProfileComponent user_index={profile_index} />
        </Box>
    )
}

export default GetProfile
