import LoadingAnimation from "@/components/sharedComponent/loading_animation";
import { RoundArrow } from "@/components/svg";
import httpService from "@/utils/httpService";
import { Box, Flex, Text, useColorMode, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Deleteaccount from "../../../deleteaccount";
import useCustomTheme from "@/hooks/useTheme";

interface Props {
  withdraw: any;
  loading?: any;
}

function AccountList(props: Props) {
  const { withdraw, loading } = props;

  const {
    bodyTextColor,
    mainBackgroundColor,
    headerTextColor,
    secondaryBackgroundColor,
    primaryColor,
  } = useCustomTheme();
  const { colorMode } = useColorMode();

  const toast = useToast();
  const [data, setData] = useState([] as any);

  const ref: any = React.useRef(null);

  const scroll = (scrolloffset: any) => {
    ref.current.scrollLeft += scrolloffset;
  };
  // react query
  const { isLoading, isRefetching } = useQuery(
    ["my-bank-list"],
    () => httpService.get("/payments/account/paystackBankAccounts"),
    {
      onError: (error: any) => {
        toast({
          status: "error",
          title: error.response?.data,
        });
      },
      onSuccess: (data) => {
        setData(data?.data?.content);
      },
    },
  );

  return (
    (<Flex flexDir={"column"} width={"full"}>
      <Text lineHeight={"13.02px"} fontSize={"10px"} color={"#626262"}>
        Recent Transaction
      </Text>
      <LoadingAnimation loading={isLoading} length={data?.length}>
        <Flex
          ref={ref}
          w={"full"}
          overflowX={"auto"}
          scrollBehavior={"smooth"}
          pt={"4"}
          pb={"1"}
          mb={"2"}
        >
          <Flex w={"auto"} gap={"4"}>
            {data?.map(
              (
                item: {
                  transferRecipient: string | number;
                  accountName: string;
                  bankName: string;
                },
                index: number,
              ) => {
                return (
                  (<Box
                    width={"200px"}
                    key={index}
                    disabled={loading}
                    pos={"relative"}
                    onClick={() => withdraw(item?.transferRecipient)}
                    as="button"
                    flexWrap={"nowrap"}
                    px={"3"}
                    pb={"3"}
                    pt={"7"}
                    borderWidth={"1px"}
                    borderColor={"#00F562"}
                    rounded={"8px"}
                  >
                    <Box position={"relative"} width={"fit-content"}>
                      <Text
                        textAlign={"left"}
                        lineHeight={"18.23px"}
                        fontSize={"14px"}
                        fontWeight={"bold"}
                        color={bodyTextColor}
                      >
                        {(item?.accountName + "123456789123456789")?.length >=
                        20
                          ? (item?.accountName + "123456789123456789")?.slice(
                              0,
                              20,
                            ) + "..."
                          : item?.accountName + "123456789123456789"}
                      </Text>
                      <Text
                        textAlign={"left"}
                        lineHeight={"18.23px"}
                        top={"0px"}
                        mt={"-18.23px"}
                        opacity={"0"}
                        fontSize={"14px"}
                        fontWeight={"bold"}
                        color={bodyTextColor}
                      >
                        {item?.accountName.replace(/ /g, "_")}
                      </Text>
                    </Box>
                    <Text
                      textAlign={"left"}
                      color={"#B6B6B6"}
                      fontSize={"14px"}
                      fontWeight={"normal"}
                    >
                      {item?.bankName}
                    </Text>
                    <Deleteaccount code={item?.transferRecipient ?? ""} />
                  </Box>)
                );
              },
            )}
          </Flex>
        </Flex>
      </LoadingAnimation>
      <Flex gap={"2"} width={"full"} justifyContent={"end"}>
        <Box
          as="button"
          onClick={() => scroll(-200)}
          transform={"rotate(180deg)"}
        >
          <RoundArrow color={bodyTextColor} />
        </Box>
        <Box as="button" onClick={() => scroll(200)}>
          <RoundArrow color={bodyTextColor} />
        </Box>
      </Flex>
    </Flex>)
  );
}

export default AccountList;
