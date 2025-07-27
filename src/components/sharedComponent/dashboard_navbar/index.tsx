import ButtonGroup from '@/app/homeold/home_component/Navbar/ButtonGroup'
import SearchBar from '@/components/explore_component/searchbar'
import CustomText from '@/components/general/Text'
import NotificationBar from '@/components/navbar/notification'
import { THEME } from '@/theme'
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    Flex,
    HStack,
    Image,
    Link,
    Text,
    useColorMode,
    useDisclosure, useToast
} from '@chakra-ui/react'
import { Message, LogoutCurve, Wallet, HambergerMenu } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import { WalletIcon2 } from '@/components/svg'
import UserImage from '../userimage'
import { usePathname } from 'next/navigation'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    pathname?: string | null,
    userId?: any,
    openmodal?: any,
    home?: boolean,
    image?: string,
    data?: any
}

function DashboardNavbar(props: Props) {
    const {
        userId,
        openmodal,
        home,
        image,
        data
    } = props

    const router = useRouter()
    const pathname = usePathname()
    const toast = useToast()

    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();


    const clickHandler = (item: string) => {
        router.push(item)
    }

    let token = localStorage.getItem("token")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const tempFunc = () => {
        toast({
            title: 'Information',
            description: 'Please sign-in with google',
            status: 'info',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        });
    }

    return (
        <Box width="full">
            {/* NAVBAR SECTION */}
            {(!pathname?.includes("create_event") || !pathname?.includes("edit_draft") || !pathname?.includes("edit_event")) && (
                <HStack position={"absolute"} zIndex={"30"} top={"0px"} width='100%' height='80px' borderBottomWidth={'1px'} borderBottomColor={borderColor} backgroundColor={mainBackgroundColor} alignItems='center' justifyContent={'space-between'} paddingX={['20px', '40px']}>

                    <Flex alignItems={"center"} gap={["3", "3", "12"]}>
                        <Flex role="button" width={"fit-content"} alignItems={"center"} gap={"1"} onClick={() => router.push("/home")} justifyContent={'center'}>
                            <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                            <CustomText fontFamily={'DM-Bold'} fontSize='lg' color={colorMode === 'light' ? primaryColor : bodyTextColor}>Chasescroll</CustomText>
                        </Flex>
                        {(pathname !== "/dashboard/event/my_event" && pathname !== "/dashboard/event/past_event" && pathname !== "/dashboard/event/saved_event" && pathname !== "/dashboard/event/draft") && (
                            <Box display={["none", "none", "block"]} >
                                <SearchBar home={home} />
                            </Box>
                        )}
                    </Flex>
                    {/* LARGE SCREEN ICONS */}

                    {userId && (
                        <HStack gap={"4"} display={['none', 'flex']}>
                            <Box onClick={() => router.push("/dashboard/settings/payment/details")} as={"button"} >
                                {/* <Wallet
                                    color={THEME.COLORS.chasescrollBlue} size='30px'
                                /> */}
                                <WalletIcon2 />
                            </Box>
                            {/* <CustomText fontWeight={"bold"} >{username}</CustomText> */}
                            <NotificationBar />
                            <Box as='button' onClick={() => router.push(`/dashboard/profile/${userId}`)} >
                                <UserImage border={"2px"} font={"14px"} size={"30px"} image={image} data={data} />
                            </Box>
                        </HStack>
                    )}
                    {/* SMALL SCREEN ICONS */}
                    {!home && (
                        <HStack display={['flex', 'none']}>

                            <Box onClick={() => router.push("/dashboard/settings/payment/details")} as={"button"} >
                                <WalletIcon2 />
                            </Box>
                            <Link href='/dashboard/chats'>
                                <Message color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' />
                            </Link>
                            <NotificationBar />
                            <LogoutCurve onClick={() => openmodal(true)} color='red' size={'30px'} variant='Outline' />
                        </HStack>
                    )}

                    {home && (
                        <Flex display={['none', "none", "none", "none", 'flex']} alignItems={"center"} gap={"7"} >
                            <Text as={"button"} fontWeight={"bold"} onClick={() => clickHandler("/")} color={"brand.chasescrollBlue"} >Event</Text>
                            <Text as={"button"} fontWeight={"bold"} onClick={() => clickHandler("/home")} color={pathname === "/home" ? "brand.chasescrollBlue" : "black"} >Home</Text>
                            <Text as={"button"} fontWeight={"bold"} onClick={() => clickHandler("/home/about")} color={pathname === "/home/about" ? "brand.chasescrollBlue" : "black"} >About us</Text>
                            {!token && (
                                <Flex className=' flex gap-5 ' ml={"6"} gap={"5"}>
                                    <ButtonGroup whitesecond ctaText="Login" url={"/auth"} />
                                    <Box role='button' onClick={tempFunc}>
                                        <ButtonGroup bluesecond ctaText="Get Started" url={"/auth"} />
                                    </Box>
                                </Flex>
                            )}
                            {token && (
                                <Flex ml={"6"} gap={"5"}>
                                    <ButtonGroup bluesecond ctaText="Dashboard" url={"/dashboard/event"} />
                                </Flex>
                            )}
                        </Flex>
                    )}

                    {home && (
                        <Flex width={"fit-content"} onClick={() => onOpen()} as={"button"} display={['flex', 'flex', 'flex', 'flex', 'none']}>
                            {/* <Icon className="text-2xl" icon="mdi:h/amburger-menu" /> */}
                            <HambergerMenu
                                size="30"
                                color="#000"
                            />
                        </Flex>
                    )}

                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        size={"sm"}
                        onClose={onClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent bg={"white"} >
                            <DrawerCloseButton />

                            <DrawerBody >

                                <Flex h={"full"} pt={"20"} flexDir={"column"} alignItems={"center"} justifyContent={"start"} w={"full"} gap={"8"} fontSize={"lg"} >
                                    <Flex maxW={'220px'} width={"full"} flexDir={"column"} gap={"4"} >
                                        <ButtonGroup white={pathname === "/" ? false : true} active={pathname === "/" ? true : false}
                                            onClick={() => clickHandler("/")} ctaText="Event" url={"/"} />
                                        <ButtonGroup white={pathname === "/home" ? false : true} active={pathname === "/home" ? true : false}
                                            onClick={() => clickHandler("/home")} ctaText="Home" url={"/home"} />
                                        <ButtonGroup white={pathname === "/home/about" ? false : true} active={pathname === "/home/about" ? true : false}
                                            onClick={() => clickHandler("/home/about")} ctaText="About us" url={"/home/about"} />
                                        <ButtonGroup white={pathname === "/home/privacy_poilcy" ? false : true} active={pathname === "/home/privacy_poilcy" ? true : false}
                                            onClick={() => clickHandler("/home/privacy_poilcy")} ctaText="Policy" url={"/home/privacy_poilcy"} />
                                        <ButtonGroup white={pathname === "/home/terms" ? false : true} active={pathname === "/home/terms" ? true : false}
                                            onClick={() => clickHandler("/home/terms")} ctaText="Terms & Condition" url={"/home/terms"} />
                                        <ButtonGroup white={pathname === "/home/contact" ? false : true} active={pathname === "/home/contact" ? true : false}
                                            onClick={() => clickHandler("/home/contact")} ctaText="Contact us" url={"/home/contact"} />

                                    </Flex>
                                    {/* {!token && ( */}
                                    <Flex gap={"3"} width={"full"} my={"auto"} flexDir={"column"} justifyContent={"center"}  >
                                        <ButtonGroup white
                                            width={"152px"}
                                            onClick={onClose} ctaText="Login" url={"/auth"} />

                                        <Box role='button' onClick={tempFunc}>
                                            <ButtonGroup blue
                                                onClick={tempFunc} ctaText="Get Started" url={"/auth"} />
                                        </Box>
                                    </Flex>
                                    {/* )} */}
                                </Flex>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </HStack>
            )}
        </Box>
    )
}

export default DashboardNavbar
