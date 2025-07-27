import { THEME } from '@/theme';
import {Button, Flex, HStack, useColorMode, VStack} from '@chakra-ui/react';
import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import CustomText from '../general/Text';
import { useRouter } from 'next/navigation'
import useCustomTheme from "@/hooks/useTheme";

interface IProps {
    activeTab: number;
    setActiveTab: (num: number) => void;
    showModal: () => void;
}

const TAB_TITLES = [
    'My communities',
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
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    return (
        <Button onClick={() => onChange(index)} _hover={{}} fontSize={"14px"} width={"150px"} height={"43px"} bgColor={isActive ?  secondaryBackgroundColor : mainBackgroundColor } color={isActive ? "brand.chasescrollBlue" : bodyTextColor} >
            {title}
        </Button> 
    )
}

function CommunityTab({ activeTab, setActiveTab, showModal }: IProps) {
    const router = useRouter();
    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack width='100%' height='60px' bg={mainBackgroundColor} alignItems={'center'} paddingY={'10px'} paddingX={'5px'} borderBottomWidth='0.8px' borderBottomColor={borderColor}>
            <Flex bg={mainBackgroundColor} p={"1"} rounded={"md"} >
                {TAB_TITLES.map((item, index) => (
                    <Tab index={index + 1} title={item} key={index.toString()} isActive={activeTab === index + 1} onChange={setActiveTab} />
                ))}
            </Flex> 
        </HStack>
    )
}

export default CommunityTab