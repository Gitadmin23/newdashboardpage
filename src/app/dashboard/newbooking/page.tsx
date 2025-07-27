"use client"
import { AddIconWithBorder } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import Bookings from '@/Views/dashboard/booking/Bookings'
import Businesses from '@/Views/dashboard/booking/Businesses'
import MyBusiness from '@/Views/dashboard/booking/MyBusiness'
import { Button, Flex, Grid, Text, Box, HStack, VStack } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Booking() {
    const [active, setActive] = React.useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();

    const tab = searchParams?.get('tab');
    console.log(tab);

    React.useEffect(() => {
        if (!tab) {
            window.history.pushState(null, ``, `?tab=1`)
        } else {
            setActive(parseInt(tab));
        }
    }, [tab])


    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme()


    return (
        <VStack w={"full"} h="full" alignItems='flex-start' px='20px' overflowY={"auto"} bgColor={mainBackgroundColor} >
            <Flex flexDir={['row']} w='full' justifyContent={'space-between'} alignItems={'center'} py={"5"} borderBottomWidth={'0.4px'} borderBottomColor={borderColor}>
                <Text fontWeight={700} fontSize={16}>
                    <span style={{ color: primaryColor }}>Chasescroll</span>
                    <span style={{ marginLeft: '10px' }}>Business</span>
                </Text>

                <Button onClick={() => router.push('/dashboard/newbooking/service')} px='10px' h='32px' borderRadius={'full'} bg={secondaryBackgroundColor}>
                    <Text color={primaryColor} fontSize={14} fontWeight={600} >Create Service</Text>
                </Button>
            </Flex>

            <Flex flexDir={['column', 'row']} alignItems={["start", "center", "center"]} mt='20px' gap={4}>
                <Text fontWeight={500} fontSize='14px'>See all Listings on chasescroll</Text>

                <HStack spacing={[2, 4, 4]}>
                    <Button onClick={() => {
                        router.push(`/dashboard/newbooking?tab=1`);
                        setActive(1);
                    }} px='10px' h='32px' borderRadius={'full'} bg={active === 1 ? primaryColor : secondaryBackgroundColor}>
                        <Text color={active === 1 ? 'white' : headerTextColor} fontSize={14} fontWeight={600} >All Business</Text>
                    </Button>

                    <Button onClick={() => {
                        router.push(`/dashboard/newbooking?tab=2`);
                        setActive(2);
                    }} px='10px' h='32px' borderRadius={'full'} bg={active === 2 ? primaryColor : secondaryBackgroundColor}>
                        <Text color={active === 2 ? 'white' : headerTextColor} fontSize={14} fontWeight={600} >My Business</Text>
                    </Button>

                    <Button onClick={() => {
                        router.push(`/dashboard/newbooking?tab=3`);
                        setActive(3);
                    }} px='10px' h='32px' borderRadius={'full'} bg={active === 3 ? primaryColor : secondaryBackgroundColor}>
                        <Text color={active === 3 ? 'white' : headerTextColor} fontSize={14} fontWeight={600} >My Bookings</Text>
                    </Button>
                </HStack>
            </Flex>

            <Box flex={1} w='full' h='full'>
                {active === 1 && <Businesses />}
                {active === 2 && <MyBusiness />}
                {active === 3 && <Bookings />}
            </Box>
        </VStack>
    )
}
