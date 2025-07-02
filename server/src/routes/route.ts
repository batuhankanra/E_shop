import { Router } from "express";
import categoriesRoute from './categories.route'
import authRoute from './auth.route'
import productRoute from './product.route'
import roleRoute from './role.route'
import orderRoute from './order.route'
import cartRoute from './cart.route'
import { apiLimitter } from "../middleware/rateLimiter";

const routes =Router()

routes.use('/product',apiLimitter)
routes.use('/categories',categoriesRoute)
routes.use('/auth',authRoute)
routes.use('/role',roleRoute)
routes.use('/product',productRoute)
routes.use('/order',orderRoute)
routes.use('/cart',cartRoute)

export default routes