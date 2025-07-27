import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import {Button, Image, useColorMode, VStack} from '@chakra-ui/react'
import React from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import useCustomTheme from "@/hooks/useTheme";

function Success({ onClose, handleStage }: {
  onClose: () => void,
  handleStage: (num: number) => void
}) {
    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack spacing={5}paddingX={'20px'}  height='250px' justifyContent={'center'} alignItems={'center'}>
      <CustomText fontFamily={'DM-Medium'} fontSize={'24px'} color={headerTextColor}>Post Created Successfully!</CustomText>
      <CustomText textAlign={'center'} fontFamily={'DM-Regular'} fontSize={'16px'} color={bodyTextColor}>
        Congratulations! Your Post has been created
        successfully.
      </CustomText>

      {/* <Button variant={'solid'} height={'50px'} borderRadius={'25px'} bg="#5D70F9" color='white' fontFamily={'DM-Medium'}>
        Promote Your Post
      </Button> */}

      <Button onClick={() => {
        handleStage(1);
        onClose()
      }} variant={'ghost'} color={primaryColor}>Done</Button>
    </VStack>
  )
}

export default Success
