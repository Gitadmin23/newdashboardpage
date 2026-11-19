"use client";
import React from "react";
import { Grid, Flex, Text, Image, Box, HStack, Skeleton } from "@chakra-ui/react";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { Star1 } from "iconsax-react";
import { IoMdCheckmark } from "react-icons/io";
import useCustomTheme from "@/hooks/useTheme";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LoadingAnimation from "../sharedComponent/loading_animation";
import InfiniteScrollerComponent from "@/hooks/infiniteScrollerComponent";
import { IRental } from "@/models/product";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { textLimit } from "@/utils/textlimit";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { IMAGE_URL, LANDINGPAGE_URL } from "@/services/urls";
import { cleanup } from "@/utils/cleanupObj";
import useProductStore from "@/global-state/useCreateProduct";
import DeleteEvent from "../sharedComponent/delete_event";
import ShareEvent from "../sharedComponent/share_event";

interface RentalCardProps {
    item: IRental;
    myrental?: boolean;
    userId: string;
    isSelect?: boolean;
    selected?: any;
    setSelected?: any;
    primaryColor?: string;
    borderColor?: string;
    mainBackgroundColor?: string;
    clickHandler: (item: IRental) => void;
    isLast?: boolean;
    lastRef?: any;
    frame?: string | null;
}

function RentalCard({
    item,
    myrental,
    userId,
    isSelect,
    selected,
    setSelected,
    primaryColor,
    borderColor,
    mainBackgroundColor,
    clickHandler,
    isLast,
    lastRef,
    frame,
}: RentalCardProps) {
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

    const getImageUrl = (img?: string) => {
        if (!img) return "";
        if (img.startsWith("http://") || img.startsWith("https://")) return img;
        return (IMAGE_URL as string) + img;
    };

    const currentImage =
        item?.images && item.images.length > 0
            ? getImageUrl(item.images[activeImageIndex])
            : "";

    const isOwner = item?.creator?.userId === userId;
    const categoryTitle =
        item?.category?.replaceAll("_", " ") || "Venue selection and booking";
    const locationText =
        item?.location?.locationDetails ||
        item?.location?.address ||
        item?.location?.city ||
        item?.location?.state ||
        "Location on request";

    const rentalPrice = item?.hourlyPrice || item?.dailyPrice || item?.price;
    const startingRate = rentalPrice
        ? formatNumberWithK(rentalPrice, true)
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
                {currentImage ? (
                    <Image
                        src={currentImage}
                        alt={item?.name || "Rental Image"}
                        w="full"
                        h="full"
                        objectFit="cover"
                        fallback={<Skeleton w="full" h="full" startColor="gray.200" endColor="gray.400" />}
                    />
                ) : (
                    <Skeleton w="full" h="full" startColor="gray.200" endColor="gray.400" />
                )}

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
                            selected?.includes(item?.id)
                                ? primaryColor || "#5465FF"
                                : "white"
                        }
                        rounded="md"
                        shadow="md"
                    >
                        <IoMdCheckmark
                            size="16px"
                            color={selected?.includes(item?.id) ? "white" : "#718096"}
                        />
                    </Flex>
                )}

                {/* Multiple image indicator dots */}
                {item?.images?.length > 1 && !isSelect && (
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
                    {!isSelect && isOwner && (
                        <DeleteEvent
                            id={item?.id}
                            isRental={true}
                            name={item?.name + " Rental"}
                            isOrganizer={myrental ? true : false}
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
                                type="RENTAL"
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
                        {capitalizeFLetter(item?.name || "Rental Name")}
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

                    <Text fontWeight="600" fontSize="14px" color="#5465FF">
                        <span style={{ fontSize: "12" }} >Starting rate</span> - {startingRate}
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
                        {myrental && isOwner ? "Edit Rental" : "See Rental Detail"}
                    </Text>
                    <FiArrowRight size={18} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default function GetRental({
    myrental,
    name,
    state,
    category,
    isSelect,
    selected,
    setSelected,
}: {
    myrental?: boolean;
    name?: string;
    state?: string;
    category?: string;
    isSelect?: boolean;
    selected?: any;
    setSelected?: any;
}) {
    const { primaryColor, borderColor, mainBackgroundColor } = useCustomTheme();
    const { push } = useRouter();
    const { rentaldata, updateRental } = useProductStore((state) => state);

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
        url: `/rental/search${myrental ? `?userId=${id ? id : userId}` : ""}`,
        limit: 20,
        filter: "id",
        name: "getMyrental",
        paramsObj: cleanup({
            name: name,
            category: category?.replaceAll(" ", "_"),
            state: state,
        }),
    });

    const clickHandler = (item: IRental) => {
        if (frame) {
            window.parent.location.href = `${LANDINGPAGE_URL}/auth`;
        } else if (isSelect) {
            let clone = [...selected];

            if (selected?.includes(item?.id)) {
                clone = clone?.filter((subitem: string) => subitem !== item?.id);
                setSelected(clone);
            } else {
                clone = [...clone, item?.id];
                setSelected(clone);
            }
        } else {
            if (myrental && item?.creator?.userId === userId) {
                updateRental({
                    ...rentaldata,
                    name: item?.name,
                    description: item?.description,
                    images: item?.images,
                    price: item?.price,
                    category: item?.category,
                    location: item?.location as any,
                    maximiumNumberOfDays: item?.maximiumNumberOfDays,
                    frequency: item?.frequency + "",
                    state: item?.location?.state,
                });
                push("/dashboard/kisok/edit/" + item?.id + "/rental");
            } else {
                push("/dashboard/kisok/details-rental/" + item?.id);
            }
        }
    };

    let newResult = results?.filter(
        (item: IRental) => item?.creator?.userId !== userId,
    );
    const displayList = myrental ? results : newResult;

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
                {displayList?.map((item: IRental, index: number) => {
                    const isLast = displayList?.length === index + 1;
                    return (
                        <RentalCard
                            key={item?.id || index.toString()}
                            item={item}
                            myrental={myrental}
                            userId={userId}
                            isSelect={isSelect}
                            selected={selected}
                            setSelected={setSelected}
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
