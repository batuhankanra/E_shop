"use client"

import { logoutApi } from "@/store/features/logout";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";


const Header = () => {
  const [active,setActive]=useState<boolean>(false)
  const ref=useRef<HTMLDivElement | null>(null)
  const dispatch=useAppDispatch()
  const {status}=useAppSelector(state=>state.logout)
  const router=useRouter()
  
  useEffect(()=>{
      function handleClickOutside(event: MouseEvent) {
        if (
          ref.current &&
          !ref.current.contains(event.target as Node)
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
    useEffect(()=>{
      if(status==='Success'){
        setTimeout(()=>{
          router.refresh()
        router.push('/')
        },2000)
      }

    },[status])
  return (
    <header className="w-full bg-third shadow-md  p-2 fixed top-0 left-0 z-2 flex items-center justify-end">
        <div className='flex items-center gap-x-1  md:gap-x-5'>
            <span>
                <input type="text" placeholder="Ara!" className="md:p-1 p-1 w-40 md:w-full  m-1 outline-none text-lg border   rounded-md border-secondary focus:border-primary" />
               
            </span>
            <span className="relative inline-block ">
              <button
                onClick={() => setActive(!active)}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 border border-secondary hover:border-primary rounded-md bg-white text-sm font-medium transition duration-200"
              >
                <FaUser className="text-primary" />
                <span className="text-gray-800">Profil</span>
              </button>

              {active && (
                <div ref={ref} className="absolute top-12 -left-20 w-40 bg-fifth shadow-lg rounded-md p-2 z-50">
                  <Link
                    href="/profil"
                    className="block px-3 py-2 rounded-md text-sm text-gray-800 hover:bg-primary hover:text-white transition duration-200"
                  >
                    Profil Düzenle
                  </Link>
                  <button
                    onClick={()=>dispatch(logoutApi())}
                    className="block px-3 py-2 rounded-md text-sm text-gray-800 hover:bg-primary hover:text-white transition duration-200"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </span>
        </div>
        
        
       

    </header>
  );
};

export default Header
