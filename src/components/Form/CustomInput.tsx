import { Flex, useColorMode, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputGroup, Input, InputRightElement, VStack } from '@chakra-ui/react'
import CustomText from '../general/Text';
import useCustomTheme from '@/hooks/useTheme';

interface IProps {
  isPassword?: boolean;
  label?: string;
  labelTextSize?: string;
  required?: boolean;
  name: string;
  type: 'text' | 'tel' | 'email' | 'date' | 'password' | "phone"
  placeholder: string,
  disable?: boolean
  value?: any,
  ref?: any,
  hint?: null | string;
  textColor?: string;
  newbtn?: boolean
}

export const CustomInput = ({ isPassword = false, name, type, placeholder, disable, newbtn, value, ref, hint = null, textColor, label, labelTextSize = '16px', required = false }: IProps) => {
  
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [newValue, setNewValue] = React.useState(value);

  const { 
    mainBackgroundColor,
    borderColor
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleChangeName = (e: any) => {
    const value = e.target.value;

    // Regex pattern to only allow letters
    const regex = /^[a-zA-Z]*$/;

    console.log(value);
    
    if(name === "phone"){

      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setValue(name, value);
        setNewValue(value)
      }
    } else if (regex.test(value)) {
      setValue(name, value);
      setNewValue(value)
    }
  };

  const newdata = watch(name)


  return (
    (<VStack alignItems={'flex-start'} width='100%'>
      {label && (
        <HStack>
          <Text fontSize={labelTextSize}>{label}
          </Text>
          {required && <Text color="red">*</Text>}
        </HStack>
      )}
      <InputGroup>
        {isPassword && (
          <InputRightElement>
            {isPassword && (
              <Flex
                h={"45px"}
                px={"5"}
                justifyContent={"center"}
                alignItems={"center"}
                as={"button"}
                pt={"3px"}
                type='button'
                onClick={() => setShowPassword(!showPassword)}  >
                {!showPassword ? <FiEyeOff color={"black"} /> : <FiEye color={"black"} />}
              </Flex> 
            )}
          </InputRightElement>
        )}
        {name === "firstName" || name === "lastName "|| name === "phone" ?
          <Input
            width={'100%'}
            onChange={handleChangeName}
            placeholder={placeholder}
            data-date="DD MMMM YYYY"
            lang='pt_BR'
            value={newValue ?? value}
            disabled={disable} 
            height={"45px"}
            rounded={newbtn ? "32px" : "8px"}
            borderColor={borderColor} 
            bgColor={mainBackgroundColor}
            // value={value? value: ""}
            type={isPassword ? (showPassword ? 'text' : 'password') : type === "phone" ? "tel" : type}
          /> 
          :
          <Input
            width={'100%'}
            {...register(name, {
              required: true,
              pattern: /^[A-Za-z]+$/i
            })}
            bgColor={mainBackgroundColor}
            placeholder={placeholder}
            borderColor={borderColor}
            height={"45px"}
            data-date="DD MMMM YYYY"
            lang='pt_BR' 
            rounded={newbtn ? "32px" : "8px"}
            disabled={disable}  
            value={newdata}
            type={isPassword ? (showPassword ? 'text' : 'password') : type === "phone" ? "tel" : type}
          />
        }
      </InputGroup>
      {hint && <small>{hint}</small>}
      {errors[name] && <CustomText textAlign={'left'} color='red' fontSize={'sm'}>{errors[name]?.message as string}</CustomText>}
    </VStack>)
  );
}