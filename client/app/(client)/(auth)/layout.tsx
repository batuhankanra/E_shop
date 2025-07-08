'use client' // Bu satır önemli, component client-side olmalı

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hook'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/')
    }
  }, [])

  return <>{children}</>
}

export default AuthLayout
