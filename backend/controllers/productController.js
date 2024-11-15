const express = require("express");
const Product = require('../models/Product'); 
const multer = require('multer');
const path = require('path');

const app = express();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { files: 10 }
});


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


const createProduct = async (req, res) => {
  try {
    const { title, description, car_type, company, dealer } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`); 

    
    const newProduct = new Product({
      title,
      description,
      car_type,
      company,
      dealer,
      images,
      userId: req.user._id,  
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: 'Error creating product' });
  }
};


app.post('/api/products', upload.array('images', 10), createProduct);


const getUserProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product) { 
      return res.status(404).json({ message: "Product not found"});
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product", err);
    res.status(500).json({ message: "Error fetching product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, car_type, company, dealer } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, car_type, company, dealer },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product", err);
    res.status(500).json({ message: "Error updating product" });
  }
};



const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = { createProduct, getUserProducts, upload, deleteProduct, getProductById, updateProduct };

