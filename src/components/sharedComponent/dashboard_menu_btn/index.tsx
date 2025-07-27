import CustomText from '@/components/general/Text'
import { DashboardMenuIcon } from '@/components/svg'
import { NewChatIcon, NewWalletIcon, NotificationIcon } from '@/components/svg/sidebarIcons'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Switch, Text, Tooltip, VStack, useColorMode } from '@chakra-ui/react'
import { LogoutCurve, SearchNormal1, Setting, Warning2 } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import React, { useState } from 'react'
import { IoClose, IoArrowForward } from 'react-icons/io5'
import ModalLayout from '../modal_layout'
import { useDetails } from '@/global-state/useUserDetails'
import { signOut } from 'next-auth/react'
import useModalStore from '@/global-state/useModalSwitch'

export default function DashboardMenuBtn({ count }: { count?: any }) {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const { setAll } = useDetails((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const router = useRouter()
    const { setGoogle, notifyModal, setNotifyModal } = useModalStore((state) => state);
    const { colorMode, toggleColorMode } = useColorMode();

    const handleClick = (item: string) => {
        if (item === "logout") {
            setShow(true)
        } else {
            router?.push(item)
        }

        setOpen(false)
    }

    const logout = async () => {
        await signOut();
        setAll({ userId: '', dob: '', email: '', username: '', firstName: '', lastName: '', publicProfile: '' });
        localStorage.clear();
        // router?.push("/auth")

    }

    const clickHandler = () => {
        setNotifyModal(true)
        setOpen(false)
    }

    return (
        <Box w={"fit-content"} h={"fit-content"} >
            <Box as='button' mt={"8px"} onClick={() => setOpen(true)} >
                <DashboardMenuIcon color={bodyTextColor} />
            </Box>
            {open && (
                <Flex zIndex={"210"} position={"absolute"} top={"70px"} flexDir={"column"} right={"2"} maxW={"170px"} w={"full"} py={"4"} px={"4"} bg={mainBackgroundColor} rounded={'8px'} >
                    <Flex zIndex={20} flexDir={"column"} gap={"3"}  >

                        <Flex onClick={() => handleClick("/dashboard/chats")} h={"20px"} gap={"1"} alignItems={"center"} as='button' >
                            <Flex justifyContent={"center"} w={"20px"} >
                                <NewChatIcon />
                            </Flex>
                            <Text fontSize={"12px"} >Message</Text>
                        </Flex>
                        <Flex onClick={() => handleClick("/dashboard/explore")} h={"20px"} gap={"1"} alignItems={"center"} as='button' >
                            <Flex justifyContent={"center"} w={"20px"} >
                                <SearchNormal1 color={bodyTextColor} size={"20px"} />
                            </Flex>
                            <Text fontSize={"12px"} >Explore</Text>
                        </Flex>
                        {/* <Flex onClick={() => handleClick("/dashboard/settings/payment/details")} h={"20px"} gap={"2"} alignItems={"center"} as='button' >
                            <Flex justifyContent={"center"} w={"20px"} >
                                <NewWalletIcon />
                            </Flex>
                            <Text fontSize={"12px"} >Wallet</Text>
                        </Flex> */}
                        <Flex onClick={() => clickHandler()} h={"20px"} gap={"2"} alignItems={"center"} as='button' >
                            <Flex justifyContent={"center"} w={"20px"} >
                                <NotificationIcon />
                            </Flex>
                            <Text fontSize={"12px"} >Notification</Text>

                            <Flex w={"5"} h={"5"} rounded={"full"} bg={primaryColor} ml={"auto"} color={"white"} justifyContent={"center"} alignItems={"center"} pb={"2px"} fontWeight={"semibold"} fontSize={"12px"}  >
                                {count}
                            </Flex>
                        </Flex>

                        <Flex w={"full"} h={"20px"} gap={"2"} alignItems={"center"} >
                            <Tooltip label={"darkmode"} fontSize='sm'>
                                <Box>
                                    <Switch isChecked={colorMode === 'dark'} size={'md'} onChange={() => toggleColorMode()} />
                                </Box>
                            </Tooltip>

                            <Text fontSize={"12px"} >Dark Mode</Text>
                        </Flex>
                        <Flex onClick={() => handleClick("/dashboard/settings")} h={"20px"} gap={"2"} alignItems={"center"} as='button' >
                            <Flex justifyContent={"center"} w={"20px"} >
                                <Setting color={bodyTextColor} size={"20px"} />
                            </Flex>
                            <Text fontSize={"12px"} >Settings</Text>
                        </Flex>
                        <Flex gap={"2"} onClick={() => handleClick("logout")}  >
                            <Flex justifyContent={"center"} w={"20px"} >
                                <LogoutCurve color='red' size={'20px'} variant='Outline' />
                            </Flex>
                            <Text fontSize={"12px"} >Log Out</Text>
                        </Flex>
                    </Flex>
                </Flex>
            )}
            {open && (
                <Box position={"fixed"} onClick={() => setOpen(false)} inset={'0px'} zIndex={"200"} bg={"black"} opacity={"50%"} />
            )}

            <ModalLayout size={"sm"} open={show} close={setShow} >
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
                    <CustomText fontFamily={"DM-Medium"} fontSize={"18px"}>
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
                            onClick={() => setShow(false)}
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
        </Box>
    )
}
