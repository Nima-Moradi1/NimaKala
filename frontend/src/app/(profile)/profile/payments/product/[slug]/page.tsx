import ShowOneProduct from "@/components/dashboard/products/ShowOneProduct"
import AddToCart from "@/components/products/AddToCart"
import BreadCrumbs from "@/components/ui/BreadCrumbs"
import { getProductBySlugApi } from "@/services/productServices"

const UserPaidProductByPage = async ({params}) => {
    const {slug} = await params
     const {product} = await getProductBySlugApi(slug)
  return (
    <>
    <BreadCrumbs breadCrumbs={[
      {
        label : 'پروفایل' , 
        href : '/profile'
    } ,
        {
            label : 'پرداخت های من' , 
            href : '/profile/payments'
        } ,
        {
            label : 'جزییات محصول پرداخت شده' ,
            href : `/profile/payments/product/${slug}` ,
            active : true
        }
    ]}/>
    <h1 className="h2 mb-4">جزییات محصول خریداری شده</h1>
<ShowOneProduct product={product}>
  <AddToCart product={product} label="خرید مجدد این محصول"/>
</ShowOneProduct>
    </>
   
  )
}

export default UserPaidProductByPage