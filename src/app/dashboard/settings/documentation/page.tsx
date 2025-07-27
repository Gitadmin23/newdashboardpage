"use client";

import { useDetails } from "@/global-state/useUserDetails";
import {
    Box,
    Button,
    Code,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Text,
    Textarea,
    useClipboard,
    useToast,
    VStack,
    IconButton,
    InputRightElement,
    InputGroup,
    HStack
} from "@chakra-ui/react";
import { FiInfo } from 'react-icons/fi'
import { Copy, ArrowLeft2 } from 'iconsax-react';
import React, { useState } from "react";
import useCustomTheme from "@/hooks/useTheme";
import { useRouter } from "next/navigation"


const TYPES = ["event", "product", "rental", "services", "fundraising"];

export default function DocumentationPage() {
    const [userId, setUserId] = useState("your-user-id-here");
    const [bgColor, setBgColor] = useState("");
    const [textColor, setTextColor] = useState("");
    const [cardColor, setCardColor] = useState("");
    const [brandColor, setBrandColor] = useState("");
    const [type, setType] = useState("event");

    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
    const toast = useToast();
    const details = useDetails();
    const { primaryColor, mainBackgroundColor } = useCustomTheme();
    const router = useRouter()


    React.useEffect(() => {
        setUserId(details?.userId);
    }, [details]);

    const iframeCode = `<iframe src="${baseUrl}/external/${type}/${userId}?bgColor=${bgColor}&textColor=${textColor}&cardColor=${cardColor}&brandColor=${brandColor}" width="100%" height="600" style="border:none;"></iframe>`;
    const { onCopy: copyUserId } = useClipboard(userId);
    const { onCopy: copyIframe } = useClipboard(iframeCode);

    const showToast = (msg: string) => {
        toast({
            title: msg,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Container maxW="4xl" py={10} overflowY={'auto'} pb='100px' backgroundColor={mainBackgroundColor}>
            <VStack spacing={8} align="stretch">
                <ArrowLeft2 size={'30'} onClick={() => router.back()} style={{ marginBottom: '20px', cursor: 'pointer' }} color="black" />
                <Box>
                    <Heading as="h1" size="xl" mb={2}>
                        Chasescroll Snapshot Guide
                    </Heading>
                    <Text color="gray.600">
                        allows you to embed your Chasescroll Events, Services, Rentals and Kiosk into your own webiste page without fully integrating or rewriting any code.
                    </Text>
                </Box>

                {/* User ID Input */}
                <FormControl>
                    <FormLabel>User ID</FormLabel>
                    <Box display="flex" gap={2}>
                        <InputGroup>
                            <InputRightElement paddingTop={'10px'} paddingRight={'20px'} >
                                <Copy size={"35px"} color={primaryColor} onClick={() => {
                                    copyUserId();
                                    showToast("User ID copied!");
                                }} />
                            </InputRightElement>
                            <Input
                                value={userId}
                                // onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your user ID"
                                disabled
                                borderColor={'#EAEBEDCC'}
                                borderWidth="1px"
                                borderRadius="16px"
                                backgroundColor="#FCFCFC"
                                height="57px"
                            />
                        </InputGroup>
                    </Box>
                </FormControl>

                <HStack width='100%' spacing={5}>
                    {/* Color Selectors */}
                    <FormControl>
                        <FormLabel>Background Color</FormLabel>
                        <Input
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            placeholder="Enter background color"
                            borderColor={'#EAEBEDCC'}
                            borderWidth="1px"
                            borderRadius="16px"
                            backgroundColor="#FCFCFC"
                            height="57px"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Text Color</FormLabel>
                        <Input
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            placeholder="Enter text color"
                            borderColor={'#EAEBEDCC'}
                            borderWidth="1px"
                            borderRadius="16px"
                            backgroundColor="#FCFCFC"
                            height="57px"
                        />
                    </FormControl>
                </HStack>

                <HStack width='100%' spacing={5}>
                    <FormControl>
                        <FormLabel>Card Color</FormLabel>
                        <Input
                            value={cardColor}
                            onChange={(e) => setCardColor(e.target.value)}
                            placeholder="Enter card color"
                            borderColor={'#EAEBEDCC'}
                            borderWidth="1px"
                            borderRadius="16px"
                            backgroundColor="#FCFCFC"
                            height="57px"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Brand Color</FormLabel>
                        <Input
                            value={brandColor}
                            onChange={(e) => setBrandColor(e.target.value)}
                            placeholder="Enter brand color"
                            borderColor={'#EAEBEDCC'}
                            borderWidth="1px"
                            borderRadius="16px"
                            backgroundColor="#FCFCFC"
                            height="57px"
                        />
                    </FormControl>
                </HStack>

                {/* Type Selector */}
                <FormControl>
                    <FormLabel>Select Type</FormLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Select type"
                        borderColor={'#EAEBEDCC'}
                        borderWidth="1px"
                        borderRadius="16px"
                        backgroundColor="#FCFCFC"
                        height="57px"
                    >
                        {TYPES.map((t) => (
                            <option key={t} value={t}>
                                {t.toUpperCase()}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                {/* Iframe Code */}
                <FormControl>
                    <FormLabel>Snapshot Code</FormLabel>
                    <Textarea
                        readOnly
                        value={iframeCode}
                        fontFamily="mono"
                        fontSize="md"
                        rows={4}
                        color="#ACACB0"
                        borderColor={'#EAEBEDCC'}
                        borderWidth="1px"
                        borderRadius="16px"
                        backgroundColor="#FCFCFC"
                        height="100px"
                    />
                    <Flex alignItems={'çenter'} mt="10px">
                        <Button
                            mt={2}
                            backgroundColor={primaryColor}
                            color="white"
                            onClick={() => {
                                copyIframe();
                                showToast("Iframe code copied!");
                            }}
                            height="44px"
                            borderRadius="32px"
                        >
                            Copy Snapshot code
                        </Button>
                        <Box ml='10px' mt='10px'>
                            <IconButton
                                aria-label="Info"
                                icon={<FiInfo size="25px" />}
                                onClick={() =>
                                    toast({
                                        title: "Snapshot Information",
                                        description: "Copy this code and paste it into your website's HTML to embed your Chasescroll content. You can customize the colors to match your website's theme.",
                                        status: "info",
                                        duration: 50000,
                                        isClosable: true,
                                        position: "top"
                                    })
                                }
                            />
                        </Box>
                    </Flex>
                </FormControl>

                {/* Preview */}
                <Box>
                    <FormLabel>Preview</FormLabel>
                    <Box border="1px solid" borderColor="gray.200" borderRadius="16px" overflow="hidden" position={'relative'}>
                        <Box position="absolute" width='100%' height="100%" backgroundColor="transparent"></Box>
                        <iframe
                            src={`${baseUrl}/external/${type}/${userId}?bgColor=${bgColor}&textColor=${textColor}&cardColor=${cardColor}&brandColor=${brandColor}`}
                            width="100%"
                            height="400"
                            style={{ border: "none" }}
                        />
                    </Box>
                </Box>

                <Text fontSize="sm" color="gray.500" mt={4}>
                    Need help? Contact our support at{" "}
                    <Code colorScheme="purple">support@chasescroll.com</Code>
                </Text>
            </VStack>
        </Container>
    );
}
