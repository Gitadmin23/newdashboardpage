import {Box, Button, Flex, HStack } from '@chakra-ui/react';
import React from 'react'  
import useCustomTheme from "@/hooks/useTheme";
import { IoMdArrowBack } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface IProps {
    activeTab: number;
    setActiveTab: (num: number) => void;  
}

const TAB_TITLES = [
    'Find communities',
    'Requests'
]

const Tab = ({ title, isActive, onChange, index }: {
    title: string,
    isActive: boolean,
    onChange: (num: number) => void,
    index: number;
}) => {
    const {
        bodyTextColor, 
        secondaryBackgroundColor,
        mainBackgroundColor, 
    } = useCustomTheme();
    return (
        <Button onClick={() => onChange(index)} _hover={{}} fontSize={"14px"} width={"150px"} height={"43px"} bgColor={isActive ?  secondaryBackgroundColor : mainBackgroundColor } color={isActive ? "brand.chasescrollBlue" : bodyTextColor} >
            {title}
        </Button> 
    )
}

function CommunityTab({ activeTab, setActiveTab }: IProps) { 

    const { 
        mainBackgroundColor, 
    } = useCustomTheme(); 

    const router = useRouter()

    const clickHandler = (item: any) => { 
        if(item === 2) {
            router.push("/dashboard/community?tab=request")
        } else {
            router.push("/dashboard/community?tab=find")
        }
    }

    const backHandler = () => { 
        router.push("/dashboard/community")
        setActiveTab(0)
    }

    return (
        <Flex width='100%' bg={mainBackgroundColor} gap={"4"} alignItems={'center'}  >
            <Box onClick={backHandler} as='button' display={["block", "block", "none", "none", "none"]} >
                <IoArrowBack size={"20px"} />
            </Box>
            <Flex bg={mainBackgroundColor} gap={"4"} rounded={"md"} >
                {TAB_TITLES.map((item, index) => (
                    <Tab index={index + 1} title={item} key={index.toString()} isActive={activeTab === index + 1} onChange={clickHandler} />
                ))}
            </Flex> 
        </Flex>
    )
}

export default CommunityTab