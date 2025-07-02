import { Router } from "express";
import productController from "../controller/product.controller";
import {upload} from "../middleware/multer";
import express from 'express'
import path from "path";
import { TokenVerification } from "../middleware/tokenVerification";
import { checkPermission } from "../middleware/permission";


const routes =Router()


routes.get('/',productController.get)
routes.get('/:id',productController.getId)
routes.post('/add',TokenVerification,checkPermission('categories:add'),upload.array('image'),productController.create)
routes.patch('/:id',TokenVerification,checkPermission('categories:update'),upload.array('image'),productController.update)
routes.delete('/:id',TokenVerification,checkPermission('categories:delete'),productController.delete)
routes.use('/uploads',express.static(path.join(__dirname, '../uploads')));



export default routes