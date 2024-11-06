import React from 'react'
import Header from '../Header'

export const Page = ({ children }) => {
  return (
    <div className='dark:bg-gray-900 pt-[72px] min-h-screen flex flex-col'>
          <Header />
          <main className='dark:bg-gray-900 flex-1 container mx-auto px-4'>
            {children}
          </main>
    </div>
  )
}
