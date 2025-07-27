import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'

export default function EventTermAndCondition() {

    const [open, setOpen] = useState(false)

    const {
        primaryColor, mainBackgroundColor
    } = useCustomTheme()
    const termsAndConditions = `
    Terms and Conditions

    1. Introduction
    1.1 Welcome to Chasescroll, an online platform designed to facilitate event planning, management, ticketing, and communication.
    1.2 By accessing or using the platform, you agree to abide by these Terms and Conditions. If you do not agree, please refrain from using the platform.
     
    2. Definitions
    2.1 "Platform" refers to Chasescroll and its related services.
    2.2 "User" refers to any individual or entity using the platform.
    2.3 "Organizer" refers to users creating or managing events.
    2.4 "Attendee" refers to users registering for or attending events.
     
    3. User Eligibility
    3.1 Users must be at least 18 years old or of legal age in their jurisdiction to enter binding agreements.
    3.2 By registering, you confirm that the information provided is accurate and complete.
     
    4. Account Registration
    4.1 Users must create an account to access certain features.
    4.2 It is the user's responsibility to maintain the confidentiality of their login credentials.
    4.3 The platform reserves the right to suspend or terminate accounts for violations of these T&Cs.
     
    5. Event Listings and Ticketing
    5.1 Organizers are solely responsible for the accuracy of event information, including descriptions, pricing, and schedules.
    5.2 The platform is not responsible for cancellations, postponements, or inaccuracies in event listings.
    5.3 All ticket sales, if applicable, are subject to the terms provided at the point of purchase.
     
    6. Fees and Payments
    6.1 Chasescroll charges the attendee a 1.5% service fee during ticket purchase and a 3% service fee charge on organizers during wallet cashout to their preferred bank account.                                                                       
    6.2 Fees are non-refundable except as required by law or explicitly stated otherwise.
    6.3 The platform is not liable for payment disputes between organizers and attendees.
     
    7. Content and Intellectual Property
    7.1 Users retain ownership of any content they post but grant the platform a non-exclusive license to use it for operational purposes.
    7.2 The platform retains ownership of all intellectual property related to its services.
     
    8. Prohibited Activities
    Users agree not to: 8.1 Post misleading or fraudulent event information.
    8.2 Engage in unlawful activities or violate third-party rights.
    8.3 Attempt to disrupt the platform’s functionality.
     
    9. Disclaimers and Limitation of Liability
    9.1 The platform is provided "as-is" without warranties of any kind.
    9.2 The platform is not responsible for damages resulting from use, errors, or service interruptions.
    9.3 Total liability shall not exceed the fees paid by the user in the 12 months preceding the claim.
     
    10. Privacy
    10.1 The platform collects and processes personal data per its [Privacy Policy].
    10.2 Users consent to the platform’s use of cookies and other tracking technologies.
     
    11. Termination
    11.1 The platform reserves the right to suspend or terminate user accounts at its discretion.
    11.2 Users may delete their accounts via the settings page or by contacting support@chasescroll.com
     
    12. Dispute Resolution
    12.1 Any disputes shall be resolved through arbitration in Nigeria, unless prohibited by law.
    12.2 Users waive their right to participate in class actions.
     
    13. Modifications
    13.1 The platform reserves the right to update these T&Cs.
    13.2 Continued use of the platform constitutes acceptance of updated terms.
     
    14. Governing Law
    14.1 These T&Cs shall be governed by the laws of The Federal Republic of Nigeria.
     
    15. Contact Information
    For questions about these T&Cs, contact us at support@chasescroll.com. 
`;


    return (
        <Flex  >
            <Text onClick={() => setOpen(true)} as={"button"} textDecor={"underline"} fontWeight={"bold"} fontSize={"12px"} color={primaryColor} >Event Terms And Conditions</Text>
            <ModalLayout size={"2xl"} open={open} close={setOpen} >
                <Box width={"full"} bg={mainBackgroundColor} px={["0px", "8", "8"]} pt={"3"} pb={"4"} >
                    <Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >

                        <Text fontSize={["18px", "24px", "24px"]} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >{"Event Terms And Conditions"}</Text>

                        <Box
                            my={"3"} lineHeight={"22px"}
                            whiteSpace="pre-wrap"
                            p={[2, 4, 4]}
                            borderWidth="1px"
                            borderRadius="md"
                            overflowY="auto"
                            maxH={"65vh"}
                            fontSize="sm"
                        >
                            {termsAndConditions}
                        </Box>
                        <Button onClick={() => setOpen(false)} w={["full", "300px", "300px"]} mx={"auto"} h={"42px"} mt={"3"} borderWidth={"1px"} color={"#5465E0"} borderColor={"#5465E0"} rounded={"8px"} bgColor={mainBackgroundColor} _hover={{ backgroundColor: mainBackgroundColor }} >
                            Done
                        </Button>
                    </Box>
                </Box>
            </ModalLayout>
        </Flex>
    )
}
