import { Router } from "express";
import roleController from "../controller/role.controller";


const router=Router()


router.post('/add',roleController.add)
router.get("/",roleController.getFull)
router.get("/:id",roleController.getID)
router.patch("/:id",roleController.update) 
router.delete('/:id',roleController.delete)

export default router