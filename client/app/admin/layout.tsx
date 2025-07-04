
"use client"

import React from 'react'
import Sidebar from './(dashbord)/components/sidebar';

const Layout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div>
        <Sidebar/>
      {children}
    </div>
  )
}

export default Layout
