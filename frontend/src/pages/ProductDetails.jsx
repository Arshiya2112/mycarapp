import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/getproducts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers : { Authorization: `Bearer ${token}`},
      });
      alert("Product deleted successfulyy");
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="relative  overflow-hidden rounded-lg shadow-lg">
            <div className="bg-blue-600  w-full h-64 flex items-center justify-center">
              
            </div>
            <div className="absolute inset-0 text-white font-semibold flex flex-col justify-center items-center  ">
              
              <p className="text-sm mt-1">{product.title}</p>
              
              <p className="text-sm mt-1">Car Type: {product.car_type}</p>
              <p className="text-sm mt-1">Company: {product.company}</p>
              <p className="text-sm mt-1">Dealer: {product.dealer}</p>
              <div className='mt-4 flex space-x-4'>
                <button
                onClick={() => handleEdit(product._id)}
                className='bg-yellow-500 text-white py-1 px-4 rounded hover:bg-black'>
                  Edit
                </button>
                <button
                onClick={() => handleDelete(product._id)}
                className='bg-red-500 text-white py-1 px-4 rounded hover:bg-black'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
