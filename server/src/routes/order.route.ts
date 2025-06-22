import { Router } from "express";
import OrderController from "../controller/order.controller";
import { TokenVerification } from "../middleware/tokenVerification";
import { checkPermission } from "../middleware/permission";


const routes =Router()


routes.get('/',TokenVerification,checkPermission('role:read'),OrderController.find)
routes.get('/:id',OrderController.findId)
routes.post('/add',OrderController.create)
routes.patch('/:id',OrderController.update)
routes.delete('/:id',OrderController.delete)



export default routes