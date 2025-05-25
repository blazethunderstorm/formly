import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-grow mx-auto w-full'>
      {children}
    </div>
  )
}
