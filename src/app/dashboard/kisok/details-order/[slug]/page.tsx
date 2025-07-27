import OrderDetail from '@/components/kisok/orderDetail'
import ProductDetails from '@/components/kisok/productDetails'  

type Props = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function KisokDetails(props: Props) {
    const params = await props.params;
    // read route params
    const id = params.slug

    return (
        <OrderDetail id={id} />
    )
}
