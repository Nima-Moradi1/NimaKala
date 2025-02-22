import AddOrUpdateCategory from '@/components/dashboard/category/Add-UpdateCategory'
import BreadCrumbs from '@/components/ui/BreadCrumbs'
import React from 'react'

const CreateCategoryPage = () => {
  return (
    <div>
       <BreadCrumbs breadCrumbs={[
              {
                label : 'داشبورد' ,
                href : '/admin/dashboard'
              },
              {
                label : 'دسته بندی ها' ,
                href : '/admin/dashboard/categories'
              },
              {
                label : 'ایجاد دسته بندی ' ,
                href : '/admin/dashboard/categories/create', 
                active : true
              }
            ]}/>
      <h1 className='h2 text-center mb-5'>ایجاد دسته بندی جدید</h1>
      <AddOrUpdateCategory />
    </div>
  )
}

export default CreateCategoryPage