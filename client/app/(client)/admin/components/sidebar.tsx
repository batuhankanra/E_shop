"use client"
import Link from 'next/link'
import Logo from './logo'
import { IoMenu } from "react-icons/io5";
import { IoMdBasket } from "react-icons/io";
import { useEffect, useRef, useState } from 'react';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { TbBasketHeart } from "react-icons/tb";

import { FaHome,FaUser,FaHandPaper  } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { linkFont } from '@/app/lib/font';

const Sidebar = () => {
  const path=usePathname()
  const sidebarRef=useRef<HTMLDivElement | null>(null)
  const [active,setActive]=useState<boolean>(false)
  const links = [
    { name: 'Anasayfa', href: '/admin' ,img:<FaHome/>},
    { name: 'Ürünler', href: '/admin/products',img:<MdOutlineProductionQuantityLimits/> },
    { name: 'Siparişler', href: '/admin/orders',img:<IoMdBasket/> },
    { name: 'Kategori', href: '/admin/kategori',img:<BiSolidCategory /> },
    { name: 'Sepete Eklenenler', href: '/admin/basket',img:<TbBasketHeart /> },
    { name: 'Yetkiler', href: '/admin/permissions',img:<FaHandPaper /> },
    { name: 'Kullanıcılar', href: '/admin/users',img:<FaUser /> },
  ]
  const handleClick=()=>{
    setActive(!active)
  }

  useEffect(()=>{
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    }
    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[active])

  return (
      <aside ref={sidebarRef} className={`bg-primary text-white max-w-64 md:w-full ${active ? 'w-64' : 'w-8'} transition-all ease-in duration-200  min-h-screen fixed top-0 left-0   z-4 `}>
        <div className='flex items-center border border-primary cursor-pointer  hover:text-fifth text-xl '>
          <button onClick={handleClick} type='button' className='p-1'> <IoMenu /></button>
          <span className={`${active ? 'flex' : 'hidden'} md:block transition-all `}><Logo /></span>
        </div>
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`flex items-center text-lg p-2 gap-x-2  hover:text-fourth ${path===link.href ? 'text-fourth' : ''} ${linkFont.className}`}>
              {link.img}
              <h1 className={`${active ? 'block' : 'hidden'} md:block`}>{link.name}</h1>
            </Link>
          ))}
        </nav>
      </aside>
  )
}

export default Sidebar