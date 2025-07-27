"use client"
import useCustomTheme from "@/hooks/useTheme"; 
import { Box, Flex, Image, Text } from "@chakra-ui/react"; 
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../explore_component/searchbar";
import { FundraisingIcon } from "../svg";
import DashboardMenuBtn from "../sharedComponent/dashboard_menu_btn";
import useNotificationHook from "@/hooks/useNotificationHook";

export default function Navbar() {

    const { mainBackgroundColor, borderColor, primaryColor } = useCustomTheme()
    const router = useRouter()
    const pathname = usePathname()

    const { count } = useNotificationHook()

    return (
        <>
            {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion") && !pathname?.includes("/donation/create") && !pathname?.includes("/donation/edit")) && (
                <Flex w={"full"} h={"76px"} pos={['sticky', 'sticky', 'sticky', "sticky", "sticky"]} bgColor={mainBackgroundColor} zIndex={"100"} insetX={"0px"} top={"0px"} borderBottomColor={borderColor} borderBottomWidth={"1px"} alignItems={"center"} px={"6"} justifyContent={"space-between"}  >
                    {(pathname !== "/dashboard/event/my_event" && pathname !== "/dashboard/event/past_event" && pathname !== "/dashboard/event/saved_event" && pathname !== "/dashboard/event/draft" && !pathname?.includes("kiosk") && !pathname?.includes("fundraising") && !pathname?.includes("donation")) && (
                        <Box display={["none", "none", "none", "flex", "flex"]} >
                            <SearchBar fundraising={pathname?.includes("/donation")} change={pathname?.includes("/donation") ? true : false} />
                        </Box>
                    )}
                    {pathname?.includes("kiosk") && (
                        <Text display={["none", "none", "none", "flex", "flex"]} fontSize={"24px"} fontWeight={"700"} >Chasescroll  <span style={{ color: primaryColor, marginLeft: "2px" }} >Versax</span></Text>
                    )}
                    <Flex alignItems={"center"} gap={"2"} >
                        <Flex as={"button"} onClick={() => router?.push("/dashboard")} display={["flex", "flex", "flex", "none", "none"]} alignItems={"center"} gap={"2"} >
                            <Image alt='logo' src='/images/logo.png' w={"35.36px"} />
                        </Flex>
                        {(pathname?.includes("fundraising") || pathname?.includes("donation")) &&
                            <>
                                <Flex display={["none", "none", "flex"]} alignItems={"center"} gap="2" >
                                    <FundraisingIcon />
                                    <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"} >Fundraising</Text>
                                </Flex>
                                <Flex display={["flex", "flex", "none"]} alignItems={"center"} gap="2" >
                                    <FundraisingIcon height='19' />
                                    <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"} >Fundraising</Text>
                                </Flex>
                            </>
                        }
                    </Flex>
                    <Flex display={["flex", "flex", "flex", "none", "none"]} alignItems={"center"} gap={"3"} >
                        <DashboardMenuBtn count={count} />
                    </Flex>
                </Flex>
            )}
        </>
    )
}