import UpdateUserForm from '@/app/(profile)/profile/me/_/UpdateUserForm'
import { getUserApi } from '@/services/authServices'
import setCookieOnReq from '@/utils/SetCookieOnReq'
import { cookies } from 'next/headers'
import React from 'react'

const AdminProfile = async () => {
        const cookieStore = await cookies()
        const options = setCookieOnReq(cookieStore)
        const {user} = await getUserApi(options)
  return (
    <div>
        <UpdateUserForm user={user} />
    </div>
  )
}

export default AdminProfile