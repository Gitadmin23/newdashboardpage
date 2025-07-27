import { THEME } from "@/theme";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useRef } from "react";


export default function HeroSection() {


    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });

    return ( 
        <Flex  ref={ref} w={"full"} h={["full", "full", "full", "full", "90vh", "80vh"]} pos={"relative"} >
            <Image pos={["absolute"]} alt="test" objectFit={["cover", "cover", "cover"]} inset={"0px"} w={"full"} h={"full"} src="/images/hero/bg.png" />
            <Flex  w={"full"} display={["none", "none", "flex"]} pos={["relative"]} flexDir={["column", "column", "row"]} zIndex={"20"} py={"14"}  >
                <Flex w={"full"} flexDir={"column"} gap={"6"} alignItems={"center"} >
                    <Image
                    style={{
                        transform: isInView ? "none" : "translateX(-200px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} alt="heading" objectFit={"contain"} h={["200px", "200px", "300px"]} src="/images/hero/heading.png" />
                    <Image ref={ref}
                    style={{
                        transform: isInView ? "none" : "translateX(-200px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} alt="exciting" objectFit={"contain"} h={["80px", "100px", "150px"]} src="/images/hero/exciting.png" />
                </Flex>
                <Flex ref={reftwo}
                    style={{
                        transform: isInViewtwo ? "none" : "translateX(+200px)",
                        opacity: isInViewtwo ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} w={"full"} flexDir={"column"} gap={"2"} h={"full"} alignItems={"center"} >
                    <Flex height={""} >
                        <Image alt="desktopicons" objectFit={"contain"} w={"fit-content"} h={"400px"} src="/images/hero/desktopicons.png" />
                    </Flex>
                    <Image alt="comingsoon" ml={"auto"} mt={"auto"} mr={"8"} objectFit={"contain"} h={["20px", "20px", "30px"]} src="/images/hero/comingsoon.png" />
                </Flex>
            </Flex>
            <Flex display={["flex", "flex", "none"]} pos={["relative", "relative", "absolute"]} inset={"0px"} flexDir={["column", "column", "row"]} zIndex={"20"} >
                <Flex w={"full"} flexDir={"column"} gap={"6"} alignItems={"center"} py={"8"} px={"4"} >
                    <Image ref={ref}
                        style={{
                            transform: isInView ? "none" : "translateX(-200px)",
                            opacity: isInView ? 1 : 0,
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }} alt="heading" objectFit={"contain"} w={"70%"} src="/images/hero/heading.png" />
                    <Image ref={reftwo}
                        style={{
                            transform: isInViewtwo ? "none" : "translateX(+200px)",
                            opacity: isInViewtwo ? 1 : 0,
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }} alt="desktopicons" objectFit={"contain"} w={["80%"]} src="/images/hero/desktopicons.png" />
                    <Flex>
                        <Image ref={ref}
                            style={{
                                transform: isInView ? "none" : "translateX(-200px)",
                                opacity: isInView ? 1 : 0,
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                            }} alt="exciting" objectFit={"contain"} w={["full", "full", "150px"]} src="/images/hero/exciting.png" />
                    </Flex>
                    <Image ref={reftwo}
                        style={{
                            transform: isInViewtwo ? "none" : "translateX(+200px)",
                            opacity: isInViewtwo ? 1 : 0,
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }} alt="comingsoon" ml={"auto"} objectFit={"contain"} w={"80%"} src="/images/hero/comingsoon.png" />
                </Flex>
            </Flex>
        </Flex>
    )
}