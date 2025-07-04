import { LogoFont } from '@/app/lib/font'
import React from 'react'

const Logo = () => {
  return (
     <div className={`${LogoFont.className} md:text-4xl text-xl flex items-center p-2 `}>
      <span className="text-third">Tech</span>
      <span className="text-fifth">Line</span>
    </div>
  )
}

export default Logo
