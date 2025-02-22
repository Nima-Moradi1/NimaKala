'use client'
import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal';
import Link from 'next/link';

const GreetingModal = () => {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const hasSeenModal = localStorage.getItem("hasSeenModal");
  
      if (!hasSeenModal) {
        setShowModal(true); 
      }
    }, []);
  
    const handleCloseModal = () => {
      localStorage.setItem("hasSeenModal", "true"); 
      setShowModal(false);
    };

  return (
    <Modal onClose={handleCloseModal} open={showModal}
     title='به نیماکالا خوش آمدید' description='لطفا متن زیر را ابتدا مطالعه کنید'>
        <p className='border-b mb-3 pb-2'
        >⚠️ در حال حاضر شما در جایگاه {" "}  
            <span className='font-bold text-error'> مشتری </span> 
            وارد سایت شده اید</p>
        <p className=''>- در صورتی که {" "} 
            <span className='text-lg font-bold'
            >کارفرما {" "}</span>
             هستید و میخواهید دسترسی به فول پنل ادمین و فیچرهای دیگر سایت داشته باشید لطفا به بنده از طریق پلتفرم های زیر پیام بدهید ❤️ 
            <span className='flex gap-3 mt-4 w-full items-center justify-center text-lg'>
            <Link href='https://t.me/nimoolia' target='_blank'
              className='underline hover:text-blue-800 text-blue-600'>
             <span>تلگرام</span> 
             </Link>
             یا {' '}
             <Link href='https://wa.me/09036837788' target='_blank'
              className='underline hover:text-yellow-400 text-yellow-600'>
             <span>واتساپ{' '}</span> 
             </Link>
            </span>
            </p>
    </Modal>
  )
}

export default GreetingModal