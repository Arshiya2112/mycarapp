import React, { useEffect, useState } from 'react';
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
  // Sample product data array
  const initialProducts = [
    {
      id: 1,
      title: 'Swift Dzire',
      image: car1, // replace with actual path
    },
    {
      id: 2,
      title: 'Audi',
      image: car2, // replace with actual path
    },
    {
      id: 3,
      title: 'Tesla Model S',
      image: car3, // replace with actual path
    },
  ];

  // State to manage the current products and the index
  const [products, setProducts] = useState(initialProducts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editedTitle, setEditedTitle] = useState(products[currentIndex].title);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  // Function to handle moving to the next product
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle moving to the previous product
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Open/close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle delete product
  const handleDelete = () => {
    const updatedProducts = products.filter(
      (product) => product.id !== products[currentIndex].id
    );
    setProducts(updatedProducts);
    setCurrentIndex(0); // Reset to the first product
  };

  // Handle edit product title
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedProducts = [...products];
    updatedProducts[currentIndex].title = editedTitle;
    setProducts(updatedProducts);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-8">
        <div className="max-w-sm" onClick={openModal}>
          <img
            src={products[currentIndex].image}
            alt={products[currentIndex].title}
            className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer"
          />
          <h2 className="text-2xl font-bold text-purple-900 text-center mt-4">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border-b-2 border-purple-600 p-1"
              />
            ) : (
              products[currentIndex].title
            )}
          </h2>
        </div>
        <div className="flex justify-between mt-6 w-full max-w-sm">
          <button
            onClick={handlePrevious}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            &lt; Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Next &gt;
          </button>
        </div>
        <div className="flex justify-between mt-6 w-full max-w-sm">
          {!isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative max-w-51 w-full h-auto flex items-center justify-center">
              <img
                src={products[currentIndex].image}
                alt={products[currentIndex].title}
                className="w-full h-full max-h-screen object-contain rounded-lg shadow-lg"
              />
              <h2 className="absolute bottom-10 text-3xl font-bold text-white text-center">
                {products[currentIndex].title}
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
              >
                &lt;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-l-lg hover:bg-purple-700"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ProductDetails;
