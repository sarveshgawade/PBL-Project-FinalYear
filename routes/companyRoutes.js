import { Router } from "express";

import { getAllCompany,updateCompany,removeCompany,createnewCompany } from "../controllers/companyController.js";

import {isLoggedIn,authorizedRoles} from '../middleware/authMiddleware.js'

const router = new Router()

router.route('/')
.get(getAllCompany)
.post(isLoggedIn,authorizedRoles('ADMIN'),createnewCompany)

router.route('/:id')
    .get(isLoggedIn)
    .put(isLoggedIn,authorizedRoles('ADMIN'),updateCompany)
    .delete(isLoggedIn,authorizedRoles('ADMIN'),removeCompany)
    .post(isLoggedIn,authorizedRoles('ADMIN'))


    export default router