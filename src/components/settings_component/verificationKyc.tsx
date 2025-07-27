import React, { useState } from 'react'
import CustomButton from '../general/Button'
import ModalLayout from '../sharedComponent/modal_layout'
import { Flex, Image, Input, PinInput, PinInputField, Select, Text } from '@chakra-ui/react'
import { SuccessIcon } from '../svg'

export default function VerificationKyc() {

    const [open, setOpen] = useState(false)

    const [tab, setTab] = useState(0)
    const [code, setCode] = useState("")

    return (
        <>
            <CustomButton onClick={() => setOpen(true)} text={"Verify"} color={"#12299C"} backgroundColor={"white"} borderRadius={"999px"} />
            <ModalLayout size={"md"} open={open} closeIcon={false} close={setOpen} >
                <Flex w={"full"} flexDirection={"column"} pb={"4"} >
                    <Flex w={"full"} px={"3"} py={"2"} gap={"2"} borderBottomWidth={"1px"} alignItems={"center"} >
                        <Image alt='logo' src='/images/logo.png' w={"30px"} />
                        <Text fontSize={"14px"} fontWeight={"600"} >Chasescroll KYC </Text>
                    </Flex>
                    {tab === 0 && (
                        <Flex px={"5"} fontSize={"14px"} w={"full"} gap={"3"} flexDirection={"column"} alignItems={"center"} py={"3"} >
                            <Text textAlign={"center"} w={"70%"} fontWeight={"600"} >Select your preferred Identification type for Verification:</Text>
                            <Flex flexDirection={"column"} w={"full"} gap={"1"} >
                                <Text  >Identification Type</Text>
                                <Select fontSize={"14px"} height={"35px"} placeholder='Select Type' >
                                    <option>NIN</option>
                                    <option>BVN</option>
                                    <option>PASS PORT</option>
                                </Select>
                            </Flex>
                            <Flex flexDirection={"column"} w={"full"} gap={"1"} >
                                <Text >Enter NIN NO,*</Text>
                                <Input fontSize={"14px"} height={"35px"} />
                            </Flex>
                            <Flex px={"6"} py={"4"} rounded={"4px"} bgColor={"#F6F7FF"} fontSize={"12px"} >
                                <span style={{ fontWeight: "700" }} >NOTE</span> : This helps us identify the event creator and ensure the safety of the event, verifying that it is not a scam.
                            </Flex>
                            <CustomButton onClick={()=> setTab((prev)=> prev + 1)} text={"Procced"} fontSize={"sm"} borderRadius={"999px"} backgroundColor={"#3248E4"} />
                        </Flex>
                    )}
                    {tab === 1 && (
                        <Flex px={"5"} fontSize={"14px"} w={"full"} gap={"3"} flexDirection={"column"} alignItems={"center"} py={"3"} >
                            <Text textAlign={"center"} fontWeight={"600"} fontSize={"24px"} >NIN Verification</Text>
                            <Text textAlign={"center"} fontSize={"14px"} w={"70%"} >Please enter the 6 Digit Code sent  to your Phone Number  08104***664***</Text>
                            <Flex gap={"3"} >
                                <PinInput size={"lg"} otp value={code} onChange={(e) => setCode(e)} >
                                    <PinInputField rounded={"8px"} w={["40px", "40px", "40px"]} h={["40px", "40px", "40px"]} />
                                    <PinInputField rounded={"8px"} w={["40px", "40px", "40px"]} h={["40px", "40px", "40px"]} />
                                    <PinInputField rounded={"8px"} w={["40px", "40px", "40px"]} h={["40px", "40px", "40px"]} />
                                    <PinInputField rounded={"8px"} w={["40px", "40px", "40px"]} h={["40px", "40px", "40px"]} />
                                    <PinInputField rounded={"8px"} w={["40px", "40px", "40px"]} h={["40px", "40px", "40px"]} />
                                    <PinInputField rounded={"8px"} w={["40px", "40px", "40px"]} h={["40px", "40px", "40px"]} />
                                </PinInput>
                            </Flex>
                            <Text fontSize={"14px"} >{`Didn't receive OTP?`} <span style={{ color:"#5465E0", fontWeight: "bold" }} >Resend</span></Text>
                            <CustomButton onClick={()=> setTab((prev)=> prev + 1)} text={"Verify"} fontSize={"sm"} width={"80%"} borderRadius={"999px"} backgroundColor={"#3248E4"} />
                        </Flex>
                    )}
                    {tab === 2 && (
                        <Flex px={"5"} fontSize={"14px"} w={"full"} gap={"3"} flexDirection={"column"} alignItems={"center"} py={"3"} >
                            <SuccessIcon />
                            <Text textAlign={"center"} fontWeight={"600"} fontSize={"24px"} >NIN Verification Successful</Text> 
                            <Text textAlign={"center"} fontSize={"14px"} w={"70%"} >You have successfully verified your account. Please procced to create event</Text> 
                            <CustomButton onClick={()=> {setOpen((prev)=> !prev), setTab(0)}} fontSize={"sm"} text={"Procced to Create Event"} width={"80%"} borderRadius={"999px"} backgroundColor={"#3248E4"} />
                        </Flex>
                    )}
                </Flex>
            </ModalLayout>
        </>
    )
}
