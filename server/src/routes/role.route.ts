import { Router } from "express";
import roleController from "../controller/role.controller";
import { TokenVerification } from "../middleware/tokenVerification";
import { checkPermission } from "../middleware/permission";


const router=Router()


router.post('/add',TokenVerification,checkPermission('role:read'),roleController.add)
router.get("/",TokenVerification,checkPermission('role:readID'),roleController.getFull)
router.get("/:id",TokenVerification,checkPermission('role:create'),roleController.getID)
router.patch("/:id",TokenVerification,checkPermission('role:update'),roleController.update) 
router.delete('/:id',TokenVerification,checkPermission('role:delete'),roleController.delete)

export default router