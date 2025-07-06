'use client'
import { loginApi } from '@/store/features/login';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaEyeSlash ,FaEye } from "react-icons/fa";

const Login = () => {
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [active,setActive]=useState<boolean>(false)
  const router=useRouter()
  const {msg,error,status}=useAppSelector(state=>state.login)
  if(status==='Success'){
    setTimeout(() => {
      router.push('/')
    }, 2000);
  }  

  const dispatch=useAppDispatch()
  const handleSubmit=async (e:any)=>{
    e.preventDefault()
    dispatch(loginApi({ email, password }))
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Giriş Yap</h2>
        <form  onSubmit={handleSubmit}  className="space-y-4">
          {msg && (
            <div className='w-full rounded-lg p-4 bg-green-600 text-white '>{msg}!</div>
          )}
          {error && (
            <div className='w-full rounded-lg p-4 bg-red-600 text-white '>{error}!</div>
          )}
          
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            
          </div>
          <div className='relative'>
            <label className="block text-sm font-medium">Şifre</label>
            <input
              type={active ? 'text' : 'password'}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className='absolute top-9 right-2 cursor-pointer text-lg ' type='button' onClick={()=>setActive(!active)}>{active ? <FaEye/> : <FaEyeSlash />}</button>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition cursor-pointer"
          >
            Giris Yap
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
