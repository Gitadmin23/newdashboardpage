import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Link } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import UserImage from "../sharedComponent/userimage";
import { HomeIcon, UsersIcon } from "../svg";
import { SidebarWalletIcon, KisokIcon } from "../svg/sidebarIcons";
import { EVENTPAGE_URL } from "@/services/urls";

export default function BottomBar() {


    const pathname = usePathname()

    const {
        mainBackgroundColor,
        borderColor,
        secondaryBackgroundColor,
        bodyTextColor, 
    } = useCustomTheme()

    const { user, userId } = useDetails((state) => state)

    const router = useRouter()

    const routeHandler = (item: string) => {
        if (item === '/product/events') {
            window.location.href = `${EVENTPAGE_URL}/product/events`;
        } else {
            router.push(item)
        }
    }


    return (
        <Flex paddingX='20px' zIndex={"100"} position={"sticky"} bottom={"0px"} alignItems={"center"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none', 'none']}>
            <Flex onClick={() => routeHandler("dashboard")} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname === "/dashboard" ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <HomeIcon />
            </Flex>
            <Flex onClick={() => routeHandler("dashboard/settings/payment/details")} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard/settings/payment/details" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <SidebarWalletIcon mobile={true} size={"20px"} color={pathname === "/dashboard/settings/payment/details" ? true : false} />
            </Flex>
            <Flex onClick={() => routeHandler('/product/events')} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? secondaryBackgroundColor : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <KisokIcon size='20px' color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />
            </Flex>
            <Flex onClick={() => routeHandler('dashboard/community')} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('community') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('community') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <UsersIcon />
            </Flex>
            <Flex onClick={() => routeHandler(`dashboard/profile/${userId}`)} cursor={"pointer"} >
                <UserImage size={"40px"} border={"1px"} font={"16px"} data={user} image={user?.data?.imgMain?.value} />
            </Flex>
        </Flex>
    )
}