import { Card } from "./Card"

const CardWrapper = ({numberOfLikes , numberOfItemsInCart , numberOfPayments}) => {

    return <>
     <div className='grid gap-6 md:grid-cols-3 mb-8'>
    <Card title='محصولات لایک شده' href="/profile/likedProducts" value={numberOfLikes} type='likes'/>
    <Card title='محصولات پرداخت شده' href="/profile/payments" value={numberOfPayments} type='payments'/>
    <Card title=' سبد خرید فعلی' href="/cart" value={numberOfItemsInCart} type='cart'/>
   </div>
    </>
}


export default CardWrapper