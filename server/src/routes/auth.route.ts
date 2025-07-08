import { Router } from "express";
import authController from "../controller/auth.Controller";
import { TokenVerification } from "../middleware/tokenVerification";


const router=Router()


router.post('/register',authController.register)
router.post('/loginControll',TokenVerification,authController.loginControl)
router.post('/logout',authController.logout)
router.post('/login',authController.login)

export default router