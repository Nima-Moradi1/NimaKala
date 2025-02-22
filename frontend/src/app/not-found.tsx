'use client'

import { ArrowRightIcon } from '@heroicons/react/16/solid'
import useMoveBack  from '@/hooks/useMoveBack'
import React from 'react'
import ErrorWithBackground from '@/components/ui/ErrorWithBg'

const NotFound = () => {

    const moveBack = useMoveBack()

  return (
    <>
    <ErrorWithBackground>
    <div className='flex flex-col gap-10 text-xl lg:text-2xl'>
                    <button className='flex items-center gap-x-2 text-secondary-500'
                    onClick={moveBack}
                    >
                        <ArrowRightIcon className='size-6 lg:size-7 text-primary-900'/>
                        <span>برگشت</span>
                    </button>
                    <h1 className=' font-bold text-secondary-700 mb-10'>
                        صفحه ای که دنبالش بودید پیدا نشد !
                    </h1>
                </div>
    </ErrorWithBackground>
    </>
  )
}

export default NotFound