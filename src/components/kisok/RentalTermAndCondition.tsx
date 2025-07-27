import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'

export default function RentalTermAndCondition() {

    const [open, setOpen] = useState(false)

    const {
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()
    const termsAndConditions = `
5.0. Renting Process
	•	You may browse and rent items listed by vendors.
	•	Payments for rentals will be held in escrow until you confirm receipt and satisfactory condition of the item.
	•	It is your responsibility to inspect the item upon delivery or pickup and report any issues immediately.

5.1. Payments and Refunds
	•	Payments must be made using the platform’s secure payment system.
	•	Refunds may be issued if the item is not delivered, is defective, or is significantly different from the description.
	•	Refund requests are subject to investigation and approval.

5.2. Item Care and Responsibility
	•	You are responsible for taking reasonable care of the rented item while it is in your possession.
	•	Any damages, loss, or theft of the item will be your responsibility, and you may be charged repair or replacement costs.
	•	Items must be returned on time and in the condition in which they were received.

5.3 Cancellations and Modifications
	•	Cancellations are subject to the vendor's cancellation policy, which will be stated on the item listing.
	•	Modifications to rental agreements must be approved by the vendor through the platform.

5.4. Dispute Resolution
	•	In the event of a dispute, we encourage direct communication with the vendor.
	•	If no resolution is reached, you may submit a dispute through our platform for mediation or arbitration.

5.6. Limitation of Liability
Chasescroll shall not be held liable for any damages, losses, or injuries resulting from the use of rented items. Our liability is limited to the amount paid by you for the rental in question.
`;


    return (
        (<Flex  >
            <Text onClick={() => setOpen(true)} as={"button"} textDecor={"underline"} fontWeight={"bold"} fontSize={["10px", "10px", "12px"]} color={primaryColor} >Rental Terms And Conditions</Text>

            <ModalLayout size={["full", "full", "2xl"]} open={open} close={setOpen} >
                <Flex width={"full"} h={["100vh", "100vh", "full"]} bg={mainBackgroundColor} px={["0px", "4", "4"]} pt={"3"} pb={"4"} >
                    <Flex display={"flex"} h={"full"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >

                        <Text fontSize={["18px", "24px", "24px"]} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >{"Rental Terms And Conditions"}</Text>

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
                            <Text textAlign={"center"} fontSize={"lg"} pt={"2"} fontWeight={"500"} >Renting Items on Chasescroll</Text>
                            {termsAndConditions}
                        </Box>
                        <Flex pt={"3"} position={["relative"]} >
                            <Button onClick={() => setOpen(false)} w={["full", "300px", "300px"]} mx={"auto"} h={"42px"} borderWidth={"1px"} color={"#5465E0"} borderColor={"#5465E0"} rounded={"8px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} >
                                Done
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>)
    );
}
