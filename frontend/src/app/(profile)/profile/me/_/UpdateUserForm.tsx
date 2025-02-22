'use client'
import Button from '@/components/ui/Button';
import Fallback from '@/components/ui/Fallback';
import RHFTextField from '@/components/ui/RHFTextField';
import SpinnerMini from '@/components/ui/SpinnerMini';
import useGetUser from '@/hooks/react-query-hooks/user/useAuth';
import { useUpdateProfile } from '@/hooks/react-query-hooks/user/useUpdateProfile';
import { UpdateProfileSchema } from '@/validation/Schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

interface UserFormData {
    name : string ,
    email : string,
    phoneNumber : string,
    biography? : string | ''
}


const UpdateUserForm = ({user}:{user:UserFormData}) => {
    const {name , email , phoneNumber , biography} = user ;
    const {isUpdating , updateProfile} = useUpdateProfile()
    const {isLoading} = useGetUser()
    const pathname = usePathname()
    const userDefaultValues = {
        name,
        email,
        phoneNumber,
        biography
    }
      // const includeKeys = ['name' , 'email' , 'phoneNumber' , 'biography']
      const {register , handleSubmit , formState : {errors}} = useForm<UserFormData>({
        mode : 'onTouched' ,
        defaultValues : userDefaultValues ,
        resolver : yupResolver(UpdateProfileSchema)
    })

    const onSubmit = (data : UserFormData) => {
    try {
        updateProfile(data)
       window.location.href = pathname
    } catch (err) {
        console.log(err);
    }

    }

if (!user) return null;
if(isLoading) return <Fallback />
return (
    <div className='flex flex-col gap-y-3 items-center mt-5'>
                <h1 className="h2 m-5">آپدیت اطلاعات</h1>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField register={register} errors={errors} label="نام" name ='name' isRequired/>
        <RHFTextField register={register} errors={errors} label="ایمیل" name ='email' isRequired/>
        <RHFTextField register={register} errors={errors} label="شماره همراه" name ='phoneNumber' isRequired/>
        <RHFTextField register={register} errors={errors} label="بیوگرافی" name ='biography'/>
        <Button type='submit' disabled={isUpdating}
        >{isUpdating ? <SpinnerMini /> : 'آپدیت'}</Button>
    </form>
</div>
)
}

export default UpdateUserForm