import React from 'react'
import Header from '../Header'

export const Page = ({ children }) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden dark:bg-gray-900'>
      <Header className='flex-none' />
      <main className='flex-1 overflow-auto dark:bg-gray-900 pt-16'>
        <div className='container mx-auto px-4 max-w-[1400px]'>
          {children}
        </div>
      </main>
    </div>
  )
}