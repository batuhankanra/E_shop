"use client"

import { linkFont } from "@/app/lib/font"
import { categoryGet } from "@/store/features/categories"
import { _setModal } from "@/store/features/modal"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { useEffect } from "react"


const page = () => {
  const dispatch=useAppDispatch()
  const {data,error}=useAppSelector(state=>state.category)
  console.log(error)

  useEffect(()=>{
    dispatch(categoryGet())
  },[])


  return (
    <div className="w-full">
        <div className="flex items-center justify-between px-6 py-4 mx-10">
          <h1 className={`${linkFont.className} text-2xl font-semibold`}>Kategori</h1>
          <button className=" border border-secondary hover:border-primary  px-2 py-1 rounded-md text-sm font-medium cursor-pointer  " onClick={()=>dispatch(_setModal('category:add'))}>
            Ekle
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 mx-4">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">İsmi</th>
                <th className="px-4 py-2">Link</th>
                <th className="px-4 py-2">Durum</th>
                <th className="px-4 py-2">Oluşturulma</th>
                <th className="px-4 py-2">Güncellenme</th>
                <th className="px-4 py-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{item._id}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.slug}</td>
                    <td className="px-4 py-2">
                      {item.is_active ? (
                        <span className="text-green-600 font-medium">Aktif</span>
                      ) : (
                        <span className="text-red-500 font-medium">Pasif</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(item.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(item.updatedAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-2 flex items-center gap-x-2">
                      <button className="px-3 py-1 rounded-md border text-sm border-blue-500 text-blue-600 hover:bg-blue-50 transition cursor-pointer">
                        Düzenle
                      </button>
                      <button className="px-3 py-1 rounded-md border text-sm border-red-500 text-red-600 hover:bg-red-50 transition cursor-pointer">
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    Veri bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

  )
}

export default page
