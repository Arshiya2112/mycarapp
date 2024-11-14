// const express = require('express');
// const Product = require('../models/Product');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware.js");
// const User = require("../models/User.js");

// router.use(authMiddleware);

// // Middleware to verify token
// const protect = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Token is not valid' });
//     req.userId = decoded.id;
//     next();
//   });
// };

// // Product creation
// router.post('/', protect, multer({ dest: 'uploads/' }).array('images', 10), async (req, res) => {
//   const { title, description, tags } = req.body;
//   const images = req.files.map(file => file.path); // Storing file paths temporarily
//   const product = new Product({ title, description, tags, images, user: req.userId });
//   await product.save();
//   res.json(product);
// });

// // Get all products of a user
// router.get('/', protect, async (req, res) => {
//   const products = await Product.find({ user: req.userId });
//   res.json(products);
// });

// // Search products
// router.get('/search', protect, async (req, res) => {
//   const { query } = req.query;
//   const products = await Product.find({ 
//     $text: { $search: query }, 
//     user: req.userId 
//   });
//   res.json(products);
// });

// // Get single product
// router.get('/:id', protect, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: 'Product not found' });
//   res.json(product);
// });

// // Update product
// router.put('/:id', protect, async (req, res) => {
//   const { title, description, tags, images } = req.body;
//   const product = await Product.findByIdAndUpdate(req.params.id, { title, description, tags, images }, { new: true });
//   res.json(product);
// });

// // Delete product
// router.delete('/:id', protect, async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Product deleted' });
// });

// module.exports = router;


// Middleware to check if user is authenticated (check JWT)
// router.use(authMiddleware);

// // POST route to create a car
const express = require('express');
const router = express.Router();
const { createProduct, getUserProducts, upload } = require("../controllers/productController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js")
// const Car = require('../models/Car');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const authMiddleware = require('../middleware/authMiddleware.js');

router.post("/products", authMiddleware, upload.array('images', 10), createProduct);
router.get("/getproducts", authMiddleware, getUserProducts);

module.exports = router;
// router.post('/create', async (req, res) => {
//   const { title, description, car_type, company, dealer, images } = req.body;

//   const newCar = new Car({
//     title,
//     description,
//     car_type,
//     company,
//     dealer,
//     images,
//     userId: req.user.id, // Associate with the logged-in user
//   });

//   try {
//     await newCar.save();
//     res.status(201).json({ message: 'Car created successfully', car: newCar });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating car', error });
//   }
// });
// module.exports = router;

// // GET route to fetch cars of a particular user
// router.get('/mycars', async (req, res) => {
//   try {
//     const cars = await Car.find({ userId: req.user.id });
//     res.status(200).json(cars);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching cars', error });
//   }
// });



