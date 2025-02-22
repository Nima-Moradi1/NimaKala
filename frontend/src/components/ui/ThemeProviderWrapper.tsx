"use client";
//i made this because we keep getting hydration errros since we're rendering a client component in server layout.tsx


import React from 'react'
import { ThemeProvider } from '../ThemeProvider'

const ThemeProviderWrapper = ({children}) => {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="light"
        >
            {children}
        </ThemeProvider>
  )
}

export default ThemeProviderWrapper