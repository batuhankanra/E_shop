"use client"

import { Provider } from "react-redux";
import { store } from "@/store";

import React from 'react'

const ClientLayout = ({children}: Readonly<{ children: React.ReactNode;}>) => {
  return (
    <div>
        <Provider store={store} >
            {children}
        </Provider>
    </div>
  )
}

export default ClientLayout
