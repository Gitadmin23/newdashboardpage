"use client"
import CustomButton from '@/components/general/Button'
import ColorSelector from '@/components/kisok/productCustoms/colorSelector'
import SizeSelector from '@/components/kisok/productCustoms/sizeSelector'
import ProductImagePicker from '@/components/kisok/productImagePicker'
import ProductMap from '@/components/kisok/productMap'
import SelectCategories from '@/components/kisok/selectCategories'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { SuccessIcon, TruckIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
import useProduct from '@/hooks/useProduct'
import useCustomTheme from '@/hooks/useTheme'
import httpService from '@/utils/httpService'
import { Flex, Input, Switch, Text } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState, use } from 'react';
import { IoArrowBack } from 'react-icons/io5'
import { useQuery } from 'react-query'

type Props = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function KisokCreate(props: Props) {
    const params = use(props.params);


    const id = params.slug
    const { primaryColor, secondaryBackgroundColor, headerTextColor, bodyTextColor, mainBackgroundColor } = useCustomTheme()
    const { push, back } = useRouter()
    const query = useSearchParams(); 
    const type = query?.get('type');
    const { productdata, updateProduct } = useProductStore((state) => state);

    const { handleEditSubmitProduce, editProduct, loading, openProduct, setOpenProduct, } = useProduct({
        payload: {
            "name": productdata?.name,
            "description": productdata?.description,
            "images": productdata?.images,
            "price": productdata?.price,
            "quantity": productdata?.quantity,
            "category": productdata?.category,
            "location": productdata?.location, 
            color: productdata?.color,
            size: productdata?.size,
        }, id: id
    }, false, true)

    const { isLoading } = useQuery(
        ["products", id],
        () => httpService.get(`/products/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            updateProduct({
                ...productdata,
                name: productdata?.name ? productdata?.name : data?.data?.content[0]?.name,
                description: productdata?.description ? productdata?.description : data?.data?.content[0]?.description,
                images: productdata?.images?.length > 0 ? productdata?.images : data?.data?.content[0]?.images,
                price: productdata?.price ? productdata?.price : data?.data?.content[0]?.price,
                category: productdata?.category ? productdata?.category : data?.data?.content[0]?.category,
                location: productdata?.location ? productdata?.location : data?.data?.content[0]?.location as any,
                quantity: productdata?.quantity ? productdata?.quantity : data?.data?.content[0]?.quantity,
                color: productdata?.color?.length ? productdata?.color : data?.data?.content[0]?.color,
                size: productdata?.size?.length ? productdata?.size : data?.data?.content[0]?.size,
            })
        },
        enabled: productdata?.name ? false : true
    });


    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
                <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                    <Flex w={!type ? "50%" : "100%"} bgColor={primaryColor} rounded={"6px"} />
                </Flex>
                <Flex onClick={() => back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} position={"absolute"} top={"4"} zIndex={"30"} left={"4"}  >
                    <IoArrowBack size={"20px"} />
                </Flex>

                <form style={{ maxWidth: "550px", width: "100%", display: "flex" }} onSubmit={handleEditSubmitProduce}>
                    <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                        <Text fontSize={["16px", "16px", "24px"]} fontWeight={"600"} >Give your product a name</Text>
                        <Input rounded={"full"} bgColor={mainBackgroundColor} value={productdata?.name} onChange={(e) => updateProduct({ ...productdata, name: e.target.value })} h={"60px"} />
                        <Text fontSize={"24px"} fontWeight={"500"} >Describe your place to make it stand out</Text>
                        <Input rounded={"full"} bgColor={mainBackgroundColor} value={productdata?.description} onChange={(e) => updateProduct({ ...productdata, description: e.target.value })} h={"60px"} />
                        <Text fontSize={"24px"} fontWeight={"500"} >Set your pricing </Text>

                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Quantity</Text>
                            <Input bgColor={mainBackgroundColor} value={productdata?.quantity}
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
                                h={"60px"} />
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Location</Text>
                            {/* <Input h={"60px"} /> */}
                            <ProductMap location={productdata?.location} />
                        </Flex>
                        <SelectCategories rental={false} />
                        <ColorSelector />
                        <SizeSelector />
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Price per unit</Text>
                            <Input bgColor={mainBackgroundColor} value={productdata?.price}
                                type="number"
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
                                h={"60px"} />
                        </Flex> 
                        <CustomButton type='button' _disabled={{ opacity: "0.5", cursor: "not-allowed" }} disable={(!productdata?.name || !productdata?.description || !productdata?.quantity || !productdata?.price) ? true : false} onClick={() => push(`/dashboard/kisok/edit/${id}?type=true`)} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Continue"} />
                    </Flex>

                    <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                        <Text fontSize={["16px", "16px", "24px"]} fontWeight={"600"} >Share pictures of your place</Text>
                        <ProductImagePicker /><Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                        <Text fontWeight={"500"} >Note: You are responsible for your product  delivery</Text>
                        <Flex w={"full"} flexDir={"column"} gap={"3"} >
                            <Flex p={"6"} w={"full"} rounded={"16px"} justifyContent={"space-between"} bgColor={mainBackgroundColor} alignItems={"center"} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                <Flex flexDir={"column"} gap={"2"} alignItems={"start"} >
                                    <Text fontWeight={"500"} >Mandatory product delivery Timeline</Text>
                                    <Text fontSize={"14px"} >Within 3-5 Days inside lagos</Text>
                                </Flex>
                                <TruckIcon />
                            </Flex>
                        </Flex>
                        <CustomButton isLoading={editProduct?.isLoading || loading} disable={editProduct?.isLoading || loading} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                    </Flex>
                </form>

                <ModalLayout open={openProduct} close={setOpenProduct} bg={secondaryBackgroundColor} closeIcon={true} >
                    <LoadingAnimation loading={loading} >
                        <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                            <SuccessIcon />
                            <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{"Congratulations"}</Text>
                            <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Your product has been listed on chasescroll kiosk pending approval`}</Text>

                            <CustomButton onClick={() => push("/dashboard/kisok")} color={"#FFF"} text={'Done'} w={"full"} backgroundColor={"#3EC259"} />
                        </Flex>
                    </LoadingAnimation>
                </ModalLayout>
            </Flex>
        </LoadingAnimation>
    )
}
