/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { middlewareAuth } from "./utils/middlewareAuth";

export async function middleware(request : any){
    // console.log(request.url,request.nextUrl.pathname);

    const pathname = request.nextUrl.pathname
    const url = request.url

    if(pathname.startsWith('/profile')){
       const user = await middlewareAuth(request)
        if(!user) {
            return NextResponse.redirect(new URL('/auth' , url))
        }
        else if(user && user.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/dashboard/profile' , url))
        }
    }
    if(pathname.startsWith('/auth')){
        const user = await middlewareAuth(request)
         if(user) {
             return NextResponse.redirect(new URL('/' , url))
         }
     }
    if(pathname.startsWith('/admin')){
        const user = await middlewareAuth(request)
        if(!user) {
            return NextResponse.redirect(new URL('/auth' , url))
        }
        if(user && user.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/' , url))
        }
    }
    if(pathname === '/') {
        return NextResponse.redirect(new URL('/products' , url))
    }
}

// Only run middleware on these routes
export const config = {
    matcher : ["/admin/:path*" , "/profile/:path*" , "/auth" , "/"]
}