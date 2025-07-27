import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { FiMinus, FiX } from 'react-icons/fi'

function MediaBox({ children, onClose }: {
    children: ReactNode,
    onClose: () => void
}) {
    
    const [show, setShow] = React.useState(false);

    return (
        <Box display={"flex"} onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)} w={"fit-content"} height='100px' borderRadius={'5px'} position={'relative'} >
            <Box >
                {children}
            </Box>
            {show && ( 
                <VStack  onMouseOver={() => setShow(true)}  onMouseOut={() => setShow(false)} onClick={onClose} cursor={'pointer'} alignItems={'center'} justifyContent={'center'} width={'20px'} height={'20px'} borderRadius={'10px'} bg='red' position={'absolute'} top='-10px' right={'-10px'}>
                    <FiMinus color='white' size='15px' />
                </VStack>
            )}
        </Box>
    )
}

export default MediaBox