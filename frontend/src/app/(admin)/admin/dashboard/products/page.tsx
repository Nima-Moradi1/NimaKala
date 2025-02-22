import { CreateProduct } from '@/components/dashboard/products/actionButtons'
import ProductsTable from '@/components/dashboard/products/ProductsTable'
import BreadCrumbs from '@/components/ui/BreadCrumbs'
import Fallback from '@/components/ui/Fallback'
import { getAllProductsApi } from '@/services/productServices'
import setCookieOnReq from '@/utils/SetCookieOnReq'
import { cookies } from 'next/headers'
import React, { Suspense } from 'react'

const DashboardProductsTable = async () => {
  const cookieStore = await cookies()
  const options = setCookieOnReq(cookieStore)
  const {products} = await getAllProductsApi('', options)
  return (
    <div>
       <BreadCrumbs breadCrumbs={[
                    {
                      label : 'داشبورد' ,
                      href : '/admin/dashboard'
                    },
                    {
                      label : 'محصولات سایت' ,
                      href : '/admin/dashboard/products', 
                      active : true
                    }
                  ]}/>
      <div className='w-full flex items-center justify-between mb-5'>
      <h1 className='h2'>صفحه محصولات فروشگاه</h1>
      <CreateProduct />
      </div>
      <div className='overflow-x-scroll'>
        <Suspense fallback={<Fallback />}>
      <ProductsTable products={products}/>
      </Suspense>
      </div>
      
    </div>
  )
}

export default DashboardProductsTable