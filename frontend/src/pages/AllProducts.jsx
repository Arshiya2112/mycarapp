import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
// import car1 from "../assets/car1.jpg"
// import car2 from "../assets/car2.jpg"
// import car3 from "../assets/car3.jpg"

const AllProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/getproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
      
    };
    fetchProducts();
  }, []);

  return (
    <>
    <Navbar/>
    <div className='text-center mt-20'>
      {products.length === 0 ? (
        <h2 style={{ fontSize: '2rem', color: '#5B21B6'}}>
          You haven't added any products yet!
        </h2>
      ) : (
        <ImageList sx={{ width: "100%", height: 450 }}>
      {products.map((product) => (
        <ImageListItem key={product._id} sx={{ padding:"20px"}}>
          <img
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`http://localhost:3000${product.images[0]}`}
            // ?w=248&fit=crop&auto=format`}
            alt={product.title}
            loading="lazy"
            style={{height:400, padding:"40px"}}
          />
          <hr style={{ border:"1px solid #D3BDF0", margin:"10px 0"}}/>
          <div style={{ padding:"0 40px", textAlign: "center"}}>
            <h3 style={{ color: "#5B21B6", fontWeight:"bold", fontSize:"1.25rem"}}>
              {product.title}
            </h3>
            <hr style={{ border: "1px solid #D8B4FE", margin:"10px 0"}}/>
            <p style={{ fontWeight: "500", color: "#4B5563"}}>
              {product.description}
            </p>
          </div>
          {/* <ImageListItemBar
            title={item.title}
            subtitle={<span style={{ whiteSpace: "normal" }}>{item.description}</span>}
            position="below"
            style={{padding:"0 40px"}}
          /> */}
        </ImageListItem>
      ))}
    </ImageList>
      )}
    </div>
    
    <Footer/>
    </>
  )
}

// const itemData = [
//     {
//       img: car1,
//       title: 'Swift Dzire',
//       description: 'The Maruti Suzuki Swift Dzire is a popular compact sedan that combines style, comfort, and efficiency offering added space and a larger trunk.',
//     },
//     {
//       img: car2,
//       title: 'Audi',
//       description: 'Known for its sleek designs, premium interiors and the signature Quattro all-wheel drive system, Audi cars provide a refined driving experience with top-notch safety features.',
//     },
//     {
//       img: car3,
//       title: 'ko',
//       description: "joeg"
//     },
    
//   ];

export default AllProducts