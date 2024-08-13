'use client'

import React from 'react'
import { AuthCard } from './auth-card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm }  from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {useAction} from 'next-safe-action/hooks'
import { cn } from '@/lib/utils'
import { FormSuccess } from './form-success'
import { FormError } from './form-error'
import { newPassword } from '@/server/actions/new-password'
import { ResetSchema } from '@/types/reset-schema'
import { reset } from '@/server/actions/password-reset'

const ResetForm = () => {

const [error , setError] = React.useState('')
const [success , setSuccess] = React.useState('')

const form = useForm<z.infer<typeof ResetSchema>>({
  resolver : zodResolver(ResetSchema) , 
  defaultValues : {
    email : ""
  }
})

const {status , execute} = useAction(reset , {
  onSuccess(data) {
    if(data?.error) setError(data.error)
    if(data?.success) setSuccess(data.success)
  }
})

const onSubmit = (values : z.infer<typeof ResetSchema>) => {
  execute(values)
}


  return (
    <AuthCard 
    cardTitle='Forgot your password ?' 
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
             name='email'
             render={({field}) => (
             <FormItem>
              <FormLabel>Email</FormLabel>
             <FormControl>
                <Input {...field} disabled={status === 'executing'} placeholder='your-email@gmail.com' type='email' autoComplete='email'/>
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

export default ResetForm