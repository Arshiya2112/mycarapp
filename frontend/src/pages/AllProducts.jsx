// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// // import car1 from "../assets/car1.jpg"
// // import car2 from "../assets/car2.jpg"
// // import car3 from "../assets/car3.jpg"

// const AllProducts = () => {

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:3000/api/getproducts", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if(!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error(error.message);
//       }
      
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <>
//     <Navbar/>
//     <div className='text-center mt-20'>
//       {products.length === 0 ? (
//         <h2 style={{ fontSize: '2rem', color: '#5B21B6'}}>
//           You haven't added any products yet!
//         </h2>
//       ) : (
//         <ImageList sx={{ width: "100%", height: 450 }}>
//       {products.map((product) => (
//         <ImageListItem key={product._id} sx={{ padding:"20px"}}>
//           <img
//             // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//             src={`http://localhost:3000${product.images[0]}`}
//             // ?w=248&fit=crop&auto=format`}
//             alt={product.title}
//             loading="lazy"
//             style={{height:400, padding:"40px"}}
//           />
//           <hr style={{ border:"1px solid #D3BDF0", margin:"10px 0"}}/>
//           <div style={{ padding:"0 40px", textAlign: "center"}}>
//             <h3 style={{ color: "#5B21B6", fontWeight:"bold", fontSize:"1.25rem"}}>
//               {product.title}
//             </h3>
//             <hr style={{ border: "1px solid #D8B4FE", margin:"10px 0"}}/>
//             <p style={{ fontWeight: "500", color: "#4B5563"}}>
//               {product.description}
//             </p>
//           </div>
//           {/* <ImageListItemBar
//             title={item.title}
//             subtitle={<span style={{ whiteSpace: "normal" }}>{item.description}</span>}
//             position="below"
//             style={{padding:"0 40px"}}
//           /> */}
//         </ImageListItem>
//       ))}
//     </ImageList>
//       )}
//     </div>
    
//     <Footer/>
//     </>
//   )
// }

// // const itemData = [
// //     {
// //       img: car1,
// //       title: 'Swift Dzire',
// //       description: 'The Maruti Suzuki Swift Dzire is a popular compact sedan that combines style, comfort, and efficiency offering added space and a larger trunk.',
// //     },
// //     {
// //       img: car2,
// //       title: 'Audi',
// //       description: 'Known for its sleek designs, premium interiors and the signature Quattro all-wheel drive system, Audi cars provide a refined driving experience with top-notch safety features.',
// //     },
// //     {
// //       img: car3,
// //       title: 'ko',
// //       description: "joeg"
// //     },
    
// //   ];

// export default AllProducts



// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import axios from 'axios';

// const AllProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:3000/api/getproducts", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error.message);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter((product) => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     return (
//       product.title.toLowerCase().includes(lowercasedQuery) ||
//       product.description.toLowerCase().includes(lowercasedQuery) ||
//       product.car_type.toLowerCase().includes(lowercasedQuery) ||
//       product.company.toLowerCase().includes(lowercasedQuery) ||
//       product.dealer.toLowerCase().includes(lowercasedQuery) 
//     );
//   });

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto mt-20">
//         <div className='mb-4'>
//           <input type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search"
//           className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-purple-500' />
//         </div>
//         {filteredProducts.length === 0 ? (
//           <h2 className='text-2xl font-bold text-center text-purple-800'>No Products Found</h2>
//         ): (
//           <div className='overflow-x-auto'></div>
//         )}
//         {products.length === 0 ? (
//           <h2 className="text-2xl font-bold text-center text-purple-800">No products added yet!</h2>
//         ) : (
//           <div className='overflow-x-auto'>
//             <table className='min-w-full table-auto border-collapse'>
//               <thead>
//                 <tr>
//                   <th className='border px-4 py-2 text-left'>Serial No.</th>
//                   <th className='border px-4 py-2 text-left'>Car Title</th>
//                   <th className='border px-4 py-2 text-left'>Car Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product, index) => (
//                   <tr key={product._id} className='border-b'>
//                     <td className='border px-4 py-2'>{index+1}</td>
//                     <td className='border px-4 py-2'>{product.title}</td>
//                     <td className='border px-4 py-2'>{product.description}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           // <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
//           //   {products.map((product) => (
              
//           //     <div key={product._id} className="border rounded-lg shadow-md p-4">
//           //       <div className='mb-4'>
//           //         {product.images.map((image, index) => (
//           //           <img
//           //             key={index}
//           //             src={image}
//           //             alt={`Product Image ${index+1}`}
//           //             className='w-full h-48 object-cover rounded-md mb-2'/>
//           //         ))}
//           //         </div>
//           //       {/* <img
//           //         src={`http://localhost:3000${product.images[0]}`}
                  
//           //         alt={product.title}
//           //         className="w-full h-48 object-cover rounded-md mb-4"
//           //       /> */}
                
//           //       <h3 className="text-xl font-semibold text-purple-800">
                
//           //       {product.title}</h3>
//           //       <p className="text-gray-700 mt-2">{product.description}</p>
//           //     </div>
//           //   ))}
//           // </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AllProducts;


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

  // Function to filter products based on the search query
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

  // Handle the search query input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-20">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, description, car type, company, or dealer"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>

        {/* Displaying the products */}
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
