import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import CustomText from "../general/Text";
import useCustomTheme from "@/hooks/useTheme";
import InfiniteScrollerComponent from "@/hooks/infiniteScrollerComponent";
import ExploreEventCard from "../sharedComponent/event_card";
import Link from "next/link";
import { IEvent } from "@/models/Events";
import EventCard from "@/components/home/EventCard";
import EventCardNew from "../sharedComponent/event_card/eventCard";
import { IEventType } from "@/models/Event";

export default function UpcomingEvents() {
  const [limit, setLimit] = React.useState(true);
  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
    headerTextColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const { results, isLoading, ref, refetch, isRefetching } =
    InfiniteScrollerComponent({ url: `/events/events`, limit: limit ? 9 : 10 });

  return (
    <Box
      width={["100%", "80%"]}
      height={["auto", "100%"]}
      overflowY={"auto"}
      px={["0px", "40px"]}
      borderLeftWidth={["0px", "1px"]}
      borderLeftColor={borderColor}
    >
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"100px"}
        display={["flex"]}
      >
        <CustomText
          fontSize={["16px", "16px"]}
          fontFamily={"DM-Bold"}
          color={headerTextColor}
        >
          Upcoming Events
        </CustomText>

        <Link href={"/dashboard/event"}>
          <CustomText
            color={"brand.chasescrollButtonBlue"}
            fontFamily={"DM-Regular"}
            fontSize={["13px", "14px"]}
          >
            See more
          </CustomText>
        </Link>
      </HStack>

      <Box
        display={["block", "none"]}
        width={"full"}
        height={"full"}
        overflowX={"auto"}
        scrollBehavior={"smooth"}
        paddingBottom={"50px"}
        style={{
          scrollbarWidth: "none",
        }}
      >
        <Flex gap={"9"} width={"fit-content"}>
          {results?.map((event: IEventType, i: number) => {
            return (
              <Box
                key={i}
                width={"250px"}
                marginRight={"10px"}
                height={"300px"}
                bg="transparent"
              >
                <EventCardNew event={event} />
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Box width="100%" height={"80%"} display={["none", "block"]}>
        <Grid
          width={["fit", "fit", "auto", "auto", "auto"]}
          templateColumns={["repeat(1, 1fr)"]}
          gap={5}
        >
          {results?.map((event: any, i: number) => {
            return (
              <GridItem key={i} maxWidth={"full"}>
                <EventCardNew event={event} />
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
