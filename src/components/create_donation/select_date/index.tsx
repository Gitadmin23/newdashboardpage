import { CalendarIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState';
import useDonationStore from '@/global-state/useDonationState';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import { Flex, Text, useToast } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props { 
    index: number
}

function SelectDonationDate(props: Props) {
    const { 
        index
    } = props

    const { data, updateDontion } = useDonationStore((state) => state);
    const toast = useToast()

    console.log(data)

    const handleDateSelect = (date: any) => {
        // updateDontion({
        //     ...data,
        //     endDate: Date.parse(new Date(date).toJSON())+"", 
        // })

        let clone: any = [...data]
        clone[index] = { ...clone[index],
            endDate : Date.parse(new Date(date).toJSON())+""
        } 
        updateDontion(clone)

    } 
    
    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"sm"} h={"50px"}  >
                <CalendarIcon />
                {data[index]?.endDate ? dateFormat(Number(data[index]?.endDate)) : "Select Date And Time"}
                {" "}
                {data[index]?.endDate ? timeFormat(Number(data[index]?.endDate)) : ""}
            </Flex>
        )
    } 

    return (
        <Flex width={"full"} pos={"relative"}  flexDirection={"column"} gap={"2"} py={"2"} >
            <Text fontSize={"sm"} >
                End Date <span style={{ color: "#F04F4F" }}>*</span>
            </Text>
            <DatePicker 
                selected={data[index]?.endDate ? new Date(Number(data[index]?.endDate)) : new Date()}
                dateFormat="MMM d, yyyy h:mm aa"
                showTimeSelect
                minDate={new Date()}
                onChange={handleDateSelect}
                customInput={<CustomInput />}
            />
        </Flex>
    )
}

export default SelectDonationDate