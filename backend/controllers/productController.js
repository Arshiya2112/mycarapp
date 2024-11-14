const Product = require('../models/Product'); // Product model
const multer = require('multer');
const path = require('path');

// Set up multer storage configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for images
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // Unique name for each image
  },
});

const upload = multer({ 
  storage: storage,
  limits: {files: 10},
 });

// Create product
const createProduct = async (req, res) => {
  try {
    const { title, description, car_type, company, dealer } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);
    const userId = req.user._id; // Get image file paths

    const newProduct = new Product({
      title,
      description,
      car_type,
      company,
      dealer,
      images,
      userId,  // Reference to the logged-in user
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}

module.exports = { createProduct, getUserProducts, upload };

