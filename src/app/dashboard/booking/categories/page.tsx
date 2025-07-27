import CategoriesList from '@/components/booking_component/categories/categories_list'
import CategoryHeader from '@/components/booking_component/categories/header'
import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function Categories(props: Props) {
    const {} = props

    return (
        <Box width={"full"} >
            <CategoryHeader />
            <CategoriesList />
        </Box>
    )
}

export default Categories
