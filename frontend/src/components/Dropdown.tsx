'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Button from './ui/Button'
import { ArrowLeftEndOnRectangleIcon, ChevronDownIcon, CurrencyDollarIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import { toPersianDigits } from '@/utils/NumberFormatter'
import { logoutApi } from '@/services/authServices'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const Dropdown = ({user}) => {

  const logoutHandler = async () => {
    try {
      await logoutApi()
      toast.success('از حساب کاربری خارج شدید')
      window.location.href = '/auth'
    } catch (error) {
      console.log(error);
    }
  }
  const role = user?.role ;
  const {theme} = useTheme()

  if(!user) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='rounded-2xl'>
        <Button variant="outline">
            <UserIcon className='size-4' stroke={theme === "light" ? "black" : "white"}/>
            <ChevronDownIcon className='size-2' stroke={theme === "light" ? "black" : "white"}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-end w-56 backdrop-blur-lg md:ml-10 ml-2 mt-1 rounded-xl" >
        <DropdownMenuLabel>
          <div className='flex items-center  py-2 gap-3 border-b w-full'>
            <div className='flex flex-col items-end'>
              <span>{user?.name}</span>
              <span className='text-xs text-secondary-500'>{toPersianDigits(user?.phoneNumber)}</span>
            </div>
            <div className='bg-secondary-100 size-8 flex items-center justify-center leading-none border border-secondary-200 p-3 rounded-full'
            >
              <span>
              {(user?.name).charAt(0)}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link className='w-full'
         href={role === 'ADMIN' ? '/admin/dashboard' : '/profile'}>
        <DropdownMenuItem className='w-full flex-row-reverse cursor-pointer mb-1 hover:bg-secondary-100/30'>
            <UserCircleIcon />
            <span>
            {role === 'ADMIN' ? 'داشبورد' : 'پروفایل'}
            </span>
          </DropdownMenuItem>
        </Link>
        <Link className='w-full'
        href={role === 'ADMIN' ? '/admin/dashboard/payments' : '/profile/payments'}>
        <DropdownMenuItem className='w-full flex-row-reverse border-b mb-1 cursor-pointer hover:bg-secondary-100/30'>
            <CurrencyDollarIcon />
            <span>
            {role === 'ADMIN' ? 'پرداخت ها' : 'پرداخت های من'}
            </span >
          </DropdownMenuItem>
        </Link>
          <DropdownMenuItem className='w-full flex-row-reverse cursor-pointer hover:bg-secondary-100/30 hover:text-error'
          onClick={logoutHandler}>
            <ArrowLeftEndOnRectangleIcon stroke='red'/>
            <span>خروج از حساب</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
 
}

export default Dropdown