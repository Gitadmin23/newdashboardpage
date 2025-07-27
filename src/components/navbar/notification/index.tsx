import SearchComponent from '@/components/search_component'
import useSearchStore from '@/global-state/useSearchData'
import { THEME } from '@/theme'
import {
    InputGroup, InputLeftElement, Input, Box, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor, useColorMode,
} from '@chakra-ui/react'
import React from 'react'
import { FiBell } from 'react-icons/fi'
import { IoSearchOutline } from 'react-icons/io5'
import NotificationPage from './NotificationsPage'
import { INotification } from '@/models/Notifications'
import CustomText from '@/components/general/Text'
import {Notification} from 'iconsax-react'
import { useNotification } from '@/global-state/useNotification'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import useCustomTheme from "@/hooks/useTheme";

interface Props { }

function NotificationBar(props: Props) {
    const { } = props
    const [active, setActive] = React.useState(false);
    const[page, setPage] = React.useState(0);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { count, setAllCount } = useNotification((state) => state);

    const {isLoading, isError } = useQuery(['getNotifications', page], () => httpService.get(`${URLS.GET_NOTIFICATIONS}`, {
        params: {
            page,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<INotification> = data.data;
            const unrread = item.content.filter((item) => item.status === 'UNREAD');
            setAllCount({ count: unrread.length, notifications: item.content });
        },
        onError: () => {}
    })

    return (
        <Popover  >
             <PopoverTrigger>
                <Box position={'relative'} display={["none", "block"]} >
                    <Notification color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' onClick={() => setActive(prev => !prev)} />
                    { count > 0 && <Box width={'10px'} height={'10px'} bg='red' borderRadius={'5px'} position={'absolute'} top='0' right='0' /> }
                </Box>
                {/* <CustomText position={'absolute'} top='-10px' right='0'></CustomText> */}
             </PopoverTrigger>
             <PopoverContent width={['auto', '400px']} bg={secondaryBackgroundColor} padding='0px'>
                <PopoverBody width='100%' padding='5px' height={'auto'} overflowY={'auto'}>
                    <NotificationPage isLoading={isLoading} />
                </PopoverBody>
             </PopoverContent> 
        </Popover >
    )
}

export default NotificationBar
