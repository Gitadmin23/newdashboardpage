import CustomButton from "@/components/general/Button";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";


export default function ServiceProvider() {

    const refthree: any = useRef(null);
    const isInViewthree = useInView(refthree, { once: true });

    const { push } = useRouter()

    return (
        <Flex w={"full"} gap={["4", "4", "6"]} pos={"relative"} px={["6", "6", "16"]} py={["6", "6", "14"]} flexDir={["column", "column", "row"]} bg={"#F8FBF8"} alignItems={"center"} >
            <Flex w={"full"} h={"full"} pos={"absolute"} inset={"0px"} >
                <Image src="/images/hero/serviceprovided.jpg" alt="getthing" w={"full"} objectFit={"cover"} />
            </Flex>
            <Flex pos={"absolute"} inset={"0px"} zIndex={"10"} style={{ background: "linear-gradient(275.68deg, rgba(1, 4, 26, 0) 1.36%, #01041A 61.18%)" }} />
            <Flex
                ref={refthree}
                style={{
                    transform: isInViewthree ? "none" : "translateY(+70px)",
                    opacity: isInViewthree ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }} w={"full"} flexDirection={"column"} gap={"6"} zIndex={"30"} color={"white"} >
                <Text fontSize={["32px", "32px", "48px"]} lineHeight={"120%"} fontWeight={"700"} >How Payments Work for <span style={{ color: "white" }} >Service</span> Providers</Text>
                <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", 'repeat(2, 1fr)']} gap={["4", "4", "8"]} py={"5"} >
                    <Text fontWeight={"500"} >{`Customers pay the full service amount upfront into the vendor's secure escrow system. After the service is completed, they must click the "Approve" button to confirm successful delivery. Once approved, the funds are automatically transferred to the vendor's wallet for withdrawal to their preferred bank account.`}</Text>
                    <Text fontWeight={"500"} >{`To ensure a smooth resolution, be sure to take photos or videos as evidence. With us, you don't have to worry about losing your money or dealing with subpar customers.`}</Text>
                    <Text fontWeight={"500"} >{`If a customer is disrespectful, acts irresponsibly, or intentionally delays the project without prior notice, we've got your back—we'll release your full payment to you, hassle-free.`}</Text>
                    <Flex justifyContent={"end"} >
                        <CustomButton onClick={()=> push("/auth")} text={"Find Opportunities"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
                    </Flex>
                </Grid>
            </Flex>
        </Flex>
    )
}