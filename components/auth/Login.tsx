'use client'

import React from 'react'
import { AuthCard } from './auth-card'

const Login = () => {
  return (
    <AuthCard cardTitle='Welcome back!' backButtonHref='/auth/register' backButtonLabel='Create a new account' showSocials>
        <div></div>
    </AuthCard>
  )
}

export default Login