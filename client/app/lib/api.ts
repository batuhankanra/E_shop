import axios from "axios";

const api =axios.create({
    baseURL:"http://localhost:8080/api",
    withCredentials:true
})


api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            localStorage.removeItem('user')

            window.location.href='/'
        }
        return Promise.reject(error)
    }
)
export default api