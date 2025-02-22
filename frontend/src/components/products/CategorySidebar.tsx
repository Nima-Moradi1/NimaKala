'use client'

import React, { useState } from 'react'
import CheckBox from '../ui/CheckBox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CategorySort from './CategorySort'

const CategorySidebar = ({categories}) => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()
    const router = useRouter()
      const [selectedCategories , setSelectedCategories] = useState(
        searchParams.get('category')?.split(',') || []
      )
      const categoryHandler = (e) => {
        const value = e.target.value 
        if(selectedCategories.includes(value)) {
            const categories = selectedCategories.filter(c => c !== value)
            setSelectedCategories(categories)
            params.set('category' , categories.join(','))
            router.push(pathname + '?' + params.toString())
        } else {
            setSelectedCategories([...selectedCategories , value])
            params.set('category' , [...selectedCategories,value].join(','))
            router.push(pathname + '?' + params.toString())
        }
    }
  return (
    <div>
     <p className="font-bold mb-2">دسته بندی ها</p>
        <ul className=" grid grid-cols-3 mb-5 items-end md:items-start md:grid-cols-1 ">
          {categories.map((category)=> {
            return (
              <CheckBox key={category._id}
              id={category._id} value={category.englishTitle}
              label={category.title} name='product-type'
              checked={selectedCategories.includes(category.englishTitle)}
              onChange={categoryHandler}
               />
            )
          })}
        </ul>
        <CategorySort />
        </div>
  )
}

export default CategorySidebar