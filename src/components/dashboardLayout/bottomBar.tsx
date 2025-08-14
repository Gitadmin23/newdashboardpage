import useCustomTheme from "@/hooks/useTheme";
import { Button, Flex, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import UserImage from "../sharedComponent/userimage";
import { HomeIcon, Login, UsersIcon } from "../svg";
import { SidebarWalletIcon, KisokIcon, NotificationIcon } from "../svg/sidebarIcons";
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
        <Flex zIndex={"20"} px={"3"} bgColor={mainBackgroundColor} position={"fixed"} bottom={"0px"} alignItems={"center"} justifyContent={"space-between"} width='100%' height='70px' borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none', 'none']}>
            <Flex width={"50px"} onClick={() => routeHandler("/dashboard")} cursor={"pointer"} flexDir={"column"} color={pathname === "/dashboard" ? primaryColor : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <HomeIcon />
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Home</Text>
            </Flex>
            <Flex width={"50px"} onClick={() => routeHandler("/dashboard/settings/payment/details")} flexDir={"column"} cursor={"pointer"} color={pathname?.includes('explore') ? primaryColor : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <SidebarWalletIcon mobile={true} size={"20px"} color={pathname === "/dashboard/settings/payment/details" ? true : false} />
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Wallet</Text>
            </Flex>
            <Flex width={"50px"} onClick={() => routeHandler('/product/events')} cursor={"pointer"} flexDir={"column"} color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? primaryColor : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <KisokIcon size='20px' color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />
                </Flex>
                <Text fontSize={"10px"} fontWeight={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? "bold" : "medium"} >Event hub</Text>
            </Flex>
            <Flex width={"50px"} onClick={() => routeHandler('/dashboard/notification')} cursor={"pointer"} flexDir={"column"} alignItems={"center"} color={pathname?.includes('notification') ? primaryColor : bodyTextColor} justifyContent={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <NotificationIcon color={(pathname?.includes('notification') ? true : false)} size="20px" />
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Notification</Text>
            </Flex>
            <Flex width={"50px"} onClick={() => routeHandler('/dashboard/community')} cursor={"pointer"} flexDir={"column"} alignItems={"center"} color={pathname?.includes('community') ? primaryColor : bodyTextColor} justifyContent={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <UsersIcon />
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Community</Text>
            </Flex>
            <Flex width={"50px"} onClick={() => routeHandler(`/dashboard/profile/${user?.userId}`)} flexDir={"column"} alignItems={"center"} cursor={"pointer"} >
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                <UserImage size={"30px"} border={"1px"} font={"16px"} data={user} image={user?.data?.imgMain?.value} />
                </Flex>
                <Text fontSize={"10px"} color={pathname?.includes("profile") ? primaryColor : bodyTextColor} fontWeight={"medium"} >Profile</Text>
            </Flex>
            {/* <Flex width={"50px"} onClick={() => routeHandler(`/dashboard/profile/${user?.userId}`)} cursor={"pointer"} >
                <UserImage size={"30px"} border={"1px"} font={"16px"} data={user} image={user?.data?.imgMain?.value} />
            </Flex> */}

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