"use client"
import CustomButton from '@/components/general/Button'
import ColorSelector from '@/components/kisok/productCustoms/colorSelector'
import SizeSelector from '@/components/kisok/productCustoms/sizeSelector'
import ProductImagePicker from '@/components/kisok/productImagePicker'
import ProductMap from '@/components/kisok/productMap'
import SelectCategories from '@/components/kisok/selectCategories'
import VendorTermAndCondition from '@/components/kisok/VendorTermAndCondition'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { SuccessIcon, TruckIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
import useProduct from '@/hooks/useProduct'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Input, Switch, Text, Textarea } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import Select from 'react-select';

export default function KisokCreate() {

    const { secondaryBackgroundColor, headerTextColor, bodyTextColor, mainBackgroundColor } = useCustomTheme()
    const { push } = useRouter() 
    const [checked, setChecked] = useState(false)
    const query = useSearchParams();
    const event = query?.get('event');

    const type = query?.get('type');
    const { productdata, updateProduct } = useProductStore((state) => state);

    const { handleSubmitProduce, createProduct, loading, openProduct, setOpenProduct } = useProduct(productdata, false)

    const clickHandler = () => { }

    const HandleChangeLimit = (e: any, limit: any, type: "Name" | "Description") => {
        let clone = { ...productdata }
        if ((e.target.value).length <= limit) {
            if (type === "Name") {
                clone = { ...productdata, name: e.target.value }
            } else {
                clone = { ...productdata, description: e.target.value }
            }
        }
        updateProduct(clone)
    }

    // console.log(productdata);


    // const backHandler = () => {
    //     if (type) {
    //         push(`/dashboard/kisok/create${event ? "?event=" + event : ""}`)
    //     } else {
    //         push(`/dashboard/product/kiosk?type=kiosk${event ? "&event=" + event : ""}`)
    //     }
    // }

    return (
        <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
            {/* <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                <Flex w={!type ? "50%" : "100%"} bgColor={primaryColor} rounded={"6px"} />
            </Flex> */}
            {/* <Flex as={"button"} onClick={() => backHandler()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} position={"absolute"} top={"4"} zIndex={"30"} left={"4"}  >
                <IoArrowBack size={"20px"} />
            </Flex> */}

            <form style={{ maxWidth: "550px", width: "100%", display: "flex" }} onSubmit={handleSubmitProduce}>
                <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={"24px"} fontWeight={"600"} >Share pictures of your place</Text>
                    <ProductImagePicker />
                    <Flex gap={"2"} w={"full"} flexDir={"column"} mt={["12", "12", "4"]} >
                        <Text fontSize={["14px", "16px", "24px"]} textAlign={"center"} fontWeight={"600"} >Product Title</Text>
                        <Input bgColor={mainBackgroundColor} onChange={(e) => HandleChangeLimit(e, 150, "Name")} h={"45px"} />
                        <Text fontSize={"sm"} >{productdata?.name?.length ? productdata?.name?.length : "0"} {"/ 150"}</Text>
                    </Flex>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontSize={["14px", "16px", "24px"]} fontWeight={"500"} textAlign={"center"} >Describe your product to make it stand out</Text>
                        <Textarea bgColor={mainBackgroundColor} onChange={(e) => HandleChangeLimit(e, 1500, "Description")} h={"120px"} />
                        <Text fontSize={"sm"} >{productdata?.description?.length ? productdata?.description?.length : "0"} {"/ 1500"}</Text>
                    </Flex>
                    <Text fontSize={["14px", "16px", "24px"]} fontWeight={"500"} >Set your pricing </Text>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Location</Text>
                        {/* <Input h={"45px"} /> */}
                        <ProductMap height='45px' location={productdata?.location} />
                    </Flex>
                    <SelectCategories rental={false} />
                    <Flex w={"full"} gap={"3"}  >
                        <ColorSelector />
                        <SizeSelector />
                    </Flex>
                    <Flex w={"full"} gap={"3"}  >
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Price per unit</Text>
                            <Input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        updateProduct({ ...productdata, price: value })
                                    }
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                bgColor={mainBackgroundColor} h={"45px"} />
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Quantity</Text>
                            <Input bgColor={mainBackgroundColor}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        updateProduct({ ...productdata, quantity: value })
                                    }
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                h={"45px"}
                            />
                        </Flex>
                    </Flex>
                    {/* <CustomButton type='button' _disabled={{ opacity: "0.5", cursor: "not-allowed" }} disable={(!productdata?.name || !productdata?.description || (!productdata?.quantity || Number(productdata?.quantity) === 0) || (!productdata?.price || Number(productdata?.price) === 0)) ? true : false} onClick={() => push(`/dashboard/kisok/create?type=true${event ? "&event=" + event : ""}`)} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Continue"} /> */}
                    <Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                    <Text fontWeight={"500"} >Note:  You are responsible for your product  delivery</Text>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex p={"6"} w={"full"} rounded={"16px"} justifyContent={"space-between"} bgColor={mainBackgroundColor} alignItems={"center"} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                            <Flex flexDir={"column"} gap={"2"} alignItems={"start"} >
                                <Text fontWeight={"500"} >Mandatory product delivery Timeline</Text>
                                <Text fontSize={"14px"} >Within 3-5 Days inside lagos</Text>
                            </Flex>
                            <TruckIcon />
                        </Flex>
                    </Flex>
                    <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"3"} mt={"6"} >
                        <VendorTermAndCondition checked={checked} setChecked={setChecked} type="PRODUCT" />
                        <CustomButton isLoading={createProduct?.isLoading || loading} disable={!productdata?.name || !productdata?.description || (!productdata?.quantity || Number(productdata?.quantity) === 0) || (!productdata?.price || Number(productdata?.price) === 0) || createProduct?.isLoading || loading || !checked} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                    </Flex>
                </Flex>

                {/* <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={"24px"} fontWeight={"600"} >Share pictures of your place</Text>
                    <ProductImagePicker />
                    <Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                    <Text fontWeight={"500"} >Note:  You are responsible for your product  delivery</Text>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex p={"6"} w={"full"} rounded={"16px"} justifyContent={"space-between"} bgColor={mainBackgroundColor} alignItems={"center"} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                            <Flex flexDir={"column"} gap={"2"} alignItems={"start"} >
                                <Text fontWeight={"500"} >Mandatory product delivery Timeline</Text>
                                <Text fontSize={"14px"} >Within 3-5 Days inside lagos</Text>
                            </Flex>
                            <TruckIcon />
                        </Flex>
                    </Flex>
                    <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"3"} mt={"6"} >
                        <VendorTermAndCondition checked={checked} setChecked={setChecked} type="PRODUCT" />
                        <CustomButton isLoading={createProduct?.isLoading || loading} disable={!productdata?.name || !productdata?.description || (!productdata?.quantity || Number(productdata?.quantity) === 0) || (!productdata?.price || Number(productdata?.price) === 0) || createProduct?.isLoading || loading || !checked} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                    </Flex>
                </Flex> */}
            </form>

            <ModalLayout open={openProduct} close={clickHandler} bg={secondaryBackgroundColor} >
                <LoadingAnimation loading={loading} >
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{"Congratulations"}</Text>
                        <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Your product has been listed successfully`}</Text>

                        <CustomButton onClick={() => push(event ? `/dashboard/event/details/${event}` : "/dashboard/product/kiosk?type=mykiosk")} color={"#FFF"} text={'Done'} w={"full"} backgroundColor={"#3EC259"} />
                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </Flex>
    )
}
