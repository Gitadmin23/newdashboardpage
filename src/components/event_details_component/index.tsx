"use client"
import { IMAGE_URL } from '@/services/urls'
import { Box, Button, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EventHeader from './event_header'
import EventCreator from './event_creator'
import EventDate from './event_date'
import EventUserOption from './event_user_options'
import OtherEventInfo from './other_event_info'
import EventLocationDetail from '../sharedComponent/event_location'
import SaveOrUnsaveBtn from '../sharedComponent/save_unsave_event_btn'
import { LuShare2 } from 'react-icons/lu'
import { BsChevronLeft } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import ModalLayout from '../sharedComponent/modal_layout'
import EventImage from '../sharedComponent/eventimage'
import SelectTicketNumber from './event_modal/select_ticket_number'
import RefundPolicy from './event_modal/refund_policy'
import PaymentMethod from './event_modal/payment_method'
import GetEventTicket from './get_event_ticket'
import ShareEvent from '../sharedComponent/share_event'
import useModalStore from '@/global-state/useModalSwitch'
import StripePopup from './event_modal/stripe_btn/stripe_popup'
import useStripeStore from '@/global-state/useStripeState'
import { loadStripe } from '@stripe/stripe-js'
import BlurredImage from '../sharedComponent/blurred_image'
import { useDetails } from '@/global-state/useUserDetails'
import MapComponent from '../sharedComponent/map_component'
import EventMap from './event_map_info'
import { ScanIcon } from '../svg'
import EventQrCode from './event_qrcode'
import { MdArrowBackIos } from 'react-icons/md'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import Scanner from '../modals/Events/Scanner'
import CustomButton from '../general/Button'
import useCustomTheme from '@/hooks/useTheme'

interface Props {
    dynamic?: boolean
    banner: any,
    eventID: any,
    userBy: any,
    eventName: any,
    eventLogo: any,
    attendees: any,
    price: any,
    convener: any,
    timeAndDate: any,
    endtimeAndDate: any,
    location: any,
    locationType: any,
    about: any,
    isFree: any,
    currency: any,
    isOrganizer: any,
    isBought: any,
    minPrice: any,
    maxPrice: any,
    username: any,
    dataInfo: any,
    ticketBought: any,
    ticketInfo: any,
}

function EventDetails(props: Props) {
    const {
        dynamic,
        banner,
        eventID,
        userBy,
        eventName,
        eventLogo,
        // attendees,
        price,
        convener,
        timeAndDate,
        endtimeAndDate,
        location,
        locationType,
        about,
        isFree,
        currency,
        isOrganizer,
        isBought,
        minPrice,
        maxPrice,
        username,
        dataInfo,
    } = props


    const { category, setCategory } = useModalStore((state) => state);
    const [showScanner, setShowScanner] = React.useState(false);

    const [isCollaborator, setIsCollaborator] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);

    const router = useRouter()

    const { userId, email } = useDetails((state) => state);

    const clickHander = () => {
        if (!email && !userId) {
            router.push("/")
        } else {
            router.back()
        }
    }

    useEffect(() => {
        const ids = dataInfo?.collaborators?.map((item: any) => item.userId);
        const adminIds = dataInfo?.admins?.map((item: any) => item.userId);

        if (ids?.includes(userId)) {
            setIsCollaborator(true);
        }
        if (adminIds?.includes(userId)) {
            setIsAdmin(true);
        }
    }, [])

    const {
        headerTextColor
      } = useCustomTheme();

    return (
        <Box width={"full"} display={"flex"} flexDirection={"column"} pt={["", "", "2"]} position={"relative"} paddingBottom={"12"} >
            <Flex w={"full"} display={["flex", "flex", "none"]} px={"4"} justifyContent={"space-between"} alignItems={"center"} >
                <Box as='button' onClick={() => clickHander()}>
                    <MdArrowBackIos color={headerTextColor} size={"24px"} />
                </Box>
                <Text color={headerTextColor} fontWeight={"bold"} lineHeight={"22px"} >Event Details</Text>
                <ShareEvent home={true} notext={true} data={dataInfo} id={dataInfo?.id} type="EVENT" eventName={textLimit(eventName, 20)} />
            </Flex>
            <Flex width={"full"} flexDirection={["column", "column", "row"]} alignItems={"start"} position={"relative"} justifyContent={"center"} >
                <Box height={["230px", "230px", "350px"]} px={["4", "4", "0px"]} mt={["4", "4", "0px"]} position={"relative"} width={"full"} rounded={"16px"} roundedTopRight={"none"} >
                    <Box w={"42px"} position={"absolute"} top={"4"} left={"4"} h={"42px"} bg={"#FFFFFF40"} rounded={"full"} as='button' display={["none", "none", "flex"]} onClick={() => clickHander()}
                        // mt={"20px"} ml={(!email && !userId) ? "0px" : "-30px"} 
                        justifyContent={"center"} pl={"2"} alignItems={"center"} zIndex={"20"} >
                        <MdArrowBackIos color={"white"} size={"25px"} />
                    </Box>
                    <BlurredImage height={["230px", "230px", "350px"]} image={dataInfo?.currentPicUrl} />
                    {/* <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit="cover" alt={dataInfo?.currentPicUrl} width={"full"} height={"full"} src={IMAGE_URL + dataInfo?.currentPicUrl} /> */}
                    {!dynamic && (
                        <Box width={"fit-content"} h={"40px"} px={"2"} zIndex={"20"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} rounded={"md"} bg={"#101828D2"} position={"absolute"} bottom={"4"} right={"5"}  >
                            <SaveOrUnsaveBtn indetail={true} event={dataInfo} size='24' />
                        </Box>
                    )}
                </Box>
            </Flex>
            <Box width={"full"} px={[dynamic ? "6" : "0px", "6"]}>
                <EventHeader name={eventName} event={dataInfo} maxPrice={maxPrice} minPrice={minPrice} currency={currency} />
                <EventCreator dynamic={dynamic} isOrganizer={isOrganizer} convener={convener} username={username} data={dataInfo} />
                <Flex display={["none", "none", "flex"]} py={"3"} justifyContent={"end"} alignItems={"center"} gap={"14"} >
                    <EventQrCode data={dataInfo} id={dataInfo?.id} />
                    <ShareEvent data={dataInfo} id={dataInfo?.id} type="EVENT" eventName={textLimit(eventName, 17)} />
                </Flex>
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} py={"3"} gap={6}>
                    <EventDate name='Event Start date and time' date={timeAndDate} />
                    <EventDate name='Event End date and time' date={endtimeAndDate} />
                    {!isCollaborator && (
                        <EventUserOption event={dataInfo} isOrganizer={isOrganizer} isBought={isBought} ticket={price} currency={currency} selectedticket={category} setCategory={setCategory} />
                    )}
                </Grid>
                <OtherEventInfo name={'About this event'} data={about} />
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} py={"3"} gap={6}>

                    <EventLocationDetail location={location} locationType={locationType} indetail={true} />
                    {(!isOrganizer && dataInfo?.eventMemberRole !== "ADMIN") && (
                        <GetEventTicket ticket={price} setSelectedTicket={setCategory} data={dataInfo} selectedTicket={category} isBought={isBought} isFree={isFree} />
                    )}

                    {(isOrganizer || isAdmin || isCollaborator) && (
                        <CustomButton display={['block', 'none']} onClick={() => setShowScanner(true)} color={"#12299C"} text='Scan Ticket' w={"full"} mt={"4"} backgroundColor={"white"} border={"1px solid #12299C75"} />
                    )}
                </Grid>
                {location?.address && (
                    <OtherEventInfo name={'Venue Details'} data={location?.address} />
                )}

                <EventMap latlng={location?.latlng} />

            </Box>

            <Scanner isOpen={showScanner} eventID={eventID} startDate={timeAndDate} endDate={endtimeAndDate} onClose={() => setShowScanner(false)} />
        </Box>
    )
}

export default EventDetails
