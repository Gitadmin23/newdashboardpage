import CustomButton from "@/components/general/Button";
import { SuccessIcon } from "@/components/svg";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

interface Props {
  close?: any;
}

function SuccessMessage(props: Props) {
  const { close } = props;

  const {
    bodyTextColor,
    mainBackgroundColor,
    headerTextColor,
    secondaryBackgroundColor,
    primaryColor,
  } = useCustomTheme();
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      py={"8"}
      px={"14"}
      bg={mainBackgroundColor}
    >
      <SuccessIcon />
      <Text
        fontSize={"24px"}
        color={bodyTextColor}
        lineHeight={"44.8px"}
        fontWeight={"500"}
        mt={"4"}
      >
        Transaction Successful
      </Text>
      <Text
        fontSize={"12px"}
        color={bodyTextColor}
        maxW={"351px"}
        textAlign={"center"}
        mb={"4"}
      >
        Congratulation the money has been transfer into your account.
      </Text>
      <CustomButton
        onClick={close}
        color={primaryColor}
        text="Close"
        w={"full"}
        backgroundColor={secondaryBackgroundColor}
        border={"1px solid #12299C75"}
      />
    </Flex>
  );
}

export default SuccessMessage;
