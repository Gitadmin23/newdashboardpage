import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  HStack,
  Select,
  VStack,
  Flex,
  Textarea,
  Button,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import CustomText from "@/components/general/Text";
import { useMutation } from "react-query";
import httpService from "@/utils/httpService";
import { URLS } from "@/services/urls";
import { useCommunityPageState } from "@/components/Community/chat/state";
import useCustomTheme from "@/hooks/useTheme";

interface IProps {
  isOpen: boolean;
  typeID: string;
  REPORT_TYPE: "REPORT_USER" | "REPORT_COMMUNITY";
  onClose: () => void;
}

const REPORT_OPTIONS = [
  "Scam or fraud",
  "Fake news",
  "Bullying or harassment",
  "Sucidial content",
  "Nudity or sexual post",
  "Hate speech",
  "Wrong contact",
];

function ReportCommunityModal({
  isOpen,
  onClose,
  typeID,
  REPORT_TYPE,
}: IProps) {
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");

  const {
    bodyTextColor,
    mainBackgroundColor,
    headerTextColor,
    secondaryBackgroundColor,
    primaryColor,
  } = useCustomTheme();
  const { colorMode } = useColorMode();

  const { activeCommunity } = useCommunityPageState((state) => state);
  const toast = useToast();

  const handleChange = React.useCallback(
    (e: string) => {
      if (value.length < 300) {
        setValue(e);
      }
    },
    [value],
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: () =>
      httpService.post(`${URLS.CREATE_REPORT}`, {
        typeID,
        title,
        description: value,
        reportType: REPORT_TYPE,
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Report created",
        position: "top-right",
        isClosable: true,
        status: "success",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An errorr occured while ttrying to create your report",
        position: "top-right",
        isClosable: true,
        status: "error",
      });
    },
  });

  useEffect(()=> {
    setValue('')
    setTitle("")
  }, [])

  const createReport = React.useCallback(() => {
    if (value.length < 0 || title === "") {
      toast({
        title: "Warrning",
        description: "Please provide some details",
        position: "top-right",
        isClosable: true,
        status: "warning",
      });
    } else {
      mutate();
    }
  }, [value.length, title, toast, mutate]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      size="2xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        width={"100%"}
        bg={mainBackgroundColor}
        padding="0px"
        overflow={"hidden"}
        borderRadius={"10px"}
      >
        <ModalBody
          width="100%"
          height="100%"
          paddingX="20px"
          overflow={"hidden"}
          paddingY="20px"
        >
          <Flex
            width={"100%"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <FiX fontSize={"25px"} onClick={() => onClose()} />
              <CustomText
                color="brand.chasescrollButtonBlue"
                fontFamily={"Satoshi-Medium"}
              >
                Report Community
              </CustomText>
              {/* <CustomText>{}</CustomText> */}
            </HStack>

            <VStack width={"70%"} marginTop={"30px"}>
              <Select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                width={"100%"}
                height={"45px"}
                borderRadius={"10px"}
                placeholder="Report type"
              > 
                {REPORT_OPTIONS.map((option, index) => (
                  <option key={index.toString()} value={option}>
                    {option}
                  </option>
                ))}
              </Select>

              <Textarea
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                width={"100%"}
                borderRadius={"10px"}
                placeholder="Please provide some details"
                _focus={{ borderColor: "brand.chasescrollButtonBlue" }}
                _placeholder={{
                  color: bodyTextColor,
                }}
                height={"300px"}
              />

              <HStack width="100%" justifyContent={"flex-end"}>
                <CustomText>{value.length} / 300</CustomText>
              </HStack>
            </VStack>

            <Button
              onClick={createReport}
              isLoading={isLoading}
              width="70%"
              color="white"
              marginTop="30px"
              height="50px"
              bg="brand.chasescrollButtonBlue"
              variant={"solid"}
              borderRadius={"10px"}
            >
              Submit
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ReportCommunityModal;
