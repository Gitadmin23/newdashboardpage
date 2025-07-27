import { Box, HStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { FiX } from 'react-icons/fi'

function MediaBox({ children, onClose }: {
    children: ReactNode,
    onClose: () => void
}) {
    const [show, setShow] = React.useState(false);
  return (
    <Box onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)} maxWidth={'200px'} height='100%' borderRadius={'5px'} position={'relative'} display={'inline-block'} marginRight={'10px'}>
        <Box >
         {children}
        </Box>
        {show && (
            <HStack onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)} zIndex={10} onClick={onClose} width='20px' height='20px' borderRadius={'10px'} justifyContent={'center'} alignItems={'center'} bg="white" position={'absolute'} top='-10px' right='-10px' cursor={'pointer'}>
                <FiX fontSize='15px' color='black' />
            </HStack>
        )}
    </Box>
  )
}

export default MediaBox