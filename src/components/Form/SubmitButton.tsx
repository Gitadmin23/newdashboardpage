import useCustomTheme from '@/hooks/useTheme';
import { Button } from '@chakra-ui/react'
import React from 'react'

function SubmitButton({
    isDisabled = false,
    isLoading = false,
    title = 'Sign up'
}: {
    isDisabled?: boolean,
    isLoading?: boolean,
    title?: string
}) {

  const {
    borderColor,
    primaryColor
} = useCustomTheme();


  return (
    <Button
    w='100%'
    height={'42px'}
    backgroundColor={primaryColor}
    color='white'
    type="submit"
    isLoading={isLoading}
    disabled={isDisabled}
    className={`${isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer"
        } bg-chasescrollBlue text-white py-2.5 text-center rounded-lg font-bold text-xl`}
    >
    {isLoading ? 'Submitting':title}
     </Button>
  )
}

export default SubmitButton