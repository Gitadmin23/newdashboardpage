// import SignupModal from "@/app/auth/component/signupModal"
import CustomText from "@/components/general/Text"
import { Flex, Button, Text } from "@chakra-ui/react"
// import GoogleBtn from "../googlebtn"
import ModalLayout from "../modal_layout"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"


export default function ShareLoginModal(
    { affiliateID, affiliate, id, type }: {
        affiliateID?: any, affiliate?: any, id: any, type: "DONATION" | "EVENT" | "RENTAL" | "SERVICE" | "KIOSK"
    }
) {

    const [openSignUp, setOpenSignUp] = useState(false)
    const [open, setOpen] = useState(false)
    const query = useSearchParams(); 
    const queryOpen = query?.get('open');

    const { push } = useRouter()

    const signUpHandler = (item: boolean) => {
        setOpen(false)
        setOpenSignUp(item)
    }

    useEffect(() => {
        if (queryOpen) {
            setOpen(true)
        }
    }, [queryOpen])

    return (
        <> 
            <ModalLayout open={open} close={setOpen} title='' >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} >
                    <Flex flexDir={"column"} justifyContent={"center"} >
                        <Text fontSize={"24px"} textAlign={"center"} fontWeight={"700"} lineHeight={"32px"} >Get Ticket</Text>
                        <Text color={"#626262"} textAlign={"center"}>Please choose your option and proceed with Chasescroll.</Text>
                    </Flex>
                    {/* <GoogleBtn affiliate={affiliateID} type={type} newbtn title='Sign in' id={id ? true : false} index={id} height='50px' border='1px solid #B6B6B6' bgColor='white' /> */}
                    <Flex justifyContent={"center"} gap={"2px"} alignItems={"center"} >
                        <Text color={"#BCBCBC"} fontSize={"14px"} lineHeight={"19.6px"} >OR</Text>
                    </Flex> 
                    <Button onClick={() => signUpHandler(true)} color={"white"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Sign up</Text>
                    </Button> 
                    <Flex>
                        <CustomText fontSize={'sm'} marginLeft='0px'>
                            Already have an account?
                        </CustomText>
                        <CustomText onClick={() => push(`/share/auth/login/?type=${type}&typeID=` + id + (affiliate ? "&affiliate=" + affiliateID : ""))} fontWeight={"700"} ml={"4px"} fontSize={'sm'} color='brand.chasescrollButtonBlue' cursor='pointer'>Log in</CustomText>
                    </Flex>
                </Flex>
            </ModalLayout>
            {/* {openSignUp && (
                <SignupModal type={type} hide={true} index={id} open={openSignUp} setOpen={signUpHandler} />
            )} */}
        </>
    )
}