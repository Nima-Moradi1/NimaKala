import AddOrUpdateCouponForm from "@/components/dashboard/coupons/Add-Update-CouponForm"
import BreadCrumbs from "@/components/ui/BreadCrumbs"
import { getOneCouponApi } from "@/services/couponServices"
import { getAllProductsApi } from "@/services/productServices"
import setCookieOnReq from "@/utils/SetCookieOnReq"
import { cookies } from "next/headers"

const UpdateCouponPage = async ({params}) => {
const {id} = await params
const cookieStore = await cookies()
const options = setCookieOnReq(cookieStore)
const {coupon} = await getOneCouponApi(id ,options)
const {products} = await getAllProductsApi()
  return (
    <div>
      <BreadCrumbs breadCrumbs={[
        {
          label : 'داشبورد' ,
          href : '/admin/dashboard'
        } ,
        {
          label : ' کد تخفیف ها',
          href : '/admin/dashboard/coupons'
        } ,
        {
          label : 'بروزرسانی کد' ,
          href : `/admin/dashboard/coupons/${id}/update` ,
          active : true
        }
      ]}/>
      <h1 className="h2 mb-10">آپدیت کد تخفیف &quot;{coupon?.code}&quot;</h1>
      <AddOrUpdateCouponForm products={products} couponToUpdate={coupon}/>
    </div>
  )
}

export default UpdateCouponPage