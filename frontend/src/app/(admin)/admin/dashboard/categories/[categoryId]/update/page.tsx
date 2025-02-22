import AddOrUpdateCategory from '@/components/dashboard/category/Add-UpdateCategory';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Fallback from '@/components/ui/Fallback';
import { getCategoryByIdApi } from '@/services/categoryServices'
import React, { Suspense } from 'react'

const UpdateCategoryPage = async ({params}) => {
  const {categoryId} = await params
  const {category} = await getCategoryByIdApi(categoryId)
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
                      label : 'بروزرسانی دسته بندی ' ,
                      href : `/admin/dashboard/categories/${categoryId}/update`, 
                      active : true
                    }
                  ]}/>
     <Suspense fallback={<Fallback />}>
     <AddOrUpdateCategory categoryToUpdate={category}/>
     </Suspense>
    </div>
  )
}

export default UpdateCategoryPage