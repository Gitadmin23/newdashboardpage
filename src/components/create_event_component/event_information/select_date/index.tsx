import { CalendarIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import { Flex, Text, useToast } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    name: "Start" | "End",
    data: any
}

function SelectDate(props: Props) {
    const {
        name,
        data
    } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);
    const toast = useToast()

    // Parse to Date object
    const dateInti = new Date(eventdata?.startDate);

    // Add 1 day (in milliseconds)
    dateInti.setDate(dateInti.getDate() + 1);

    console.log(new Date(dateInti));
    

    // Format back to string (YYYY-MM-DD) 

    const handleDateSelect = (date: any) => {

        if (date) {
            if (name === "Start") {
                updateEvent({
                    ...eventdata,
                    startDate: Date.parse(new Date(date).toJSON()),
                    startTime: Date.parse(new Date(date).toJSON())
                })
            } else {
                if (!eventdata.startDate) {
                    toast({
                        title: 'Error',
                        description: "Please enter your starting date",
                        status: 'error',
                        isClosable: true,
                        duration: 2000,
                        position: 'top-right',
                    });
                } else if (new Date(date) < new Date(eventdata?.startDate)) {
                    toast({
                        title: 'Error',
                        description: "Please enter a valid end date",
                        status: 'error',
                        isClosable: true,
                        duration: 2000,
                        position: 'top-right',
                    });

                } else {
                    updateEvent({
                        ...eventdata,
                        endDate: Date.parse(new Date(date).toJSON()),
                        endTime: Date.parse(new Date(date).toJSON())
                    })
                }
            }
        }
    }

    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"12px"} h={"50px"}  >
                <CalendarIcon />
                {data ? dateFormat(data, "DD/MM/YY") : "DD/MM/YY"}
                {" "}
                {data ? timeFormat(data) : ""}
            </Flex>
        )
    }

    return (
        <Flex width={"full"} flexDirection={"column"} gap={"2"} py={"2"} >
            <Text fontSize={"sm"} >
                {name} <span style={{ color: "#F04F4F" }}>*</span>
            </Text>
            <DatePicker
                id={name} 
                selected={(name === "End" && eventdata.endDate) ? new Date(eventdata.endDate) : (name === "Start" && eventdata.startDate ) ? new Date(eventdata.startDate) : new Date()}
                showTimeSelect
                minDate={(name === "End") ? (eventdata.startDate ? new Date(eventdata.startDate) : new Date()) : new Date()}
                onChange={handleDateSelect}
                customInput={<CustomInput />}
            />
        </Flex>
    )
}

export default SelectDate