import CustomText from '@/components/general/Text'
import { Button, Modal, ModalBody, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    isOpen: boolean;
    type: 'EVENT'|'POST'|'COMMUNITY';
    onClose: () => void;
}

const PromotionCreationModal = ({
    isOpen,
    type,
    onClose
}:IProps) => {

    const handleTitle = React.useCallback(() =>{
        const obj = {
            EVENT: 'Event',
            POST:'Post',
            COMMUNITY:'Community'
        }
        return obj[type];
    }, [type]);
  return (
    <Modal isOpen={isOpen} isCentered onClose={() =>onClose()} closeOnOverlayClick={false} closeOnEsc={false} size={'md'}>
        <ModalOverlay />
        <ModalContent borderRadius={'30px'} height={'350px'}>
            <ModalBody>
                <VStack justifyContent={'center'} spacing={4} height='100%'>
                    <CustomText fontFamily={'DM-Medium'} fontSize={'24px'} color='black'>{handleTitle()} Created Successfully!</CustomText>
                    <CustomText textAlign={'center'} fontFamily={'DM-Regular'}fontSize={'16px'} color={'grey'}>
                        Congratulations! Your {handleTitle()} has been created
                        successfully. Would you like to promote your {handleTitle()}
                        and reach a larger audience?
                        Click the promote button below. 
                    </CustomText>

                    <Button variant={'solid'} height={'50px'} borderRadius={'25px'} bg="#5D70F9" color='white' fontFamily={'DM-Medium'}>
                        Promote Your Event
                    </Button>

                    <Button onClick={() =>onClose()} variant={'ghost'} color={'brand.chasescrollButtonBlue'}>Not Now</Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default PromotionCreationModal
