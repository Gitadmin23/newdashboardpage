"use client"
import DonationItemGroup from '@/components/donation/donationItemGroup'
import DonationItemList from '@/components/donation/donationItemList'
import SelectDonationPage from '@/components/donation/select_donation_page'
import CustomButton from '@/components/general/Button'
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack'
import { FundraisingIcon } from '@/components/svg'
import useDonationStore from '@/global-state/useDonationState'
import usePaystackStore from '@/global-state/usePaystack'
import useSearchStore from '@/global-state/useSearchData'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

export default function Donation() {

    const {
        primaryColor,
        secondaryBackgroundColor,
        borderColor,
        headerTextColor,
        bodyTextColor
    } = useCustomTheme()

    const { configPaystack, setPaystackConfig, dataID, message, amount, setAmount } = usePaystackStore((state) => state);
    const router = useRouter()

    const { search, setSearchValue } = useSearchStore((state) => state);

    const path = usePathname()

    useEffect(() => {
        setSearchValue("")
    }, [path])

    const { updateDontion } = useDonationStore((state) => state)

    const user_id = localStorage.getItem("user_id") + ""

    useEffect(() => {
        updateDontion([{
            "visibility": "PUBLIC",
            creatorID: user_id,
            name: "",
            bannerImage: "",
            description: "",
            endDate: "",
            goal: "",
            purpose: "",
            collaborators: []
        }])
    }, [])

    return (
        <Flex w={"full"} px={["0px", "0px", "6"]} pt={["6", "6", "12", "12"]} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} flexDirection={["column", "column", "row", "row"]} gap={"2"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} alignItems={"center"} >
                {/* */}
                <Flex alignItems={"center"} gap="2" >
                    <FundraisingIcon />
                    <Text fontSize={"24px"} fontWeight={"700"} >Fundraising</Text>
                </Flex>
                <Box w={"full"} px={"4"} display={["flex", "flex", "none", "none"]} >
                    <InputGroup width={["full", "full", "361px"]} zIndex={"20"} position={"relative"} >
                        <InputLeftElement pointerEvents='none'>
                            <IoSearchOutline size={"25px"} />
                        </InputLeftElement>
                        <Input width={["full", "full", "361px"]} value={search} onChange={(e) => setSearchValue(e.target.value)} type="search" borderColor={borderColor} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} _placeholder={{ color: bodyTextColor }} bgColor={secondaryBackgroundColor} placeholder={'Search for fundraising'} />
                    </InputGroup>
                </Box>
                <CustomButton ml={"auto"} mr={"4"} onClick={() => router?.push("/dashboard/donation/create")} text={"Create Fundraising"} px={"4"} height={"45px"} fontSize={"sm"} borderRadius={"32px"} fontWeight={"600"} width={"fit-content"} />
            </Flex>
            <Flex py={"4"} px={"4"} pb={"8"} gap={["4", "4", "6", "6"]} flexDir={["column", "row", "row", "row"]} alignItems={["start", "center", "center", "center"]} >
                <Flex mt={["2", "0px", "0px", "0px"]} flexDir={["row", "row", "row", "row"]} alignItems={"center"} gap={["4", "4", "6", "6"]}>
                    {/* <CustomButton text={"All Fundraising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"fit-content"} />
                    <CustomButton onClick={() => router?.push("/dashboard/donation/mydonation")} text={"My Fundraising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={secondaryBackgroundColor} borderRadius={"32px"} fontWeight={"600"} color={headerTextColor} width={"fit-content"} /> */}
                    <SelectDonationPage />

                </Flex>
            </Flex>
            <DonationItemGroup publicData={true} /> 
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} message={message} amount={amount} setAmount={setAmount} />
        </Flex>
    )
}