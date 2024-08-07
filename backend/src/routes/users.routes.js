import {Router} from "express";
import {createUser, getAllUsers, getUserById, deleteUser} from "../controller/user.controller.js";

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById)
router.post('/users', createUser);
router.delete('/users/:id', deleteUser)

export default router;