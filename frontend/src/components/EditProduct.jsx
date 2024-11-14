import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        car_type:"",
        company:"",
        dealer:""
    });

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3000/api/products/${id}`, {
                    headers : { Authorization: `Bearer ${token}` }
                });
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching car details:", error);
                alert("Failed to fetch car details");
            }
        };
        fetchCarDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}`}
            });
            alert("Car details updated successfully");
            navigate("/details/${id}");
        } catch(error) {
            console.error("Error updating car details", error);
            alert("Failed to update car details");
        }
    };
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Car_Type</label>
          <input
            type="text"
            name="title"
            value={formData.car_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
          <input
            type="text"
            name="title"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Dealer</label>
          <input
            type="text"
            name="title"
            value={formData.dealer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
          </div>
            

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Product
        </button>
      </form>
        </div>
  )
}

export default EditProduct;