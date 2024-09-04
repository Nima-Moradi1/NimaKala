'use client'

import { Session } from "next-auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { Suspense, useState } from "react"
import { signOut } from "next-auth/react"
import { LogOut, Moon, Settings, Sun, Truck } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "../ui/switch"
import { useRouter } from "next/navigation"


export const UserButton = ({user} : Session) => {
const [checked , setChecked] = useState(false)
const {setTheme,theme} = useTheme()
const router = useRouter()
function setSwitchState() {
    switch(theme) {
        case 'dark' : return setChecked(true)
        case 'light' : return setChecked(false)
        case 'system' : return setChecked(false)
    }
}

    return (
        <div>
            <DropdownMenu modal={false}>
  <DropdownMenuTrigger>
    <Avatar>
        {user?.image && user.name && (
            <Image src={user.image} alt={user.name} fill={true} className="rounded-full p-1"/>
    )}
    {!user?.image && (
        <AvatarFallback>
            <div className="font-bold">
                {user?.name?.charAt(0).toUpperCase()}
            </div>
        </AvatarFallback>
    )}
    </Avatar>
  </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 w-60 mx-3 *:cursor-pointer ">
    <div className="flex flex-col items-center justify-center gap-1 text-xs text-center bg-primary/10 p-2 rounded-xl">
    {user?.image ? (
    <Image src={user.image} alt={user.name!} width={36} height={36} className="rounded-full p-1"/>
    ): <p className="text-[8px]">{user?.email}</p>}
    <p className="font-bold">{user?.name}</p>
    <span className="text-xs text-secondary-foreground">{user?.email}</span>
    </div>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=> router.push('/dashboard/orders')} className="group">
        <Truck className=" px-1 mr-3 group-hover:translate-x-1  ease-in-out"/> 
        My orders</DropdownMenuItem>
    <DropdownMenuItem onClick={()=> router.push('/dashboard/settings')}
     className="group">
        <Settings className=" mr-3 px-1 group-hover:rotate-180  ease-in-out"/>  
        Settings</DropdownMenuItem>
    <DropdownMenuItem className="group">
        <div onClick={(e)=> e.stopPropagation()}
         className="flex items-center">
            {theme === 'dark' ?
             <>
             <Moon className="px-1 mr-3 group-hover:text-blue-400   group-hover:rotate-180  ease-in-out" />
             </> 
             : 
             <>
             <Sun className="px-1 mr-3 group-hover:text-yellow-600 group-hover:rotate-180  ease-in-out"/>
             </>
             }
           <p> 
            <span className="dark:text-blue-400 text-secondary-foreground/75 text-yellow-600"
            >
             <span className="capitalize">
             {theme}
             </span> mode</span></p>
                <Switch
                className="scale-75 mx-1 "
                checked={checked} onCheckedChange={(e)=> {
                    setChecked((prev) => !prev)
                    if(e) setTheme('dark')
                    if(!e) setTheme('light') 
                }}/>
        </div>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={()=>signOut()}
        className="group focus:bg-destructive/30">
        <LogOut className="mr-3 px-1 group-hover:translate-x-1 ease-in-out  "/>
        Signout</DropdownMenuItem>
        </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}