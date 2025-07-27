import CustomButton from '@/components/general/Button';
import { NewEventIcon, ServiceIcon, RentalIcon, StoreIcon, NewDonationIcon } from '@/components/svg';
import useCustomTheme from '@/hooks/useTheme';
import { Button, Flex, Select, Input, Image, Text } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export default function HeroSection() {


    const ref: any = useRef(null);
    const isInView = useInView(ref, { once: true });
    const reftwo: any = useRef(null);
    const isInViewtwo = useInView(ref, { once: true });

    const [active, setActive] = useState("")

    const [open, setOpen] = useState(false)

    const { primaryColor, headerTextColor, secondaryBackgroundColor, borderColor, mainBackgroundColor } = useCustomTheme()
    const { push } = useRouter()

    const clickHandler = (item: "kiosk" | "service" | "rental" | "event" | "donation") => {
        if (item === "event") {
            push(`/product`)
        } else if (item === "donation") {
            push(`/product/fundraising`)
        } else {
            push(`/product/kiosk${`?type=${item}`}`)
        }
    }

    return (
        <Flex w={"full"} h={"100vh"} color={"white"} pos={"relative"} >
            <Flex pos={"absolute"} inset={"0px"} zIndex={"10"} style={{ background: "linear-gradient(116.54deg, rgba(84, 101, 224, 0) -7.35%, rgba(35, 61, 243, 0.2) 41.22%), linear-gradient(228.39deg, rgba(0, 0, 0, 0) -57.53%, rgba(0, 0, 0, 0.4) 90.44%), linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))" }} />
            <Image src='/images/hero/hero.png' alt='hero' w={"full"} objectFit={"cover"} />
            <Flex pos={"absolute"} insetX={"0px"} bottom={"0px"} top={["64px", "64px", "101.03px"]} gap={"8"} px={["6", "6", "16"]} flexDirection={"column"} justifyContent={"center"} zIndex={"20"} >
                <Text
                    ref={ref}
                    style={{
                        transform: isInView ? "none" : "translateY(-50px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }} maxW={"1100px"} fontSize={["42px", "42px", "60px"]} lineHeight={["120%", "120%", "75px"]} fontWeight={"700"} >Connecting event hosts in need to professionals who deliver.</Text>
                <Flex
                    ref={reftwo}
                    style={{
                        transform: isInViewtwo ? "none" : "translateY(+50px)",
                        opacity: isInViewtwo ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        background: "linear-gradient(115.13deg, rgba(35, 61, 243, 0.2) 20.26%, rgba(21, 35, 141, 0.2) 65.99%), linear-gradient(265.89deg, rgba(0, 0, 0, 0) 18.07%, rgba(0, 0, 0, 0.6) 86.4%)"
                    }} maxW={"833px"} px={["3", "3", "10"]} py={["6", "6", "10"]} rounded={"32px"} flexDir={"column"} alignItems={"center"} gap={"8"} >
                    <Flex w={["full", "fit-content", "fit-content"]} gap={["3", "3", "0px"]} alignItems={"center"} bgColor={secondaryBackgroundColor} p={"6px"} rounded={"full"} >
                        <CustomButton onMouseOver={() => setActive("event")} onMouseOut={() => setActive("")} onClick={() => clickHandler("event")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <NewEventIcon color={active === "event" ? "white" : headerTextColor} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Event</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "event" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "event" ? "white" : headerTextColor} width={["100%", "107px", "140px"]} />
                        <CustomButton onMouseOver={() => setActive("service")} onMouseOut={() => setActive("")} onClick={() => clickHandler("service")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <ServiceIcon color={active === "service" ? "white" : headerTextColor} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Service</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "service" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "service" ? "white" : headerTextColor} width={["100%", "107px", "140px"]} />
                        <CustomButton onMouseOver={() => setActive("rental")} onMouseOut={() => setActive("")} onClick={() => clickHandler("rental")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <RentalIcon color={active === "rental" ? "white" : headerTextColor} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Rental</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "rental" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "rental" ? "white" : headerTextColor} width={["100%", "107px", "140px"]} />
                        <CustomButton onMouseOver={() => setActive("kiosk")} onMouseOut={() => setActive("")} onClick={() => clickHandler("kiosk")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <StoreIcon color={active === "kiosk" ? "white" : headerTextColor} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Kiosk</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "kiosk" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "kiosk" ? "white" : headerTextColor} width={["100%", "107px", "140px"]} />
                        <Flex w="fit-content" display={["none", "none", "flex"]} >
                            <CustomButton onMouseOver={() => setActive("fundraising")} onMouseOut={() => setActive("")} onClick={() => clickHandler("donation")} text={
                                <Flex alignItems={"center"} gap={"2"} >
                                    <Flex display={["none", "none", "flex"]} >
                                        <NewDonationIcon color={active === "fundraising" ? "white" : headerTextColor} />
                                    </Flex>
                                    <Text fontSize={["10px", "12px", "14px"]} >Fundraising</Text>
                                </Flex>
                            } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "fundraising" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "fundraising" ? "white" : headerTextColor} width={["107px", "107px", "140px"]} />
                        </Flex>
                        <Flex w={"fit-content"} position={"relative"} >

                            <Flex w={"30px"} onClick={() => setOpen((prev) => !prev)} rounded={"16px"} borderWidth={"1px"} borderColor={"black"}  h={"30px"} pt={!open ? "2px" : "0px"} justifyContent={"center"} alignItems={"center"} display={["flex", "flex", "none"]}  >
                                {open && (
                                    <IoChevronUp size={"15px"} color='black' />
                                )}
                                {!open && (
                                    <IoChevronDown size={"15px"} color='black' />
                                )}
                            </Flex>
                            {open && (
                                <Flex position={"absolute"} top={"50px"} right={"0px"} >
                                    <CustomButton onMouseOver={() => setActive("fundraising")} onMouseOut={() => setActive("")} onClick={() => clickHandler("donation")} text={
                                        <Flex alignItems={"center"} gap={"2"} >
                                            <Flex display={["none", "none", "flex"]} >
                                                <NewDonationIcon color={active === "fundraising" ? "white" : headerTextColor} />
                                            </Flex>
                                            <Text fontSize={["10px", "12px", "14px"]} >Fundraising</Text>
                                        </Flex>
                                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={active === "fundraising" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={active === "fundraising" ? "white" : headerTextColor} width={["107px", "107px", "140px"]} />
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                    {/* <Image src='/images/hero/filter.png' alt='filter' /> */}

                    <Flex display={["none", "none", "flex"]} color={"black"} w={"fit-content"} borderWidth={"1px"} borderColor={borderColor} rounded={"full"} h={"fit-content"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                        <Select disabled={true} _disabled={{ backgroundColor: "white", opacity: "100%" }} h={"70px"} bgColor={mainBackgroundColor} w={"200px"} outlineColor={"transparent"} outline={"none"} textAlign={"center"} placeholder='Select Category' roundedLeft={"full"} borderWidth={"0px"} borderRightWidth={"1px"} borderRightColor={borderColor} >
                            <option>Text</option>
                        </Select>
                        <Select disabled={true} _disabled={{ backgroundColor: "white", opacity: "100%" }} h={"70px"} bgColor={mainBackgroundColor} w={"200px"} rounded={"0px"} textAlign={"center"} placeholder='Select State' borderRightWidth={"1px"} borderWidth={"0px"} borderRightColor={borderColor} >
                            <option>Text</option>
                        </Select>
                        <Input disabled={true} _disabled={{ backgroundColor: "white" }} bgColor={mainBackgroundColor} placeholder={"Search business name"} h={"70px"} w={"200px"} outline={"none"} rounded={"0px"} borderWidth={"0px"} borderLeftWidth={"1px"} borderRightColor={borderColor} />
                        <Button disabled={true} h={"70px"} w={"140px"} color={"white"} outline={"none"} _hover={{ backgroundColor: primaryColor }} bgColor={primaryColor} roundedRight={"full"} borderRightWidth={"0px"} borderWidth={"0px"} borderRightColor={borderColor} >
                            Search
                        </Button>
                    </Flex>
                    <Image src='/images/hero/brandlogo.png' alt='brand' ml={"4"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
