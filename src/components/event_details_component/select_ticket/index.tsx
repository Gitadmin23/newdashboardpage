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
// import SignupModal from '@/app/auth/component/signupModal'

interface Props {
    ticket: any,
    selectedticket: any
    currency: any,
    setCategory: any,
    data?: any
}

function SelectTicket(props: Props) {
    const {
        ticket,
        selectedticket,
        setCategory,
        currency,
        data
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    // const { colorMode, toggleColorMode } = useColorMode();

    const [showModal, setShowModal] = React.useState(false)

    const [openSignUp, setOpenSignUp] = useState(false)
    const [open, setOpen] = React.useState(false)
    const token = sessionStorage.getItem('tp_token')
    const { userId: user_index } = useDetails((state) => state);

    const toast = useToast()

    const router = useRouter()

    const clickHandler = (item: any) => {
        if (token) {
            setCategory(item)
            setShowModal(false)
        } else {
            if (!user_index) {
                setOpen(true)
                setCategory(item)
                // router.push("/share/auth/?type=EVENT&typeID=" + data?.id)
            } else {
                setCategory(item)
                setShowModal(false)
            }
        }
    }

    useEffect(() => {
        setCategory({} as any)
    }, [])

    const signUpHandler = (item: boolean) => {
        setOpen(false)
        setOpenSignUp(item)
    }

    return (
        (<Flex gap={"3"} position={"relative"} alignItems={"center"} justifyContent={"end"} pl={"5"}  >
            <Flex onClick={() => setShowModal(true)} as={"button"} borderColor={"brand.chasescrollBlue"} rounded={"lg"} borderWidth={"1px"} height={"49px"} width={"full"} justifyContent={"center"} alignItems={"center"} >
                <Text fontSize={"sm"} color={"brand.chasescrollBlue"} >
                    {selectedticket?.ticketType ? selectedticket?.ticketType : "Select Ticket"}{" "}
                    {selectedticket?.ticketType ? formatNumber(selectedticket?.ticketPrice, currency === "USD" ? "$" : "₦") : ""}
                </Text>
            </Flex>
            <Box width={"fit-content"} >
                <Flex onClick={() => setShowModal(true)} as={"button"} width={"50px"} height={"49px"} rounded={"lg"} justifyContent={"center"} alignItems={"center"} borderColor={"brand.chasescrollBlue"} borderWidth={"1px"} >
                    <LiaAngleDownSolid />
                </Flex>
            </Box>
            {showModal && (
                <Box width={"full"} pl={"5"} borderWidth={"0px"} zIndex={"30"} top={"60px"} position={"absolute"} rounded={"lg"} >
                    <Flex gap={"3"} flexDirection={"column"} shadow={"lg"} width={"full"} borderColor={borderColor} padding={"4"} borderBottomWidth={"0px"} bg={secondaryBackgroundColor} rounded={"lg"}>
                        {ticket?.filter((item: any) => item?.ticketType)?.map((item: any, index: number) => {
                            if (item?.ticketType === "Early Bird" && (new Date(item?.endDate) !== new Date(data?.endDate))) {
                                if ((new Date() >= new Date(item?.startDate)) && new Date() <= new Date(item?.endDate)) {
                                    return (
                                        <Flex key={index} w={"full"} flexDir={"column"} gap={"2px"} pb={"2"} borderBottomWidth={"1px"} borderBottomColor={borderColor} alignItems={"center"} >
                                            <Button color={primaryColor} isDisabled={item?.totalNumberOfTickets === item?.ticketsSold} key={index} onClick={() => clickHandler(item)} width={"full"} py={"14px"} borderBottomColor={"#D0D4EB"} rounded={"lg"} borderBottomWidth={"1px"} >
                                                {item?.totalNumberOfTickets === item?.ticketsSold ?
                                                    "Sold Out" :
                                                    // <Flex gap={"1"} >
                                                    //     {item?.ticketType+" "} 
                                                    // <EventPrice minPrice={item?.minPrice} maxPrice={item?.maxPrice} currency={currency} />
                                                    // </Flex>
                                                    item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                                                }
                                            </Button>
                                            <Text color={"white"} px={"2"} rounded={"4px"} bg={"red"} textAlign={"center"} fontSize={"12px"} >Ends: {dateFormat(item?.endDate)} {timeFormat(item?.endDate)}</Text>
                                        </Flex>
                                    )
                                }
                            } else {
                                return (
                                    // <Flex w={"full"} flexDir={"column"} gap={"2px"} pb={"2"} borderBottomWidth={"1px"} borderBottomColor={borderColor} alignItems={"center"} >
                                    // {/* </Flex> */}
                                    (<Button isDisabled={item?.totalNumberOfTickets === item?.ticketsSold} key={index} onClick={() => clickHandler(item)} width={"full"} py={"14px"} borderBottomColor={"#D0D4EB"} rounded={"lg"} borderBottomWidth={"1px"} >
                                        {item?.totalNumberOfTickets === item?.ticketsSold ?
                                            "Sold Out" :
                                            item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                                        }
                                    </Button>)
                                );
                            }
                        })}
                    </Flex>
                </Box>
            )}
            {showModal && (
                <Box onClick={() => setShowModal(false)} bg={"black"} inset={"0px"} position={"fixed"} opacity={"0.25"} zIndex={"20"} />
            )}
            <ModalLayout open={open} close={setOpen} title='' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} >
                    <Flex flexDir={"column"} justifyContent={"center"} > 
                    <Text fontSize={"24px"} textAlign={"center"} fontWeight={"700"} lineHeight={"32px"} >Get Ticket</Text>
                    <Text color={"#626262"} textAlign={"center"}>Please choose your option and proceed with Chasescroll.</Text>
                    </Flex>
                    <GoogleBtn newbtn title='Sign in' id={data?.id ? true : false} index={data?.id} height='50px' border='1px solid #B6B6B6' bgColor='white' />
                    <Flex justifyContent={"center"} gap={"2px"} alignItems={"center"} >
                        <Text color={"#BCBCBC"} fontSize={"14px"} lineHeight={"19.6px"} >OR</Text>
                    </Flex> 
                    <Button onClick={() => router.push("/share/auth/temporary-account/?type=EVENT&typeID=" + data?.id)} backgroundColor={"#EDEFFF"} color={"#5465E0"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#EDEFFF"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#EDEFFF" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Get Temporary Account</Text>
                    </Button>
                    <Button onClick={() => signUpHandler(true)} color={"white"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Sign up</Text>
                    </Button>
                    {/* <SignupModal index={data?.id} open={openSignUp} setOpen={signUpHandler} /> */}
                    <Flex>
                        <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                            Already have an account?
                        </CustomText>
                        <CustomText onClick={() => router.push("/share/auth/login/?type=EVENT&typeID=" + data?.id)} fontWeight={"700"} ml={"4px"} fontSize={'sm'} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} cursor='pointer'>Log in</CustomText>
                    </Flex>
                </Flex>
            </ModalLayout>
            {/* {openSignUp && (
                <SignupModal hide={true} index={data?.id} open={openSignUp} setOpen={signUpHandler} />
            )} */}
        </Flex>)
    );
}

export default SelectTicket
