import express from "express";
import productController from "../controllers/productsController.js";
import productsMod from '../models/productsModel.js'
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post("/register", productController.registerIn);
router.post("/login", productController.logIn);
router.get("/products/:id", productsMod.authenticateToken,productController.getProductById);
router.get("/products",productsMod.authenticateToken, productController.getAllProducts);
router.get ("/category",productsMod.authenticateToken, productController.getAllCategories);
router.get("/category/:id",productsMod.authenticateToken, productController.getCategoryById);

router.post ("/category",productsMod.authenticateToken, productController.postCategory);
router.delete("/category/:id",productsMod.authenticateToken, productController.deleteCategory);
router.put("/category/:id",productsMod.authenticateToken, productController.putCategory);

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);


export default router;
