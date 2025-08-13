import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { GallaryIcon } from '../svg'
import { IoArrowBack, IoClose } from 'react-icons/io5';
import useProductStore from '@/global-state/useCreateProduct';
import { IMAGE_URL } from '@/services/urls';
import { Add } from 'iconsax-react';
import { FiX } from 'react-icons/fi';
import useCustomTheme from '@/hooks/useTheme';
import { IoMdAdd } from 'react-icons/io';

export default function ProductImagePicker() {

    const toast = useToast()
    // const [fileData, setFileData] = useState<Array<any>>([])

    const { primaryColor, borderColor, mainBackgroundColor, secondaryBackgroundColor } = useCustomTheme()

    const { image, updateImage, productdata, rentaldata, imagePreview, updateImagePreview, updateProduct, updateRental } = useProductStore((state) => state);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        updateImage([]);
    }, [])

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImagePicked = (e: React.ChangeEvent<HTMLInputElement>) => {

        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files);

            let dataLength = fileArray?.length + image?.length

            if (dataLength > 5) {
                toast({
                    title: 'Error',
                    description: 'you can only upload 5 images',
                    position: 'top-right',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                // setFileData([...arr, ...filename])
                updateImage([...image, ...fileArray]);
            }

        }

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
            // const newItems = [...image]
            // newItems.splice(index, 1);
            // updateImage(newItems);

            const newItems = image.filter((_, ind) => ind !== index)
            updateImage(newItems);;
            // setFileData(newItems)
        }
    }


    return (
        <Flex px={["0px", "0px", "10px"]} mt={"5"} w={"full"} flexDir={"column"} gap={"3"} display={['flex', 'flex']} >
            <input
                type="file"
                multiple={true}
                accept="image/*"
                onChange={handleImagePicked}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
            {(image?.length === 0 && productdata?.images.length === 0 && rentaldata?.images.length === 0 && imagePreview?.length === 0) && (
                <Flex onClick={handleButtonClick} cursor={"pointer"} borderWidth={"1px"} borderColor={borderColor} rounded={"2xl"} borderStyle={"dashed"} py={"8"} textAlign={"center"} gap={"3"} flexDir={"column"} w={"full"} justifyContent={"center"} alignItems={"center"} h={"full"} >
                    <GallaryIcon size='35px' />
                    <Flex flexDir={"column"} gap={"1"} maxW={"176px"} >
                        <Text fontSize={"13px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                        <Text fontSize={"8px"} >You can add up to 6 picture</Text>
                        <Text fontSize={"8px"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 2 MB </Text>
                        <Text fontWeight={"bold"} textDecor={"underline"} color={primaryColor} fontSize={"10px"} >Upload from your device</Text>
                    </Flex>
                </Flex>
            )}
            {(image?.length > 0 || productdata?.images.length > 0 || rentaldata?.images.length > 0 || imagePreview?.length > 0) && (
                <Flex gap={"4"} bgColor={mainBackgroundColor} w={"full"} flexDirection={"column"} p={"8"} borderWidth={"1px"} borderStyle={"dashed"} borderColor={borderColor} rounded={"16px"} >
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
                            <Flex w={"fit-content"} >
                                <Flex onClick={handleButtonClick} cursor={"pointer"} pos={"relative"} bgColor={secondaryBackgroundColor} h={"full"} w={"180px"} justifyContent={"center"} alignItems={"center"} rounded={"2xl"} >
                                    <IoMdAdd size={"50px"} />
                                </Flex>
                            </Flex>
                        )}

                    </Flex>

                </Flex>
            )}
        </Flex>

    )
}
