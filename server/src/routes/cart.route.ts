import { Router } from "express";
import { TokenVerification } from "../middleware/tokenVerification";
import { checkPermission } from "../middleware/permission";
import cartController from "../controller/cart.controller";


const routes =Router()


routes.get('/',TokenVerification,checkPermission('cart:read'),cartController.find)
routes.get('/:id',TokenVerification,checkPermission('cart:readId'),cartController.findId)
routes.post('/add',TokenVerification,checkPermission('cart:create'),cartController.create)
routes.patch('/:id',TokenVerification,checkPermission('cart:update'),cartController.update)
routes.delete('/:id',TokenVerification,checkPermission('cart:delete'),cartController.delete)



export default routes