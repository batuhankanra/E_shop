import { Router } from "express";
import OrderController from "../controller/order.controller";
import { TokenVerification } from "../middleware/tokenVerification";
import { checkPermission } from "../middleware/permission";


const routes =Router()


routes.get('/',TokenVerification,checkPermission('role:read'),OrderController.find)
routes.get('/:id',TokenVerification,checkPermission('role:read'),OrderController.findId)
routes.post('/add',TokenVerification,checkPermission('role:create'),OrderController.create)
routes.patch('/:id',TokenVerification,checkPermission('role:update'),OrderController.update)
routes.delete('/:id',TokenVerification,checkPermission('role:delete'),OrderController.delete)



export default routes