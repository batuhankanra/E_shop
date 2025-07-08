
"use client"

import React from 'react'
import Sidebar from './components/sidebar';
import Header from './components/header';
import { useAppSelector } from '@/store/hook';
import Modal from '@/app/modal';

const Layout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  const modal =useAppSelector(state=>state.modal.modal)
  return (
    <div>
        {modal && <Modal />}
        <Sidebar/>
        <Header />
        <div className='pt-20 pl-10 md:pl-64 '>
          {children}
        </div>
    </div>
  )
}

export default Layout
