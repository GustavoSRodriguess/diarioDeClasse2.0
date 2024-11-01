import React from 'react'
import Header from '../Header'

export const Page = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
          <Header />
          <main className='flex-1 container mx-auto px-4'>
            {children}
          </main>
    </div>
  )
}
