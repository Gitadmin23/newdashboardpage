"use client"
import CustomButton from '@/components/general/Button'
import ProductImagePicker from '@/components/kisok/productImagePicker'
import ProductMap from '@/components/kisok/productMap'
import SelectCategories from '@/components/kisok/selectCategories'
import VendorTermAndCondition from '@/components/kisok/VendorTermAndCondition'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { SuccessIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
import useProduct from '@/hooks/useProduct'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Input, Radio, RadioGroup, Stack, Text, Textarea, useToast } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'

export default function RentalCreate() {

    const { primaryColor, secondaryBackgroundColor, headerTextColor, bodyTextColor, mainBackgroundColor } = useCustomTheme()
    const { push, back } = useRouter()
    const query = useSearchParams();
    const type = query?.get('type');
    const [checked, setChecked] = useState(false)
    const { rentaldata, updateRental, image } = useProductStore((state) => state);

    const toast = useToast()

    const { handleSubmitRental, createProduct, loading, openRental, setOpenRental } = useProduct(rentaldata, true)

    const clickHandler = () => {}

    const handleChangeLimit = (e: any, limit: any, type: "Name" | "Description") => {
        let clone = { ...rentaldata }
        if ((e.target.value).length >= limit) { 
            toast({
                status: "error",
                title: "Error",
                description: `Character Limit is ${limit}`
            })
            return
        } else {
            if(type === "Name") {
                clone = { ...rentaldata, name: e.target.value }
            } else {
                clone = { ...rentaldata, description: e.target.value } 
            }
        }
        updateRental(clone)
    }


    const backHandler = () => {
        if(type){
            push("/dashboard/kisok/create-rental")
        } else {
            push("/dashboard/product/kiosk?type=rental")
        } 
    }
    

    return (
        <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                <Flex w={"50%"} bgColor={primaryColor} rounded={"6px"} />
            </Flex>
            <Flex as={"button"} onClick={() => backHandler()} bgColor={mainBackgroundColor} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} position={"absolute"} top={"4"} zIndex={"30"} left={"4"}  >
                <IoArrowBack size={"20px"} />
            </Flex>

            <form style={{ maxWidth: "550px", width: "100%", display: "flex" }} onSubmit={handleSubmitRental}>
                <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={["16px", "16px", "24px"]} fontWeight={"600"} >List the item for rent</Text>
                    <ProductImagePicker />
                    {/* <Text fontSize={["16px", "16px", "24px"]} fontWeight={"600"} >Delivery Plans</Text> */}
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Name of the item</Text>
                            <Input bgColor={mainBackgroundColor} value={rentaldata?.name} h={"45px"} onChange={(e) => handleChangeLimit(e, 150, "Name")} />
                            <Text fontSize={"sm"} >{rentaldata?.name?.length ? rentaldata?.name?.length : "0"} {"/ 150"}</Text>
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Description</Text>
                            <Textarea bgColor={mainBackgroundColor} value={rentaldata?.description} onChange={(e) => handleChangeLimit(e, 1500, "Description")} />
                            <Text fontSize={"sm"} >{rentaldata?.description?.length ? rentaldata?.description?.length : "0"} {"/ 1500"}</Text>
                        </Flex>
                        <SelectCategories rental={true} />
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

                            <RadioGroup onChange={(value: any)=> updateRental({...rentaldata, frequency: value})} value={rentaldata?.frequency}>
                                <Stack direction='row'>
                                    <Radio value='HOURLY'>Hourly</Radio>
                                    <Radio value='DAILY'>Daily</Radio> 
                                </Stack>
                            </RadioGroup>
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Price</Text>
                            <Input bgColor={mainBackgroundColor} h={"45px"}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        updateRental({ ...rentaldata, price: value })
                                    }
                                }} 
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}  
                            />
                        </Flex>
                    </Flex>
                    {/* <CustomButton type='button' _disabled={{ opacity: "0.5", cursor: "not-allowed" }} disable={(!rentaldata?.name || !rentaldata?.description || !rentaldata?.category || image?.length === 0) ? true : false} onClick={() => push("/dashboard/kisok/create-rental?type=true")} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Next"} /> */}

                    <VendorTermAndCondition checked={checked} setChecked={setChecked} type="RENTAL" />
                    <CustomButton isLoading={createProduct?.isLoading || loading} disable={createProduct?.isLoading || loading || !checked || !rentaldata?.location?.latlng || !rentaldata?.price || !rentaldata?.frequency || !rentaldata?.name || !rentaldata?.description || !rentaldata?.category || image?.length === 0} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                </Flex>

                {/* <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={["16px", "16px", "24px"]} fontWeight={"600"} >List your Property</Text>
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

                            <RadioGroup onChange={(value: any)=> updateRental({...rentaldata, frequency: value})} value={rentaldata?.frequency}>
                                <Stack direction='row'>
                                    <Radio value='HOURLY'>Hourly</Radio>
                                    <Radio value='DAILY'>Daily</Radio> 
                                </Stack>
                            </RadioGroup>
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Price</Text>
                            <Input bgColor={mainBackgroundColor} h={"45px"}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        updateRental({ ...rentaldata, price: value })
                                    }
                                }} 
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}  
                            />
                        </Flex>
                    </Flex>
                    <VendorTermAndCondition checked={checked} setChecked={setChecked} type="RENTAL" />
                    <CustomButton isLoading={createProduct?.isLoading || loading} disable={createProduct?.isLoading || loading || !checked || !rentaldata?.location?.latlng || !rentaldata?.price || !rentaldata?.frequency} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                </Flex> */}
            </form>

            <ModalLayout open={openRental} close={clickHandler} bg={secondaryBackgroundColor} >
                <LoadingAnimation loading={loading} >
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{"Congratulations"}</Text>
                        <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Your rental product has been listed successfully.`}</Text>

                        <CustomButton onClick={() => push("/dashboard/product/kiosk?type=myrental")} color={"#FFF"} text={'Done'} w={"full"} backgroundColor={"#3EC259"} />
                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </Flex>
    )
}
