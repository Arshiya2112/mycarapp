
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/getproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    fetchProducts();
  }, []);

  
  const filteredProducts = products.filter((product) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery) ||
      product.car_type.toLowerCase().includes(lowercasedQuery) ||
      product.company.toLowerCase().includes(lowercasedQuery) ||
      product.dealer.toLowerCase().includes(lowercasedQuery)
    );
  });

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 mb-10">
        
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, description, car type, company, or dealer"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        
        {filteredProducts.length === 0 ? (
          <h2 className="text-2xl font-bold text-center text-purple-800">No products found!</h2>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left">Serial No.</th>
                  <th className="border px-4 py-2 text-left">Car Title</th>
                  <th className="border px-4 py-2 text-left">Car Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product._id} className="border-b">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{product.title}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
