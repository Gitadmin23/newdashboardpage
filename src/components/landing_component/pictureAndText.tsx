import { Flex, Image } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import React, { useRef } from "react";

export default function PictureAndText({
    children,
    reverse,
    imageUrl
}: {
    children: React.ReactNode,
    reverse?: boolean,
    imageUrl: string
}) {

    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Flex w={"full"} p={["6", "6", "12"]} flexDir={reverse ? ["column", "column", "column", "row-reverse"] : ["column", "column", "column", "row"]} >
            <Flex width={["full", "full", "full"]} justifyContent={"center"} alignItems={"center"} >
                <Image
                    ref={ref}
                    style={{
                        transform: isInView ? "none" : reverse ?"translateX(+200px)" : "translateX(-200px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} src={imageUrl} alt={imageUrl} height={["auto", "auto", "auto", "572px"]} />
            </Flex>
            <Flex className={isInView ? "animated-text-two" : ""} width={"full"} pt={["8", "8", "0px"]} >
                {children}
            </Flex>
        </Flex>
    )
}