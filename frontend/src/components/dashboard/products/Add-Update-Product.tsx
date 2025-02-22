'use client'

import Button from '@/components/ui/Button'
import RHFSelect from '@/components/ui/RHFSelect'
import RHFTagInput from '@/components/ui/RHFTagInput'
import RHFTextField from '@/components/ui/RHFTextField'
import SpinnerMini from '@/components/ui/SpinnerMini'
import { useFetchCategories } from '@/hooks/react-query-hooks/category/useFetchCategories'
import { useAddProduct } from '@/hooks/react-query-hooks/products/useAddProduct'
import { useUpdateProduct } from '@/hooks/react-query-hooks/products/useUpdateProduct'
import { ProductSchema } from '@/validation/Schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'



interface ProductProps {
    _id?: string,
    title : string , 
    description : string
    slug: string , 
    tags? : string[] , 
    imageLink : File ,
    brand : string,
    price : number ,
    discount? : number , 
    offPrice? : number ,
    countInStock : number , 
    category : string

}

const AddOrUpdateProduct = ({productToUpdate}:{productToUpdate?:ProductProps}) => {
    //this section is for updating the product form based on whether we have an id(Which means we're in update page) or not(we're in create page)
    const productId = productToUpdate?._id
    const isUserUpdating = Boolean(productId)
    let updateValues: Partial<ProductProps> = {
        discount: 0 , 
        offPrice : 0
    }
    if(isUserUpdating) {
        updateValues = {
            title : productToUpdate?.title ,
            description : productToUpdate?.description ,
            slug : productToUpdate?.slug ,
            tags : productToUpdate?.tags || [],
            imageLink : productToUpdate?.imageLink , 
            brand : productToUpdate?.brand,
            price : productToUpdate?.price ,
            discount : productToUpdate?.discount || 0,
            offPrice : productToUpdate?.offPrice || 0,
            countInStock : productToUpdate?.countInStock,
            category : productToUpdate?.category

        }
    }
// Fetch categories to pass to select 
const {categories} = useFetchCategories()
    const router = useRouter()
    const {addProduct ,isAdding} = useAddProduct()
    const {isUpdating,updateProduct} = useUpdateProduct()
const {register, handleSubmit , formState : {errors} , getValues , setValue} = useForm<ProductProps>({
    mode : 'onTouched' ,
    resolver : yupResolver(ProductSchema) , 
    defaultValues : updateValues
})

//UseEffect for handling File/URL change
// useEffect(() => {
//     if(prevImageUrl) {
//       async function fetchMyApi() {
//         const file = await imageUrlToFile(prevImageUrl)
//         setValue("imageLink", file);
//     }
//       fetchMyApi()
//     }
//   },[])

const onSubmit = (data) => {
       try {
        if(isUserUpdating) {
            updateProduct({id : productId, data} , {
                onSuccess : () =>{
                router.push('/admin/dashboard/products')
                }
            })
        } else {
            addProduct(data , {
                onSuccess : () => {
                router.push('/admin/dashboard/products')
                }
            })
        }
       
    } catch (error) {
        console.log(error);
     }
}

  return (
    <div className='w-full flex items-center justify-center'>
        <form className="form grid grid-cols-1 md:grid-cols-2 gap-x-5 max-w-screen-lg" onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField register={register} errors={errors} label='عنوان'            name='title'                       isRequired/>
            <RHFTextField register={register} errors={errors} label='توضیحات'          name='description'                 isRequired/>
            <RHFTextField register={register} errors={errors} label='برند'             name='brand'                       isRequired/>
            <RHFTextField register={register} errors={errors} label='لینک عکس'         name='imageLink'                   isRequired/>
            <RHFTextField register={register} errors={errors} label='اسلاگ'             name='slug'                        isRequired/>
            <RHFTextField register={register} errors={errors} label='قیمت(تومان)'      name='price'        type='number'  isRequired/>
            <RHFTextField register={register} errors={errors} label='تخفیف(%)'         name='discount'     type='number'/>
            <RHFTextField register={register} errors={errors} label='قیمت با تخفیف'    name='offPrice' type='number'/>
            <RHFTextField register={register} errors={errors} label='موجودی'           name='countInStock' type='number'  isRequired/>
            <RHFSelect    register={register} errors={errors} label="دسته بندی"        name="category" options={categories} required />
            <div className='col-span-2 grid gap-y-10'>
            <RHFTagInput  register={register} errors={errors} label='تگ ها'            name='tags'  value={getValues("tags")}
                onChange={(newTags) => setValue("tags", newTags)}/>
            <Button type='submit' className='w-3/4 mx-auto'>
                {isAdding || isUpdating ? <SpinnerMini /> : isUserUpdating ? 'بروزرسانی محصول' : 'افزودن محصول'}
            </Button>
                </div>
        </form>
    </div>
  )
}

export default AddOrUpdateProduct