import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'

export default function VendorTermAndCondition({ type, checked, setChecked }: { checked: boolean; setChecked: any, type?: "SERVICE" | "RENTAL" | "PRODUCT" }) {

	const [open, setOpen] = useState(false)

	const {
		primaryColor,
		mainBackgroundColor,
		headerTextColor
	} = useCustomTheme()
	const rentaltermsAndConditions = `
1. Introduction
Welcome to Chasescroll (“Rental System”). By registering as a vendor and listing rental items on our platform, you (“Vendor”) agree to comply with the following terms and conditions.

2. Vendor Eligibility & Registration
	•	Vendors must be at least 18 years old and legally authorized to rent items.
	•	Vendors must provide accurate business and contact details.
	•	Chasescroll reserves the right to deactivate vendor(s) with multiple reports from customers.

3. Listing & Rental Policies
	•	Vendors are responsible for accurately describing rental items, including condition, availability, and pricing.
	•	All listed items must comply with legal and safety standards.
	•	Misleading or false listings may result in account suspension.

4. Rental Fees & Payment Terms
	•	Vendors set their own rental prices, but Chasescroll may charge a service fee of 5% fixed rate.
	•	Payments will be processed through Chasescroll and powered by Paystack.
	•	Vendors will receive payouts only after the customer approves the payment. The funds will remain in escrow until the customer confirms that the rented item has been delivered or received in good condition and on time. Once approved, the payment will be transferred to the vendor’s wallet for withdrawal.
	•	Any disputes related to payments must be reported within 24hrs

5. Responsibilities of Vendors
	•	Vendors must ensure items are in good condition before renting them out.
	•	Items must be delivered or made available for pickup as per the agreed rental terms between vendor and customers.
	•	Vendors are responsible for damages due to improper maintenance or misrepresentation.

6. Cancellations & Refunds
	•	Vendors must define their cancellation and refund policy clearly in the item description section.
	•	Refunds or compensation for rental issues will be handled per Chasescroll guidelines.
	•	Excessive cancellations may lead to penalties or suspension.

7. Liability & Insurance
	•	Vendors are responsible for insuring high-value rental items if required.
	•	Chasescroll is not liable for damages, theft, or misuse of rental items by renters.
	•	Vendors must report any fraudulent activity or disputes promptly.

8. Prohibited Items
Vendors may not list or rent items that are:
	•	Illegal, stolen, or counterfeit.
	•	Hazardous or unsafe for public use.
	•	Restricted under local or federal regulations.

9. Termination & Suspension
	•	Vendors who violate these terms may have their accounts suspended or permanently removed.
	•	Chasescroll reserves the right to terminate vendor accounts at its discretion.

10. Governing Law & Disputes
	•	This agreement is governed by the laws of The federal republic of Nigeria.
    
By registering and listing rental items on Chasescroll, you acknowledge that you have read, understood, and agree to these Terms and Conditions.


`;

	const servicetermsAndConditions = `  
1. Introduction
Welcome to Chasescroll ("Platform"). By registering as a vendor and offering services through our platform, you ("Vendor") agree to the following terms and conditions.

2. Vendor Eligibility & Registration
	•	Vendors must be at least 18 years old and legally authorized to provide services.
	•	Vendors must provide accurate personal, business, and contact details.
	•	Chasescroll reserves the right to approve, reject, or suspend vendor accounts at its discretion.

3. Service Listing & Performance Standards
	•	Vendors must accurately describe their services, pricing, and availability.
	•	Services must comply with applicable laws and professional standards.
	•	Vendors must deliver services professionally and within agreed-upon timelines.
	•	Misrepresentation of services may lead to account suspension or termination.

4. Payment Terms & Payouts
	•	Customers make payments through the platform's secure payment system.
	•	Payments will remain in escrow until the customer confirms that the service has been rendered satisfactorily.
	•	Upon approval, funds are transferred to the vendor's wallet for withdrawal/cashout.
	•	The platform may charge a service fee of 5% per transaction.
	•	Payouts are processed by the vendor once payment has been moved from escrow to wallet via the wallet section powered by Paystack payment system.

5. Cancellations & Refunds
	•	Vendors must define their cancellation and refund policies clearly in their service listings.
	•	Customers may request refunds for services not delivered as promised.
	•	Refund disputes will be resolved based on platform policies and arbitration if necessary.

6. Vendor Responsibilities
	•	Vendors must provide high-quality services and maintain good customer relations.
	•	Vendors are responsible for handling customer inquiries and resolving disputes.
	•	Vendors must ensure compliance with all legal, licensing, and regulatory requirements.
	•	The platform is not responsible for any liabilities arising from vendor services.

7. Prohibited Services
Vendors may not offer services that involve:
	•	Illegal, fraudulent, or unethical activities.
	•	Violation of intellectual property or third-party rights.
	•	Services that promote discrimination, violence, or misleading practices.

8. Liability & Indemnification
	•	Vendors assume full responsibility for their services and customer interactions.
	•	Chasescroll is not liable for any damages, losses, or disputes arising from vendor-provided services.
	•	Vendors agree to indemnify and hold Chasescroll harmless against any claims, damages, or legal actions related to their services.

9. Dispute Resolution
	•	Any disputes between vendors and customers should first be resolved through direct communication.
	•	If unresolved, disputes may go through mediation or arbitration as per platform policies.
	•	Legal disputes shall be governed by the laws of The federal republic of Nigeria. 

10. Termination & Suspension
	•	The platform reserves the right to suspend or terminate vendor accounts for policy violations.
	•	Vendors can voluntarily deactivate their accounts by providing written notice.

11. Amendments to Terms
	•	Chasescroll reserves the right to update these terms at any time. Vendors will be notified of significant changes.
	•	Continued use of the platform after changes indicates acceptance of the revised terms.

By registering as a vendor and offering services on [Chasescroll], you acknowledge that you have read, understood, and agreed to these Terms and Conditions.

`;

	const productTermAndCondition = `
Terms and Conditions for Sellers
Welcome to Chasescroll. By listing and selling products on our platform, you (“Seller”) agree to the following Terms and Conditions. Please read them carefully.

1. Seller Eligibility
To sell on the Platform, you must:
	•	Be at least 18 years old or legally permitted to enter into binding agreements.
	•	Provide accurate and verifiable information during registration.
	•	Comply with all applicable local, state, and international laws.

2. Product Listings
	•	Sellers are responsible for ensuring their listings are accurate, complete, and do not mislead buyers.
	•	All items must be in compliance with our Prohibited Items Policy.
	•	Sellers must update inventory and availability promptly to avoid order issues.

3. Order Fulfillment & Shipping
	•	Sellers must fulfill all accepted orders promptly and deliver them within the stated timeline.
	•	If delays or issues occur, sellers must notify the buyer and our support team immediately.
	•	Shipping costs and responsibilities may be defined based on product category or seller agreement.

4. Payment Terms
	•	Sellers will receive payments for completed transactions after customer has comfirm delivery of the item.
	•	Our Escrow System ensures secure distribution of funds between customers and sellers.
	•	Customer's payment stays on the Escrow until item is delivered and the customer confirms that the item has been received using the delivery confirmation button in their order page, the payment will instantly be transferred to the sellers Chasescroll wallet for withdrawal.
	•	Payouts can be made once funds are available in the Chasescroll wallet by sellers to their preferred bank account within minutes.

5. Fees and Commissions
	•	Sellers agree to pay a 3% service fee or commission for each transaction made through the Platform.
	•	The fee structure will be made available in your seller dashboard and is subject to change with notice.

6. Cancellations & Refunds
	•	Sellers are responsible for issuing refunds or replacements as per our Buyer Protection Policy.
	•	Excessive cancellations may lead to account suspension or review.

7. Prohibited Conduct
Sellers must not:
	•	Engage in fraud, misrepresentation, or unethical selling practices.
	•	Circumvent the Platform's payment or messaging systems.
	•	Sell counterfeit, illegal, or unsafe items.

8. Intellectual Property
	•	Sellers retain ownership of their content but grant the Platform a non-exclusive license to use product images, descriptions, and branding for marketing and sales purposes.

9. Account Termination
	•	The Platform reserves the right to suspend or terminate seller accounts for violations of these Terms.
	•	Sellers may also request account deactivation with written notice.

10. Limitation of Liability
The Platform is not liable for damages arising from:
	•	Incomplete transactions
	•	Delivery delays
	•	Third-party behavior or misconduct

11. Amendments
These terms may be updated from time to time. Continued use of the Platform indicates acceptance of the new terms.

12. Contact Us
If you have questions, please contact us at support@chasescroll.com.

`


	return (
		(<Flex w={"full"}  >
			<Flex w={"full"} justifyContent={"center"} > 
				<Flex alignItems={"center"} gap={"2"} w={"fit-content"} px={"3"} rounded={"md"} py={"3"} bgColor={mainBackgroundColor} >
					<Checkbox borderColor={headerTextColor} isChecked={checked} onChange={(e) => setChecked(e.target.checked)} />
					<Text type="button" onClick={() => setOpen(true)} as={"button"} textDecor={"underline"} fontWeight={"bold"} fontSize={"12px"} color={primaryColor} >Accept {type === "PRODUCT" ? "Kiosk Terms And Conditions" : type === "RENTAL" ? "Rental Terms And Conditions" : type === "SERVICE" ? "Services Terms And Conditions" : ""}</Text>
				</Flex>
			</Flex>
			<ModalLayout size={["full", "full", "2xl"]} open={open} close={setOpen} >
				<Box width={"full"} h={["100vh", "100vh", "full"]} bg={mainBackgroundColor} px={["0px", "4", "4"]} pt={"3"} pb={"4"} >
					<Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >

						<Text fontSize={["18px", "24px", "24px"]} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >{type === "PRODUCT" ? "Kiosk Terms And Conditions" : type === "RENTAL" ? "Rental Terms And Conditions" : type === "SERVICE" ? "Services Terms And Conditions" : ""}</Text>
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
							{type === "SERVICE" ? servicetermsAndConditions : type === "RENTAL" ? rentaltermsAndConditions : type === "PRODUCT" ? productTermAndCondition : ""}
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
