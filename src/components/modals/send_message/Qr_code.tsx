import CustomButton from "@/components/general/Button";
import CustomText from "@/components/general/Text";
import { WEBSITE_URL } from "@/services/urls";
import { Box, Flex, HStack, Image, Text, useColorMode } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { IoClose } from "react-icons/io5";
import QRCode from "react-qr-code"; 
import CopyRightText from "@/components/sharedComponent/CopyRightText";
import useCustomTheme from "@/hooks/useTheme";
import { textLimit } from "@/utils/textlimit";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { IEventType } from "@/models/Event";
import html2canvas from "html2canvas";
import { ShareType } from "@/app/share/page";

interface Props {
  id: string | number;
  close: any;
  data?: any;
  name?: string;
  type?: ShareType
}

function Qr_code(props: Props) {
  const { id, close, data, type, name } = props;

  const {
    bodyTextColor,
    mainBackgroundColor,
    headerTextColor,
    secondaryBackgroundColor,
    primaryColor,
  } = useCustomTheme();
  const { colorMode } = useColorMode();

  const componentRef: any = React.useRef("");

  function downloadComponentAsPNG() {
    if (!componentRef.current) return;
  
    html2canvas(componentRef.current).then((canvas: any) => {
      const link = document.createElement('a');
      link.download = data?.eventName ? data?.eventName : data?.name+" QRcode";
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  const url_link =
    type === "EVENT"
      ? `${WEBSITE_URL}${"/donation/"}${id}` :
        type === "RENTAL" ? `${WEBSITE_URL}${"/rental/"}${id}`:
        type === "SERVICE" ? `${WEBSITE_URL}${"/service/"}${id}`:
        type === "KIOSK" ? `${WEBSITE_URL}${"/kiosk/"}${id}`:
        type === "DONATION" ? `${WEBSITE_URL}${"/donation/"}${id}`
        : `${WEBSITE_URL}/share?type=${props.type}&typeID=${id}`;


  return (
    <Flex flexDir={"column"} roundedTop={"6px"} alignItems={"center"} pb={"8"}>
      <Box
        onClick={() => close(false)}
        as="button"
        width={"25px"}
        zIndex={30}
        position={"absolute"}
        top={"5"}
        right={"2"}
      >
        <IoClose size={"25px"} color="white" />
      </Box>
      <Flex
        height={["480px"]}
        ref={componentRef}
        flexDir={"column"}
        alignItems={"center"}
        width={"full"}
        roundedTop={"6px"}
      >
        <Box
          height={"300px"}
          roundedTop={"6px"}
          width={"full"}
          roundedBottom={"full"}
          zIndex={10}
          style={{ background: "#5D70F9" }}
        />

        <Flex
          position={"absolute"}
          bg={"transparent"}
          left={"0px"}
          right={"0px"}
          flexDir={"column"}
          alignItems={"center"}
          width={"full"}
          roundedTop={"6px"}
        >
          <Flex pt={"4"} zIndex={20}>
            <HStack justifyContent={"center"}>
              {/* <Image src='/assets/images/chasescroll-logo.png' width={30} height={30} alt='logo' /> */}
              <Text
                fontWeight={"bold"}
                fontSize={"24px"}
                color="#FFF"
              >
                Chasescroll
              </Text>
            </HStack>
          </Flex>
          <Flex
            zIndex={20}
            alignItems={"center"}
            flexDir={"column"}
            roundedTop={"6px"}
            pt={"4"}
            color={"white"}
            width={"full"}
          >
            {type && (
              <Text fontSize={"14px"}>{capitalizeFLetter(type)} Name</Text>
            )}

            {!type && (
              <Text fontSize={"14px"}>{type === "EVENT" ? "Event" : type === "RENTAL" ? "Rental" : type === "SERVICE" ? "Service" : type === "KIOSK" ? "Kiosk" : "Fundraising"} Name</Text>
            )}
            <Text fontSize={"18px"} fontWeight={"bold"}>
              {textLimit(name ? name : data?.eventName ? data?.eventName : data?.name, 20)}
            </Text>
          </Flex>
          <Flex justifyContent={"center"} flex={1} width={"full"} pt={"6"}>
            <Box
              zIndex={20}
              width={["80%", "60%"]}
              shadow={"lg"}
              bg={"white"}
              p={"3"}
              rounded={"md"}
            >
              <QRCode
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                  zIndex: 20,
                }}
                value={url_link}
                viewBox={`0 0 256 256`}
              />
            </Box>
          </Flex>
          {type ? (
            <Text mt={"4"} color={bodyTextColor}>Scan to Confirm Your Order</Text>
          ) : (
            <Text mt={"4"} color={bodyTextColor}>
              Scan here and get Your {type === "EVENT" ? "Event" : type === "RENTAL" ? "Rental" : type === "SERVICE" ? "Service" : type === "KIOSK" ? "Kiosk" : "Fundraising"} Link
            </Text>
          )}
          <Text fontSize={"xs"} textAlign={"center"}>
            <CopyRightText />
          </Text>
        </Flex>
      </Flex>
      <CustomButton
        maxWidth={"300px"}
        backgroundColor={primaryColor}
        onClick={() => downloadComponentAsPNG()}
        text="Download QR-Code"
      />
    </Flex>
  );
}

export default Qr_code;
