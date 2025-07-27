"use client"
import { THEME } from "@/theme";
import { Box, Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, Menu, DrawerContent, DrawerOverlay, Flex, Image, MenuButton, MenuDivider, MenuItem, MenuList, Portal, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../general/Button";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../explore_component/searchbar";
import { jwtDecode } from "jwt-decode"
import { IoChevronDown } from "react-icons/io5";
import { useElementScroll, useInView } from "framer-motion";
import { HambergerMenu } from "iconsax-react";
import { NewDonationIcon, NewEventIcon, RentalIcon, ServiceIcon, StoreIcon } from "../svg";
import { SidebarHomeIcon } from "../svg/sidebarIcons";


function HomeNavbar(
    { yaxis }: {
        yaxis: any
    }
) {

    const homelink = [
        {
            label: "Home",
            link: "/"
        },
        {
            label: "Versax",
            link: "/",
            sublink: [
                {
                    label: "Find Event",
                    link: "/home/event"
                },
                {
                    label: "Find Service",
                    link: "/home/service"
                },
                {
                    label: "Find Kiosk",
                    link: "/home/kiosk"
                },
                {
                    label: "Find Rental",
                    link: "/home/rental"
                },
                {
                    label: "Find Fundraising",
                    link: "/home/fundraising"
                },
            ]
        },
        {
            label: "About us",
            link: "/home/about-us"
        },
        {
            label: "FAQ",
            link: "/home#faq"
        },
        // {
        //     label: "Policy",
        //     link: "/home/privacy"
        // },
        {
            label: "Terms & Condition",
            link: "/home/terms"
        },
        {
            label: "Contact us",
            link: "/home/contact-us"
        }
    ]

    const [token, setToken] = React.useState<string | null>(() => localStorage.getItem("token"));
    const [refresh_token, setRefreshToken] = React.useState(() => localStorage.getItem("refresh_token"))
    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });

    console.log(`TOEkEN => ${token}`);

    const pathname = usePathname();
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()

    React.useEffect(() => {
        // Add token verification
        const verifyToken = () => {
            try {
                if (!token) return;

                const decoded = jwtDecode(token);
                const refresh_token = localStorage.getItem("refresh_token");
                // Check if token is expired
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_token');
                    router.push('/auth'); // or wherever you want to redirect
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('your_token_key');
                router.push('/auth');
            }
        }

        verifyToken();
        window.scrollTo(0, 0);
    }, [token])

    const clickHandler = (item: string) => {
        router?.push(item)
        onClose()
    }

    const [navBg, setNavBg] = useState(false);

    const changeNavBg = () => {
        window.scrollY >= 800 ? setNavBg(true) : setNavBg(false);
    }

    return (
        <>
            <Flex ref={ref} position={"absolute"} top={"0px"} />
            <Flex
                style={{
                    backgroundColor: (yaxis === 0) ? "transparent" : "white",
                }} w={"full"} position={"fixed"} zIndex={"100"} top={"0px"} color={(yaxis === 0) ? "white" : "black"} height={["64px", "64px", "101.03px"]} px={["6", "6", "12"]} justifyContent={"space-between"} alignItems={"center"}  >
                <Flex onClick={() => router.push("/")} as={"button"} alignItems={"center"} gap={"2"} >
                    <Image width={["32px", "32px", "60px"]} src={"/assets/logo.png"} alt="logo" />
                    <Flex flexDir={"column"} alignItems={"start"} >
                        <Text fontWeight={"bold"} fontSize={["14px", "14px", "16px"]} color={(yaxis === 0) ? "white" : THEME?.COLORS?.chasescrollButtonBlue} >Chasescroll</Text>
                        <Text fontWeight={"medium"} fontStyle={"italic"} fontSize={["12px", "12px", "14px"]}>We build memories.</Text>
                    </Flex>
                </Flex>
                <Flex h={"56px"} display={["none", "none", "none", "none", "flex"]} alignItems={"center"} px={"6"} rounded={"full"} style={{ background: yaxis === 0 ? "linear-gradient(265.89deg, rgba(0, 0, 0, 0) 18.07%, rgba(0, 0, 0, 0.1) 86.4%)" : "white" }} gap={"8"} >
                    {homelink?.map((item: {
                        label: string,
                        link: string,
                        sublink?: Array<{
                            label: string,
                            link: string
                        }>
                    }) => {
                        if (item?.label === "Versax") {
                            return (
                                <Menu key={item?.label}  >
                                    <MenuButton
                                        px={4}
                                        py={2}
                                        transition='all 0.2s'
                                        borderRadius='md'
                                        borderWidth='0px'
                                        _hover={{ bg: 'transparent' }}
                                        _expanded={{ bg: 'transparent' }}
                                        cursor={"pointer"}
                                    >
                                        <Flex gap={"3"} lineHeight={"22.5px"} fontWeight={"semibold"} alignItems={"center"} >
                                            {item?.label} <IoChevronDown />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList>
                                        {item?.sublink?.map((subitem, subindex) => {
                                            return (
                                                <MenuItem key={subindex} onClick={() => router?.push(subitem?.link)} color={"black"} >{subitem?.label}</MenuItem>
                                            )
                                        })}
                                    </MenuList>
                                </Menu>
                            )
                        } else {
                            return (
                                <Box onClick={() => clickHandler(item?.link)} key={item?.label + item?.link} as="button" _hover={{ color: THEME?.COLORS?.chasescrollBlue }} >
                                    <Text lineHeight={"22.5px"} fontWeight={"semibold"} >{item?.label}</Text>
                                </Box>
                            )
                        }
                    })}
                </Flex>
                {!token && (
                    <Flex display={["none", "none", "none", "none", "flex"]} gap={"4"} >
                        <CustomButton onClick={() => clickHandler("/auth")} text={"Login"} width={"152px"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={THEME?.COLORS?.chasescrollBlue} borderRadius={"999px"} />
                        <CustomButton onClick={() => clickHandler("/auth/signup")} text={"Get Started"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"999px"} />
                    </Flex>
                )}
                {token && (
                    <Flex display={["none", "none", "none", "none", "flex"]} gap={"4"} >
                        <CustomButton onClick={() => clickHandler("/dashboard/product")} text={"Dashboard"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"999px"} />
                    </Flex>
                )}
                <Flex display={["flex", "flex", "flex", "flex", "none"]} >
                    <button
                        onClick={onOpen}
                        className="p-3 z-50 focus:outline-none"
                    >
                        <HambergerMenu
                            size="30"
                            color={(yaxis === 0) ? "white" : THEME?.COLORS?.chasescrollButtonBlue}
                        />
                    </button>
                </Flex>

                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    size={"xs"}
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent bg={"white"} >
                        <DrawerCloseButton />

                        <DrawerBody >

                            <Flex width={"full"} h={"full"} pt={"20"} flexDir={"column"} justifyContent={"start"} gap={"8"} fontSize={"lg"} >

                                <Flex flexDir={"column"} gap={"5"} >
                                    {homelink?.map((item: {
                                        label: string,
                                        link: string,
                                        sublink?: Array<{
                                            label: string,
                                            link: string
                                        }>
                                    }) => {

                                        if (item?.label === "Versax") {
                                            return (
                                                <Flex key={item?.label} flexDirection={"column"} gap={"5"} >
                                                    <Box key={item?.label + item?.link} cursor={"pointer"} _hover={{ color: THEME?.COLORS?.chasescrollBlue }} >
                                                        <Text color={pathname === item?.link ? THEME?.COLORS?.chasescrollBlue : "black"} fontSize={"14px"} fontWeight={"bold"} >{item?.label}</Text>
                                                    </Box>
                                                    <Flex flexDir={"column"} gap={"5"} >
                                                        {item?.sublink?.map((subitem, subindex) => {
                                                            return (
                                                                <Flex key={subindex} gap={"2"} onClick={() => clickHandler(subitem?.link)} cursor={"pointer"} _hover={{ color: THEME?.COLORS?.chasescrollBlue }} alignItems={"center"} >
                                                                    {subitem?.label === "Find Event" &&
                                                                        <NewEventIcon color={pathname === subitem?.link ? THEME?.COLORS?.chasescrollBlue : "black"} />
                                                                    }
                                                                    {subitem?.label === "Find Service" &&
                                                                        <ServiceIcon color={pathname === subitem?.link ? THEME?.COLORS?.chasescrollBlue : "black"} />
                                                                    }
                                                                    {subitem?.label === "Find Kiosk" &&
                                                                        <StoreIcon color={pathname === subitem?.link ? THEME?.COLORS?.chasescrollBlue : "black"} />
                                                                    }
                                                                    {subitem?.label === "Find Rental" &&
                                                                        <RentalIcon color={pathname === subitem?.link ? THEME?.COLORS?.chasescrollBlue : "black"} />
                                                                    }
                                                                    {subitem?.label === "Find Fundraising" &&
                                                                        <NewDonationIcon color={pathname === subitem?.link ? THEME?.COLORS?.chasescrollBlue : "black"} />
                                                                    }
                                                                    <Text color={pathname === subitem?.link ? THEME?.COLORS?.chasescrollBlue : "black"} fontSize={"14px"} fontWeight={"medium"} >{subitem?.label}</Text>
                                                                </Flex>
                                                            )
                                                        })}
                                                    </Flex>
                                                </Flex>
                                            )
                                        } else {
                                            return (
                                                <Flex gap={"2"} onClick={() => clickHandler(item?.link)} key={item?.label + item?.link} cursor={"pointer"} _hover={{ color: THEME?.COLORS?.chasescrollBlue }} alignItems={"center"} >
                                                    {item?.label === "Home" && (
                                                        <SidebarHomeIcon size="19px" color={pathname === "/" ? true : false} />
                                                    )}
                                                    <Text color={pathname === item?.link ? THEME?.COLORS?.chasescrollBlue : "black"} fontSize={"14px"} fontWeight={"bold"} >{item?.label}</Text>
                                                </Flex>
                                            )
                                        }
                                    })}
                                </Flex>
                                {!token && (
                                    <Flex gap={"3"} width={"full"} my={"auto"} flexDir={"column"} justifyContent={"center"}  >
                                        <CustomButton onClick={() => clickHandler("/auth")} text={"Login"} width={"full"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={THEME?.COLORS?.chasescrollBlue} borderRadius={"999px"} />
                                        <CustomButton onClick={() => clickHandler("/auth")} text={"Get Started"} width={"full"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"999px"} />
                                    </Flex>
                                )}
                                {token && (
                                    <Flex gap={"3"} width={"full"} my={"auto"} flexDir={"column"} justifyContent={"center"}  >
                                        <CustomButton onClick={() => clickHandler("/dashboard/product")} text={"Dashboard"} width={"full"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                                    </Flex>
                                )}
                                {/* )} */}
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

            </Flex>
        </>
    )
}

export default HomeNavbar