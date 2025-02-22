import UserPaymentsTable from "@/components/payment/UserPaymentsTable"
import BreadCrumbs from "@/components/ui/BreadCrumbs"
import Fallback from "@/components/ui/Fallback"
import { getUserApi } from "@/services/authServices"
import setCookieOnReq from "@/utils/SetCookieOnReq"
import { cookies } from "next/headers"
import { Suspense } from "react"


const UserProfilePaymentsPage = async () => {

    const cookieStore = await cookies()
    const options = setCookieOnReq(cookieStore)
const data = await getUserApi(options)
const {payments} = data


  return (
    <div>
        <BreadCrumbs  breadCrumbs={[
                  {
                      label : 'پروفایل' ,
                      href : '/profile'
                  },
                  {
                      label : 'محصولات خریداری شده' ,
                      href : '/profile/payments',
                      active : true
                  }
              ]}/>
        <h1 className='h2 my-5'>لیست محصولاتی که خریداری کرده اید</h1>
        <div className="overflow-x-scroll">
         <Suspense fallback={<Fallback/>}>
        <UserPaymentsTable payments={payments}/>
        </Suspense>   
        </div>
        
    </div>
  )
}

export default UserProfilePaymentsPage