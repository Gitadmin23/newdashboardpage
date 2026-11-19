"use client";
import React from "react";
import { Grid, Flex, Text, Image, Box, HStack } from "@chakra-ui/react";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { Star1 } from "iconsax-react";
import useCustomTheme from "@/hooks/useTheme";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LoadingAnimation from "../sharedComponent/loading_animation";
import { IProduct } from "@/models/product";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import InfiniteScrollerComponent from "@/hooks/infiniteScrollerComponent";
import { textLimit } from "@/utils/textlimit";
import { IMAGE_URL, SHARE_URL } from "@/services/urls";
import useProductStore from "@/global-state/useCreateProduct";
import { cleanup } from "@/utils/cleanupObj";
import DeleteEvent from "../sharedComponent/delete_event";
import ShareEvent from "../sharedComponent/share_event";

interface ProductCardProps {
    item: IProduct;
    myproduct?: boolean;
    userId: string;
    primaryColor?: string;
    borderColor?: string;
    mainBackgroundColor?: string;
    clickHandler: (item: IProduct) => void;
    isLast?: boolean;
    lastRef?: any;
    frame?: string | null;
}

function ProductCard({
    item,
    myproduct,
    userId,
    primaryColor,
    borderColor,
    mainBackgroundColor,
    clickHandler,
    isLast,
    lastRef,
    frame,
}: ProductCardProps) {
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    React.useEffect(() => {
        if (item?.images?.length > 1) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => {
                    if (prev === item?.images.length - 1) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [item?.images]);

    const getImageUrl = (img: string) => {
        if (img.startsWith("http://") || img.startsWith("https://")) return img;
        return (IMAGE_URL as string) + img;
    };

    const currentImage =
        item?.images && item.images.length > 0
            ? getImageUrl(item.images[activeImageIndex])
            : "/assets/createimg.jpeg";

    const isOwner = item?.createdBy?.userId === userId;
    const categoryTitle =
        item?.category?.replaceAll("_", " ") || "Venue selection and booking";
    const locationText =
        item?.location?.locationDetails ||
        item?.location?.address ||
        item?.location?.city ||
        item?.location?.state ||
        "Location on request";

    const startingRate = item?.price
        ? formatNumberWithK(item.price, true)
        : "50K";

    return (
        <Flex
            ref={isLast ? lastRef : undefined}
            cursor="pointer"
            flexDir="column"
            borderColor={borderColor || "#EAECF0"}
            pos="relative"
            onClick={() => clickHandler(item)}
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
            {/* Top Media Area with Banner, Overlay and Badges */}
            <Box w="full" h={["200px", "220px", "230px"]} pos="relative" overflow="hidden">
                <Image
                    src={currentImage}
                    alt={item?.name || "Product Image"}
                    w="full"
                    h="full"
                    objectFit="cover"
                    fallbackSrc="/assets/createimg.jpeg"
                />

                {/* Multiple image indicator dots */}
                {item?.images?.length > 1 && (
                    <HStack pos="absolute" top="3" left="3" zIndex="10" spacing="1">
                        {item.images.map((_, idx) => (
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

                {/* Top-right actions (Delete for owner & Share options pill) */}
                <Flex
                    pos="absolute"
                    top="3"
                    right="3"
                    zIndex="20"
                    alignItems="center"
                    gap="2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {isOwner && (
                        <DeleteEvent
                            id={item?.id}
                            isProduct={true}
                            name={item?.name + " Product"}
                            isOrganizer={myproduct ? true : false}
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
                                data={item}
                                name={item?.name}
                                id={item?.id}
                                type="KIOSK"
                                eventName={textLimit(item?.name + "", 17)}
                                color="white"
                            />
                        </Box>
                    )}
                </Flex>

                {/* Dark Gradient Overlay */}
                <Box
                    pos="absolute"
                    inset="0"
                    bgGradient="linear(to-t, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0) 75%)"
                />

                {/* Bottom-left overlay on image */}
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
                        {capitalizeFLetter(item?.name || "Product Name")}
                    </Text>

                    {/* Location row with Pin icon */}
                    <Flex alignItems="center" gap="1.5" mt="1.5" w="full">
                        <FiMapPin size="14px" color="white" />
                        <Text
                            color="whiteAlpha.900"
                            fontSize="13px"
                            fontWeight="400"
                            noOfLines={1}
                            textAlign="left"
                        >
                            {locationText}
                        </Text>
                    </Flex>
                </Flex>
            </Box>

            {/* Bottom Card Content */}
            <Flex flexDir="column" p="4" gap="3.5">
                {/* Rating and Starting rate row */}
                <Flex w="full" justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" gap="1.5">
                        <Star1 size={18} color="#EAA023" variant="Bold" />
                        <Text fontWeight="700" fontSize="15px" color="gray.900">
                            {item?.rating ? Number(item.rating).toFixed(1) : "5.0"}
                        </Text>
                        <Text fontWeight="400" fontSize="14px" color="gray.500">
                            ({(item as any)?.reviewsCount || (item as any)?.totalBooking || 6} reviews)
                        </Text>
                    </Flex>

                    <Text fontWeight="600" fontSize="15px" color="#5465FF">
                        {startingRate}
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
                    {item?.description ||
                        "High quality service tailored for everyday needs and special occasions."}
                </Text>

                {/* "See service detail →" button */}
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
                        clickHandler(item);
                    }}
                >
                    <Text fontSize="14px" fontWeight="500">
                        {myproduct && isOwner ? "Edit Product" : "See Product Detail"}
                    </Text>
                    <FiArrowRight size={18} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default function GetProduct({
    myproduct,
    name,
    category,
    state,
}: {
    myproduct?: boolean;
    name?: string;
    state?: string;
    category?: string;
}) {
    const { primaryColor, borderColor, mainBackgroundColor } = useCustomTheme();
    const { productdata, updateProduct } = useProductStore((state) => state);
    const { push } = useRouter();
    const userId = localStorage.getItem("user_id") + "";
    const param = useParams();
    const id = param?.slug ?? param?.id;

    const query = useSearchParams();
    const frame = query?.get("frame");

    const {
        results,
        isLoading,
        ref,
        isRefetching: refetchingList,
    } = InfiniteScrollerComponent({
        url: `/products/search${myproduct ? `?creatorID=${id ? id : userId}` : ""}`,
        limit: 10,
        filter: "id",
        name: "getMyProduct" + name + category + state,
        paramsObj: cleanup({
            name: name,
            category: category?.replaceAll(" ", "_"),
            state: state,
        }),
    });

    const clickHandler = (item: IProduct) => {
        if (frame) {
            window.location.href = `${SHARE_URL}/product/${item?.id}`;
        } else if (myproduct && item?.createdBy?.userId === userId) {
            updateProduct({
                ...productdata,
                name: item?.name,
                description: item?.description,
                images: item?.images,
                price: item?.price,
                category: item?.category,
                location: item?.location as any,
                quantity: item?.quantity,
            });
            push("/dashboard/kisok/edit/" + item?.id);
        } else {
            push("/dashboard/kisok/details/" + item?.id);
        }
    };

    let newResult = results?.filter(
        (item: IProduct) => item?.createdBy?.userId !== userId,
    );
    const displayList = myproduct ? results : newResult;

    return (
        <LoadingAnimation
            loading={isLoading}
            refeching={refetchingList}
            length={displayList?.length}
        >
            <Grid
                w={"full"}
                templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                ]}
                gap={["4", "4", "6"]}
            >
                {displayList?.map((item: IProduct, index: number) => {
                    const isLast = displayList?.length === index + 1;
                    return (
                        <ProductCard
                            key={item?.id || index.toString()}
                            item={item}
                            myproduct={myproduct}
                            userId={userId}
                            primaryColor={primaryColor}
                            borderColor={borderColor}
                            mainBackgroundColor={mainBackgroundColor}
                            clickHandler={clickHandler}
                            isLast={isLast}
                            lastRef={ref}
                            frame={frame}
                        />
                    );
                })}
            </Grid>
        </LoadingAnimation>
    );
}
