/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { createPortal } from "react-dom"

const Drawer = ({open , onClose , children} : {open:boolean , onClose : any , children : React.ReactNode}) => {
    if (typeof window === "undefined") return null;
    return createPortal(
        <>
        {/* since we're blocking the background main page, we split the next div outside this div to give it animations */}
        <div
        onClick={onClose}
        className={`backdrop-blur-sm fixed inset-0 w-full h-screen
         bg-opacity-30 ${ open ? 'block' : "pointer-events-none hidden" } `}>
        </div>
        {/* we set those for events for SAFETY to ensure conflicting between events running */}
        <div
        onClick={(event : any)=> {
            event.preventDefault()
            event.stopPropagation()
        }}
        className={`fixed top-0 right-0 w-[250px] h-full transition-transform transform 
            ${ open ? 'translate-x-0 z-50' : 'translate-x-full' } ` }
        >
        {/* we want to render sidebar inside it, so we render children */ }
            <div className="bg-secondary-0 max-h-full overflow-y-auto">
                {children}
            </div>
        </div>
        </> , 
        document?.body || null
    )
}

export default Drawer