import { Router } from "express";
import productController from "../controller/product.controller";
import {upload} from "../middleware/multer";


const routes =Router()


routes.get('/',productController.get)
routes.get('/:id',productController.getId)
routes.post('/add',upload.single('image'),productController.create)
routes.patch('/:id',upload.single('image'),productController.update)
routes.delete('/:id',productController.delete)



export default routes