import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'

export default function ServiceTermAndCondition() {

    const [open, setOpen] = useState(false)

    const {
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()
    const termsAndConditions = `
4.0. Hiring Services
	•	You may browse and hire services offered by vendors.
	•	Payment for services will be held in escrow and released to the vendor upon your confirmation of service completion.
	•	It is your responsibility to review vendor profiles, reviews, and service descriptions before making a hiring decision.

4.1. Payments and Refunds
	•	Payments must be made using the platform's secure payment system.
	•	Refunds may be issued in cases of non-delivery, poor service, or breach of agreement by the vendor, subject to investigation.
	•	Disputes will be handled according to our dispute resolution process.

4.2. User Conduct
You agree not to:
	•	Use the platform for any unlawful or fraudulent activity.
	•	Post false, misleading, or defamatory content.
	•	Engage in abusive or threatening behavior towards vendors, customers, or platform staff.

4.3. Cancellations and Modifications
	•	You may cancel a service request before the vendor begins work.
	•	Modifications to service agreements must be communicated through the platform.

4.4. Dispute Resolution
In case of disputes, we encourage amicable resolution between you and the vendor. If no resolution is reached, you may submit a dispute through our platform for mediation or arbitration.

4.5. Limitation of Liability
Chasescroll shall not be held liable for any damages, losses, or injuries resulting from the services provided by vendors. Our liability is limited to the amount paid by you for the disputed service.
`;


    return (
        (<Flex  >
            <Text onClick={() => setOpen(true)} as={"button"} textDecor={"underline"} fontWeight={"bold"} fontSize={"12px"} color={primaryColor} >Service Terms And Conditions</Text>

            <ModalLayout size={["full", "full", "2xl"]} open={open} close={setOpen} >
                <Box width={"full"} h={["100vh", "100vh", "full"]} bg={mainBackgroundColor} px={["0px", "4", "4"]} pt={"3"} pb={"4"} >
                    <Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >

                        <Text fontSize={["18px", "24px", "24px"]} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >{"Service Terms And Conditions"}</Text>

                        <Box
                            my={"3"} lineHeight={"22px"}
                            whiteSpace="pre-wrap"
                            p={[2, 4, 4]}
                            borderWidth="1px"
                            borderRadius="md"
                            overflowY="auto"
                            maxH={["75vh", "75vh", "60vh"]}
                            fontSize="sm"
                        >
                            <Text textAlign={"center"} fontSize={"lg"} pt={"2"} fontWeight={"500"}>Hiring Services on Chasescroll</Text>
                            {termsAndConditions}
                        </Box>
                        <Flex pt={"3"} position={["relative"]} >
                            <Button onClick={() => setOpen(false)} w={["full", "300px", "300px"]} mx={"auto"} h={"42px"} borderWidth={"1px"} color={"#5465E0"} borderColor={"#5465E0"} rounded={"8px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} >
                                Done
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </ModalLayout>
        </Flex>)
    );
}
