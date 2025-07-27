import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { TickIcon, VerifyIcon } from '@/components/svg'
import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    next?: any
}

function StepFour(props: Props) {
    const {
        next
    } = props

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)

    const router = useRouter()

    return (
        <Flex maxW={"420px"} flexDir={"column"} width={"full"} >
            <Text color={"#000000CC"} fontSize={"2xl"} fontWeight={"medium"} >Select Verification Method</Text>
            <Text fontSize={"sm"} color={"#00000080"} mt={"2"} >Chasescroll needs to verify that you manage this business. Select how you
                would like to get a verification code.</Text>
            <Flex my={"6"} flexDir={"column"} w={"full"} gap={"4"} >
                <Flex gap={"1"} flexDir={"column"} >
                    <Text color={"#101828B2"} >Phone Number</Text>
                    <Input h={"45px"} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Phone Number' />
                </Flex>
            </Flex>
            <Text color={"#00000080"} fontSize={"sm"} >Get a verification code at this number now by automated call or via a text message. Standard rates apply</Text>
            <Flex mt={"7"} width={"full"} gap={"4"} >
                <CustomButton onClick={() => setOpen(true)} borderRadius={"8px"} width={"full"} text='Call' backgroundColor={"#5D70F9"} borderColor={"#5D70F9"} borderWidth={"1px"} color={"white"} fontSize={"sm"} />
                <CustomButton onClick={() => setOpen(true)} borderRadius={"8px"} width={"full"} text='Text' backgroundColor={"transparent"} borderColor={"#101828B2"} borderWidth={"1px"} color={"#101828B2"} fontSize={"sm"} />
            </Flex>
            <ModalLayout size={"md"} open={open} close={setOpen} title={!tab ? 'Enter Verification Code' : ""} >
                {!tab && (
                    <Flex flexDir={"column"} pb={"8"} px={"6"} >
                        <Text color={"#00000080"} fontSize={"sm"} >A verification code has been sent to your phone number ‘
                            07064223148’Enter the 6-digit verification from the text message</Text>
                        <Flex mt={"5"} w={"full"} alignItems={"center"} gap={"2"} >
                            <VerifyIcon />
                            <Input h={"40px"} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Enter Code' />
                        </Flex>
                        <Flex mt={"3"} gap={"3"} >
                            <Text fontSize={"sm"} as={"button"} color={"#00000080"} >Having Problems?</Text>
                            <Text color={"#00000040"} fontSize={"sm"} fontWeight={"medium"} >Resend code</Text>
                        </Flex>
                        <Text fontSize={"sm"} my={"3"} w={"fit-content"} as={"button"} color={"#5D70F9"} fontWeight={"medium"} >Change Method</Text>
                        <Text fontSize={"sm"} w={"fit-content"} as={"button"} color={"#00000073"} fontWeight={"medium"} >You can request another code in <span style={{ color: "#000000B2" }} >59</span> seconds</Text>
                        <CustomButton onClick={() => setTab(true)} mt={"8"} borderRadius={"8px"} width={"full"} text='Verify' backgroundColor={"#5D70F9"} borderColor={"#5D70F9"} borderWidth={"1px"} color={"white"} fontSize={"sm"} />
                    </Flex>
                )}
                {tab && (
                    <Flex alignItems={"center"} flexDir={"column"} py={"7"} >
                        <TickIcon />
                        <Text mt={"3"} fontWeight={"bold"} color={"#000000CC"} fontSize={"2xl"} >Code Approved</Text>
                        <Text textAlign={"center"} color={"#101828B2"} fontSize={"sm"} >Congratulation was successful proceed to finish <br/> your registration. </Text>
                        <CustomButton onClick={()=> router.push("/dashboard/booking")} text='Continue' fontWeight={"bold"} mt={"7"} color={"#5D70F9"} backgroundColor={"transparent"} />
                    </Flex>
                )}
                {/* < */}
            </ModalLayout>
        </Flex>
    )
}

export default StepFour
