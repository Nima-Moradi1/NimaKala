import ShowOneProduct from '@/components/dashboard/products/ShowOneProduct'
import BreadCrumbs from '@/components/ui/BreadCrumbs'
import { getOneProductApi } from '@/services/productServices'

const DashboardSingleProductPage = async ({params}) => {
    const {productId} = await params
    const {product} = await getOneProductApi(productId)
  return (
    <div>
        <BreadCrumbs breadCrumbs={[
            {
                label : 'داشبورد' ,
                href : '/admin/dashboard' 
            } , 
            {
                label : 'محصولات سایت' ,
                href : '/admin/dashboard/products'
            },
            {
                label : 'جزییات محصول' ,
                href : `/admin/dashboard/products/${productId}`,
                active : true
            }
        ]}/>
       <ShowOneProduct product={product}/>
    </div>
  )
}

export default DashboardSingleProductPage