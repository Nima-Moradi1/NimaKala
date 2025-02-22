'use client'

import React, { useState } from 'react'
import RadioInput from '../ui/RadioInput'
import { usePathname , useRouter, useSearchParams } from 'next/navigation'

const sortOptions = [
    {
        id:"1" , 
        value : 'latest' , 
        label : 'جدیدترین'
    } ,
    {
        id:"2" , 
        value : 'earliest' , 
        label : 'قدیمی ترین'
    } ,
    {
        id:"3" , 
        value : 'popular' , 
        label : 'محبوب ترین'
    } 
]

const CategorySort = () => {

    //for setting the url based on the selected sort:
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const [sort , setSort] = useState(
        searchParams.get('sort') || ''
    )


    const sortHandler = (e) => {
        const value = e.target.value
        setSort(e.target.value)
        params.set('sort' , value)
        router.push(pathname + '?' + params.toString())
    }


  return (
    <div className='mb-7'>
            <h2 className='h2 mt-3 border-t-2 rounded-xl w-1/2 border-secondary-100 pt-3 mb-5'>مرتب سازی</h2>
    <div className='grid grid-cols-3 md:grid-cols-1 md:gap-y-3'>
        {sortOptions.map((option)=> {
            return (
                <RadioInput key={option.id} id={option.id} name='product-sort'
                value={option.value} label={option.label} onChange={sortHandler}
                checked={sort === option.value}/>
            )
        })}
    </div>
    </div>

  )
}

export default CategorySort