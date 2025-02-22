import AddOrUpdateProduct from '@/components/dashboard/products/Add-Update-Product'
import BreadCrumbs from '@/components/ui/BreadCrumbs'
import React from 'react'

const CreateProductPage = () => {
  return (
    <>
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
                    label : 'ایجاد محصول ' ,
                    href : '/admin/dashboard/products/create', 
                    active : true
                  }
                ]}/>
    <div className='flex flex-col justify-center items-center lg:gap-y-10 gap-y-5'>
      <h1 className='h2'>ایجاد محصول جدید</h1>
        <AddOrUpdateProduct />
    </div>
    </>
    
  )
}

export default CreateProductPage