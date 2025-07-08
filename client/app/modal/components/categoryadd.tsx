import { LogoFont } from '@/app/lib/font'
import { categoryAdd } from '@/store/features/categories'
import { _removeModal } from '@/store/features/modal'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useState } from 'react'

const CategoryAdd:React.FC = () => {
  const [name,setName]=useState<string>('')
  const dispatch=useAppDispatch()
  const {msg}=useAppSelector(state=>state.category)
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    dispatch(categoryAdd({name}))
  }
  return (
    <div className='w-full py-2 '>
      <div className='flex items-center justify-between'>
        <h1 className={`text-xl md:text-2xl font-semibold  ${LogoFont.className}`}>Kategori Ekle</h1>
        <button type='button' onClick={()=>dispatch(_removeModal())} className='cursor-pointer px-2 py-1 rounded-md bg-secondary hover:text-white hover:bg-primary duration-200'  >X</button>
      </div>
       <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
      <label className="block text-sm font-medium text-gray-700">Kategori ismini giriniz</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Örn: Teknoloji"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Kaydet
      </button>
    </form>


    </div>
  )
}

export default CategoryAdd