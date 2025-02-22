import AddCouponForm from '@/components/dashboard/coupons/Add-Update-CouponForm'
import BreadCrumbs from '@/components/ui/BreadCrumbs'
import { getAllProductsApi } from '@/services/productServices'


const AddCouponPage = async () => {

  const {products} = await getAllProductsApi()
  return (
    <div>
      <BreadCrumbs breadCrumbs={[
        {
          label: 'داشبورد' ,
          href : '/admin/dashboard'
        } ,
        {
          label : 'کد تخفیف ها' ,
          href : '/admin/dashboard/coupons' ,
        },
        {
          label : 'افزودن کد تخفیف' ,
          href : '/admin/dashboard/coupons/add' ,
          active : true
        }
      ]}/>
      <h1 className='h2 m-5'>اضافه کردن کد تخفیف جدید</h1>
      <AddCouponForm products={products}/>
    </div>
  )
}

export default AddCouponPage