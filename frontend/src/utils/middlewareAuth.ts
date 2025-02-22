/* eslint-disable @typescript-eslint/no-explicit-any */
//? Since we need to fetch user 2 times (profile and admin) in middleware.ts, it's better to fetch it only ONCE here to avoid code repeat


export async function middlewareAuth(request: any) {
    const accessToken = request.cookies.get('accessToken')
    const refreshToken = request.cookies.get('refreshToken')
   const {data} = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile` , 
    {
        credentials : 'include' , 
        headers : {
            Cookie:`${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
        }
    }
   ).then((res)=> res.json())
   const {user} = data || {}

   return user
}