"use client"

import { useRouter } from "next/navigation";



const authLayout = ({children}: Readonly<{ children: React.ReactNode;}>) => {
    const user =localStorage.getItem('user')
    const router=useRouter()
    if(user){
        router.push('/')
        return
    }else{
        return (
            <div>
                {children}
            </div>
  )
    }
  
}

export default authLayout
