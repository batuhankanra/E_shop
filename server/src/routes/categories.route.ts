import { Router } from "express";
import categoriesController from "../controller/categories.controller";
import { TokenVerification } from "../middleware/tokenVerification";
import { checkPermission } from "../middleware/permission";


const routes =Router()


routes.get('/',TokenVerification,categoriesController.find)
routes.get('/:id',categoriesController.findID)
routes.post('/add',TokenVerification,checkPermission('categories:add'),categoriesController.create)
routes.patch('/:id',TokenVerification,checkPermission('categories:update'),categoriesController.update)
routes.delete('/:id',TokenVerification,checkPermission('categories:delete'),categoriesController.delete)



export default routes