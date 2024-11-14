import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios";
import API from '../utils/api';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    car_type: '',
    company: '',
    dealer: '' 
  });

  const navigate=useNavigate();

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = files.length + formData.images.length;
    // if(files.length+formData.images.length<=10)
    if(totalImages>10) {
      alert("You can upload a maximum of 10 images");
      return;
    }
    
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('car_type', formData.car_type);
    data.append('company', formData.company);
    data.append('dealer', formData.dealer);
    formData.images.forEach((image, index) => {
      data.append('images', image);
    });

    try {
      const token = localStorage.getItem("token");
      if(!token) {
        alert("You must be logged in to create a product");
        return;
      }
      const response = await axios.post("http://localhost:3000/api/products", data, {
        headers: {
          'Content-Type' : 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Product Added Successfully", response.data);
      
      alert("Product added successfully");
      navigate("/allproducts");
    } catch(err) {
      console.error('Error adding product', err.response?err.response.data:err.message);
      alert('Error adding product. Please try again');
    }
    // Process form submission here, e.g., send data to backend
    // console.log('Form submitted:', formData);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Enter product title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Enter product description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Enter Car Type Tag</label>
          <input 
            type="text" 
            name="car_type"
            value={formData.car_type}
            placeholder='Enter car type tag'
            
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter car company"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Dealer</label>
            <input
              type="text"
              name="dealer"
              value={formData.dealer}
              onChange={handleChange}
              placeholder="Enter car dealer"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Images (Max 10)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          {formData.images.length>0 && (
            <div className='mb-4'>
              <h3 className='text-sm font-bold mb-2'>Selected Images:</h3>
              <div className='grid grid-cols-3 gap-2'>
                {formData.images.map((image, index) => (
                  <div key={index} className='w-full'>
                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`}
                    className='w-full h-24 object-cover' />
                    <p className='text-center text-xs mt-2'>{image.name}</p>
                  </div>
                ))}
              </div>

            </div>
          )}


        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default CreateProduct;
