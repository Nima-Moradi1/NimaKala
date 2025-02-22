import { getUserApi } from "@/services/authServices"
import UpdateUserForm from "./_/UpdateUserForm"
import { cookies } from "next/headers"
import setCookieOnReq from "@/utils/SetCookieOnReq"
import Fallback from "@/components/ui/Fallback"
import { Suspense } from "react"
import BreadCrumbs from "@/components/ui/BreadCrumbs"

const MePage = async () => {
    const cookieStore = await cookies()
    const options = setCookieOnReq(cookieStore)
    const {user} = await getUserApi(options)

    return (
        <>
        <BreadCrumbs breadCrumbs={[
            {
                label : 'پروفایل' ,
                href : '/profile'
            } ,
            {
                label : 'اطلاعات حساب کاربری',
                href : '/profile/me' ,
                active : true
            }
        ]}/>
        <Suspense fallback={<Fallback />}>
             <UpdateUserForm user={user} />
        </Suspense>
        </>

    )
}

export default MePage