import NotificationPage from '@/components/notification/NotificationsPage'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Notifications() {
  return (
    <Flex w={"full"} h={"full"} p={"6"} flexDir={"column"} overflow={"hidden"} gap={"4"} alignItems={"center"} >
        <Text fontSize={"2xl"} fontWeight={"bold"} >Notification</Text>
        <Flex w={"full"} flex={"1"} flexDir={"column"} overflowY={"auto"} alignItems={"center"} gap={"4"} borderWidth={"1px"} maxW={"500px"} >
          <NotificationPage />
        </Flex>
    </Flex>
  )
}

export default Notifications