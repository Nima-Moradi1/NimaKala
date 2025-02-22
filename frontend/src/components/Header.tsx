/* eslint-disable @next/next/no-img-element */
'use client'
import useGetUser from "@/hooks/react-query-hooks/user/useAuth"
import Link from "next/link"
import Dropdown from "./Dropdown"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

const Header = () => {

    
const {isLoading , data} = useGetUser()
const {user} = data || {}

    return (
        <>
        <header className={` ${isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0" } bg-inherit mb-10 sticky top-0 transition-all duration-300 backdrop-blur-xl`}>
            <nav>
                <ul className="flex items-center p-2 justify-between container xl:max-w-screen-xl">
                    <li>
                        <div className="w-32">
                          <Link href='/'>
                        <img alt="logo" src="/nimakala.png" className="rounded-xl object-cover"/>
                        </Link>  
                        </div>
                        
                    </li>
                    {data ? <div className="flex gap-5 items-center">
                    <li className="border relative size-12 rounded-full flex items-center justify-center border-secondary-100">
                        <Link className=" py-2 flex" href='/cart'>
                        <ShoppingCartIcon className="size-6 mt-2"/>
                        <span className="absolute z-10 top-0 right-0 text-sm border rounded-full border-error size-5 flex items-center justify-center text-white bg-error"
                        >{data.cart.payDetail.orderItems.length}</span>
                        </Link>
                    </li>
                    <li><Dropdown user={user}/></li>
                    </div> 
                    : <>
                    <li>
                        <Link className="block py-2" href='/auth'>ورود</Link>
                    </li>
                    </>
                    }
                    
                </ul>
            </nav>
        </header>
        </>
    )
}

export default Header