import { Flex, Button, Image, useToast } from "@chakra-ui/react";

type IProps = {
    width?: string,
    height?: string
}

function MobileAppLink(props: IProps) {

    const {
        width,
        height
    } = props

    const toast = useToast()

    const handleToast = () => { 
        toast({
            title: 'Infomation',
            description: 'Coming soon',
            status: 'info',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        });
    }


    return (
        <Flex gap={"2"} w={"fit-content"} >
            <Button onClick={handleToast} h={height ?? ["36px", "36px", "56px"]} w={width ?? ["113.14px", "113.14px", "176px"]} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/apple.png" alt="apple" w={"full"} objectFit={"cover"} rounded={"8px"} />
            </Button>
            <Button onClick={handleToast} h={height ?? ["36px", "36px", "56px"]} w={width ?? ["113.14px", "113.14px", "176px"]} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/google.png" alt="apple" w={"full"} objectFit={"cover"} rounded={"8px"} />
            </Button>
        </Flex>
    )
}

export default MobileAppLink