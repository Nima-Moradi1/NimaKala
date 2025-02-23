'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import Modal from './ui/Modal'
import ButtonIcon from './ui/ButtonIcon'
import { ArrowDownTrayIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

const PWAModal = () => {

    const handleCloseModal = () => {
        setShowInstallModal(false)
      }
      const handleInstallClick = () => {
        if(prompt){
          prompt.prompt()
      
          prompt.userChoice.then((choiceResult : any)=> {
            if(choiceResult.outcome === 'accepted') {
              console.log("Accepted Pwa installation by user")
            } else {
              console.log("rejected !")
            }
            setPrompt(null)
            setShowInstallModal(false)
          })
        }
      }
      const [showInstallModal,setShowInstallModal] = useState<boolean>(false)
      const [prompt,setPrompt] = useState<any>(null)
      useEffect(()=> {
        const handleBeforeInstallPrompt = ( event : any) => {
          event.preventDefault()
          setPrompt(event)
          if(!window.matchMedia("(display-mode: standalone)").matches) {
            setShowInstallModal(true);
          }
        }
        window.addEventListener('beforeinstallprompt',handleBeforeInstallPrompt)
      
        //cleanup functions
        return () => {
          window.removeEventListener('beforeinstallprompt',handleBeforeInstallPrompt)
        }
      },[])
      

  return (
    <div>
        <Modal title='نصب وب اپلیکیشن نیماکالا'
        description='اپ را نصب کنید و با یک کلیک وارد برنامه شوید!'
        open={showInstallModal} onClose={handleCloseModal}>
            <p className='text-black mb-4'
            >با نصب برنامه{" "} 
            <span className='font-bold text-primary-900'
            >{" "}نیماکالا{" "}</span> 
            راحت تر و آسوده تر به خرید خود بپردازید !</p>
            <div className='flex items-center justify-between gap-5 px-3'>
                <ButtonIcon onClick={handleInstallClick}
                 className='flex items-center justify-center py-3'>
                    <ArrowDownTrayIcon className='w-4'/>
                    <span>نصبش کن !</span>
                </ButtonIcon>
                <ButtonIcon variant='outline'
                 onClick={handleCloseModal}
                 className='flex items-center justify-center py-2.5'>
                    <ExclamationCircleIcon className='w-4'/>
                    <span>بیخیال!</span>
                </ButtonIcon>
            </div>
        </Modal>
    </div>
  )
}

export default PWAModal