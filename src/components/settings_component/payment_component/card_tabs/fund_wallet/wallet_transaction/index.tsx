import LoadingAnimation from '@/components/sharedComponent/loading_animation' 
// import Toggle from 'react-toggle'
import { CreditWallet, DebitWallet, OtherPurchase, TicketPurchase } from '@/components/svg'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { dateFormat } from '@/utils/dateFormat'
import { formatNumber } from '@/utils/numberFormat'
import {Box, Flex, Text, useColorMode} from '@chakra-ui/react'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props { }

function WalletTransaction(props: Props) {
    const { } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.GET_TRANSACTIONS, limit: 10, filter: "id" })

    return (
        <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} > 
            <Box width={"full"} py={"6"} >
                {results?.map((item: {
                    purpose: string,
                    description: string,
                    title: string,
                    timestamp: any,
                    currency: string,
                    payableAmount: any,
                    value?: any,
                    status?: string
                }, index: number) => {
                    return (
                        <Flex key={index} gap={"2"} py={"3"} >
                            <Box width={"fit-content"} >
                                {(item?.purpose === 'PAY_FOR_TICKET' || item?.purpose === "BUY_PRODUCT"  ||  item?.purpose === 'DONATION') ? (
                                    <TicketPurchase />
                                ) : item?.purpose === 'FUND_WALLET' ? (
                                    <CreditWallet />
                                ) : item?.purpose === 'CASHOUT' ? (
                                    <DebitWallet />
                                ) : (
                                    <OtherPurchase />
                                )}
                            </Box>
                            <Flex width={"full"} color={"gray.600"} justifyContent={"space-between"} >
                                <Box>
                                    <Text fontWeight={"medium"} color={headerTextColor} >
                                        {
                                            item?.description ??
                                                item?.title ??
                                                item?.purpose === 'PAY_FOR_TICKET'
                                                ? 'Ticket Purchase'
                                                : item?.purpose === 'DONATION' ? "Fundraising"
                                                : item?.purpose === 'FUND_WALLET'
                                                    ? 'Fund Wallet'
                                                    : item?.purpose === 'CASHOUT'
                                                        ? 'Withdrawal':
                                                        item?.purpose === "BUY_PRODUCT" ? "Order Payment"
                                                        : ''
                                        }
                                    </Text>
                                    <Text fontSize={"12px"} fontWeight={"medium"} color={colorMode === 'light' ? "#777E90":bodyTextColor} >{dateFormat(item?.timestamp * 1000)}</Text>
                                </Box>
                                <Flex textAlign={"right"} flexDir={"column"} alignItems={"end"} >
                                    <Text fontSize={"sm"} fontWeight={"medium"} color={bodyTextColor} >
                                        {item?.purpose === 'FUND_WALLET' ||
                                            item?.purpose === 'PAY_FOR_TICKET'
                                            ? "+ "
                                            : item?.purpose === 'CASHOUT' && "- "}
                                        {formatNumber(item?.payableAmount ? (item?.payableAmount / 100) : item?.value / 100, item?.currency === "USD" ? "$" : "₦")}
                                    </Text>
                                    <Box width={"fit-content"} textAlign={"right"} fontWeight={"bold"} fontSize={"11px"} >
                                        {item?.status === 'PAID' && <Text bgColor={"green.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"green.400"} >Successful</Text>}
                                        {item?.status === 'STARTED' && <Text bgColor={"yellow.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"yellow.400"} >pending</Text>}
                                        {item?.status === 'CANCELLED' && <Text bgColor={"red.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"red.400"} >cancelled</Text>}
                                        {item?.status === 'REFUNDED' && <Text bgColor={"red.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"red.400"} >refunded</Text>}
                                        {item?.status === 'ERROR' && <Text bgColor={"red.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"red.400"} >failed</Text>}
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    )
                })}
            </Box>
        </LoadingAnimation>
    )
}

export default WalletTransaction
