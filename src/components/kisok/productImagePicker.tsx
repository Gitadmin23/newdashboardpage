import { Box, Flex, Image, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { GallaryIcon } from '../svg'
import useProductStore from '@/global-state/useCreateProduct';
import { IMAGE_URL } from '@/services/urls';
import { FiX } from 'react-icons/fi';
import useCustomTheme from '@/hooks/useTheme';
import { IoMdAdd } from 'react-icons/io';
import { convertAndCompressToPng } from '@/services/convertImage';

export default function ProductImagePicker() {
    const toast = useToast();
    const { primaryColor, borderColor, mainBackgroundColor, secondaryBackgroundColor } = useCustomTheme();

    const {
        image,
        updateImage,
        productdata,
        rentaldata,
        imagePreview,
        updateImagePreview,
        updateProduct,
        updateRental
    } = useProductStore((state) => state);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [progressMsg, setProgressMsg] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        updateImage([]);
    }, []);

    const handleButtonClick = () => {
        if (isCompressing) return;
        fileInputRef.current?.click();
    };

    const currentTotalImages =
        (productdata?.images?.length || 0) +
        (rentaldata?.images?.length || 0) +
        (imagePreview?.length || 0) +
        (image?.length || 0);

    const processFiles = async (fileList: FileList | File[]) => {
        const fileArray = Array.from(fileList);
        if (!fileArray.length) return;

        const remainingSlots = 5 - currentTotalImages;
        if (fileArray.length > remainingSlots) {
            toast({
                title: 'Error',
                description: `You can only upload up to 5 images (remaining slots: ${Math.max(0, remainingSlots)})`,
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsCompressing(true);
        const processedFiles: File[] = [];

        try {
            for (let i = 0; i < fileArray.length; i++) {
                const file = fileArray[i];
                setProgressMsg(`Processing image ${i + 1} of ${fileArray.length}...`);

                try {
                    const compressed = await convertAndCompressToPng(
                        file,
                        800,
                        1920,
                        1080,
                        0.85,
                        (msg) => setProgressMsg(`Image ${i + 1}/${fileArray.length}: ${msg}`)
                    );
                    processedFiles.push(compressed);
                } catch (err) {
                    console.error("Compression failed for file:", file.name, err);
                    // Fallback to original file
                    processedFiles.push(file);
                }
            }

            updateImage([...image, ...processedFiles]);
        } catch (error) {
            console.error("Error processing files:", error);
            toast({
                title: 'Upload Error',
                description: 'Failed to process some images. Please try again.',
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsCompressing(false);
            setProgressMsg("");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleImagePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (isCompressing) return;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

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
            const newItems = image.filter((_, ind) => ind !== index);
            updateImage(newItems);
        }
    };

    const hasImages =
        (image?.length > 0) ||
        (productdata?.images?.length > 0) ||
        (rentaldata?.images?.length > 0) ||
        (imagePreview?.length > 0);

    return (
        <Flex px={["0px", "0px", "10px"]} mt={"5"} w={"full"} flexDir={"column"} gap={"3"} display={['flex', 'flex']} >
            <input
                type="file"
                multiple={true}
                accept="image/*,.heic,.HEIC,.heif,.HEIF"
                onChange={handleImagePicked}
                ref={fileInputRef}
                style={{ display: 'none' }}
                disabled={isCompressing}
            />

            {!hasImages && (
                <Flex
                    onClick={handleButtonClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    cursor={isCompressing ? "progress" : "pointer"}
                    borderWidth={"1px"}
                    borderColor={isDragging ? primaryColor : borderColor}
                    rounded={"2xl"}
                    borderStyle={"dashed"}
                    py={"8"}
                    px={"4"}
                    textAlign={"center"}
                    gap={"3"}
                    flexDir={"column"}
                    w={"full"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    minH={"220px"}
                    transition="all 0.2s ease"
                    bg={isDragging ? secondaryBackgroundColor : undefined}
                >
                    {isCompressing ? (
                        <Flex flexDir={"column"} gap={"3"} alignItems={"center"} justifyContent={"center"}>
                            <Spinner size={"xl"} color={primaryColor} thickness="4px" />
                            <Text fontSize={"14px"} fontWeight={"semibold"}>{progressMsg || "Optimizing images..."}</Text>
                            <Text fontSize={"11px"} color={"gray.500"}>Converting & compressing images...</Text>
                        </Flex>
                    ) : (
                        <>
                            <GallaryIcon size='35px' />
                            <Flex flexDir={"column"} gap={"1"} maxW={"220px"} >
                                <Text fontSize={"13px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                                <Text fontSize={"9px"} color={"gray.500"}>You can add up to 5 pictures</Text>
                                <Text fontSize={"9px"} color={"gray.500"}>Supports JPG, PNG, WEBP, HEIC (iPhone)</Text>
                                <Text fontWeight={"bold"} textDecor={"underline"} color={primaryColor} fontSize={"11px"} mt={"1"}>Upload from your device</Text>
                            </Flex>
                        </>
                    )}
                </Flex>
            )}

            {hasImages && (
                <Flex
                    gap={"4"}
                    bgColor={mainBackgroundColor}
                    w={"full"}
                    flexDirection={"column"}
                    p={"6"}
                    borderWidth={"1px"}
                    borderStyle={"dashed"}
                    borderColor={isDragging ? primaryColor : borderColor}
                    rounded={"16px"}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Flex w={"full"} gap={"4"} overflowX={"auto"} alignItems={"center"} css={{
                        '&::-webkit-scrollbar': {
                            display: 'block'
                        }
                    }}>
                        {productdata?.images?.length > 0 && productdata?.images.map((item: any, index: number) => (
                            <Flex w='200px' height='200px' key={`prod-${index}`} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                                <Box onClick={() => removeFile(index, true)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="6px" right={"6px"}>
                                    <FiX color="white" size={"15px"} />
                                </Box>
                                <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                            </Flex>
                        ))}
                        {rentaldata?.images?.length > 0 && rentaldata?.images.map((item: any, index: number) => (
                            <Flex w='200px' height='200px' key={`rent-${index}`} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                                <Box onClick={() => removeFile(index, true)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="6px" right={"6px"}>
                                    <FiX color="white" size={"15px"} />
                                </Box>
                                <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                            </Flex>
                        ))}
                        {imagePreview?.length > 0 && imagePreview?.map((item: any, index: number) => (
                            <Flex w='200px' height='200px' key={`prev-${index}`} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                                <Box onClick={() => removeFile(index, true)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="6px" right={"6px"}>
                                    <FiX color="white" size={"15px"} />
                                </Box>
                                <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                            </Flex>
                        ))}
                        {image?.length > 0 && image.map((item: File, index: number) => (
                            <Flex w='200px' height='200px' key={`img-${index}`} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                                <Box onClick={() => removeFile(index)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="6px" right={"6px"}>
                                    <FiX color="white" size={"15px"} />
                                </Box>
                                <Image src={URL?.createObjectURL(item)} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                            </Flex>
                        ))}
                        {currentTotalImages < 5 && (
                            <Flex w={"fit-content"} flexShrink={0}>
                                <Flex
                                    onClick={handleButtonClick}
                                    cursor={isCompressing ? "progress" : "pointer"}
                                    pos={"relative"}
                                    bgColor={secondaryBackgroundColor}
                                    h={"200px"}
                                    w={"180px"}
                                    flexDir={"column"}
                                    gap={"2"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    rounded={"2xl"}
                                    borderWidth={"1px"}
                                    borderStyle={"dashed"}
                                    borderColor={borderColor}
                                    p={"3"}
                                    textAlign={"center"}
                                >
                                    {isCompressing ? (
                                        <>
                                            <Spinner size={"md"} color={primaryColor} thickness="3px" />
                                            <Text fontSize={"11px"} fontWeight={"medium"}>{progressMsg || "Optimizing..."}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <IoMdAdd size={"40px"} />
                                            <Text fontSize={"11px"} color={"gray.500"}>Add more</Text>
                                        </>
                                    )}
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
}
