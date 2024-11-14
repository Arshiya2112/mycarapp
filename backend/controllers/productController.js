const Product = require('../models/Product'); // Product model
const multer = require('multer');
const path = require('path');
const express = require("express");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { files: 10 }
})

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static("uploads"))

app.post("/upload",upload.single(""), (req, res) => {
  Product.create({images: req.file.filename})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

app.get("/details", (req, res) => {
  Product.find()
  .then(product => res.json(product))
  .catch(err => res.json(err))
})


// const cloudinary = require('cloudinary').v2;

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage, limits: { files: 10 } });

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const uploadImagesToCloudinary = async (files) => {
//   const imageUrls = [];
//   for (const file of files) {
//     try {
//       const result = await cloudinary.uploader.upload(file.buffer, {
//         folder: 'products',
//         upload_preset: 'product_images', // Ensure you've set up a preset in Cloudinary
//       });
//       imageUrls.push(result.secure_url);
//     } catch (err) {
//       console.error('Cloudinary upload error:', err);
//       throw new Error('Error uploading images to Cloudinary');
//     }
//   }
//   return imageUrls;
// };

// Set up multer storage configuration for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Destination folder for images
//   },
//   filename: (req, file, cb) => {
//     const fileName = `${Date.now()}_${file.originalname}`;
//     cb(null, fileName); // Unique name for each image
//   },
// });

// const upload = multer({ 
//   storage: storage,
//   limits: {files: 10},
//  });

// Create product
const createProduct = async (req, res) => {
  try {
    const { title, description, car_type, company, dealer, images } = req.body;
    // const imageUrls = await uploadImagesToCloudinary(req.files);
    const userId = req.user._id;
    // for(const image of images) {
    //   const result = await cloudinary.uploader.upload(image.path);
    //   imageUrls.push(result.secure_url);
    // }
    // // const images = req.files.map(file => `/uploads/${file.filename}`);
    // const userId = req.user._id; // Get image file paths

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
    products.forEach(product => {
      console.log(product.images);
    });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}

const deleteProduct = async(req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product Deleted Successfully"});
  } catch (err) {
    console.error("Error deleting product: ", err);
    res.status(500).json({ message: "Error deleting product"});
  }
};

module.exports = { createProduct, getUserProducts, upload, deleteProduct };

