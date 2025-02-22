'use client'

import Button from '@/components/ui/Button'
import RHFTextField from '@/components/ui/RHFTextField'
import SpinnerMini from '@/components/ui/SpinnerMini'
import { useAddCategory } from '@/hooks/react-query-hooks/category/useAddCategory'
import { useUpdateCategory } from '@/hooks/react-query-hooks/category/useUpdateCategory'
import { AddCategorySchema } from '@/validation/Schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

interface CategoryProps {
    _id : string,
    title : string , 
    englishTitle: string , 
    type : string , 
    description : string
}

const AddOrUpdateCategory = ({categoryToUpdate}:{categoryToUpdate?:CategoryProps}) => {
    //this section is for updating the category form based on whether we have an id(Which means we're in update page) or not(we're in create page)
    const categoryId = categoryToUpdate?._id
    const isUserUpdating = Boolean(categoryId)
    let updateValues = {}
    if(isUserUpdating) {
        updateValues = {
            title : categoryToUpdate?.title ,
            englishTitle : categoryToUpdate?.englishTitle ,
            type : categoryToUpdate?.type ,
            description : categoryToUpdate?.description
        }
    }

    const router = useRouter()
    const {addCategory ,isAdding} = useAddCategory()
    const {isUpdating,updateCategory} = useUpdateCategory()
const {register , handleSubmit , formState : {errors}} = useForm<Omit<CategoryProps, '_id'>>({
    mode : 'onTouched' ,
    resolver : yupResolver(AddCategorySchema) , 
    defaultValues : updateValues
})

const onSubmit = (data) => {
    try {
        if(isUserUpdating) {
            updateCategory({data ,id : categoryId} , {
                onSuccess : () =>{
                router.push('/admin/dashboard/categories')
                }
            })
        } else {
            addCategory(data , {
                onSuccess : () => {
                router.push('/admin/dashboard/categories')
                }
            })
        }
       
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className='w-full flex items-center justify-center'>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField register={register} errors={errors} label='عنوان فارسی' name='title' isRequired/>
            <RHFTextField register={register} errors={errors} label='عنوان انگلیسی' name='englishTitle' isRequired/>
            <RHFTextField register={register} errors={errors} label='نوع' name='type' isRequired/>
            <RHFTextField register={register} errors={errors} label='توضیحات' name='description' isRequired/>
            <Button type='submit'>
                {isAdding || isUpdating ? <SpinnerMini /> : isUserUpdating ? 'بروزرسانی' : 'افزودن'}
            </Button>
        </form>
    </div>
  )
}

export default AddOrUpdateCategory