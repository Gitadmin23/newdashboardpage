import { CategoryRightIcon } from '@/components/svg';
import useSearchStore from '@/global-state/useSearchData';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Select, useColorMode, useToast } from '@chakra-ui/react';
import React from 'react'
import { useQuery } from 'react-query';
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    selector?: boolean,
    eventpage?: boolean
}

function EventCategory(props: Props) {
    const {
        selector,
        eventpage
    } = props

    const [data, setData] = React.useState([] as string[]);
 
    const toast = useToast();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { event_category, setEventCategory } = useSearchStore((state) => state);

    // react query
    const { isLoading, isRefetching } = useQuery(['event_type'], () => httpService.get(URLS.EVENT_TYPE), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data.data);
        }
    })

    const clickHandler = (item: string) => {
        if (item === "All Event") {
            setEventCategory("")
        } else {
            setEventCategory(item)
        }
    }

    const handleChange = (item: string) => {
        setEventCategory(item)
    }

    // const ref: any = React.useRef(null);

    // const scroll = (scrolloffset: number) => {
    //     ref.current.scrollLeft += scrolloffset
    // };

    return (

        <Select
            color={primaryColor} backgroundColor={"#F2F4FF"}
            focusBorderColor={"#DDE6EB"}
            borderWidth={"1px"}
            borderColor={"#DDE6EB"}
            height={["40px", "50px", "50px"]}
            fontSize={"14px"}
            rounded={"50px"}
            width={["250px", "250px", "250px"]}
            onChange={(e) => handleChange(e.target.value)}
            value={event_category}
            fontWeight={"bold"}
            textAlign={"center"}
            placeholder='Select Event Category' >
            {data?.sort((a: string, b: string) => {
                if (a > b) {
                    return 1
                } else {
                    return -1;
                }
                return 0;
            })?.map((type: any, index: number) => (
                <option style={{ fontSize: "16px", fontWeight: "normal" }} key={index} value={type}>
                    {type.split("_").join(" ")}
                </option>
            ))}
        </Select>
    )
}

export default EventCategory


// {/* <>
// {!selector && (
//     <Flex flexDirection={"column"} overflowX={"hidden"} h={"50px"} justifyContent={"center"} alignItems={"center"} position={"relative"} >
//         <Box ref={ref} width={"full"} height={"full"} display={["none", "flex"]} overflowX={"auto"} scrollBehavior={"smooth"} sx={
//             {
//                 '::-webkit-scrollbar': {
//                     display: !eventpage ? 'none' : ""
//                 }
//             }
//         } >
//             <Flex gap={["4", "4", "9"]} width={"fit-content"} my={"auto"} pr={"100px"} >

//                 <Button onClick={() => clickHandler("")} width={"80px"} _hover={{ backgroundColor: colorMode === 'light' ? "white":secondaryBackgroundColor }} rounded={"none"} borderBottom={!event_category ? "1px" : ""} fontSize={"14px"} lineHeight={"150%"} fontWeight={!event_category ? "bold" : "normal"} height={"30px"} bg={colorMode === 'light' ? "#FFF":mainBackgroundColor} color={!event_category ? "brand.chasescrollBlue" : "#626262"} >All Event</Button>
//                 {data?.sort((a: string, b: string) => {
//                     if (a > b) {
//                         return 1
//                     } else {
//                         return -1;
//                     }
//                     return 0;
//                 }).map((item: any) => {

//                     return (
//                         <Button onClick={() => clickHandler(item)} key={item} _hover={{ backgroundColor: secondaryBackgroundColor, borderBottom: "1px" }} rounded={"none"} width={"fit-content"} height={"30px"} fontSize={"13px"} fontWeight={event_category === item ? "normal" : "normal"} bg={mainBackgroundColor} borderBottomColor={"brand.chasescrollBlue"} borderBottom={event_category === item ? "1px" : "0px"} textColor={event_category === item ? "brand.chasescrollBlue" : bodyTextColor} >{item?.split("_")?.join(" ")}</Button>
//                     )
//                 })}
//             </Flex>
//         </Box >

//         <Box h={"50px"} justifyContent={"center"} as='button' onClick={() => scroll(400)} pos={"absolute"} w={["full", "fit-content"]} right={"0px"} top={"0px"} >
//             {eventpage && (
//                 <Select
//                     color={colorMode === "light" ? "#5465E0":bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF":secondaryBackgroundColor}
//                     focusBorderColor={"#5465E0"}
//                     height={"50px"}
//                     fontSize={"sm"}
//                     rounded={"50px"}
//                     width={["full", "auto", "auto"]}
//                     onChange={(e) => handleChange(e.target.value)}
//                     value={event_category}
//                     textAlign={"center"}
//                     placeholder='Select Event Type' >
//                     {data?.sort((a: string, b: string) => {
//                         if (a > b) {
//                             return 1
//                         } else {
//                             return -1;
//                         }
//                         return 0;
//                     })?.map((type: any, index: number) => (
//                         <option style={{ fontSize: "12px" }} key={index} value={type}>
//                             {type.split("_").join(" ")}
//                         </option>
//                     ))}
//                 </Select>
//             )}
//             {!eventpage && (
//                 <CategoryRightIcon />
//             )}
//         </Box>
//     </Flex >
// )
// }
// { selector && (
//         <Select
//             color={"#5465E0"} backgroundColor={"#F2F4FF"}
//             focusBorderColor={"#F2F4FF"}
//             height={"50px"}
//             fontSize={"sm"}
//             rounded={"50px"}
//             width={["250px", "auto", "auto"]}
//             onChange={(e) => handleChange(e.target.value)}
//             value={event_category}
//             fontWeight={"bold"}
//             textAlign={"center"}
//             placeholder='Select Event Category' >
//             {data?.sort((a: string, b: string) => {
//                 if (a > b) {
//                     return 1
//                 } else {
//                     return -1;
//                 }
//                 return 0;
//             })?.map((type: any, index: number) => (
//                 <option style={{ fontSize: "16px", fontWeight: "normal" }} key={index} value={type}>
//                     {type.split("_").join(" ")}
//                 </option>
//             ))}
//         </Select>
//     )
// } */}
// // </>