"use client"
import { Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

type IProps = {
    color?: string,
    top?: string,
}

function SocialMedia(props: IProps) {

    const {
        color,
        top
    } = props

    return (
        <Flex w={"fit-content"} color={["white", "white", color ? color: "white"]} gap={"5"} mt={top ?? "4"} justifyContent={"center"} >
            <a target="_blank" href="https://twitter.com/chasescroll">
                <Icon
                    fontSize={"30px"} icon="mdi:twitter" 
                    // color={color ?? "white"} 
                />
            </a>
            <a target="_blank" href=" https://www.facebook.com/chase.scroll/ ">
                <Icon
                    fontSize={"30px"}
                    icon="ic:baseline-facebook"
                    // color={color ?? "white"} 
                />
            </a>
            <a target="_blank" href=" https://www.linkedin.com/company/chasescroll/">
                <Icon
                    fontSize={"30px"}
                    icon="mdi:linkedin" 
                    // color={color ?? "white"}  
                />
            </a>
            <a target="_blank" href="  https://www.instagram.com/chasescrollapp">
                <Icon
                    fontSize={"30px"}
                    icon="ri:instagram-fill"
                    // color={color ?? "white"} 
                />
            </a>
        </Flex>
    )
}


export default SocialMedia