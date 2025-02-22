import UsersTable from "@/components/dashboard/users/UsersTable"
import BreadCrumbs from "@/components/ui/BreadCrumbs"
import Fallback from "@/components/ui/Fallback"
import { getAllUsersApi } from "@/services/authServices"
import setCookieOnReq from "@/utils/SetCookieOnReq"
import { cookies } from "next/headers"
import { Suspense } from "react"

const UsersPage = async () => {
  const cookieStore = await cookies()
  const options = setCookieOnReq(cookieStore)
   const {users} = await getAllUsersApi(options)
  return (
    <div>
      <BreadCrumbs breadCrumbs={[
        {
          label : 'داشبورد' ,
          href : '/admin/dashboard'
        },
        {
          label : 'کاربران' ,
          href : '/admin/dashboard/users', 
          active : true
        }
      ]}/>
      <h1 className="h2 mb-5">لیست کاربران سایت</h1>
      <Suspense fallback={<Fallback />}>
      <div className="overflow-scroll">
      <UsersTable users={users}/>
      </div>
      </Suspense>
    </div>
  )
}

export default UsersPage