'use client'
import ButtonIcon from '@/components/ui/ButtonIcon'
import { logoutApi } from '@/services/authServices';
import { PercentBadgeIcon } from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ArrowLeftEndOnRectangleIcon, CurrencyDollarIcon, HomeIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { MouseEventHandler } from 'react'
import toast from 'react-hot-toast';

const sidebarNavs = [
  {
    id: 0,
    title: " داشبورد",
    icon: <HomeIcon className="size-5" />,
    href: "/admin/dashboard",
  },
  {
    id : 1 ,
    title : 'اطلاعات کاربری' , 
    icon : <UserCircleIcon className="size-6 -mr-1"/>,
    href : '/admin/dashboard/profile'
 } ,
{
  id: 2,
  title: "محصولات",
  icon: <ShoppingBagIcon className="size-5" />,
  href: "/admin/dashboard/products",
},
{
  id: 3,
  title: "پرداخت ها",
  icon: <CurrencyDollarIcon className="size-5" />,
  href: "/admin/dashboard/payments",
} , 
{
    id: 4,
    title: "دسته بندی ها",
    icon: <TagIcon className="size-5" />,
    href: "/admin/dashboard/categories",
} , 
{
    id: 5,
    title: "کد تخفیف ها",
    icon: <PercentBadgeIcon className="size-5" />,
    href: "/admin/dashboard/coupons",
} , 
{
    id: 6,
    title: "کاربران",
    icon: <UsersIcon className="size-5" />,
    href: "/admin/dashboard/users",
}
];

const DashboardSidebar = ({onClose , className}: { onClose?: MouseEventHandler<HTMLAnchorElement> , className?:string}) => {
  const pathname = usePathname();

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
    <ul className={`space-y-2 ${className}`}>
      <li>
        <Link href='/'>
        <Image alt='logo' width={150} height={30} priority src='/nimakala.png'
        className='lg:-mt-3'/>
        </Link>
      </li>
      {sidebarNavs.map((nav) => {
        return (
          <li key={nav.id}>
            <Link
            onClick={onClose}
              href={nav.href}
              className={classNames(
                "flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4",
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
        <ButtonIcon onClick={logoutHandler} className='w-full py-3 mt-5' variant='red'>
          <ArrowLeftEndOnRectangleIcon className='size-5'/>
          <span>خروج</span>
        </ButtonIcon>
      </li>
    </ul>
  );
}

export default DashboardSidebar