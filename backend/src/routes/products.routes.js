import {Router} from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct } from "../controller/products.controller.js";


const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.delete('/products', deleteProduct);

export default router;