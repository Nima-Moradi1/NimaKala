import AddOrUpdateProduct from '@/components/dashboard/products/Add-Update-Product'
import BreadCrumbs from '@/components/ui/BreadCrumbs'
import { getOneProductApi } from '@/services/productServices'

const UpdateProductPage = async ({params}) => {
  const {productId} = await params
  const {product} = await getOneProductApi(productId)
  return (
    <div>
           <BreadCrumbs breadCrumbs={[
                        {
                          label : 'داشبورد' ,
                          href : '/admin/dashboard'
                        },
                        {
                          label : 'محصولات' ,
                          href : '/admin/dashboard/products'
                        },
                        {
                          label : 'بروزرسانی محصول ' ,
                          href : `/admin/dashboard/products/${productId}/update`, 
                          active : true
                        }
                      ]}/>
            <AddOrUpdateProduct productToUpdate={product}/>
    </div>
  )
}

export default UpdateProductPage