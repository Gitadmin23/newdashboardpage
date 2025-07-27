"use client"
import DonationItemList from '@/components/donation/donationItemList'
import SelectDonationPage from '@/components/donation/select_donation_page'
import CustomButton from '@/components/general/Button'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PastDonation() {

    const router = useRouter()
    const {
        primaryColor,
        borderColor
    } = useCustomTheme()

    return (
        <Flex w={"full"} overflowX={"hidden"} px={"6"} py={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} flexDirection={["column", "row", "row", "row"]} gap={"2"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Text fontSize={"24px"} fontWeight={"700"} ><span style={{ color: primaryColor }} >Chasescroll</span> Fundraising</Text>
                <CustomButton onClick={() => router?.push("/dashboard/donation/create")} text={"Create Fundraising"} px={"4"} height={"45px"} fontSize={"sm"} borderRadius={"32px"} fontWeight={"600"} width={"fit-content"} />
            </Flex>
            <Flex pt={"4"} pb={"8"} gap={["4", "4", "6", "6"]} flexDir={["column", "column", "row", "row"]} alignItems={["start", "start", "center", "center"]} >
                {/* <Text  >Fundraising Campaign ongoing </Text> */}
                {/* <CustomButton onClick={() => router?.push("/dashboard/donation")} mt={["2", "2", "0px", "0px"]} text={"All Fundraising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={secondaryBackgroundColor} borderRadius={"32px"} fontWeight={"600"} color={headerTextColor} width={"fit-content"} /> */}
                <SelectDonationPage />
                {/* <CustomButton text={" My Fundraising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"fit-content"} /> */}
            </Flex>
            <DonationItemList pasted={true} /> 
        </Flex>
    ) 
}
