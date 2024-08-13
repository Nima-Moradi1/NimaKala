'use client'

import React from 'react'
import { AuthCard } from './auth-card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm }  from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { LoginSchema } from '@/types/login-schema'
import * as z from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { emailSignIn } from '@/server/actions/email-signin'
import {useAction} from 'next-safe-action/hooks'
import { cn } from '@/lib/utils'
import { FormSuccess } from './form-success'
import { FormError } from './form-error'
import { NewPasswordSchema } from '@/types/new-password-schema'
import { newPassword } from '@/server/actions/new-password'
import { useSearchParams } from 'next/navigation'

const NewPasswordForm = () => {

const token = useSearchParams().get('token')

const [error , setError] = React.useState('')
const [success , setSuccess] = React.useState('')

const form = useForm<z.infer<typeof NewPasswordSchema>>({
  resolver : zodResolver(NewPasswordSchema) , 
  defaultValues : {
    token : "" ,
    password : ""
  }
})

const {status , execute} = useAction(newPassword , {
  onSuccess(data) {
    if(data?.error) setError(data.error)
    if(data?.success) setSuccess(data.success)
  }
})

const onSubmit = (values : z.infer<typeof NewPasswordSchema>) => {
  execute({password : values.password , token})
}


  return (
    <AuthCard 
    cardTitle='Enter a new Password' 
    backButtonHref='/auth/login' 
    backButtonLabel='Back to Login' 
    showSocials
    >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
    <FormField
             control={form.control}
             name='password'
             render={({field}) => (
             <FormItem>
              <FormLabel>Password</FormLabel>
             <FormControl>
                <Input {...field} disabled={status === 'executing'} placeholder='*********' type='password' autoComplete='current-password'/>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
    )}
  />
  <FormSuccess message={success}/>
  <FormError message={error}/>
              </div>
                  <Button 
                  type='submit' 
                  className={cn('w-full my-2 ' , status === 'executing' ? 'animate-pulse' : "")}>
                  {'Reset Password'}
                  </Button>
            </form>
          </Form>
        </div>
    </AuthCard>
  )
}

export default NewPasswordForm