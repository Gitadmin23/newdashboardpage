import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GallaryIcon } from '../svg'
import { IoArrowBack, IoClose } from 'react-icons/io5';
import useProductStore from '@/global-state/useCreateProduct';
import { IMAGE_URL } from '@/services/urls';
import { Add } from 'iconsax-react';
import { FiX } from 'react-icons/fi';
import useCustomTheme from '@/hooks/useTheme';

export default function ProductImagePicker() {

    const toast = useToast()
    const [fileData, setFileData] = useState<Array<any>>([])

    const { primaryColor, borderColor, mainBackgroundColor } = useCustomTheme()

    const { image, updateImage, productdata, rentaldata, imagePreview, updateImagePreview, updateProduct, updateRental } = useProductStore((state) => state);

    const inputRef: any = React.useRef(null);

    useEffect(() => {
        updateImage([]);
    }, [])

    const handleImagePicked = (Files: any) => {
        if ((fileData?.length + Files?.length) > 5) {
            toast({
                title: 'Error',
                description: 'you can only upload 5 images',
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        const file = Files[0];
        // if (file.size > 800000) {
        //     toast({
        //         title: 'Error',
        //         description: 'File size too large',
        //         position: 'top-right',
        //         status: 'error',
        //         duration: 5000,
        //         isClosable: true,
        //     });
        //     return;
        // }
        const filename = [...Files];
        const arr = [...fileData];

        setFileData([...arr, ...filename])
        updateImage([...arr, ...filename]);

    }

    const removeFile = (index: number, other?: boolean) => {
        if (other) {
            if (productdata?.images?.length > 0) {
                updateProduct({ ...productdata, images: productdata?.images.filter((_: any, i: any) => i !== index) });
            }
            if (rentaldata?.images?.length > 0) {
                updateRental({ ...rentaldata, images: rentaldata?.images.filter((_: any, i: any) => i !== index) });
            }
            if (imagePreview?.length > 0) {
                updateImagePreview(imagePreview.filter((_: any, i: any) => i !== index));
            }
        } else {
            const newItems = [...image]
            newItems.splice(index, 1);
            updateImage(newItems);
            setFileData(newItems)
        }
    }


    return (
        <Flex px={["0px", "0px", "10px"]} mt={"5"} w={"full"} flexDir={"column"} gap={"3"} display={['flex', 'flex']} >
            <Flex gap={"4"} bgColor={mainBackgroundColor} w={"full"} flexDirection={"column"} p={"8"} borderWidth={"1.03px"} borderColor={borderColor} rounded={"16px"} >
                <Flex w={"full"} gap={"4"} overflowX={"auto"} css={{
                    '&::-webkit-scrollbar': {
                        display: 'block'
                    }
                }}>
                    {productdata?.images.length > 0 && productdata?.images.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index, true)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {rentaldata?.images.length > 0 && rentaldata?.images.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index, true)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {imagePreview?.length > 0 && imagePreview?.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index, true)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {image.length > 0 && image.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={URL?.createObjectURL(item)} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {(productdata?.images.length + rentaldata?.images.length + imagePreview?.length + image?.length) < 5 && (
                        <label style={{ height: "200px" }} >
                            <Flex cursor='pointer' w={"200px"} h={"200px"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0}>
                                <input hidden type='file' accept="image/*" multiple onChange={(e) => handleImagePicked(e.target.files as FileList)} />
                                {/* <GallaryIcon /> */}
                                <Add size={30} variant='Outline' color={primaryColor} />
                                <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >{`File Format: JPG, JPEG, PNG and picture shouldn't be more than 10 MB`}</Text>
                                <Text fontSize={"12px"} textDecoration={"underline"} textAlign={"center"} mt={"2"} >Upload the Maximum of 5 images from your device</Text>
                            </Flex>
                        </label>
                    )}

                </Flex>

            </Flex>
        </Flex>

    )
}
