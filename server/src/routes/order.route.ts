import { Router } from "express";
import OrderController from "../controller/order.controller";
import { TokenVerification } from "../middleware/tokenVerification";
import { checkPermission } from "../middleware/permission";


const routes =Router()


routes.get('/',TokenVerification,checkPermission('order:read'),OrderController.find)
routes.get('/:id',TokenVerification,checkPermission('order:readId'),OrderController.findId)
routes.post('/add',TokenVerification,checkPermission('order:create'),OrderController.create)
routes.patch('/:id',TokenVerification,checkPermission('order:update'),OrderController.update)
routes.delete('/:id',TokenVerification,checkPermission('order:delete'),OrderController.delete)



export default routes