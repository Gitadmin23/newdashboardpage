import { Box } from '@chakra-ui/react'
import React from 'react'
import ReportCommunityCard from '../ReportCommunityCard'
import PromotionCommunityCard from '../PromotionCommunity'

function Community({
  pageType
}: {
  pageType: "TRANSACTION"|"PROMOTION"
}) {
  return (
    <Box width="100%" height='100%'>
        {pageType === 'TRANSACTION' && (
          <>
            <ReportCommunityCard />
            <ReportCommunityCard />
            <ReportCommunityCard />
            <ReportCommunityCard />
            <ReportCommunityCard />
            <ReportCommunityCard />
            <ReportCommunityCard />
          </>
        )}

      {pageType === 'PROMOTION' && (
          <>
            <PromotionCommunityCard />
            <PromotionCommunityCard />
            <PromotionCommunityCard />
            <PromotionCommunityCard />
            <PromotionCommunityCard />
            <PromotionCommunityCard />
            <PromotionCommunityCard />
          </>
        )}
    </Box>
  )
}

export default Community