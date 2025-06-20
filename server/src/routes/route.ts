import { Router } from "express";
import categoriesRoute from './categories.route'
import authRoute from './auth.route'
import roleRoute from './role.route'

const routes =Router()


routes.use('/categories',categoriesRoute)
routes.use('/auth',authRoute)
routes.use('/role',roleRoute)
routes.use('/product',(req,res)=>{
    res.send('sa')
})

export default routes