"use client"
import EventListing from '@/components/event_component/event_listing'
import { Flex } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import MyEvent from '../event/my_event/page';
import SavedEvent from '../event/saved_event/page';
import PastEvent from '../event/past_event/page';
import Draft from '../event/draft/page';

export default function EventPage() {

  const query = useSearchParams();
  const type = query?.get('type');

  return (
    <Flex w={"full"} flexDir={"column"}  py={["6", "8", "8"]} >
      {!type && ( 
        <EventListing landing={true} eventdashboard={true} />
      )}
      {type === "my_event" && (
        <MyEvent />
      )}
      {type === "saved_event" && (
        <SavedEvent />
      )}
      {type === "past_event" && (
        <PastEvent />
      )}
      {type === "draft" && (
        <Draft />
      )}
    </Flex>
  )
}
