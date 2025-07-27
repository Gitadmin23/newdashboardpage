import useEventStore from '@/global-state/useCreateEventState';
import useCustomTheme from '@/hooks/useTheme';
import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react'
import { IoArrowDown, IoChevronDown, IoChevronUp } from 'react-icons/io5';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//     { value: 'mango', label: 'Mango' },
//     { value: 'banana', label: 'Banana' }
// ];

interface Obj {
    value: string;
    label: string;
}

export default function SelectEventType({ options }: { options: Array<Obj> }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { eventdata, updateEvent } = useEventStore((state) => state);

    const filteredOptions = options.filter((option: any) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { 
        secondaryBackgroundColor,
        mainBackgroundColor, 
    } = useCustomTheme(); 

    const handleOptionClick = (option: any) => {
        console.log(option);
        
        setSelectedOption(option?.label);

        updateEvent({
            ...eventdata,
            eventType: option?.value
        });

        setIsOpen(false);
    };

    console.log(eventdata);
    

    return (
        <Flex pos={"relative"}  rounded={"sm"} w={"full"} >
            <Flex
                w={"full"}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '10px',
                    paddingRight: "0px",
                    border: '1px solid #ccc',
                    borderRadius: '999px',
                    cursor: 'pointer'
                }}
                pos={"relative"}
            >
                {eventdata?.eventType ? eventdata?.eventType.split("_").join(" ") : selectedOption ? (selectedOption+"").split("_").join(" ") : 'Select Event Type...'}
                <Flex w={"40px"} pos={"absolute"} h={"full"} top={"0px"} right={"0px"} justifyContent={"center"} alignItems={"center"}  >
                    {!isOpen ?
                        <IoChevronDown size={"20px"} />
                        :
                        <IoChevronUp size={"20px"} />
                    }
                </Flex>
            </Flex>
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '110%',
                        left: '0',
                        right: '0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: mainBackgroundColor,
                        zIndex: 1000
                    }}
                >
                    <Flex w={"full"} justifyContent={"center"} py={"2"} >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '90%',
                                padding: '10px',
                                boxSizing: 'border-box',
                                border: '1px solid #ccc',
                                borderRadius: "8px",
                                background: secondaryBackgroundColor
                            }}
                        />
                    </Flex>
                    <Flex flexDir={"column"} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <div
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                    style={{
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderTop: '1px solid #ccc'
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <Flex w={"full"} justifyContent={"center"} p={"10px"} borderTop= '1px solid #ccc' >No options found</Flex>
                        )}
                    </Flex>
                </div>
            )}
        </Flex>
    );
}
