import useCustomTheme from '@/hooks/useTheme'
import { Flex, Select, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import { Rating } from 'react-simple-star-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import CustomButton from '../general/Button'
import useProduct from '@/hooks/useProduct'
import { IProduct } from '@/models/product'
import { useQueryClient } from 'react-query'
import { useSearchParams } from 'next/navigation'

export default function ReviewData({item, reviewType}: {item: string, reviewType: string}) {

    const { primaryColor } = useCustomTheme()
    const toast = useToast()
    const [open, setOpen] = useState(false)  
    const query = useSearchParams();
    const type = query?.get('type');

    const { createReview, reviewPayload, setReviewPayload } = useProduct()

    useEffect(()=> {
        setReviewPayload({...reviewPayload, typeId: item})
    }, [])

    const clickHandler = () => {
        if(!reviewPayload?.description || !reviewPayload?.rating) { 
            toast({
                title: "error",
                description: "Please fill all fields.",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        } else {
            createReview.mutate({...reviewPayload, typeId: item, reviewType: reviewType})
        }
    }

    useEffect(()=> {
        if(createReview?.isSuccess) {
            setOpen(false)
        }
    }, [createReview?.isSuccess])

    useEffect(()=> {
        if(type) {
            setOpen(true)
        }
    }, [])

    return (
        <div>
            <Text role='button' onClick={() => setOpen(true)} textDecor={"underline"} color={primaryColor} w={"120px"} fontSize={"14px"} fontWeight={"500"} >Leave a review</Text>
            <ModalLayout open={open} close={setOpen} closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} p={"4"} >
                    <Flex borderBottomWidth={"1px"} pb={"1"} w={"full"} >
                        <Text>{`Chasescroll's customer review`}</Text>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"4"} > 
                        <Flex flexDir={"column"} w={"full"} gap={"1"} pt={"3"} >
                            <Text fontSize={"14px"} >{`Share your experience`}</Text>
                            <Textarea onChange={(e)=> setReviewPayload({...reviewPayload, description: e.target.value})} placeholder='Tell us about your product' />
                        </Flex>
                        <Flex w={"full"} alignItems={"center"} flexDir={"column"} >
                            <Text fontSize={"14px"} >Star ratings (support)</Text>
                            <Flex flexDir={"row"} gap={"3"} >
                                {[1, 2, 3, 4, 5]?.map((item) => {
                                    return (
                                        <Flex role='button' onClick={()=> setReviewPayload({...reviewPayload, rating: item})} key={item} >
                                            {(item > reviewPayload?.rating) ? (
                                                <FaRegStar size={"30px"} />
                                            ):(
                                                <FaStar color='#FBBD08' size={"30px"} />
                                            )} 
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        </Flex>
                        <CustomButton isLoading={createReview?.isLoading} mt={"4"} onClick={clickHandler} text={"Submit"} fontSize={"sm"} borderRadius={"999px"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </div>
    )
}
