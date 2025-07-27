import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import CustomButton from '../general/Button'
import UserImage from '../sharedComponent/userimage'
import { IUser } from '@/models/User'
import { IReview } from '@/models/product'
import httpService from '@/utils/httpService'
import { useMutation, useQuery } from 'react-query'
import { Chat } from '@/models/Chat'
import { useRouter } from 'next/navigation'
import { WEBSITE_URL } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { useDetails } from '@/global-state/useUserDetails'
import DonateUsers from '../sharedComponent/donateUser'
import useCustomTheme from '@/hooks/useTheme'
import { IService } from '@/models/Service'

export default function GetCreatorData({ userData, donation, data: donationData, item: rating, reviewdata }: { userData: IUser, reviewdata?: Array<IReview>, data?: any, donation?: boolean, item?: any }) {

    const { userId: user_index } = useDetails((state) => state);
    const { secondaryBackgroundColor } = useCustomTheme()
    const router = useRouter();
    
    let token = localStorage.getItem("token")

    const clickHandler = () => {
        if (!user_index) {
            // router.push("/share/auth/login?type=EVENT&typeID=" + id)
        } else {
            router.push("/dashboard/profile/" + userData?.userId)
        }
    }

    const { isLoading, isRefetching, refetch, data } = useQuery(
        ["rental", userData?.userId],
        () => httpService.get(`/user/get-users-connections/${userData?.userId}`, {
            params: {
                userID: userData?.userId
            }
        }), {
        onSuccess(data) {

        }
    });

    const { isLoading: chatCreationLoading, mutate } = useMutation({
        mutationFn: () =>
            httpService.post(`/chat/chat`, {
                type: "ONE_TO_ONE",
                typeID: userData?.userId,
                users: [userData?.userId],
            }),
        onSuccess: (data) => {
            const chat = data?.data as Chat;
            const obj = {
                message: `${WEBSITE_URL}/share?type=ONE_TO_ONE&typeID=${userData?.userId}`,
                chatID: chat?.id,
            };
            router.push(`/dashboard/chats?activeID=${obj?.chatID}`);
            // sendMessage.mutate(obj)
        },
    });



    return (
        <Flex bgColor={["transparent", "transparent", secondaryBackgroundColor]} rounded={"64px"} h={["fit-content", "fit-content", "80px"]} px={["0px", "0px", "4"]} w={["120px", "fit-content", "full"]} gap={"2"} flexDir={["column", "column", "row"]} justifyContent={["start", "start", "space-between"]} alignItems={["start", "start", "center"]} >
            <Flex role='button' onClick={clickHandler} gap={"2"} alignItems={"center"} >
                <Flex display={["none", "flex", "flex"]} >
                    <UserImage border={"1px"} size={"50px"} font={"16px"} image={userData?.data?.imgMain?.value} data={userData} />
                </Flex>
                <Flex display={["flex", "none", "none"]} >
                    <UserImage border={"1px"} size={"32px"} font={"14px"} image={userData?.data?.imgMain?.value} data={userData} />
                </Flex>
                <Flex flexDir={"column"} >
                    <Text textAlign={"left"} display={["none", "block"]} fontWeight={"medium"} >{capitalizeFLetter(userData?.firstName) + " " + capitalizeFLetter(userData?.lastName)}</Text>
                    <Text textAlign={"left"} display={["block", "none"]} fontWeight={"medium"} fontSize={"12px"} >{textLimit(capitalizeFLetter(userData?.firstName) + " " + capitalizeFLetter(userData?.lastName), 10)}</Text>
                    <Text textAlign={"left"} mt={"-2px"} fontSize={["13px", "13px", "sm"]} >{data?.data?.numberOfElements} followers</Text>
                </Flex>
            </Flex>
            <Flex gap={"4"} alignItems={"center"} flexDir={["column", "column", "row"]} >
                {(userData?.userId !== user_index && token)&& (
                    <CustomButton text={"Message"} onClick={() => mutate()} isLoading={chatCreationLoading} height={"30px"} fontSize={"12px"} width={"100px"} borderRadius={"999px"} />
                )}
                {(!donation && token) && (
                    <Flex flexDir={"column"} alignItems={"center"} >
                        <Flex flexDir={"row"} gap={"1"} >
                            {[1, 2, 3, 4, 5]?.map((itemNumb) => {
                                return (
                                    <Flex key={itemNumb} >
                                        {(itemNumb > rating) ? (
                                            <FaStar color="#D5D6DE" size={"15px"} />
                                        ) : (
                                            <FaStar color='#FBBD08' size={"15px"} />
                                        )}
                                    </Flex>
                                )
                            })}
                        </Flex>
                        <Text fontSize={"12px"} fontWeight={"500"} >{reviewdata?.length} REVIEWS</Text>
                    </Flex>
                )}
                {donation && (
                    <DonateUsers donationDetail={true} size={"42px"} event={donationData} fontSize={14} border='1px' />
                )}
            </Flex>
        </Flex>
    )
}
