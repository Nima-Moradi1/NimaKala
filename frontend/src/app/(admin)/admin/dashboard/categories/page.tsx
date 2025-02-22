import { CreateCategory } from "@/components/dashboard/category/actionButtons"
import CategoriesTable from "@/components/dashboard/category/CategoriesTable"
import BreadCrumbs from "@/components/ui/BreadCrumbs"
import Fallback from "@/components/ui/Fallback"
import { Suspense } from "react"


const DashboardCategoriesTable = () => {
return (
  <div>
     <BreadCrumbs breadCrumbs={[
            {
              label : 'داشبورد' ,
              href : '/admin/dashboard'
            },
            {
              label : 'دسته بندی ها' ,
              href : '/admin/dashboard/categories', 
              active : true
            }
          ]}/>
    <div className="flex items-center justify-between mb-5">
    <h1 className="h2"> دسته بندی محصولات</h1>
    <CreateCategory />
    </div>
    <div className="overflow-x-scroll">
      <Suspense fallback={<Fallback />}>
    <CategoriesTable />
    </Suspense> 
    </div>
   
  </div>
)
}

export default DashboardCategoriesTable