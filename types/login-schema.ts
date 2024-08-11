import * as z from 'zod'

export const LoginSchema = z.object({
    email : z.string().email({
        message : "Invalid Email address"
    }) ,
    password : z.string().min(8 ,
        {message : "Password must be at least 8 Characters!"}
    ) ,
    //for 2-factor login
    code:z.optional(z.string()),
})