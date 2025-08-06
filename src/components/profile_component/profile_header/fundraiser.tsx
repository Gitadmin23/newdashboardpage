import React from 'react'
import HeaderLayout from './header_layout'
import { CommunitiesIcon } from '@/components/svg'
import httpService from '@/utils/httpService' 
import { useQuery } from 'react-query' 

interface Props {
    user_index: string
}

function FundrasierHeader(props: Props) {
    const {
        user_index
    } = props
 
    const [data, setData] = React.useState("" as any) 

    // react query
    const {  } = useQuery(['user-fund-raisers', user_index], () => httpService.get(`/fund-raiser/search?creatorID=${user_index}`), {
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
