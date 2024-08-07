import {Router} from "express";
import {getProfile, login, logout} from "../controller/login.controller.js";

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/session', getProfile)


export default router;