import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Checkbox, Flex, HStack, Input, Text, border } from '@chakra-ui/react'
import React from 'react'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';
import { IoAdd, IoClose, IoCopy, IoCopyOutline } from 'react-icons/io5'
import { IDayOfTheWeek } from '../createServices';

export default function DayAvaliable({ close, setTab, days, handleCheck }: { close: (by: boolean) => void; setTab: (by: boolean) => void, days: IDayOfTheWeek[], handleCheck: ({ index, type,isChecked, value }: { index: number, type: 'startTime'|'endTime'|'dayOfTheWeek'|'checked', isChecked: boolean, value: string }) => void }) {

    const {
        borderColor,
        primaryColor,
        mainBackgroundColor,
        bodyTextColor
    } = useCustomTheme()

    const array = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat"
    ]

    const getDay = (day: number) => {
        switch(day) {
            case 0:{
                return 'Sunday';
            }
            case 1: {
                return 'Monday';
            }
            case 2: {
                return 'Tuesday';
            }
            case 3: {
                return 'Wednesday';
            }
            case 4: {
                return 'Thursday';
            }
            case 5: {
                return 'Friday';
            }
            case 6: {
                return 'Saturday';
            }
        }
    }

    return (
        <Flex justifyContent={"center"} w={"full"} height={"full"} px={"6"} py={"8"} >
            <Flex w={"full"} flexDir={"column"} gap={"6"} >
                <Flex w={"full"} justifyContent={"space-between"} gap={"8"} >
                    <Flex flexDir={"column"} >
                        <Text fontWeight={"600"} fontSize={"24px"} >Days that you are available for Business</Text>
                        <Text fontWeight={"500"} >Weekly Hours</Text>
                    </Flex>
                    <Flex as={"button"} onClick={() => close(false)} >
                        <IoIosCloseCircle size={"25px"} />
                    </Flex>
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"}  >
                    <Flex gap={"4"} style={{ boxShadow: "0px 20.62px 72.18px 0px #C2C2C21A" }} rounded={"16px"} borderWidth={"0.38px"} borderColor={borderColor} w={["full", "full"]} flexDir={"column"} px={"14"} py={"8"} >
                        {days?.map((item, index) => {
                            return (
                                <Flex key={index.toString()} gap={"3"} flexDir={['column', 'row']} alignItems={['flex-start', "center"]} justifyContent={['flex-start', 'space-between']}  >
                                    <Flex w={"25"} gap={"3"} >
                                        <Checkbox isChecked={item.checked} onChange={(e) => handleCheck({ index, type: 'checked', value: e.target.value, isChecked: !item?.checked  })} />
                                        <Text color={bodyTextColor}>{getDay(item?.dayOFTheWeek)}</Text>
                                    </Flex>
                                    <HStack spacing={2} w={['50%', '60%']}>
                                        <Input defaultValue="09:00:AM" value={item?.startTime} onChange={(e) => handleCheck({ index, type: 'startTime', value: e.target.value, isChecked: item?.checked })} type="time" w={"130px"} h={"40px"} rounded={"full"} borderWidth={"0.83px"} borderColor={borderColor} />
                                        -
                                        <Input value={item?.endTime} onChange={(e) => handleCheck({ index, type: 'endTime', value: e.target.value, isChecked: item?.checked })} type="time" w={"130px"} h={"40px"} rounded={"full"} borderWidth={"0.83px"} borderColor={borderColor} />
                                        {/* <Box as="button" ml={"5"} >
                                            <IoClose size={"25px"} />
                                        </Box> */}
                                    </HStack>
                                </Flex>
                            )
                        })}
                    </Flex>
                 
                </Flex>
                {/* <Flex w={"full"} justifyContent={"space-between"} mt={"4px"} >
                    <Button 
                    type="button"
                    onClick={() => {
                        close(false);
                        }} height={"55px"} borderWidth={"1px"} w={"full"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{ backgroundColor: primaryColor }} >Close</Button>
                </Flex> */}
            </Flex>
        </Flex>
    )
}
