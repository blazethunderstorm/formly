"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { DesktopIcon, SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div>
      <Tabs defaultValue={theme}>
        <TabsList className='border rounded-md flex space-x-1 p-1'>
          <TabsTrigger
            className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-slate-700"
            value="light"
            onClick={() => setTheme("light")}
          >
            <SunIcon className='h-5 w-5' />
          </TabsTrigger>
          
          <TabsTrigger
            className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-slate-700"
            value="dark"
            onClick={() => setTheme("dark")}
          >
            <MoonIcon className='h-5 w-5 rotate-90 transition-all dark:rotate-0' />
          </TabsTrigger>
          
          <TabsTrigger
            className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-slate-700"
            value="system"
            onClick={() => setTheme("system")}
          >
            <DesktopIcon className='h-5 w-5' />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}