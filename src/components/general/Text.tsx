'use client'
import React from 'react'
import { Text, TextProps, Heading } from '@chakra-ui/react'

interface IProps {
    children: any; 
    isHeader?: boolean;
}


function CustomText({children, isHeader = false, ...rest}: IProps & TextProps) {
    if (isHeader) {
        return (
            <Heading 
                {...rest}
            >
                {children}
            </Heading>
        )
    }
  return (
   <Text 
    {...rest}
   >
    {children}
   </Text>
  )
}

export default CustomText