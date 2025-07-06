
"use client"

import React from 'react'
import Sidebar from './components/sidebar';
import Header from './components/header';

const Layout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div>
      
        <Sidebar/>
        <Header />
        <div className='pt-20 pl-10 md:pl-64 '>
          {children}
        </div>
    </div>
  )
}

export default Layout
