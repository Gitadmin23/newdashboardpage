import CustomButton from "@/components/general/Button";
import ModalLayout from "@/components/sharedComponent/modal_layout";
import useProductStore from "@/global-state/useCreateProduct";
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Input, Text, useToast } from "@chakra-ui/react";
import { clone } from "lodash";
import { useEffect, useState } from "react";
import Select from 'react-select';


export default function SizeSelector() {


    const customStyles = {
        control: (provided: any) => ({
          ...provided,
          borderRadius: "999px", // rounded edges for the input box
          padding: "2px",
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: "12px", // rounded edges for the dropdown menu
        }),
        menuList: (provided: any) => ({
            ...provided,
            borderRadius: "12px", // inside menu list
        }),
      };

    const SizeOptions = [
        { value: 'XS', label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
        { value: 'XXL', label: 'XXL' },
        { value: 'XXXL', label: 'XXXL' }
      ];
    const [selectedOptions, setSelectedOptions] = useState<Array<{label: string, value: string}>>([]);
    const [open, setOpen] = useState(false)
    const { primaryColor } = useCustomTheme()
    const { productdata, updateProduct } = useProductStore((state) => state);

    const { headerTextColor } = useCustomTheme()

    const toast = useToast()
    const [customColor, setCustomColor] = useState({
        label: "",
        value: ""
    })


    useEffect(()=> { 
        const transformedData: any = productdata?.size?.map((item: any) => ({
            value: item,
            label: item
        }));
        setSelectedOptions(transformedData)
    }, [])

    
    const handleChange = (selected: any) => {


        const hexValues = selected.map((color: any) => color.value);

        setSelectedOptions(selected);

        console.log(hexValues);
        

        updateProduct({...productdata, size: [...hexValues]})
    };

    console.log(productdata);

    const clickHandler = () => {

        if(!customColor?.label || !customColor?.value){
            toast({
                status: "warning",
                description: "Enter Your Custom Color Name and Code"
            })
            return
        } else {
            if(selectedOptions?.some((item) => item?.label === customColor?.label || item?.value === customColor?.value)){
                toast({
                    status: "warning",
                    description: "Color Name or Code Already exist"
                })
                return
            }
            const clone = [...selectedOptions] as Array<{label: string, value: string}>
    
            clone.push({
                label: customColor?.label+"",
                value: customColor?.value+""
            })
    
            setSelectedOptions(clone)
            setOpen(false)
        }
    }

    return (
        <Flex gap={"2"} w={"full"} color={"black"} flexDir={"column"} >
            <Text fontWeight={"500"} color={headerTextColor} >Size</Text>
            <Select
                isMulti
                name="tags"
                options={SizeOptions}
                styles={customStyles}
                className="basic-multi-select "
                classNamePrefix="select"
                onChange={handleChange}
                value={selectedOptions}
            />
            <Text w={"fit-content"} fontSize={"14px"} type="button" as={"button"} onClick={()=> setOpen(true)} color={primaryColor} >Add Custom Size</Text>
            <ModalLayout open={open} close={setOpen} size={"xs"} >
                <Flex w={"full"} flexDir={"column"} gap={"3"} p={"4"} >
                    <Text fontWeight={"600"} color={primaryColor} >Custom Size Form </Text>
                    <Flex gap={"2"} flexDir={"column"} > 
                        <Text fontSize={"14px"} fontWeight={"500"} >Size</Text>
                        <Input onChange={(e)=> setCustomColor({
                            ...customColor, label: e.target.value, value: e.target.value,
                        })} w={"full"} rounded={"lg"} fontSize={"14px"} />
                    </Flex>
                    {/* <Flex gap={"2"} flexDir={"column"} > 
                        <Text fontSize={"14px"} fontWeight={"500"} >Size Number</Text>
                        <Input onChange={(e)=> setCustomColor({
                            ...customColor, value: e.target.value
                        })} w={"full"} rounded={"lg"} fontSize={"14px"} placeholder="hex code eg #055696 " />
                    </Flex> */}
                    <CustomButton onClick={clickHandler} type="button" text="Add Size" mt={"3"} borderRadius={"999px"} />
                </Flex>
            </ModalLayout>
        </Flex>
    )
}