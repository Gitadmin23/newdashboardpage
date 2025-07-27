'use client' 
import { Box, Flex } from '@chakra-ui/react' 
import React, { ReactNode } from 'react' 

function Layout({ children }: {
    children: ReactNode
}) { 

    return (
        <Box width={"full"} px={["5", "8"]} py={"8"} overflowX={"hidden"} > 
            {children}
        </Box>
    )
}

export default Layout

