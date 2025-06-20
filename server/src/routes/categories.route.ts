import { Router } from "express";
import categoriesController from "../controller/categories.controller";


const routes =Router()


routes.get('/',categoriesController.find)
routes.get('/:id',categoriesController.findID)
routes.post('/add',categoriesController.create)
routes.patch('/:id',categoriesController.update)
routes.delete('/:id',categoriesController.delete)



export default routes