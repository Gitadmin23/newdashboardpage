import CustomButton from '@/components/general/Button'
import CustomText from '@/components/general/Text'
import GoogleBtn from '@/components/sharedComponent/googlebtn'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { useDetails } from '@/global-state/useUserDetails'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Button, Flex, Text, useColorMode, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LiaAngleDownSolid } from 'react-icons/lia'
import useCustomTheme from "@/hooks/useTheme";
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import SignupModal from '@/app/auth/component/signupModal'
import { IEventType } from '@/models/Event'
import useModalStore from '@/global-state/useModalSwitch'
import { IoClose } from 'react-icons/io5'
import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import { IDonationList } from '@/models/donation'
import ticket from '../event_component/ticket'

function SelectDonation({ selectedData }: { selectedData: IDonationList }) {

    const { data, isLoading, isRefetching } = useGetDonationGroup(selectedData?.fundRasingGroupId?.id)

    const [showModal, setShowModal] = useState(false)

    // const [select, setSelected] = useState(false)

    const {
        primaryColor,
        borderColor,
        mainBackgroundColor
    } = useCustomTheme()

    // useEffect(()=> {

    // }, [])

    return (
        <Flex gap={"3"} position={"relative"} flexDir={"column"} alignItems={"center"} justifyContent={"end"}  >
            <Flex onClick={() => setShowModal((prev) => !prev)} as={"button"} w={"full"} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} borderColor={"#EAEBEDCC"} rounded={"12px"} p={"5"} >
                <Flex flexDir={"column"} textAlign={"left"} gap={"1"}  >
                    <Text fontSize={"14px"} >Select Fundraising</Text>
                    <Text fontWeight={"bold"} color={primaryColor}>
                        {selectedData?.name}
                    </Text>
                </Flex>
                <Flex transform={showModal ? "rotate(180deg)" : "rotate(0deg)"} >
                    <LiaAngleDownSolid />
                </Flex>
            </Flex>
            {showModal && (
                <Box shadow={"xl"} width={"full"} borderWidth={"0px"} zIndex={"60"} top={["0px", "0px", "0px", "100px", "100px"]} position={["relative", "relative", "relative", "absolute", "absolute"]} rounded={"lg"} >
                    <Flex maxH={"400px"} overflowY={"auto"} overflowX={"hidden"} gap={"3"} pos={"relative"} flexDirection={"column"} shadow={"lg"} width={"full"} borderColor={borderColor} padding={"4"} borderBottomWidth={"0px"} bg={mainBackgroundColor} rounded={"lg"}>
                        {data?.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <Flex flexDir={"column"}  key={index}>
                                        {item?.fundRaisers?.map((subitem: any) => {
                                            return (
                                                <Flex key={subitem?.id} w={"full"} flexDir={"column"} gap={"2px"} pb={"2"} borderBottomWidth={"1px"} borderBottomColor={borderColor} alignItems={"center"} >
                                                    <Button color={primaryColor} key={index} w={"full"} py={"14px"} borderBottomColor={"#D0D4EB"} rounded={"lg"} borderBottomWidth={"1px"} >
                                                        {subitem?.name}
                                                    </Button>
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                )
                            }
                        })}
                    </Flex>
                </Box>
            )}
        </Flex>
    )
}

export default SelectDonation
