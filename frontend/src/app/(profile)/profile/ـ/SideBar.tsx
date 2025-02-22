'use client'
import ButtonIcon from '@/components/ui/ButtonIcon'
import { logoutApi } from '@/services/authServices';
import { ArrowLeftEndOnRectangleIcon, CurrencyDollarIcon, HandThumbUpIcon, HomeIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { MouseEventHandler } from 'react'
import toast from 'react-hot-toast';

const sidebarNavs = [
  {
    id: 0,
    title: " پروفایل",
    icon: <HomeIcon className="size-5" />,
    href: "/profile",
  },
  {
    id : 1 ,
    title : 'اطلاعات کاربری' , 
    icon : <UserCircleIcon className="size-6 -mr-1"/>,
    href : '/profile/me'
 } ,

{
  id: 2,
  title: "سبد خرید",
  icon: <ShoppingBagIcon className="size-5" />,
  href: "/cart",
},
{
  id: 3,
  title: "پرداخت ها",
  icon: <CurrencyDollarIcon className="size-5" />,
  href: "/profile/payments",
} ,
{
  id: 4,
  title: "لایک ها",
  icon: <HandThumbUpIcon className="size-5" />,
  href: "/profile/likedProducts",
}
];

const SideBar = ({onClose , className}: { onClose?: MouseEventHandler<HTMLAnchorElement> , className?:string}) => {
  const pathname = usePathname();
  const {theme} = useTheme()

  const logoutHandler = async () => {
    try {
      await logoutApi()
      toast.success('از حساب کاربری خارج شدید')
      window.location.href = '/auth'
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <ul className={`space-y-2 w-full ${className}`}>
      <li>
       {theme === "dark" ? 
       <>
        <Link href='/'>
        <Image  src='/nimakala-dark.png' alt='logo' className='-mt-3' width={220} height={20}/>
        </Link>
       </> 
       : 
       <>
        <Link href='/'>
        <Image  src='/nimakala.png' alt='logo' className='-mt-3' width={220} height={20}/>
        </Link>
       </>
       }
      </li>
      {sidebarNavs.map((nav) => {
        return (
          <li key={nav.id}>
            <Link
            onClick={onClose}
              href={nav.href}
              className={classNames(
                "flex w-full items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4",
                {
                  "bg-primary-100/40 !font-bold !text-blue-500":
                    pathname == nav.href,
                }
              )}
            >
              {nav.icon}
              {nav.title}
            </Link>
          </li>
        );
      })}
      <li>
        <ButtonIcon onClick={logoutHandler} className='w-full py-3 mt-10' variant='red'>
          <ArrowLeftEndOnRectangleIcon className='size-5'/>
          <span>خروج</span>
        </ButtonIcon>
      </li>
    </ul>
  );
}

export default SideBar