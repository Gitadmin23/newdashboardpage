import useCustomTheme from '@/hooks/useTheme';
import { IService } from '@/models/Service';
import { IMAGE_URL } from '@/services/urls';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { textLimit } from '@/utils/textlimit';
import { Flex, HStack, Image, Text } from '@chakra-ui/react'; 
import React from 'react'
import UserImage from './userimage';
import { IUser } from '@/models/User';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductImageScroller({ images, userData, createdDate, height, rounded }: { images: Array<string>, userData?: IUser, createdDate?: string, height?: any, rounded?: string }) {


    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const { push } = useRouter()
    const query = useSearchParams();
    const frame = query?.get('frame');

    const { secondaryBackgroundColor, primaryColor, bodyTextColor } = useCustomTheme()

    React.useEffect(() => {
        if (images?.length > 1) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => {
                    if (prev === images.length - 1) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 8000);
            return () => clearInterval(interval);
        }
    }, []) 

    const clickHandler =(e: any)=> {
        if (!frame) {
            e.stopPropagation()
            push(`/dashboard/profile/${userData?.userId}`)
        }
    }

    return (
        <Flex cursor='pointer' w='full' h={height ? height : ["144px", "174px", "174px"]} bgColor={secondaryBackgroundColor} p={["3px", "3px", "2"]} borderTopRadius={rounded ?? '10px'} borderBottomRadius={rounded ?? "0px"} overflow={'hidden'} justifyContent={"center"} alignItems={"center"} position={'relative'} >
            {createdDate && (
                <Flex as={"button"} onClick={(e)=> clickHandler(e)}  position={"absolute"} zIndex={"10"} left={"2"} top={"2"} bgColor={"#C4C4C499"} p={"1"} rounded={"full"} w={"fit-content"} alignItems={"center"} gap={2} >
                    <UserImage image={userData?.data?.imgMain?.value} font={"16px"} data={userData} border={"1px"} size={"32px"} />
                    <Flex flexDir={"column"} alignItems={"start"} pr={"3"} >
                        <Text display={["none", "none", "block"]} fontSize={"12px"} fontWeight={"600"} color={"white"} >
                            {textLimit(capitalizeFLetter(userData?.firstName) + " " + capitalizeFLetter(userData?.lastName), 15)}
                        </Text>
                        <Text display={["block", "block", "none"]} fontSize={"12px"} fontWeight={"600"} color={"white"} >
                            {textLimit(capitalizeFLetter(userData?.firstName) + " " + capitalizeFLetter(userData?.lastName), 10)}
                        </Text>
                        <Text fontSize={"10px"} color={"white"} >
                            {createdDate}
                        </Text>
                    </Flex>
                </Flex>
            )}
            {images?.length > 1 && (
                <HStack position={"absolute"} zIndex={"10"} bottom={"10px"} height={"15px"} width={'full'} justifyContent={"center"} spacing={1}>
                    {images.map((image, index) => (
                        <Flex key={index.toString()} cursor={'pointer'} onClick={() => setActiveImageIndex(index)} width={activeImageIndex === index ? "10px" : "5px"} height={activeImageIndex === index ? "10px" : "5px"} borderRadius={activeImageIndex === index ? "10px" : "5px"} bg={activeImageIndex === index ? "white" : "white"} scale={activeImageIndex === index ? 1 : 1} ></Flex>
                    ))}
                </HStack>
            )}

            {images?.length > 0 && (
                <Image rounded={"8px"} cursor='pointer' src={images[activeImageIndex]?.startsWith('https://') ? images[activeImageIndex] : (IMAGE_URL as string) + images[activeImageIndex]} alt="bannerimage" h='full' objectFit={"contain"} />
            )}
            <Flex bgColor={"#000"} opacity={"10%"} pos={"absolute"} inset={"0px"} borderTopRadius={rounded ?? '10px'} />
        </Flex>
    )
}
