"use client";
import { use } from "react";
import DashboardDetail from "@/components/settings_component/event_dashboard_component/dashboard_detail"
import useCustomTheme from "@/hooks/useTheme";
import { Box, useColorMode } from "@chakra-ui/react"

export default function EventDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);

  const {
    mainBackgroundColor,
} = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return(
    <Box width={"full"} bg={mainBackgroundColor} >
      <DashboardDetail index={params?.slug} />
    </Box>
  )
}