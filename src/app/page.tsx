
import { Flex, Image } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex w={"full"} h={"100vh"} justifyContent={"center"} alignItems={"center"} >
      <Image src="/images/logo.png" w={"40px"} h={"fit-content"}  />
    </Flex>
  );
}
