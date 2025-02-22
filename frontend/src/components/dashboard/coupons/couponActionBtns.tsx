'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/ui/ButtonIcon"
import ConfirmDeleteModal from "@/components/ui/ConfirmDelete"
import Modal from "@/components/ui/Modal"
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { startTransition, useActionState, useState } from "react"
import toast from "react-hot-toast"
import { deleteCouponHandler } from "@/lib/actions"
import { useTheme } from "next-themes"

interface CouponProps {
    _id: string;
    code: string;
}
const initialState = {
    message : undefined ,
    error: undefined
}


export function UpdateCouponBtn({id}: {id : string | number}) {
    const {theme} = useTheme()
    return <Link href={`/admin/dashboard/coupons/${id}/update`}>
    <ButtonIcon variant="outline">
        <PencilIcon stroke={theme === "dark" ? "white" : "blue"}/>
    </ButtonIcon></Link>
}

export function CreateCouponBtn() {
    return <Link href='/admin/dashboard/coupons/add'
    className="justify-self-end flex text-white gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-thin transition-colors hover:bg-primary-700">
    <span className="hidden md:block">ایجاد کد تخفیف</span>
    <PlusIcon className="size-5"/>
    </Link>
}

export function DeleteCouponBtn({coupon}: { coupon: CouponProps }) {
    const { _id : couponId, code } = coupon;
    const [open, setOpen] = useState(false);
    const [state, formAction] = useActionState(async (prevState:any, payload:any) => {      
        const result = await deleteCouponHandler(prevState, payload);
        if(result.message) {
            toast.success(result.message)
            location.reload()
        }else if(result.error) {
            toast.error(result.error)
            console.log(result.error);
        }else {
            toast.error('خطای ناشناخته رخ داده است')
        }
      
        return result;
      }, initialState);
    
    return <>
    <ButtonIcon variant="outline"
    onClick={()=> {setOpen(true)}}>
        <TrashIcon stroke="red"/>
    </ButtonIcon>
    <Modal title={`حذف کد تخفیف "${code}"`} open={open} onClose={()=> setOpen(false)}>
        <ConfirmDeleteModal resourceName={code}  onClose={() => setOpen(false)}
       onConfirm={() => {
        startTransition(() => {
            if (state?.message || state?.error) return; 
            formAction({ id: couponId });
        });
      }}
    />
    </Modal>
    </>
}