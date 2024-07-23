import {Router} from "express";
import {createUser, getAllUsers, getUserById} from "../controller/user.controller.js";

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById)
router.post('/users', createUser);

export default router;