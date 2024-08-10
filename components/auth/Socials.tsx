'use client'

import React from 'react'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import {FcGoogle } from 'react-icons/fc'
import {FaGithub } from 'react-icons/fa'


const Socials = () => {
  return (
    <div className='flex flex-col gap-3 items-center w-full'>
        <Button 
        variant={'outline'}
        className='flex w-full gap-4'
        onClick={()=> signIn('google' , 
            {redirect : false ,
                callbackUrl : '/'
            }
        )}>
            <FcGoogle className='size-5'/>
            <p>Sign in with Google</p>
        </Button>
        <Button
        variant={'outline'}
                className='flex w-full gap-4'
        onClick={()=> signIn('github' , 
            {redirect : false ,
                callbackUrl : '/'
            }
        )}
        >
             <FaGithub className='size-5'/>
            Sign in with Github
        </Button>
    </div>
  )
}

export default Socials