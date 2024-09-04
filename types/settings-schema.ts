import * as z from 'zod'

export const SettingsSchema = z.object({
    name:z.optional(z.string()) , 
    image : z.optional(z.string()),
    email : z.optional(z.string().email()),
    isTwoFactorEnabled : z.optional(z.boolean()),
    password : z.optional(z.string().min(8,{
        message: "Password must be at least 8 characters!"
    })),
    newPassword : z.optional(z.string().min(8,{
        message: "Password must be at least 8 characters!"
    }))
})
.refine((data) => {
    if(data.password && !data.newPassword) {
        return false
    }
    return true
} , {message : 'New password is Required!' ,path:[]})