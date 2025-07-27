import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout';
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState';
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Button, Flex, VStack, useColorMode, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import SuccessMessageCreateEvent from '../success_message';
import { IUser } from '@/models/User';
import useCustomTheme from "@/hooks/useTheme";
import CustomText from '@/components/general/Text';
import { Warning2 } from 'iconsax-react';
import useDonationStore from '@/global-state/useDonationState';
import AWSHook from '@/hooks/awsHook';

interface Iprops {
    id?: string
    type?: any,
    promotion?: boolean,
}

function SubmitEvent(props: Iprops) {

    const {
        id,
        type,
        promotion,
    } = props

    const {
        secondaryBackgroundColor,
    } = useCustomTheme();

    // const { image } = useEventStore((state) => state);
    const { data, image, updateDontion } = useDonationStore((state) => state);
    const query = useQueryClient()
    const pathname = usePathname();
    const path = useSearchParams();
    const event = path?.get('event'); 

    const { fileUploadHandler, loading, uploadedFile, reset, deleteFile } = AWSHook();

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<Array<string>>([])

    const [payload, setPayload] = useState([] as any)

    const findLatestExpiration = (items: any) => {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("Please provide a non-empty array of objects.");
        }

        // Use reduce to find the object with the latest endDate
        const latestItem = items.reduce((latest, current) => {
            return current.endDate > latest.endDate ? current : latest;
        });

        return latestItem;
    };

    const latestExpiration = findLatestExpiration(data)

    // const []
    const toast = useToast()
    const getValidationTheme = () => {
        payload.every((item: any) => {
            if (!item?.name) {
                toast({
                    description: "Please Enter Fundraising Name",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("name");

                return
            } else if (!item?.description) {
                toast({
                    description: "Please Enter Fundraising Description",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("des");
                return
            } else if (!item?.purpose) {
                toast({
                    description: "Please Enter Fundraising Purpose",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("purpose");
                return
            } else if (!item?.goal) {
                toast({
                    description: "Please Enter Fundraising Target",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("goal");
                return
            } else if (!item?.endDate) {
                toast({
                    description: "Please Enter End Date",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("endDate");
                return
            } else if (getValidationImageBtn() && !pathname?.includes("edit")) {
                toast({
                    description: "Please Enter Fundraising Image",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                console.log("image");
                return
            } else if (getValidationThemeBtn()) {
                toast({
                    description: "Please Fill Fundraising Information ",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                createFundraisingData()
            }
        })
    }

    const getValidationThemeBtn = () => {
        return payload?.every((item: any, index: number) => {
            if (!item?.name) {
                return true
            } else if (!item?.purpose) {
                return true
            } else if (!item?.description) {
                return true
            } else if (!item?.endDate) {
                return true
            } else if (!item?.goal) {
                return true
            }
            else if (getValidationImageBtn() && !pathname?.includes("edit")) {
                return true
            } else if (data.length === index + 1) {
                return false
            }
            else {
                return true
            }
        })
    }

    const getValidationImageBtn = () => {
        return image?.every((item) => {
            if (!item) {
                return true
            } else {
                return false
            }
        })
    }

    // Create Draft 
    const createGroupDonation = useMutation({
        mutationFn: (data: {
            creatorID: string,
            name: string,
            bannerImage: string,
            description: string,
            expirationDate: number
        }) => httpService.post("/fund-raiser-group/create", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (groupData) => {

            const clone = [...data]
            uploadedFile?.map((item, index) => {
                clone[index] = { ...clone[index], fundRaiserGroupId: groupData?.data?.id, bannerImage: item }
            })
            createDonation.mutate({ items: clone })
            // setstopData(true)
        }
    });

    // Create Draft 
    const createDonation = useMutation({
        mutationFn: (data: any) => httpService.post("/fund-raiser/create", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: "Fundraiser Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            
            query?.invalidateQueries("getDonationsingleList")
            query?.invalidateQueries("donationlist") 
            query?.invalidateQueries("donationlistmy")

            reset()

            if(event) {
                router?.push(`/dashboard/event/details/${event}`)
            } else {
                router?.push("/dashboard/product/fundraising?type=mydonation")
            }

        }
    });

    // Create Draft 
    const editDonation = useMutation({
        mutationFn: (payload: any) => httpService.put(`/fund-raiser/edit/${id}`, payload),
        onError: (error: AxiosError<any, any>) => {

            console.log("work");

            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: "Updated Fundraiser",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            reset()
            query?.invalidateQueries("getDonationsingleList")
            query?.invalidateQueries("donationlist") 
            query?.invalidateQueries("donationlistmy")
            router?.push("/dashboard/donation/" + id)

        }
    });

    const createFundraisingData = () => {
        if (!pathname?.includes("edit")) {
            fileUploadHandler(image)
        } else {
            if (image?.length > 0) {
                fileUploadHandler(image)
            } else {
                if (pathname?.includes("edit")) {
                    editDonation?.mutate({ ...data[0] })
                }
            }
        }
    }

    useEffect(() => {
        setPayload(data)
    }, [data])

    useEffect(() => { 
        
        let newObj: any = [...data]
        newObj[0] = { ...data[0], bannerImage: uploadedFile[0] }

        let newGroup = {creatorID: data[0]?.creatorID,name: data[0]?.name,bannerImage: uploadedFile[0],description: data[0].description,expirationDate: Number(latestExpiration.endDate)}

        if (uploadedFile?.length > 0) {
            if ((uploadedFile?.length === 1)) {
                if (!pathname?.includes("edit")) {
                    createGroupDonation.mutate(newGroup)
                } else {
                    editDonation?.mutate({ ...newObj[0] })
                }
            } else if (uploadedFile?.length > 1) {
                createGroupDonation.mutate(newGroup)
            }
        }

    }, [uploadedFile])

    const closeHandle = () => { }




    function clean(obj: any) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
            if (obj[propName] === "location") {
                for (var propName in obj?.location) {
                    if (obj?.location[propName] === null || obj?.location[propName] === undefined || obj?.location[propName] === "") {
                        delete obj?.location[propName];
                    }
                }
            }
        }
        return obj
    }

    return (
        <Flex w={"full"} alignItems={"center"} justifyContent={"center"} fontSize={["md", "lg"]} fontWeight={"bold"} >
            {!pathname?.includes("edit") ? (
                <CustomButton borderWidth={"0px"} backgroundColor={(getValidationThemeBtn() || getValidationImageBtn()) ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={createDonation?.isLoading || loading || createGroupDonation?.isLoading || editDonation?.isLoading} onClick={getValidationTheme} _disabled={{ cursor: "not-allowed" }} borderRadius={"999px"} width={["full", "full", "300px", "300px"]}
                    text={'Submit'} />
            ) : (
                <CustomButton borderWidth={"0px"} backgroundColor={(getValidationThemeBtn()) ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={createDonation?.isLoading || loading || createGroupDonation?.isLoading || editDonation?.isLoading} onClick={getValidationTheme} _disabled={{ cursor: "not-allowed" }} borderRadius={"999px"} width={["full", "full", "300px", "300px"]}
                    text={'Update'} />
            )}

            <ModalLayout close={closeHandle} open={open} bg={secondaryBackgroundColor} >
                <SuccessMessageCreateEvent update={(pathname?.includes("edit_event_data") || pathname?.includes("edit_event")) ? true : false} />
            </ModalLayout>
        </Flex>
    )
}

export default SubmitEvent
