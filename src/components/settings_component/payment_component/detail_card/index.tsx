"use client"
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserWalletAmount from './user_wallet_amount'
import TabController from './tab_controller'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import useSettingsStore from '@/global-state/useSettingsState'
import CardTabs from '../card_tabs'
import useCustomTheme from '@/hooks/useTheme'
import { Chat, NigeriaIcon } from '@/components/svg'

interface Props {

}

function DetailCard(props: Props) {
    const { } = props

    const [showEscrow, setShowEscrow] = useState(false)
    const [tab, setTab] = React.useState(3)
    // const [currency, setCurrency] = useState("NGN")

    const { currency } = useSettingsStore((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const clickHandler = () => {
        setTab(3)
        setShowEscrow((prev) => !prev)
    }

    return (
        <Box> 
            <Flex w={"full"} gap={"4"} flexDir={"column"} bgColor={showEscrow? "#f5d29d": "#DFE3FF"} rounded={"12px"} borderWidth={"0.7px"} borderColor={"#EFF1FE"} py={"4"} px={"3"} style={{ boxShadow: "0px 5.62px 17.56px 5.62px #00000005" }} >
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                    <Flex roundedTopLeft={"5px"} px={"2"} py={"3px"} fontSize={"10px"} fontWeight={"600"} color={"#12299C"} roundedBottomRight={"9px"} bgColor={"#EFF1FB"} >
                        Balance
                    </Flex>
                    <Flex onClick={() => clickHandler()} as={"button"} rounded={"4px"} px={"2"} py={"3px"} fontSize={"10px"} fontWeight={"500"} color={"#12299C"} bgColor={"#EFF1FB"} alignItems={"center"} >
                        {showEscrow ? "Escrow" : "Wallet"}
                        <IoIosArrowForward />
                    </Flex>
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"} >
                    <Flex rounded={"22px"} bgColor={"#EFF1FB"} color={"black"} gap={"1"} alignItems={"center"} px={"2"} py={"1"} >
                        <NigeriaIcon />
                        <Text fontSize={"11px"} >Nigeria Naira</Text>
                        {/* <IoIosArrowDown /> */}
                    </Flex> 
                </Flex>
                <UserWalletAmount showEscrow={showEscrow} currency={currency} />
                <TabController tab={tab} type={showEscrow} setTab={setTab} />
            </Flex>
            <CardTabs tab={tab} currency={currency} />
        </Box>
    )
}

export default DetailCard
