'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/ui/ButtonIcon"
import ConfirmDeleteModal from "@/components/ui/ConfirmDelete"
import Modal from "@/components/ui/Modal"
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { startTransition, useActionState, useState } from "react"
import toast from "react-hot-toast"
import { deleteCategoryHandler } from "@/lib/actions"

export function UpdateCategory({id}: {id : string | number}) {
    return <Link href={`/admin/dashboard/categories/${id}/update`}>
    <ButtonIcon variant="outline">
        <PencilIcon stroke="blue"/>
    </ButtonIcon></Link>
}

export function CreateCategory() {
    return <Link href='/admin/dashboard/categories/create'
    className="justify-self-end flex text-white gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-thin transition-colors hover:bg-primary-700">
    <span className="hidden md:block">ایجاد دسته بندی</span>
    <PlusIcon className="size-5"/>
    </Link>
}

const initialState = {
    message : undefined ,
    error: undefined
}

interface CategoryProps {
    _id: string;
    title: string;
}

export function DeleteCategory({category}: { category: CategoryProps }) {
    const { _id : categoryId, title } = category;
    const [open, setOpen] = useState(false);

    const [state, formAction] = useActionState(async (prevState:any, payload:any) => {      
        const result = await deleteCategoryHandler(prevState, payload);
        if(result.message) {
            toast.success(result.message)
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
    <Modal title={`حذف دسته بندی "${title}"`} open={open} onClose={()=> setOpen(false)}>
        <ConfirmDeleteModal resourceName={title}  onClose={() => setOpen(false)}
       onConfirm={() => {
        startTransition(() => {
            if (state?.message || state?.error) return; 
            formAction({ id: categoryId });
        });
      }}
    />
    </Modal>
    </>
}