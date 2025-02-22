'use server'

import { revalidatePath } from "next/cache";

export async function pathRevalidator(url:string , type : 'page' | 'layout' | undefined){
    return revalidatePath(url , type)
}