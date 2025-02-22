import ShowOneProduct from "@/components/dashboard/products/ShowOneProduct"
import AddToCart from "@/components/products/AddToCart"
import BreadCrumbs from "@/components/ui/BreadCrumbs"
import { getProductBySlugApi } from "@/services/productServices"

const LikedProductDetailPage = async ({params}) => {
    const {slug} = await params
     const {product} = await getProductBySlugApi(slug)
  return (
    <>
    <BreadCrumbs breadCrumbs={[
        {
            label : 'صفحه پروفایل' , 
            href : '/profile'
        } ,
        {
            label : 'جزییات محصول' ,
            href : `/profile/payments/product/${slug}` ,
            active : true
        }
    ]}/>
    <h1 className="h2 mb-4">جزییات محصول لایک شده</h1>
<ShowOneProduct product={product}>
  <AddToCart product={product} label="افزودن به سبد خرید"/>
</ShowOneProduct>
    </>
   
  )
}

export default LikedProductDetailPage