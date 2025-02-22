'use client'

import Button from '@/components/ui/Button'
import RadioInput from '@/components/ui/RadioInput'
import RHFTextField from '@/components/ui/RHFTextField'
import SpinnerMini from '@/components/ui/SpinnerMini'
import { useAddCoupon } from '@/hooks/react-query-hooks/coupons/useAddCoupon'
import { AddCouponSchema } from '@/validation/Schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CouponSelect from './CouponSelect'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { useRouter } from 'next/navigation'
import { useUpdateCoupon } from '@/hooks/react-query-hooks/coupons/useUpdateCoupon'

interface CouponProps {
    _id : string,
    type: string ,
    code: string , 
    amount : string,
    expireDate : string ,
    usageLimit : string ,
    productIds : string[]
}
interface ProductsProps {
    title : string ,
    _id : string
}

interface FormValues {
    type: string;
    code: string;
    amount: string;
    usageLimit: string;
    expireDate: string;
    productIds: string[];
}

const AddOrUpdateCouponForm = ({products , couponToUpdate}:{products:ProductsProps[],couponToUpdate?:CouponProps}) => {


//this part is for updating the coupon form based on whether we have an id(Which means we're in update page) or not(we're in add page)
    const isCouponUpdating = Boolean(couponToUpdate?._id)
    const { 
        _id: couponId = "", 
        type: updatingCouponType = "", 
        expireDate: updatingCouponExpireDate = "", 
        productIds: UpdatingProductIds = [] 
      } = couponToUpdate || {};

    const router = useRouter()
    const [ProductOptions,setProductOptions] = useState(UpdatingProductIds || [])
    const [type ,setType] = useState(updatingCouponType || 'percent')
    const [expireDate ,setExpireDate] = useState(updatingCouponExpireDate || new Date)
    //we change the localdate to the isoDate for server
    const dateServerToSend = new Date(expireDate).toISOString()

    //react-query-hooks
    const {addCoupon,isAdding} = useAddCoupon()
    const {isUpdating,updateCoupon} = useUpdateCoupon()

    //react-hook-form
    const {register, handleSubmit , formState:{errors} ,setValue } = useForm<FormValues>({
        mode : 'onTouched' ,
        resolver : yupResolver(AddCouponSchema), 
        // defaultValues: updateValues
        
    })
    useEffect(() => {
        if (couponToUpdate) {
            setValue("type", couponToUpdate.type);
            setValue("code", couponToUpdate.code);
            setValue("amount", couponToUpdate.amount);
            setValue("usageLimit", couponToUpdate.usageLimit);
            setValue("expireDate", couponToUpdate.expireDate);
            setValue("productIds", couponToUpdate.productIds);
        }
    }, [couponToUpdate, setValue]);

    const handleDateChange = (date:DateObject) => {
        setExpireDate(date.toDate())
        setValue('expireDate',dateServerToSend)
    }

    const addOrUpdateCouponHandler = (data) => {
        try {
            const newData = {
                ...data ,
                expireDate : dateServerToSend, 
                productIds : ProductOptions
            }
            if(isCouponUpdating) {
                updateCoupon({id: couponId,data} , {
                    onSuccess : () => {
                        router.push('/admin/dashboard/coupons')
                    }
                })
            } else {
                addCoupon(newData , {
                    onSuccess : () => {
                        router.push('/admin/dashboard/coupons')
                    }
                  })
            }
         
} catch (error) {
    console.log(error);
        }
    }

  return (
    <div className='flex justify-center w-full'>
        <form className='form grid grid-cols-1 md:grid-cols-2 md:gap-5 max-w-screen-md items-start '
        onSubmit={handleSubmit(addOrUpdateCouponHandler)}>
           <div>
            <label className="mb-2 mr-2 block text-secondary-700"
            >نوع کد تخفیف
             <span className='text-error'>*</span></label>
           <div className='flex justify-center gap-10 bg-secondary-100/40 items-center w-full border-2 rounded-xl p-2.5'>
                <RadioInput {...register('type')}
                id='percent-type'
                name='type'
                label='درصد'
                value='percent'
                onChange={(e) => {
                    setValue('type', e?.target?.value);
                    setType(e?.target?.value);
                }}                checked={type === 'percent'}/>
                 <RadioInput {...register('type')}
                id='fixedProduct-type'
                name='type'
                label='قیمت ثابت'
                value='fixedProduct'
                onChange={(e) => {
                    setValue('type', e.target.value);
                    setType(e.target.value);
                }}
                checked={type === 'fixedProduct'}/>
            </div>
           </div>
            <RHFTextField register={register} label='کد تخفیف' name='code'  isRequired errors={errors}/>
            <RHFTextField register={register}
            label={type === "fixedProduct" ? "مقدار(تومانی)" : "مقدار(درصد)"}
             name='amount'  isRequired errors={errors}/>
            <RHFTextField register={register} label='تعداد بار قابل استفاده' name='usageLimit'  isRequired errors={errors}/>
            <DatePicker
            style={{cursor:'pointer' , padding: '25px' , width : '100%' , paddingBottom : '25px' ,
            marginTop: '35px' , backgroundColor:'#D4D5DD80' , borderRadius : '14px'}}
            format="YYYY/MM/DD" calendar={persian}
            locale={persian_fa}
             value={expireDate} onChange={handleDateChange}/>
            <CouponSelect options={products} register={register}
            label={(option)=> option.title}
            value={(option)=> option._id}
            errors={errors}
            onChange={(selectedOptions) => {
                setProductOptions(selectedOptions.map(option => option?._id || null))
                setValue('productIds', selectedOptions.map(option => option?._id || null));
            }}
            />
            <Button type='submit' disabled={isAdding || isUpdating || Object.keys(errors)?.length > 0} className='md:col-span-2'>
                {isAdding || isUpdating ? <SpinnerMini /> : couponToUpdate ? 'بروزرسانی کد تخفیف' : 'افزودن کد تخفیف'}
            </Button>
        </form>
    </div>
  )
}

export default AddOrUpdateCouponForm