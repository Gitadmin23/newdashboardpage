import EventMap from "@/components/event_details_component/event_map_info";
import { LocationIcon } from "@/components/svg";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { MdLocationPin } from "react-icons/md";
import useCustomTheme from "@/hooks/useTheme";
import { textLimit } from "@/utils/textlimit";

interface Props {
  location: any;
  locationType?: any;
  fontsize?: any;
  length?: number;
  isLimited?: boolean,
  color?: string;
  iconsize?: string;
  height?: string;
  indetail?: boolean;
  noicon?: boolean;
  eventdashboard?: boolean;
  fontWeight?: string;
  landingcolor?: boolean
}

function EventLocationDetail(props: Props) {
  const {
    location,
    // locationType,
    fontsize,
    color,
    length,
    iconsize,
    indetail,
    height,
    noicon,
    eventdashboard,
    fontWeight,
    isLimited,
    landingcolor
  } = props;

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
    headerTextColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const clickHandler = (item: any, e: any) => {
    e.stopPropagation();
    window.open(item, "_blank", "noreferrer");
  };

  return (
    <>
      {!indetail && (
        <Flex w={"full"} gap={"1"} height={height ? height : "50px"} alignItems={"center"}>
          {!noicon && (
            <Box width={"fit-content"}>
              <Box
                width={iconsize ? iconsize : "20px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <LocationIcon
                  color={landingcolor ? "black"  : color ? color : colorMode === "light" ? primaryColor : bodyTextColor}
                  style={{
                    width: iconsize ? iconsize : "20px",
                    color: bodyTextColor,
                  }}
                />
              </Box>
            </Box>
          )}
          <Flex
            textAlign={"left"}
            fontWeight={fontWeight ? fontWeight : "semibold"}
            color={
              landingcolor ? "black" : color ? color : colorMode === "light" ? "brand.chasescrollBlue" : headerTextColor
            }
            fontSize={fontsize ? fontsize : ["13px", "14px", "14px"]}
          >
            {location?.locationDetails && (
              <>
                {!isLimited ? (
                  <Text >
                    {location?.locationDetails}
                  </Text>
                ) : (
                  <>
                    <Text display={["block", "block", "none"]} >
                      {textLimit(location?.locationDetails, length ?? 20)}
                    </Text>
                    <Text display={["none", "none", "block"]} >
                      {textLimit(location?.locationDetails, length ?? 35)}
                    </Text>
                  </>
                )}
              </>
            )}
            {location?.toBeAnnounced && !location?.locationDetails && (
              <Text color={headerTextColor}>To Be Announced</Text>
            )} 
          </Flex>
        </Flex>
      )}
      {indetail && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderBottomWidth={eventdashboard ? "0px" : "1px"}
          borderBottomColor={borderColor}
          roundedBottom={"lg"}
          py={eventdashboard ? "0px" : "2"}
        >
          {!eventdashboard && (
            <Text fontSize={"sm"} fontWeight={["medium", "medium", "semibold"]}>
              {"Event location"}
            </Text>
          )}
          <Flex width={"full"} gap={eventdashboard ? "0px" : "3"} mt={eventdashboard ? "0px" : "3"} alignItems={"start"}>
            <Box width={"fit-content"}>
              <Flex justifyContent={"start"} w={"27px"} >
                <Box ml={"-2px"} >
                  <LocationIcon />
                </Box>
              </Flex>
            </Box>
            <Box>
              <Text
                textAlign={"left"}
                fontWeight={["medium", "semibold", "semibold"]}
                color={color ? color : bodyTextColor}
                fontSize={fontsize ? fontsize : ["13px", "14px", "14px"]}
              >
                {location?.locationDetails && (
                  <>
                    {!isLimited ? (
                      <Text color={primaryColor} >
                        {location?.locationDetails}
                      </Text>
                    ) : (
                      <>
                        <Text fontSize={fontsize ? fontsize : ["13px", "14px", "14px"]} display={["block", "block", "none"]} >
                          {textLimit(location?.locationDetails, length ?? 20)}
                        </Text>
                        <Text fontSize={fontsize ? fontsize : ["13px", "14px", "14px"]} display={["none", "none", "block"]} >
                          {textLimit(location?.locationDetails, length ?? 35)}
                        </Text>
                      </>
                    )}
                  </>
                )}
                {location?.toBeAnnounced && !location?.locationDetails && (
                  <Text color={bodyTextColor}>To Be Announced</Text>
                )} 
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default EventLocationDetail;
