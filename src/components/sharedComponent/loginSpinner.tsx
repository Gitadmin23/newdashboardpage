"use client"
import { Flex } from "@chakra-ui/react";
// import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import useCustomTheme from "@/hooks/useTheme";
import { MutatingDots } from 'react-loader-spinner'
import { useRouter, useSearchParams } from "next/navigation";
import ModalLayout from "./modal_layout";


export default function LogInSpinner() {


    const query = useSearchParams();
    const token = query?.get('token');

    const router = useRouter()
    const { primaryColor, } = useCustomTheme()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (typeof token === "string") {
            setOpen(true)
            // Store token in cookie
            Cookies.set("chase_token", token, {
                path: "/",
                secure: true,
                sameSite: "Lax",
            });

            const timer = setTimeout(() => {
                setOpen(false)
                const url = new URL(window.location.href);
                url.searchParams.delete("token");
                window.history.replaceState(null, "", url.toString());

                router.replace(url+"")

                console.log("workis");
                
            }, 1000);

            return () => clearTimeout(timer);

            // Optional: remove token from URL
            // window.history.replaceState(null, "/", window.location.pathname);

        }
    }, [token]);

    const click = () => {

    }

    return (
        <>
            <ModalLayout open={open} close={click} >
                <Flex w={"full"} h={"50vh"} justifyContent={"center"} alignItems={"center"}  >
                    <MutatingDots
                        visible={true}
                        height="100"
                        width="100"
                        color={primaryColor}
                        secondaryColor={primaryColor}
                        radius="12.5"
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </Flex>
            </ModalLayout>
        </>
    )
}