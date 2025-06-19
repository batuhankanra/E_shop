import { Router } from "express";
import categoriesRoute from './categories.route'
import authRoute from './auth.route'
import roleRoute from './role.route'

const routes =Router()


routes.use('/category',categoriesRoute)
routes.use('/auth',authRoute)
routes.use('/role',roleRoute)

export default routes