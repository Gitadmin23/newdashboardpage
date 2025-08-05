import useCustomTheme from "@/hooks/useTheme";
import { Button, Flex, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import UserImage from "../sharedComponent/userimage";
import { HomeIcon, Login, UsersIcon } from "../svg";
import { SidebarWalletIcon, KisokIcon } from "../svg/sidebarIcons";
import { EVENTPAGE_URL, LANDINGPAGE_URL } from "@/services/urls";
import useGetUser from "@/hooks/useGetUser";
import ModalLayout from "../sharedComponent/modal_layout";

export default function BottomBar() {
 
    const pathname = usePathname() 
    const newtheme = localStorage.getItem("chakra-ui-color-mode") as string

    const {
        mainBackgroundColor,
        borderColor,
        secondaryBackgroundColor,
        bodyTextColor,
        primaryColor 
    } = useCustomTheme()

    const { user, show } = useGetUser()

    const router = useRouter()

    const routeHandler = (item: string) => {
        if (item === '/product/events') {
            window.location.href = `${EVENTPAGE_URL}/product/events?theme=${newtheme}`;
        } else {
            router.push(item)
        }
    }

    const login = async () => {
        window.location.href = `${LANDINGPAGE_URL}/logout`;  
    }

    return (
        <Flex paddingX='20px' zIndex={"100"} position={"sticky"} bottom={"0px"} alignItems={"center"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none', 'none']}>
            <Flex onClick={() => routeHandler("/dashboard")} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname === "/dashboard" ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <HomeIcon />
            </Flex>
            <Flex onClick={() => routeHandler("/dashboard/settings/payment/details")} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard/settings/payment/details" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <SidebarWalletIcon mobile={true} size={"20px"} color={pathname === "/dashboard/settings/payment/details" ? true : false} />
            </Flex>
            <Flex onClick={() => routeHandler('/product/events')} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? secondaryBackgroundColor : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <KisokIcon size='20px' color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />
            </Flex>
            <Flex onClick={() => routeHandler('/dashboard/community')} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('community') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('community') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <UsersIcon />
            </Flex>
            <Flex onClick={() => routeHandler(`/dashboard/profile/${user?.userId}`)} cursor={"pointer"} >
                <UserImage size={"40px"} border={"1px"} font={"16px"} data={user} image={user?.data?.imgMain?.value} />
            </Flex>

            <ModalLayout size={"sm"} open={show} close={()=> console.log("logout")} >
                <Flex
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"center"}
                
                    rounded={"lg"}
                    flexDirection={"column"}
                    bgColor={mainBackgroundColor}
                    p={"6"}
                    alignItems={"center"}
                >
                    <Flex
                        width="60px"
                        height={"60px"}
                        borderRadius={"full"}
                        justifyContent={"center"}
                        bg="#df26263b"
                        alignItems={"center"}
                    >
                        <Login />
                    </Flex>
                    <Text fontSize={"24px"} mt={"4"} fontWeight={"600"} >
                        Session Expired
                    </Text>
                    <Text fontSize={"sm"} textAlign={"center"} >Your session has expired. please log in again to continue</Text>
                    <Flex justifyContent={"center"} mt={4} roundedBottom={"lg"} gap={"3"} width={"100%"}>
                        <Button
                            borderColor={primaryColor}
                            borderWidth={"1px"}
                            rounded={"full"}
                            _hover={{ backgroundColor: primaryColor }}
                            bg={primaryColor}
                            width="60%"
                            fontWeight={"600"}
                            height={"45px"}
                            color="white"
                            onClick={login}
                        >
                            Login
                        </Button> 
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}