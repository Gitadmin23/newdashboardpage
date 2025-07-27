"use client"
import CustomButton from '@/components/general/Button'
import ProductImagePicker from '@/components/kisok/productImagePicker'
import ProductMap from '@/components/kisok/productMap'
import SelectCategories from '@/components/kisok/selectCategories'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { SuccessIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
import useProduct from '@/hooks/useProduct'
import useCustomTheme from '@/hooks/useTheme'
import httpService from '@/utils/httpService'
import { Flex, Input, Radio, RadioGroup, Stack, Text, Textarea } from '@chakra-ui/react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'
import { useQuery } from 'react-query'

export default function RentalCreate() {

    const { primaryColor, secondaryBackgroundColor, headerTextColor, bodyTextColor, mainBackgroundColor } = useCustomTheme()
    const { push, back } = useRouter()
    const query = useSearchParams();
    const [index, setIndex] = useState("")
    const type = query?.get('type');
    const { rentaldata, updateRental, image } = useProductStore((state) => state);

    const { handleEditSubmitRental, createProduct, loading, openRental, editRental } = useProduct(rentaldata, true, true)
    const param = useParams();
    const id = param?.slug;

    const clickHandler = () => { }


    const { isLoading } = useQuery(
        ["rental", id],
        () => httpService.get(`/rental/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            setIndex(data?.data?.content[0]?.id)
            updateRental({
                ...rentaldata,
                name: data?.data?.content[0]?.name,
                description: data?.data?.content[0]?.description,
                images: data?.data?.content[0]?.images,
                price: data?.data?.content[0]?.price,
                category: data?.data?.content[0]?.category,
                location: data?.data?.content[0]?.location as any,
                maximiumNumberOfDays: data?.data?.content[0]?.maximiumNumberOfDays,
                frequency: data?.data?.content[0]?.frequency,
                state: data?.data?.content[0]?.location?.state
            })
        },
        enabled: index ? false : true
    });

    console.log(rentaldata);



    return (
        <LoadingAnimation loading={isLoading} > 
            <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
                <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                    <Flex w={"50%"} bgColor={primaryColor} rounded={"6px"} />
                </Flex>
                <Flex onClick={() => back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} position={"absolute"} top={"4"} zIndex={"30"} left={"4"}  >
                    <IoArrowBack size={"20px"} />
                </Flex>

                <form style={{ maxWidth: "550px", width: "100%", display: "flex" }} onSubmit={handleEditSubmitRental}>
                    <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                        <Text fontSize={"24px"} fontWeight={"600"} >List your Property</Text>
                        <ProductImagePicker />
                        <Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                        <Flex w={"full"} flexDir={"column"} gap={"3"} >
                            <Flex gap={"2"} w={"full"} flexDir={"column"} >
                                <Text fontWeight={"500"} >Name of the item</Text>
                                <Input bgColor={mainBackgroundColor} value={rentaldata?.name} h={"45px"} onChange={(e) => updateRental({ ...rentaldata, name: e.target.value })} />
                            </Flex>
                            <Flex gap={"2"} w={"full"} flexDir={"column"} >
                                <Text fontWeight={"500"} >Description (optional)</Text>
                                <Textarea value={rentaldata?.description} bgColor={mainBackgroundColor} onChange={(e) => updateRental({ ...rentaldata, description: e.target.value })} />
                            </Flex>
                            <SelectCategories rental={true} />
                        </Flex>
                        <CustomButton type='button' _disabled={{ opacity: "0.5", cursor: "not-allowed" }} disable={(!rentaldata?.name || !rentaldata?.description || !rentaldata?.category || (image?.length === 0 && rentaldata?.images?.length === 0)) ? true : false} onClick={() => push(`/dashboard/kisok/edit/${id}/rental?type=true`)} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Next"} />
                    </Flex>

                    <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                        <Text fontSize={"24px"} fontWeight={"600"} >List your Property</Text>
                        <Flex w={"full"} flexDir={"column"} gap={"3"} >
                            <Flex gap={"2"} w={"full"} flexDir={"column"} >
                                <Text fontWeight={"500"} >Location</Text>
                                <ProductMap height='45px' location={rentaldata?.location} />
                            </Flex>
                            <Flex gap={"2"} w={"full"} flexDir={"column"} >
                                <Text fontWeight={"500"} >Number of Days available for Rent</Text>
                                <Flex rounded={"39px"} alignItems={"center"} justifyContent={"center"} padding={"12px"} gap={"3"} >
                                    <Flex type='button' as={"button"} onClick={() => updateRental({ ...rentaldata, maximiumNumberOfDays: rentaldata?.maximiumNumberOfDays === 1 ? 1 : rentaldata?.maximiumNumberOfDays - 1 })} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosRemove />
                                    </Flex>
                                    <Text fontSize={"18px"} >{rentaldata?.maximiumNumberOfDays}</Text>
                                    <Flex type='button' as={"button"} onClick={() => updateRental({ ...rentaldata, maximiumNumberOfDays: rentaldata?.maximiumNumberOfDays + 1 })} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosAdd />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex w={"full"} justifyContent={"space-between"} >
                                <Text fontWeight={"500"} >Rental Timeline</Text>

                                <RadioGroup onChange={(value: any) => updateRental({ ...rentaldata, frequency: value })} value={rentaldata?.frequency}>
                                    <Stack direction='row'>
                                        <Radio value='HOURLY'>Hourly</Radio>
                                        <Radio value='DAILY'>Daily</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Flex>
                            <Flex gap={"2"} w={"full"} flexDir={"column"} >
                                <Text fontWeight={"500"} >Price</Text>
                                <Input bgColor={mainBackgroundColor} value={rentaldata?.price + ""} h={"45px"} onChange={(e) => updateRental({ ...rentaldata, price: e.target.value })} />
                            </Flex>
                        </Flex>
                        <CustomButton isLoading={editRental?.isLoading || loading} disable={editRental?.isLoading || loading} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                    </Flex>
                </form>

                <ModalLayout open={openRental} close={clickHandler} bg={secondaryBackgroundColor} >
                    <LoadingAnimation loading={loading} >
                        <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                            <SuccessIcon />
                            <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{"Congratulations"}</Text>
                            <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Your product has been edited successfully`}</Text>

                            <CustomButton onClick={() => push("/dashboard/product/kiosk?type=myrental")} color={"#FFF"} text={'Done'} w={"full"} backgroundColor={"#3EC259"} />
                        </Flex>
                    </LoadingAnimation>
                </ModalLayout>
            </Flex>
        </LoadingAnimation>
    )
}
