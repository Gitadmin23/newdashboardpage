import React from 'react'
import HeaderLayout from './header_layout'
import { CommunitiesIcon, EventsIcon, NetworkIcon } from '@/components/svg'
import httpService from '@/utils/httpService'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { URLS } from '@/services/urls'

interface Props {
    user_index: string
}

function FundrasierHeader(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState("" as any)
    const router = useRouter()

    // react query
    const {  } = useQuery(['user-fund-raisers', user_index], () => httpService.get("/fund-raiser/user-fund-raisers"), {
        onError: (error: any) => { 
        },
        onSuccess: (data) => {  
            console.log(data);
            
            if(data){ 
                setData(data.data); 
            }
        }
    }) 

    return (
        <HeaderLayout name='Fundraising' count={data?.totalElements} icon={<CommunitiesIcon />} link={`/dashboard/profile/${user_index}/fundraising`} />
    )
}

export default FundrasierHeader
