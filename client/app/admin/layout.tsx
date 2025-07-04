
"use client"

import React from 'react'
import Sidebar from './(dashbord)/components/sidebar';
import Header from './(dashbord)/components/header';

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
