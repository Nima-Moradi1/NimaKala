'use client'
import {
    HandThumbUpIcon,
    CurrencyDollarIcon,
    ShoppingBagIcon,
  } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
  
  const iconMap = {
    likes: HandThumbUpIcon,
    payments: CurrencyDollarIcon,
    cart: ShoppingBagIcon,
  };
  
  export function Card({ title, value, type , href }:{title:string , value:string | number , href?:string ,  type : 'likes' | 'payments' | 'cart' }) {
    const Icon = iconMap[type];
  const pathname = usePathname()
    return (
      <Link href={href || pathname}>
      <div className="rounded-2xl bg-secondary-50 p-2 shadow-lg border border-secondary-100/50">
        <div className="flex p-4 text-secondary-600">
          {Icon ? <Icon className="size-6" stroke="gray" /> : null}
          <h3 className="mr-2 text-sm font-medium hover:underline text-secondary-700">{title}</h3>
        </div>
        <p
          className={`truncate rounded-xl bg-secondary-0 px-4 py-8 text-center text-2xl text-secondary-700`}
        >
          {value}
        </p>
      </div>
      </Link>
      
    );
  }
  