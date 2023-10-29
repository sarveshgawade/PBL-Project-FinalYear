import { Router } from "express";
import { signin, signup,logout,getProfile } from "../controllers/userControllers.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = Router()

// bifurcation of user-routes
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/logout',logout)
router.get('/myprofile',isLoggedIn,getProfile)


export default router