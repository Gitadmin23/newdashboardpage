import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'

export default function KisokTermAndCondition() {

    const [open, setOpen] = useState(false)

    const {
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()
    const termsAndConditions = `
8.0. Purchasing Items Process
	•	You may browse and purchase items listed by sellers.
	•	Payments must be made through our secure payment system.
	•	Once payment is confirmed, sellers will fulfill the order and provide tracking information, if applicable.

8.1. Payments and Refunds
	•	Payments are held in escrow until you confirm receipt and satisfaction with your purchase.
	•	Refunds may be issued in cases of non-delivery, damaged items, or items that are significantly different from their descriptions.
	•	Refund requests must be submitted within 2 days from the delivery date.

8.2. Shipping and Delivery
	•	Sellers are responsible for shipping and delivery of items.
	•	Estimated delivery times are provided by sellers and may vary.
	•	You must inspect the item upon receipt and report any issues immediately.

8.3. Cancellations and Returns
	•	You may cancel your order before it is shipped, subject to the seller’s cancellation policy.
	•	Returns are subject to the seller’s return policy, which will be indicated on the product listing.

8.4. Dispute Resolution
	•	In case of disputes, we encourage direct communication with the seller.
	•	If no resolution is reached, you may submit a dispute through our platform for mediation.

8.5. Prohibited Activities
You agree not to:
	•	Provide false information when making purchases.
	•	Engage in fraudulent transactions.
	•	Use the platform for illegal or unethical activities.

8.6. Limitation of Liability
Chasescroll shall not be held liable for any damages, losses, or claims related to your purchases. Our liability is limited to the amount paid for the disputed item.

`;


    return (
        (<Flex  >
            <Text onClick={() => setOpen(true)} as={"button"} textDecor={"underline"} fontWeight={"bold"} fontSize={"12px"} color={primaryColor} >Kiosk Terms And Conditions</Text>

            <ModalLayout size={["full", "full", "2xl"]} open={open} close={setOpen} >
                <Box width={"full"} h={["100vh", "100vh", "full"]} bg={mainBackgroundColor} px={["0px", "4", "4"]} pt={"3"} pb={"4"} >
                    <Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >

                        <Text fontSize={["18px", "24px", "24px"]} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >{"Kisok Terms And Conditions"}</Text>

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
                            <Text textAlign={"center"} fontSize={"lg"} pt={"2"} fontWeight={"500"}>Purchasing Items on Chasescroll</Text>
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
