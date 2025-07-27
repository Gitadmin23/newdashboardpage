import { PictureIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState';
import { IMAGE_URL } from '@/services/urls';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function SelectImage(props: Props) {
    const { } = props

    const { eventdata, updateImage, image } = useEventStore((state) => state);
    const [selectedImageFile, setSelectedImageFile] = React.useState('');

    const toast = useToast()

    const handleImageChange = (e: any) => {

        const selected = e.target.files[0];
        

        console.log(selected.type);

        
        const TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/svg+xml"];
        // if(selected?.size > 800000) {

        //     toast({
        //         title: 'Error',
        //         description: 'Image size should be less than 800KB',
        //         status: 'error',
        //         isClosable: true,
        //         duration: 5000,
        //         position: 'top-right',
        //     });
        // } else {
            if (selected && TYPES.includes(selected.type)) {
                updateImage(selected)
                // handleFileChange(e)
                const reader: any = new FileReader();
                reader.onloadend = () => {
                    setSelectedImageFile(reader.result)
                }
                reader.readAsDataURL(selected)
            } else {
                console.log('Error')
            }
        // }
    } 

    return (
        <Flex width={"full"} flexDirection={"column"} gap={"4"} alignItems={"center"} >
            <Flex as={"button"} width={["full", "361px"]} height={"228px"} border={"1px dashed #D0D4EB"} roundedBottom={"32px"} roundedTopLeft={"32px"} justifyContent={"center"} alignItems={"center"} >
                {(!selectedImageFile && !eventdata?.currentPicUrl) && (
                    <label role='button' style={{ width: "100%", display: "grid", height: "100%", placeItems: "center", gap: "16px" }} >
                        <Box width={"full"} >
                            <Text fontSize={"sm"} >Click to upload image</Text>
                            <Flex justifyContent={"center"} mt={"3"} gap={"2"} >
                                <PictureIcon />
                            </Flex>
                        </Box>
                        <input
                            type="file"
                            id="image"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </label>
                )}
                {(selectedImageFile || eventdata?.currentPicUrl) && (
                    <label role='button' style={{ width: "100%", display: "grid", height: "228px", placeItems: "center", gap: "16px" }} >
                        <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit="cover" alt={"eventimage"} width={"full"} height={"228px"} src={selectedImageFile ? selectedImageFile : IMAGE_URL + eventdata?.currentPicUrl} />
                        <input
                            type="file"
                            id="image"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </label>
                )}
            </Flex>
            <Flex fontSize={"xs"} textAlign={"center"} color={"brand.chasescrollGray"} justifyContent={"space-between"} width={"full"} >
                <Box>
                    <Text>Image size:</Text>
                    <Text>2160 x 1080px</Text>
                </Box>
                <Box>
                    <Text>Max. file size:</Text>
                    <Text>800KB</Text>
                </Box>
                <Box>
                    <Text>Image type:</Text>
                    <Text>JPEG/PNG</Text>
                </Box>
            </Flex> 
        </Flex>
    )
}

export default SelectImage
