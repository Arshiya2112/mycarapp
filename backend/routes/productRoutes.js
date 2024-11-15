
const express = require('express');
const router = express.Router();
const { createProduct, getUserProducts, upload, deleteProduct, getProductById, updateProduct } = require("../controllers/productController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js")

const User = require('../models/User');
const jwt = require('jsonwebtoken');


router.post("/products", authMiddleware, upload.array('images', 10), createProduct);
router.get("/getproducts", authMiddleware, getUserProducts);
router.get("/products/:id", authMiddleware, getProductById);
router.delete("/products/:id", authMiddleware, deleteProduct);
router.put("/products/:id", authMiddleware, updateProduct);



module.exports = router;




