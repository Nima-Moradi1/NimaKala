'use server'

//? JUST FOR FUN, we handle the delete method with Server actions, rather than React-Query!

/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeCategoryApi } from "@/services/categoryServices";
import { removeCouponApi } from "@/services/couponServices";
import { removeProductApi } from "@/services/productServices";
import setCookieOnReq from "@/utils/SetCookieOnReq";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCategoryHandler(
    prevState: { message?: string; error?: string }, 
    { id }: { id: string }
  ): Promise<{ message?: string; error?: string }> {
    const cookieStore = await cookies();
    
    try {
      const options = setCookieOnReq(cookieStore);
      const { message } = await removeCategoryApi({ id, options });
  
      revalidatePath('/admin/dashboard/categories');
  
      return { message , error : undefined }; 
    } catch (err: any) {
      const error = err?.response?.data?.message || "An error occurred while deleting the category";
      
      console.error("❌ Caught an error in deleteCategory:", err);
      
      return { error , message : undefined };
    }
  }

export async function deleteProductHandler(
    prevState: { message?: string; error?: string }, 
    { id }: { id: string }
  ): Promise<{ message?: string; error?: string }> {
    const cookieStore = await cookies();
    
    try {
      const options = setCookieOnReq(cookieStore);
      const { message } = await removeProductApi(id,options);
  
      revalidatePath('/admin/dashboard/categories');
  
      return { message , error : undefined }; 
    } catch (err: any) {
      const error = err?.response?.data?.message || "An error occurred while deleting the category";
      
      console.error("❌ Caught an error from deleteProductHandler in deleting the product:", err);
      
      return { error , message : undefined };
    }
  }

export async function deleteCouponHandler(
    prevState: { message?: string; error?: string }, 
    { id }: { id: string }
  ): Promise<{ message?: string; error?: string }> {
    const cookieStore = await cookies();
    
    try {
      const options = setCookieOnReq(cookieStore);
      const { message } = await removeCouponApi(id,options);
  
      revalidatePath('/admin/dashboard/coupons');
  
      return { message , error : undefined }; 
    } catch (err: any) {
      const error = err?.response?.data?.message || "An error occurred while deleting the coupon";
      
      console.error("❌ Caught an error in deleting the coupon:", err);
      
      return { error , message : undefined };
    }
  }