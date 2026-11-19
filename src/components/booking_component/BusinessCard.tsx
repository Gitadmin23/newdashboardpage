import React from "react";
import useCustomTheme from "@/hooks/useTheme";
import { IService } from "@/models/Service";
import { IMAGE_URL, LANDINGPAGE_URL } from "@/services/urls";
import { Box, Flex, HStack, Image, Skeleton, Text, useToast } from "@chakra-ui/react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Star1 } from "iconsax-react";
import { FiArrowLeft, FiArrowRight, FiMapPin, FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { formatNumber } from "@/utils/numberFormat";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import DeleteEvent from "../sharedComponent/delete_event";
import { useDetails } from "@/global-state/useUserDetails";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import ShareEvent from "../sharedComponent/share_event";
import { textLimit } from "@/utils/textlimit";

function BusinessCard({
    business,
    mybusiness,
    isSelect,
    selected,
    setSelected,
}: {
    business: IService;
    mybusiness?: boolean;
    isSelect?: boolean;
    selected?: any;
    setSelected?: any;
}) {
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    const { userId } = useDetails((state) => state);
    const param = useParams();
    const query = useSearchParams();
    const frame = query?.get("frame");

    const router = useRouter();

    React.useEffect(() => {
        if (business?.images?.length > 1) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => {
                    if (prev === business?.images.length - 1) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [business?.images]);

    const { primaryColor, mainBackgroundColor, borderColor } = useCustomTheme();

    const clickHandler = () => {
        if (frame) {
            window.parent.location.href = `${LANDINGPAGE_URL}/auth`;
        } else if (isSelect) {
            let clone = [...selected];

            if (selected?.includes(business?.id)) {
                clone = clone?.filter((item: string) => item !== business?.id);
                setSelected(clone);
            } else {
                clone = [...clone, business?.id];
                setSelected(clone);
            }
        } else {
            if (mybusiness && business?.vendor?.userId === userId) {
                router.push(`/dashboard/kisok/service/${business?.id}/edit`);
            } else {
                router.push(`/dashboard/kisok/service/${business?.id}`);
            }
        }
    };

    const getImageUrl = (img?: string) => {
        if (!img) return "";
        if (img.startsWith("http://") || img.startsWith("https://")) return img;
        return (IMAGE_URL as string) + img;
    };

    const currentImage =
        business?.images && business.images.length > 0
            ? getImageUrl(business.images[activeImageIndex])
            : "";

    const businessName =
        business?.name ||
        (business?.vendor?.firstName
            ? `${business.vendor.firstName} ${business.vendor.lastName || ""}`
            : "Service Provider");

    const categoryTitle =
        business?.category?.replaceAll("_", " ") || "Professional Service";

    const serviceSubtitle =
        business?.location.locationDetails

    return (
        <Flex
            cursor="pointer"
            flexDir="column"
            borderColor={borderColor || "#EAECF0"}
            pos="relative"
            onClick={clickHandler}
            borderWidth="1px"
            bgColor={mainBackgroundColor || "white"}
            rounded="24px"
            w="full"
            overflow="hidden"
            shadow="sm"
            transition="all 0.2s ease"
            _hover={{
                shadow: "md",
                transform: "translateY(-2px)",
            }}
        >
            {/* Selection Checkmark */}
            {isSelect && (
                <Flex
                    pos="absolute"
                    zIndex="30"
                    top="3"
                    left="3"
                    w="6"
                    h="6"
                    justifyContent="center"
                    alignItems="center"
                    bgColor={
                        selected?.includes(business?.id)
                            ? primaryColor || "#5465FF"
                            : "white"
                    }
                    rounded="md"
                    shadow="md"
                >
                    <IoMdCheckmark
                        size="16px"
                        color={selected?.includes(business?.id) ? "white" : "#718096"}
                    />
                </Flex>
            )}

            {/* Top-right actions (Delete for owner & Share options button) */}
            <Flex
                pos="absolute"
                top="3"
                right="3"
                zIndex="20"
                alignItems="center"
                gap="2"
                onClick={(e) => e.stopPropagation()}
            >
                {!isSelect && business?.vendor?.userId === userId && (
                    <DeleteEvent
                        id={business?.id}
                        isServices={true}
                        name={business?.name + " Services"}
                        isOrganizer={mybusiness ? true : false}
                    />
                )}
                {!frame && (
                    <Box
                        bg="blackAlpha.600"
                        backdropFilter="blur(4px)"
                        px="2.5"
                        py="1.5"
                        rounded="full"
                        cursor="pointer"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: "blackAlpha.800" }}
                        transition="all 0.2s"
                    >
                        <ShareEvent
                            newbtn={true}
                            showText={false}
                            data={business}
                            name={business?.name}
                            id={business?.id}
                            type="SERVICE"
                            eventName={textLimit(business?.name + "", 17)}
                            color="white"
                        />
                    </Box>
                )}
            </Flex>

            {/* Top Media Section with Banner and Overlay */}
            <Box w="full" h={["200px", "220px", "230px"]} pos="relative" overflow="hidden">
                {currentImage ? (
                    <Image
                        src={currentImage}
                        alt={businessName}
                        w="full"
                        h="full"
                        objectFit="cover"
                        fallback={<Skeleton w="full" h="full" startColor="gray.200" endColor="gray.400" />}
                    />
                ) : (
                    <Skeleton w="full" h="full" startColor="gray.200" endColor="gray.400" />
                )}

                {/* Multiple image indicator dots */}
                {business?.images?.length > 1 && (
                    <HStack
                        pos="absolute"
                        top="3"
                        left={isSelect ? "12" : "3"}
                        zIndex="10"
                        spacing="1"
                    >
                        {business.images.map((_, idx) => (
                            <Box
                                key={idx}
                                w={activeImageIndex === idx ? "12px" : "5px"}
                                h="5px"
                                rounded="full"
                                bg={activeImageIndex === idx ? "white" : "whiteAlpha.600"}
                                transition="all 0.2s"
                            />
                        ))}
                    </HStack>
                )}

                {/* Dark Gradient Overlay for readability */}
                <Box
                    pos="absolute"
                    inset="0"
                    bgGradient="linear(to-t, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0) 75%)"
                />

                {/* Badge and Titles inside image bottom-left */}
                <Flex
                    pos="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p="4"
                    flexDir="column"
                    alignItems="flex-start"
                    zIndex="10"
                >
                    {/* Category pill */}
                    <Box
                        bg="#5465FF"
                        color="white"
                        px="3.5"
                        py="1"
                        rounded="full"
                        fontSize="12px"
                        fontWeight="600"
                        lineHeight="1.2"
                        mb="2"
                    >
                        {capitalizeFLetter(categoryTitle)}
                    </Box>

                    {/* Main title */}
                    <Text
                        color="white"
                        fontSize={["18px", "20px"]}
                        fontWeight="700"
                        lineHeight="1.2"
                        noOfLines={1}
                        textAlign="left"
                    >
                        {capitalizeFLetter(businessName)}
                    </Text>

                    {/* Subtitle */}
                    <Flex gap={"1"} alignItems={"center"} mt="1" justifyContent={"center"} h={"5"} >
                        <Box w={"fit-content"} >
                            <FiMapPin color="white" size={"15"} />
                        </Box>
                        <Text
                            color="white"
                            fontSize="13px"
                            fontWeight="400"
                            mt="1"
                            noOfLines={1}
                            mb="1"
                            textAlign="left"
                        >
                            {capitalizeFLetter(serviceSubtitle)}
                        </Text>
                    </Flex>
                </Flex>
            </Box>

            {/* Bottom Card Content */}
            <Flex flexDir="column" p="4" gap="3.5">
                {/* Rating and Price row */}
                <Flex w="full" justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" gap="1.5">
                        <Star1 size={18} color="#EAA023" variant="Bold" />
                        <Text fontWeight="700" fontSize="15px" color="gray.900">
                            {business?.rating ? Number(business.rating).toFixed(1) : "4.9"}
                        </Text>
                        <Text fontWeight="400" fontSize="14px" color="gray.500">
                            ({business?.totalBooking ? `${business.totalBooking} reviews` : "128 reviews"})
                        </Text>
                    </Flex>

                    <Text fontWeight="600" fontSize="14px" color="#5465FF">
                        <span style={{ fontSize: "12px" }}>Starting rate - </span> {business?.price ? formatNumberWithK(business?.price) : "₦85"}
                        {!business?.hasFixedPrice && "/hr"}
                    </Text>
                </Flex>

                {/* Description row */}
                <Text
                    fontSize="14px"
                    color="#667085"
                    fontWeight="400"
                    lineHeight="1.5"
                    noOfLines={2}
                    minH="42px"
                    textAlign="left"
                >
                    {business?.description ||
                        "Professional chef services for everyday meals and special occasions."}
                </Text>

                {/* "See other providers +" button */}
                <Flex
                    as="button"
                    w="full"
                    h="44px"
                    px="5"
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor={borderColor || "#D0D5DD"}
                    alignItems="center"
                    justifyContent="space-between"
                    color={primaryColor || "#5465FF"}
                    _hover={{
                        borderColor: primaryColor || "#5465FF",
                        bg: "blue.50",
                    }}
                    transition="all 0.2s"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        clickHandler();
                    }}
                >
                    <Text fontSize="14px" fontWeight="500">
                        {mybusiness && business?.vendor?.userId === userId
                            ? "Edit Service"
                            : "See Service Detail"}
                    </Text>
                    <FiArrowRight size={18} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default BusinessCard;
