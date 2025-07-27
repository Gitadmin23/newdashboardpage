import { ShareType } from '@/app/share/page';
import { ShareIconTwo } from '@/components/svg';
import useCustomTheme from '@/hooks/useTheme';
import { Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { IoClose } from 'react-icons/io5';
import SendMesageModal from './send_to_app_user';
import ShareToSocialMedia from './social_media_share';


interface Props {
    id: any;
    istext?: boolean;
    type: ShareType;
    eventName?: string;
    data?: any;
    isprofile?: any,
    disable?: boolean,
}

export default function ShareBtn(props: Props) {
    const {
        id,
        istext, 
        disable,
        data,
        isprofile
    } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        bodyTextColor, 
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();

    return (
        <Flex w={"fit-content"} >
            {!istext && (
                <Flex w={"fit-content"} alignItems={"center"} gap={"2px"} >
                    <Flex
                        width={"24px"}
                        h={"30px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        color={bodyTextColor}
                        as={"button"}
                        disabled={disable}
                        cursor={disable ? "not-allowed" : "pointer"}
                        onClick={() => onOpen()}
                    >
                        <ShareIconTwo color={bodyTextColor} />
                    </Flex>
                </Flex>
            )}
            {istext && (
                <Flex  onClick={() => onOpen()} as={"button"}
                cursor={disable ? "not-allowed" : "pointer"}
                disabled={disable} w={"full"} h={"60px"} borderColor={borderColor} borderBottomWidth={"1px"} justifyContent={"center"} alignItems={"center"} >
                    Share post
                </Flex>
            )}
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={"md"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody bg={mainBackgroundColor} overflowY={"hidden"} pos={"relative"} display={"flex"} flexDir={"column"} >
                        <Flex pt={"4"} overflowY={"hidden"} pos={"absolute"} inset={"0px"} bottom={"160px"} w={"full"} px={"6"} flexDirection={"column"}  >
                            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                <Flex flexDirection={"column"} >
                                    <Text fontWeight={"600"} fontSize={"22px"} >Share post</Text>
                                    <Text color={"#626262"} >Share via message</Text>
                                </Flex>
                                <Box as='button' onClick={onClose} >
                                    <IoClose size="25px" />
                                </Box>
                            </Flex>
                            <SendMesageModal
                                type={props.type}
                                isprofile={isprofile}
                                id={id}
                                onClose={onClose}
                            />
                        </Flex> 
                        <Flex w={"full"} mt={"auto"} zIndex={"10"} >
                            <ShareToSocialMedia id={id}
                                type={props.type}
                                isprofile={isprofile} data={data} />
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </Flex>
    )
}
