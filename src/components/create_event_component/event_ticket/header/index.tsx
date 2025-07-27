import useEventStore from '@/global-state/useCreateEventState';
import useCustomTheme from '@/hooks/useTheme';
import { Checkbox, Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

interface Props { 
    type?: any
}

function EventTicketHeader(props: Props) {
    const { 
        type
    } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);
    const [isFree, setIsFree] = useState(false)

    const pathname = usePathname();

    const {
        mainBackgroundColor, 
        secondaryBackgroundColor,
        primaryColor,
        borderColor,
        headerTextColor
    } = useCustomTheme()

    const HandleDeleteAllTicket = (name: any, price: any) => {
        if(!eventdata?.isBought){
            if(price === 0){
                type("Free")
            }
            updateEvent({
                ...eventdata,
                productTypeData: [{
                    totalNumberOfTickets: "",
                    ticketPrice: price,
                    ticketType: name,
                    minTicketBuy: 1,
                    maxTicketBuy: 1
                }]
            })
        }
    }

    const toggleStatus = () => {
        setIsFree(state => !state)
    }

    React.useEffect(() => {
        setIsFree(eventdata?.productTypeData[0]?.ticketPrice === 0 ? true : false)
        if((eventdata?.productTypeData[0]?.ticketPrice === 0 && eventdata?.productTypeData[0]?.ticketType !== "Early Bird") ){
            type("Free")
        } else {
            type("Regular")
        }
    }, [eventdata?.productTypeData])

    return (
        // <Flex gap={"2"} className=' w-full flex lg:flex-row gap-2 ' >
        //     <label
        //         role='button'
        //         onClick={() => HandleDeleteAllTicket("", 100)}
        //         style={{ color: !isFree ? "#5D70F9" : "#667085", border: "1px solid #E2E8F0", width: "100%", padding: "4px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", backgroundColor: !isFree ? "#F7F8FF" : "", height: "45px", borderRadius: "8px" }}
        //         htmlFor="isPaid"  >
        //         <Checkbox
        //             type="checkbox"
        //             width={"4"}
        //             height={"4"}
        //             fontSize={["sm", "md"]}
        //             isChecked={!isFree}
        //             id="isPaid"
        //             onChange={toggleStatus} />
        //         Paid
        //     </label>
        //     <label
        //         role='button'
        //         onClick={() => HandleDeleteAllTicket("Free", 0)}
        //         style={{ color: isFree ? "#5D70F9" : "#667085", border: "1px solid #E2E8F0", width: "100%", padding: "4px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", backgroundColor: isFree ? "#F7F8FF" : "", height: "45px", borderRadius: "8px" }}
        //         htmlFor="isFree" >
        //         <Checkbox
        //             type="checkbox"
        //             width={"4"}
        //             height={"4"}
        //             fontSize={["sm", "md"]}
        //             className="form-checkbox h-4 w-4 text-blue-600 text-sm md:text-base"
        //             isChecked={isFree}
        //             id="isFree"
        //             onChange={toggleStatus} />
        //         Free
        //     </label>
        // </Flex>
        (<Flex w={"full"} h={"auto"} borderWidth={"1px"} borderColor={borderColor} bgColor={mainBackgroundColor} rounded={"36px"} p={"3"} >
            <Flex as={"button"} disabled={pathname?.includes("edit_event_data")} _disabled={{opacity: "0.2", cursor: "not-allowed"}} onClick={() => HandleDeleteAllTicket("", 100)} role='button' w={"full"} h={"53px"} bgColor={!isFree ? secondaryBackgroundColor : mainBackgroundColor} color={!isFree ? primaryColor: headerTextColor} fontWeight={"500"} justifyContent={"center"} alignItems={"center"} rounded={"36px"} >
                Paid
            </Flex>
            <Flex as={"button"} disabled={pathname?.includes("edit_event_data")} _disabled={{opacity: "0.2", cursor: "not-allowed"}} onClick={() => HandleDeleteAllTicket("Free", 0)} role='button' w={"full"} h={"53px"} bgColor={isFree ? secondaryBackgroundColor : mainBackgroundColor} color={isFree ? primaryColor: headerTextColor} fontWeight={"500"} justifyContent={"center"} alignItems={"center"} rounded={"36px"} >
                Free
            </Flex>
        </Flex>)
    );
}

export default EventTicketHeader
