
"use client"

import React from 'react'
import Sidebar from './components/sidebar';
import Header from './components/header';

const Layout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div>
        <Sidebar/>
        <Header />
      {children}
    </div>
  )
}

export default Layout
