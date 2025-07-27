import Qr_code from '@/components/modals/send_message/Qr_code';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import { ScanIcon } from '@/components/svg'
import {Flex, Text, useColorMode} from '@chakra-ui/react'
import React, { useState } from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    id: any,
    data?: any;
    notext?: boolean
}

function EventQrCode(props: Props) {
    const {
        id,
        data,
        notext
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const [open, setOpen] = useState(false)

    const CloseModal = () => {
        setOpen(false)
    }

    return (
        <>
            <Flex onClick={() => setOpen(true)} as={"button"} gap={"11px"} >
                {!notext && (
                    <Text color={colorMode ==='light' ? "#3C41F0":bodyTextColor} >Get Event QR Code</Text>
                )}
                <ScanIcon color={bodyTextColor} />
            </Flex>

            <ModalLayout open={open} close={CloseModal} titlecolor={"black"} title={""} >
                <Qr_code data={data} close={CloseModal} id={id} />
            </ModalLayout>
        </>
    )
}

export default EventQrCode
