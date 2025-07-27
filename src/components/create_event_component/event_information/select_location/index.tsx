import useEventStore from '@/global-state/useCreateEventState';
import { Box, Checkbox, Flex, Input, Select, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import SelectMap from '../select_map';
import { IoAdd, IoClose } from 'react-icons/io5';
import useCustomTheme from '@/hooks/useTheme';

interface Props { }

function SelectLocation(props: Props) {
    const { } = props

    const { eventdata, updateEvent, updateRental, updateService, rental, service, state: newState, addState } = useEventStore((state) => state);
    const [selectType, setSelectType] = useState("")

    const [links, setLink] = useState<Array<string>>([])

    const {
        primaryColor
    } = useCustomTheme()

    useEffect(() => {
        if (eventdata?.location?.links) {
            if (eventdata?.location?.links?.length > 0) {
                setLink([...eventdata?.location?.links])
            }
        }
    }, [])


    const handleToBeAnnounced = (event: any) => {
        if (event?.target?.checked) {
            updateEvent({
                ...eventdata,
                location: {
                    ...eventdata.location,
                    toBeAnnounced: event?.target?.checked,
                    link: "",
                    locationDetails: ""
                }
            })
        } else {
            updateEvent({
                ...eventdata,
                location: {
                    ...eventdata.location,
                    toBeAnnounced: event?.target?.checked,
                    link: "",
                    locationDetails: ""
                }
            })
        }
    }

    const changeHandler = (item: any) => {
        updateEvent({
            ...eventdata,
            locationType: item
        })
        setSelectType(item)
    }

    React.useEffect(() => {
        if (eventdata?.location?.link && eventdata?.location?.locationDetails) {
            setSelectType("Hybrid Location")
        } else if (eventdata?.location?.locationDetails) {
            setSelectType("Physical Location")
        } else if (eventdata?.location?.link) {
            setSelectType("Online Location")
        }
    }, [eventdata?.location?.link, eventdata?.location?.locationDetails])

    const linkChangeHandler = (item: any, index: number) => {
        const clone = [...links]

        clone[index] = item

        updateEvent({
            ...eventdata,
            location: {
                ...eventdata.location,
                link: clone[0],
                links: clone
            }
        })
        setLink(clone)
        // set
    }
    // Function to add a new string
    const addString = () => {
        setLink((prevStrings) => [...prevStrings, ""]);
    };

    const removeString = (index: number) => {

        const clone = [...links]
        clone.splice(index, 1);


        updateEvent({
            ...eventdata,
            location: {
                ...eventdata.location,
                link: clone[0],
                links: clone
            }
        })
        setLink(clone)

    };

    const [state, setState] = useState("")


    const statesInNigeria = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara"
    ];

    return (
        <Box width={"full"}>
            <Box width={"full"} >
                {!eventdata?.location?.toBeAnnounced && (
                    <Box width={"full"} >
                        {/* <h1 className="text-base font-bold">Location Type</h1> */}
                        <Box>
                            <Flex justifyContent={"space-between"} alignItems={"center"} py={"4"} borderTop={"1px solid #E2E8F0"} borderBottom={"1px solid #E2E8F0"} >
                                <label style={{ display: "block", fontWeight: "bold" }} >
                                    Location Type
                                </label>
                                <Select
                                    width={"180px"}
                                    h={"45px"}
                                    fontSize={"sm"}
                                    name='locationType'
                                    rounded={"full"}
                                    onChange={(e) => changeHandler(e.target.value)}
                                    value={selectType} >
                                    <option value="">add location</option>
                                    <option>Physical Location</option>
                                    <option>Online Location</option>
                                    <option>Hybrid Location</option>
                                </Select>
                            </Flex>
                            {(selectType === "Physical Location" || selectType === "Hybrid Location" || eventdata?.location?.locationDetails) && (
                                <Box width={"full"} mt={"4"}  >
                                    <Text>Enter Address</Text>
                                    <SelectMap />
                                </Box>
                            )}
                            {(selectType === "Online Location" || selectType === "Hybrid Location" || eventdata?.location?.link) && (
                                <Box width={"full"} mt={"4"} >
                                    <Text mb={"2"} >Enter Online Url</Text>
                                    {links?.length <= 0 && (
                                        <Input
                                            type="text"
                                            h={"45px"}
                                            fontSize={"sm"}
                                            p={"3"}
                                            width={"full"}
                                            rounded={"full"}
                                            placeholder="Enter Online Link"
                                            name="organizer"
                                            onChange={({ target: { value } }) => updateEvent({
                                                ...eventdata,
                                                location: {
                                                    ...eventdata.location,
                                                    link: value
                                                }
                                            })}
                                            value={eventdata?.location?.link}
                                        />
                                    )}
                                    <Flex flexDir={"column"} gap={"4"} >
                                        {links?.map((item: string, index: number) => {
                                            return (
                                                <Flex key={index} gap={"3"} w={"full"} alignItems={"center"} >
                                                    <Input
                                                        type="text"
                                                        h={"45px"}
                                                        fontSize={"sm"}
                                                        p={"3"}
                                                        width={"full"}
                                                        rounded={"full"}
                                                        placeholder="https://exmaple.com"
                                                        name="organizer"
                                                        onChange={({ target: { value } }) => linkChangeHandler(value, index)}
                                                        value={item}
                                                    />
                                                    {links?.length > 1 && (
                                                        <Flex onClick={() => removeString(index)} role='button'  >
                                                            <IoClose size={"25px"} />
                                                        </Flex>
                                                    )}
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                </Box>
                            )}
                            {(selectType === "Online Location" || selectType === "Hybrid Location" || eventdata?.location?.link) && (
                                <Flex role='button' onClick={() => addString()} gap={"3"} mt={"5"} alignItems={"center"} >
                                    <IoAdd size="20px" color={primaryColor} />
                                    <Text color={primaryColor} fontWeight={"600"} >Add New Meeting link</Text>
                                </Flex>
                            )} 
                        </Box>
                    </Box>
                )}
            </Box>
            <Flex width={"full"} justifyContent={"space-between"} py={"4"} px={"2"} borderBottom={"1px solid #E2E8F0"} >
                <label style={{ color: "#667085" }} >To be announced</label>
                <Checkbox
                    type="checkbox"
                    name='toBeAnnounced'
                    width={"4"}
                    height={"4"}
                    mt={"2"}
                    mr={"2"}
                    // className="form-checkbox mt-2 mr-2 h-4 w-4 text-blue-600"
                    isChecked={eventdata?.location?.toBeAnnounced}
                    onChange={handleToBeAnnounced}
                />
            </Flex>
            <Box width={"full"} mt={"3"} mb={"2"} >
                <Text fontWeight={"bold"} mb={"2"} >Venue Details</Text>
                <Textarea
                    placeholder="Example: Behind chevron gas station "
                    width={"full"}
                    px={"4"}
                    py={"2"}
                    rounded={"24px"}
                    // className="border w-full px-4 py-2 outline-none"
                    rows={4}
                    cols={48}
                    value={eventdata?.location?.address}
                    onChange={({ target: { value } }) => updateEvent({
                        ...eventdata,
                        location: {
                            ...eventdata.location,
                            address: value
                        }
                    })}
                />
            </Box>
            {/* {(selectType === "Physical Location" || selectType === "Hybrid Location" || eventdata?.location?.locationDetails) && (
                <SelectMap />
            )} */}
        </Box>
    )
}

export default SelectLocation
