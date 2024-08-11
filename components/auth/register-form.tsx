'use client'

import React from 'react'
import { AuthCard } from './auth-card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm }  from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { emailSignin } from '@/server/actions/email-signin'
import {useAction} from 'next-safe-action/hooks'
import { cn } from '@/lib/utils'
import { RegisterSchema } from '@/types/register-schema'
import { emailRegister } from '@/server/actions/email-register'

const RegisterForm = () => {

const [error , setError] = React.useState('')

const form = useForm<z.infer<typeof RegisterSchema>>({
  resolver : zodResolver(RegisterSchema) , 
  defaultValues : {
    email : "" ,
    password : "" ,
    name : ""
  }
})

const onSubmit = (values : z.infer<typeof RegisterSchema>) => {
  execute(values)
}
const {execute , status} = useAction(emailRegister , {
  onSuccess(data) {
    if(data.success) {
      console.log(data.success)
    }
  }
})

  return (
    <AuthCard 
    cardTitle='Create an account &nbsp; 🎉' 
    backButtonHref='/auth/login' 
    backButtonLabel='Already have an account? Login' 
    showSocials
    >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
              <FormField
             control={form.control}
             name='name'
             render={({field}) => (
             <FormItem>
              <FormLabel>Username</FormLabel>
             <FormControl>
                <Input {...field} placeholder='nimamoradi10' type='text' autoComplete='name'/>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
    )}
  />
              <FormField
             control={form.control}
             name='email'
             render={({field}) => (
             <FormItem>
              <FormLabel>Email address</FormLabel>
             <FormControl>
                <Input {...field} placeholder='youremail@gmail.com' type='email' autoComplete='email'/>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
    )}
  />
    <FormField
             control={form.control}
             name='password'
             render={({field}) => (
             <FormItem>
              <FormLabel>Password</FormLabel>
             <FormControl>
                <Input {...field} placeholder='*********' type='password' autoComplete='current-password'/>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
    )}
  />
  <Button size={'sm'} variant={'link'} asChild>
    <Link href='/auth/reset-password'>Forgot your password ?</Link>
  </Button>
              </div>
                  <Button 
                  type='submit' 
                  className={cn('w-full my-2 ' , status === 'executing' ? 'animate-pulse' : "")}>
                  {'Register'}
                  </Button>
            </form>
          </Form>
        </div>
    </AuthCard>
  )
}

export default RegisterForm