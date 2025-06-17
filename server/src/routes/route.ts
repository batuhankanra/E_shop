import { Router } from "express";
import categoriesRoute from './categories.route'

const routes =Router()


routes.use('/category',categoriesRoute)