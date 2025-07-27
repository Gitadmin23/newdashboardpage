"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Flex, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

interface Props { }

function PaymentPage(props: Props) {
    const { } = props

    const router = useRouter()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const PaymentPageList = [
        {
            name: "Payment Details",
            route: "/details"
        },
        {
            name: "Transaction History",
            route: "/transaction"
        }
    ]

    return (
        <Flex  px={"20px"} py={"30px"} overflowY={"auto"} width={"full"} flexDirection={"column"} > 
            <Flex onClick={() => router.back()} as={"button"} alignItems={"center"} fontWeight={"700"} fontSize={"20px"} gap={"3"} color={bodyTextColor} >
                <IoIosArrowBack size="24px" />
                Payments
            </Flex>

            <Flex mt={"6"} px={"6"} gap={"2"} flexDirection={"column"} >
                {PaymentPageList?.map((item: {
                    name: string; 
                    route?: any
                }, index: number) => {
                    return (
                        <Flex key={index} onClick={()=> router.push("/dashboard/settings/payment"+item?.route)} as={"button"} borderBottomWidth={"0.5px"} px={"4"} alignItems={"center"} borderColor={borderColor} color={bodyTextColor} fontSize={"15px"} py={"3"} gap={"1"}  >
                            {item?.name}
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}

export default PaymentPage
