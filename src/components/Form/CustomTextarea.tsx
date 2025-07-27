import { InputElementProps, Textarea, Text } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface IProps {
    name: string;
    placeholder: string;
    label?: string;
    hint?: string;
    required?: boolean;
}


export const CustomTextArea = ({ name, placeholder, label, hint, required = false }: IProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            {label && <Text fontSize={'16px'}>{label} {required && <sup style={{ color: 'red' }}>*</sup>}</Text>}
            <div className="relative w-full">
                <Textarea
                  {...register(name)} 
                  className="w-full h-40 rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2 placeholder:text-chasescrollTextGrey text-chasescrollTextGrey"
                  cols={5}
                  rows={7}
                  lang='pt_BR'
                  placeholder={placeholder}
                  resize='none'
                  size='lg'
                />
                
              </div>
              { errors[name] && <Text color='red' fontSize="12px" >{errors[name]?.message as string}</Text> }
              {hint && <Text fontSize='14px'>{hint}</Text>}
        </>
    )
}