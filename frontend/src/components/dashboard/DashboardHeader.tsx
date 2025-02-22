'use client'
import useGetUser from "@/hooks/react-query-hooks/user/useAuth"
import toLocalDateShort from "@/utils/DateFormatter"
import { useState } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Drawer from "../ui/Drawer";
import SideBar from "@/app/(profile)/profile/ـ/SideBar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardHeader = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

const {isLoading , data} = useGetUser()
const {user} = data || {}

    return (
        <>
        <header className={` ${isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0" } flex items-center pt-3 pr-3 sticky top-0 transition-all duration-300 `}>
        <div className="flex lg:hidden items-center justify-between py-5 px-4 lg:px-8">
        <ButtonIcon
        className="block border-none"
        variant="outline"
        onClick={()=> setIsOpenDrawer(!isOpenDrawer)}
        >
          {isOpenDrawer ? <XMarkIcon /> : <Bars3Icon  />}
        </ButtonIcon>
        <Drawer open={isOpenDrawer} onClose={()=> setIsOpenDrawer(false)}>
            {user?.role === 'ADMIN' ? 
            <>
            <DashboardSidebar className="backdrop-blur-xl px-1 h-screen" onClose={()=> setIsOpenDrawer(false)}/>
            </> 
            :
             <>
            <SideBar className="backdrop-blur-xl px-1 h-screen" onClose={()=> setIsOpenDrawer(false)}/>
             </>
             }
        </Drawer>
      </div>
            <nav>
                <ul className="flex xl:max-w-screen-xl mx-auto my-2 mr-3">
                    {data ? 
                    <div className="flex flex-col">
                    <li>
                        <h1>
                        <span className="font-bold mx-0.5"
                    >{data?.user?.name} {" "}</span>
                        عزیز{" "} خوش آمدید ❤️</h1>
                    </li>
                    <p className='text-xs font-extralight text-secondary-600'>
                    <span>تاریخ پیوستن : </span>
                    <span>{toLocalDateShort(data.user?.createdAt)}</span>
                    </p>
                    </div> 
                    : null
                    }
                </ul>
            </nav>
        </header>
        </>
    )
}

export default DashboardHeader