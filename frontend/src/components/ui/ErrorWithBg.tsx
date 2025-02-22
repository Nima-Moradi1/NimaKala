import Image from 'next/image'
import React from 'react'

const ErrorWithBackground = ({children, className}:{children:React.ReactNode , className?:string}) => {
  return (
    <div className="relative overflow-hidden w-screen min-h-screen z-0">
  <Image
  src='/test-dark.png'
  alt={'background-image'}
  fill
  className="object-cover w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)]"
  />
  <div className="absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.95)_1.82%,rgba(0,0,0,0.00)_41.44%)]" />
  <div className={`${className} flex w-screen min-h-screen items-center justify-center z-50 relative `}>
  {children}
  </div>
  </div>

  )
}

export default ErrorWithBackground