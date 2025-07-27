import {Spinner, useColorMode, VStack} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CustomText from '../general/Text'
import useCustomTheme from "@/hooks/useTheme";

function SettingsChip({ icon, action, text, isLoading = false }: {
    action: () => void,
    icon: ReactNode,
    text: string,
    isLoading?: boolean,
}) {
    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack cursor='pointer' onClick={() => isLoading ? null: action()} width='76px' height='64px' borderRadius={'12px'} bg={mainBackgroundColor} justifyContent={'center'}>
        { !isLoading && icon}
        { isLoading && <Spinner size="xs" /> }
        <CustomText fontFamily={'DM-Light'} fontSize={'14px'} color={colorMode === 'light' ? 'brand.chasescrollButtonBlue':bodyTextColor}>{text}</CustomText>
    </VStack>
  )
}

export default SettingsChip