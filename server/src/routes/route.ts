import { Router } from "express";
import categoriesRoute from './categories.route'
import authRoute from './auth.route'

const routes =Router()


routes.use('/category',categoriesRoute)
routes.use('/auth',authRoute)

export default routes