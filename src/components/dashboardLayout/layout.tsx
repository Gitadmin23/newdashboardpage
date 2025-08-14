"use client"
import { Flex, useColorMode } from "@chakra-ui/react";
import useCustomTheme from "@/hooks/useTheme";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import BottomBar from "./bottomBar";
import LogInSpinner from "../sharedComponent/loginSpinner";

interface IProps {
    children: React.ReactNode
}

export default function DashboardLayout(
    {
        children
    }: IProps
) {

    const { mainBackgroundColor, headerTextColor } = useCustomTheme()
    const pathname = usePathname()
    const query = useSearchParams(); 
    const frame = query?.get('frame'); 

    return (
        <Flex w={"100vw"} h={"100vh"} color={headerTextColor} bgColor={mainBackgroundColor} >
            {!frame && (
                <SideBar />
            )}
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                {!frame && (
                    <Flex w={"full"} display={["flex", "flex", (!pathname?.includes("create") && !pathname?.includes("details")) ? "flex" : "none"]} >
                        <Navbar />
                    </Flex>
                )}
                <Flex w={"full"} pos={"relative"} h={"full"} >
                    <Flex w={"full"} pos={"absolute"} bgColor={mainBackgroundColor} overflowY={"auto"} bottom={["70px", "70px", "70px", "0px", "0px"]} top={["76px", "76px", "76px", "0px", "0px"]} insetX={"0px"} >
                        {children}
                    </Flex>
                </Flex>
                {!frame && (
                    <Flex w={"full"} h={"fit-content"} >
                        <BottomBar />
                    </Flex>
                )}
            </Flex>
            <LogInSpinner />
        </Flex>
    )
}