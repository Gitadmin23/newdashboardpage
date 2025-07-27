import ChatBtn from '@/components/sharedComponent/chat_btn'
import UserImage from '@/components/sharedComponent/userimage'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { IUser } from '@/models/User'
import { Flex, Box, Text } from '@chakra-ui/layout'
import React from 'react'

type IProps = {
    collaborators: Array<IUser>,
    admins: Array<IUser>,
}

export default function Chatcollaborator(props: IProps) {

    const {
        collaborators,
        admins
    } = props

    const { userId } = useDetails((state) => state);

  
    const { 
        mainBackgroundColor, 
        bodyTextColor
      } = useCustomTheme();

    return (
        <Flex flexDir={"column"} w={"full"} px={"2"} bg={mainBackgroundColor}  >
            {admins?.filter((item: IUser) => item?.userId !== userId)?.map((item: IUser, index: number) => {
                return (
                    <Flex key={index} py={"5"} w={"full"} borderTop={"0.5px solid #B6B6B6"} alignItems={"center"} px={"4"} justifyContent={"space-between"} >

                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex width={"fit-content"} position={"relative"} >
                                <UserImage size={"42px"} font={"16px"} image={item?.data?.imgMain?.value} data={item} />

                            </Flex>
                            <Box >
                                <Text textAlign={"left"} fontWeight={"medium"} >{(item?.firstName + " " + item?.lastName)?.length > 10 ? (item?.firstName + " " + item?.lastName)?.slice(0, 10) + "..." : (item?.firstName + " " + item?.lastName)}</Text>
                                {/* <Text textAlign={"left"} fontSize={"sm"} >Admin</Text> */}

                                <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                    Admin
                                </Flex>
                            </Box>
                        </Flex>
                        {item?.userId !== userId && (
                            <Flex border={"1px solid #E8E8E8"} color={"#5465E0"} rounded={"32px"} gap={"8"} py={"8px"} px={"16px"} >
                                <ChatBtn userId={item?.userId} />
                            </Flex>
                        )}
                    </Flex>
                )
            })}
            {collaborators?.map((item: IUser, index: number) => {
                return (
                    <Flex key={index} py={"5"} w={"full"} borderTop={"0.5px solid #B6B6B6"} alignItems={"center"} px={"4"} justifyContent={"space-between"} >

                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex width={"fit-content"} position={"relative"} >
                                <UserImage size={"42px"} font={"16px"} image={item?.data?.imgMain?.value} data={item} />

                            </Flex>
                            <Box >
                                <Text textAlign={"left"} fontWeight={"medium"} >{(item?.firstName + " " + item?.lastName)?.length > 10 ? (item?.firstName + " " + item?.lastName)?.slice(0, 10) + "..." : (item?.firstName + " " + item?.lastName)}</Text>
                                {/* <Text textAlign={"left"} fontSize={"sm"} >Coordinator</Text>

                        {eventdata?.admins?.length > 0 && ( */}
                                <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#FDF3CF6B"} color={"#FDB806"} >
                                    Volunteer
                                </Flex>
                            </Box>
                        </Flex>
                        {item?.userId !== userId && (
                            <Flex border={"1px solid #E8E8E8"} color={"#5465E0"} rounded={"32px"} gap={"8"} py={"8px"} px={"16px"} >
                                <ChatBtn userId={item?.userId} />
                            </Flex>
                        )}
                    </Flex>
                )
            })}
        </Flex>
    )
}
