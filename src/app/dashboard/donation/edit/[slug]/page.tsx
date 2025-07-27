"use client"
import CreateDonationHeader from '@/components/create_donation/create_donation_header';
import DonationTheme from '@/components/create_donation/donation_theme';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import useEventStore from '@/global-state/useCreateEventState';
import useDonationStore from '@/global-state/useDonationState';
import useGetDonationList from '@/hooks/useGetDonationList';
import useGetSingleDonationList from '@/hooks/useGetSingleDonation';
import useCustomTheme from '@/hooks/useTheme';
import { IUser } from '@/models/User';
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import React, { use } from 'react';

type Props = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function CreateDonation(props: Props) {
    const params = use(props.params);

    const id = params.slug

    const {
        secondaryBackgroundColor,
        mainBackgroundColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    // const { singleData: item, isLoading } = useGetDonationList(id)
    const {singleData: item, isLoading } = useGetSingleDonationList(id)

    const { data, updateDontion } = useDonationStore((state) => state)

    React.useEffect(() => {
 
        if (!isLoading) {
            if(!data[0]?.name){

                const clone = [{
                    bannerImage: item?.bannerImage,
                    creatorID: item?.createdBy?.userId,
                    description: item?.description,
                    endDate: item?.endDate,
                    goal: item?.goal,
                    name: item?.name,
                    purpose: item?.purpose,
                    visibility: item?.visibility,
                    funnelID: item?.funnelID,  
                }]

                // const collaborators:Array<string> =[]
                 
                // item?.collaborators?.map((item: any) => {
                //     return collaborators.push(item?.userId+"")
                // }) 

                // clone[0].collaborators = [...collaborators] 

                updateDontion(clone)
            }
        }
    }, [isLoading, item])

    console.log(data);



    return (
        <LoadingAnimation loading={isLoading} > 
            <Flex width={"full"} pt={"74px"} h={["auto", "auto", "auto", "100vh", "100vh"]} display={["none", "none", "none", "none", "flex"]} flexDir={["column", "column", "column", "row"]}  >
                <CreateDonationHeader name="Edit Fundraising" />
                <Flex bgColor={colorMode === 'light' ? "gray.300" : secondaryBackgroundColor} w={"full"} p={["0px", "0px", "0px", "3"]} h={"full"}  >
                    <Flex bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={"auto"} overflowY={"auto"} >
                        <Box bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} px={"3"} h={"fit-content"} >
                            <DonationTheme id={id} />
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Box width={"full"} display={["block", "block", "block", "block", "none"]}  >
                <CreateDonationHeader name="Edit Fundraising" />
                <DonationTheme id={id} />
            </Box>
        </LoadingAnimation>
    )
}