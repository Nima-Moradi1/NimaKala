"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import Button  from "@/components/ui/Button"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

const ThemeToggle = () => {

  const { theme,setTheme } = useTheme()

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  return (

        <Button variant="outline" className="flex items-center justify-center" 
        onClick={()=>setTheme(theme === "light" ? "dark" : "light")}>
         {theme === "light" ? 
         <>
        <SunIcon className="size-3 transition-all" />
            </> :
             <>
        <MoonIcon stroke="white"
        className="size-4 transition-all dark:scale-100" />
             </>}
        </Button>
  )
}

export default ThemeToggle