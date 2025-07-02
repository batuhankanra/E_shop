import { Router } from "express";
import productController from "../controller/product.controller";
import {upload} from "../middleware/multer";
import express from 'express'
import path from "path";


const routes =Router()


routes.get('/',productController.get)
routes.get('/:id',productController.getId)
routes.post('/add',upload.array('image'),productController.create)
routes.patch('/:id',upload.array('image'),productController.update)
routes.delete('/:id',productController.delete)
routes.use('/uploads', express.static(path.join(__dirname, '../uploads')));



export default routes