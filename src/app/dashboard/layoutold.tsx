"use client"
import { useDetails } from '@/global-state/useUserDetails'
import { Box, Button, Flex, Grid, HStack, Image, Link, Switch, Text, Tooltip, VStack, useColorMode } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import { KisokIcon, NotificationIcon, SidebarEventIcon, SidebarHomeIcon, SidebarLogoutIcon, SidebarMessageIcon, SidebarSearchIcon, SidebarWalletIcon } from '@/components/svg/sidebarIcons';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from '@/components/explore_component/searchbar';
import UserImage from '@/components/sharedComponent/userimage';
import CustomText from '@/components/general/Text';
import { FundraisingIcon, HomeIcon, UsersIcon } from '@/components/svg';
import { Warning2 } from 'iconsax-react';
import useCustomTheme from '@/hooks/useTheme';
import getUser from '@/hooks/useGetUser';
import useModalStore from '@/global-state/useModalSwitch';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import NotificationBar from '@/components/notification';
import useNotificationHook from '@/hooks/useNotificationHook';
import DashboardMenuBtn from '@/components/sharedComponent/dashboard_menu_btn';
import useValidateRoken from '@/hooks/useValidateToken';
import LogInSpinner from '@/components/sharedComponent/loginSpinner';

export default function Layout({ children }: {
    children: ReactNode
}) {

    type IRoute = {
        icon: ReactNode;
        text: string;
        route: string;
    }

    const { userId, setAll, user: data, } = useDetails((state) => state);
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { setGoogle, notifyModal, setNotifyModal } = useModalStore((state) => state);
    const pathname = usePathname()

    const { colorMode, toggleColorMode } = useColorMode();
    const routes: IRoute[] = [
        {
            route: '/dashboard',
            icon: <SidebarHomeIcon color={pathname === "/dashboard" ? true : false} />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <SidebarSearchIcon color={pathname?.includes("explore") ? true : false} />,
            text: 'Explore'
        },
        {
            route: '/dashboard/product',
            icon: <KisokIcon color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />,
            text: 'Versax'
        },
        {
            route: '/dashboard/chats',
            icon: <SidebarMessageIcon color={pathname === "/dashboard/chats" ? true : false} />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <SidebarEventIcon color={pathname === "/dashboard/community" ? true : false} />,
            text: 'Community'
        },
        {
            route: '',
            icon: <NotificationIcon color={pathname === "/dashboard/notification" ? true : false} />,
            text: 'Notification'
        },
        {
            route: `/dashboard/settings/payment/details`,
            icon: <SidebarWalletIcon color={pathname === "/dashboard/settings/payment/details" ? true : false} />,
            text: 'Wallet'
        }
    ];


    // <Notification color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' onClick={() => setActive(prev => !prev)} />
    const { user } = getUser()
    const { status: STATUS } = useValidateRoken();


    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor, headerTextColor } = useCustomTheme();

    const logout = async () => {
        setAll({ userId: '', dob: '', email: '', username: '', firstName: '', lastName: '', publicProfile: '' });
        localStorage.clear();
    }


    const Id = localStorage.getItem('user_id');

    const { count } = useNotificationHook()

    return (
        <Flex w={"full"} h={"100vh"} overflowY={"hidden"} bg={mainBackgroundColor} >
            {(pathname !== ("/dashboard/donation/create") && !pathname?.includes("/donation/edit") && pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) && (
                <Flex w={"fit-content"} h={"screen"} display={["none", "none", "none", "flex", "flex"]} >
                    <Flex w={"110px"} h={"screen"} gap={"4"} overflowY={"auto"} flexDir={"column"} py={"4"} alignItems={"center"} justifyContent={"space-between"} borderRightColor={borderColor} borderRightWidth={"1px"} >
                        <Box as='button' onClick={() => router?.push("/")} >
                            <Image alt='logo' src='/images/logo.png' w={"50px"} />
                        </Box>
                        <Flex flexDir={"column"} alignItems={"center"} gap={"3"} >

                            {routes?.map((item, index) => (
                                <Flex key={index}>
                                    {item?.text !== "Notification" && (
                                        <Flex as={"button"} onClick={() => router?.push(item?.route)} key={index} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                            <Tooltip label={item?.text} fontSize='sm'>
                                                <Box>
                                                    {item?.icon}
                                                </Box>
                                            </Tooltip>
                                        </Flex>
                                    )}
                                    {item?.text === "Notification" && (
                                        <Flex as={"button"} onClick={() => setNotifyModal(true)} key={index} w={"75px"} h={"56px"} position={"relative"} justifyContent={"center"} alignItems={"center"} >
                                            <Tooltip label={item?.text} fontSize='sm'>
                                                <Box>
                                                    {item?.icon}
                                                </Box>
                                            </Tooltip>
                                            {count && (
                                                <Flex w={"5"} h={"5"} rounded={"full"} bg={primaryColor} color={"white"} justifyContent={"center"} position={"absolute"} top={"1"} right={"2"} alignItems={"center"} fontWeight={"semibold"} fontSize={"12px"}  >
                                                    {count}
                                                </Flex>
                                            )}
                                        </Flex>
                                    )}
                                </Flex>
                            ))}

                        </Flex>

                        <Flex flexDir={"column"} alignItems={"center"} >

                            <Flex w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <Tooltip label={"darkmode"} fontSize='sm'>
                                    <Box>
                                        <Switch isChecked={colorMode === 'dark'} size={'md'} onChange={() => toggleColorMode()} />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${userId}`)} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <Tooltip label={"profile"} fontSize='sm'>
                                    <Box>
                                        <UserImage size={"36px"} border={"1px"} font={"16px"} data={data} image={user?.data?.imgMain?.value} />
                                    </Box>
                                </Tooltip>
                            </Flex>

                            <Flex as={"button"} onClick={() => setOpen(true)} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <Tooltip label={"logout"} fontSize='sm'>
                                    <Box>
                                        <SidebarLogoutIcon />
                                    </Box>
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            )}
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion") && !pathname?.includes("/donation/create") && !pathname?.includes("/donation/edit")) && (
                    <Flex w={"full"} h={"76px"} pos={['fixed', 'fixed', 'fixed', "sticky", "sticky"]} bgColor={mainBackgroundColor} zIndex={"100"} insetX={"0px"} top={"0px"} borderBottomColor={borderColor} borderBottomWidth={"1px"} alignItems={"center"} px={"6"} justifyContent={"space-between"}  >
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
                {(pathname !== ("/dashboard/donation/create") && !pathname?.includes("/donation/edit") && pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) ? (
                    // <Flex w={"full"} h={"full"} pb={["70px", "70px", "70px", "0px", "0px"]} top={"0px"} pt={pathname === ("/dashboard/donation/create") ? "0px" :["76px", "76px", "76px", "0px", "0px"]} overflowY={"hidden"} >
                    <Flex w={"full"} h={"auto"} zIndex={"20"} bottom={["70px", "70px", "70px", "0px", "0px"]} pos={"absolute"} top={"72px"} insetX={"0px"} pt={pathname === ("/dashboard/donation/create") ? "0px" : "0px"} overflowY={"hidden"} >
                        {children}
                    </Flex>
                ) : (
                    <Flex w={"full"} h={["100vh"]} zIndex={"20"} pb={["70px", "70px", "70px", "0px", "0px"]} overflowY={"hidden"} >
                        {children}
                    </Flex>
                )}
                <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} bgColor={colorMode !== "dark" ? "transparent" : "#000"} opacity={colorMode !== "dark" ? "100%" : "15%"} pos={"absolute"} inset={"0px"} w={"full"} h={"full"} overflow={"hidden"} >
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                    <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                </Grid>
            </Flex>
            <HStack paddingX='20px' zIndex={"100"} position={"fixed"} bottom={"0px"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none']}>
                <Link href='/dashboard'>
                    <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname === "/dashboard" ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                        <HomeIcon />
                    </VStack>
                </Link>

                <Link href='/dashboard/settings/payment/details'>
                    <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard/settings/payment/details" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                        <SidebarWalletIcon mobile={true} size={"20px"} color={pathname === "/dashboard/settings/payment/details" ? true : false} />
                    </VStack>
                </Link>

                <Link href='/dashboard/product'>
                    <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                        <KisokIcon size='20px' color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />
                    </VStack>
                </Link>
                <Link href='/dashboard/community'>
                    <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('community') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('community') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                        {/* <People size='20px' /> */}
                        <UsersIcon />
                    </VStack>
                </Link>

                <Link href={userId ? `/dashboard/profile/${userId}` : ""}>

                    <UserImage size={"40px"} border={"1px"} font={"16px"} data={data} image={user?.data?.imgMain?.value} />

                </Link>
            </HStack>
            {/* <PageLoader show={!data?.email} /> */}
            <ModalLayout size={"sm"} open={open} close={setOpen} >
                <VStack
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"center"}
                    spacing={6}
                    bgColor={mainBackgroundColor}
                    p={"6"}
                >
                    <VStack
                        width="60px"
                        height={"60px"}
                        borderRadius={"30px"}
                        justifyContent={"center"}
                        bg="#df26263b"
                    >
                        <Warning2 color="red" size="30px" variant="Outline" />
                    </VStack>
                    <CustomText fontSize={"18px"}>
                        Are you sure you want to logout?
                    </CustomText>
                    <VStack justifyContent={"center"} width={"100%"}>
                        <Button
                            // outlineColor={"brand.chasescrollButtonBlue"}
                            borderColor={"brand.chasescrollButtonBlue"}
                            borderWidth={"1px"}
                            width="100%"
                            outline={"none"}
                            _hover={{ backgroundColor: "white" }}
                            bg={"white"}
                            height={"32px"}
                            color="brand.chasescrollButtonBlue"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            borderColor={"red"}
                            borderWidth={"1px"}
                            _hover={{ backgroundColor: "red" }}
                            bg="red"
                            width="100%"
                            height={"40px"}
                            color="white"
                            onClick={logout}
                        >
                            Log out
                        </Button>
                    </VStack>
                </VStack>
            </ModalLayout>
            <ModalLayout open={notifyModal} size={["full", "xl", "xl"]} title={"Notification"} close={setNotifyModal} >
                <NotificationBar />
            </ModalLayout>
            <LogInSpinner />
        </Flex>
    );
}
