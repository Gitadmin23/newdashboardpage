import { formatNumber } from '@/utils/numberFormat'
import { Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    maxPrice: any,
    minPrice?: any,
    currency: any,
    indetail?: boolean,
    font?: any
}

function EventPrice(props: Props) {
    const {
        maxPrice,
        minPrice,
        currency,
        indetail,
        font
    } = props 

    const DataFormater = (number: number, prefix: string) => {
        if(number >= 1000000000){
          return (prefix)+(number/1000000000)?.toString() + 'B';
        }else if(number >= 1000000){
          return (prefix)+(number/1000000)?.toString() + 'M';
        }else if(number >= 1000){
          return (prefix)+(number/1000)?.toString() + 'K';
        }else{
          return (prefix)+(number ? number : 0)?.toString();
        }
    }

    return (
        <Text fontSize={font ? font : ["13px", "13px", "16px"]} >
            {!indetail && (
                <>
                    {(minPrice === 0 && maxPrice === 0) || (!minPrice && !maxPrice) ?
                        "Free" :
                        <>
                            {minPrice === maxPrice && (
                                <>
                                    {minPrice ? DataFormater(minPrice, currency === "USD" ? "$" : "₦") : "0"}
                                </>
                            )}
                            {minPrice !== maxPrice && (
                                <>
                                    {minPrice ? DataFormater(minPrice, currency === "USD" ? "$" : "₦") : minPrice === 0 ? "Free" :  "0"}
                                    {" - "}
                                    {maxPrice ? DataFormater(maxPrice, currency === "USD" ? "$" : "₦") : "0"}
                                </>
                            )}
                        </>
                    }
                </>
            )}
            {indetail && (
                <>
                    {(minPrice === 0 && maxPrice === 0) ?
                        "Free" :
                        <>
                            {minPrice === maxPrice && (
                                <>
                                    {formatNumber(minPrice, currency === "USD" ? "$" : "₦")}
                                </>
                            )}
                            {minPrice !== maxPrice && (
                                <>
                                    {formatNumber(minPrice, currency === "USD" ? "$" : "₦")}
                                    -
                                    {formatNumber(maxPrice, currency === "USD" ? "$" : "₦")}
                                </>
                            )}
                        </>
                    }
                </>
            )}
        </Text>
    )
}

export default EventPrice
