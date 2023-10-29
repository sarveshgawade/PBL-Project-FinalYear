import { Router } from "express";
import { signin, signup,logout } from "../controllers/userControllers.js";


const router = Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/logout',logout)

export default router