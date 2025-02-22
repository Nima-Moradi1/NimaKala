import PaymentsTable from '@/components/dashboard/payment/PaymentsTable'
import BreadCrumbs from '@/components/ui/BreadCrumbs'
import Fallback from '@/components/ui/Fallback'
import { getAllPaymentsApi } from '@/services/paymentServices'
import setCookieOnReq from '@/utils/SetCookieOnReq'
import { cookies } from 'next/headers'
import React, { Suspense } from 'react'

const DashboardPaymentsPage = async () => {
  const cookieStore = await cookies()
  const options = setCookieOnReq(cookieStore)
  const {payments} = await getAllPaymentsApi(options)
  return (
    <div>
      <BreadCrumbs breadCrumbs={[
        {
          label : 'داشبورد' ,
          href : '/admin/dashboard'
        } ,
        {
          label : 'لیست پرداخت ها' ,
          href : '/admin/dashboard/payments' ,
          active : true
        }
      ]}/>
      <h1 className='h2 m-5'>لیست پرداخت کاربران</h1>
      <div className='overflow-x-scroll'>
        <Suspense fallback={<Fallback />}>
         <PaymentsTable payments={payments} />  
        </Suspense>
      
      </div>
    
    </div>
  )
}

export default DashboardPaymentsPage