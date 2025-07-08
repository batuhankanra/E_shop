
import { useAppSelector } from "@/store/hook"
import routeModal from "./modalRoute"


const Modal = () => {
    const {modal}=useAppSelector(state=>state.modal)
    const currentModal=routeModal.find(item=>item.path===modal)

   
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-20">
      
        <div className="bg-zinc-300 text-black relative rounded-md w-2/3 max-h-screen  overflow-y-auto">
            <div className="p-3 md:mx-8 mx-3 ">
              {currentModal && <currentModal.element  />}         
            </div>
        </div>
    </div>
  )
}
export default Modal