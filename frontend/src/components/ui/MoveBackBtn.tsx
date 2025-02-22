'use client'
import useMoveBack from '@/hooks/useMoveBack'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

const MoveBackBtn = ({className}) => {
  return (
    <button onClick={useMoveBack()}
     className={className}>
<ArrowRightIcon className='size-6 '/>
    </button>
  )
}

export default MoveBackBtn