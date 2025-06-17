import { Router } from "express";


const routes =Router()


routes.use('/category',(req,res)=>{
    res.send('sa')
})



export default routes