import React from 'react'
import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    
    <>
    <div className='bg-purple-800 text-white flex justify-between items-center py-2'>
            <div className='font-bold px-4 py-2 cursor-pointer my-2 text-2xl'>ManageMyCars</div>
            <div className='flex'>
            <ul className='flex space-x-28 my-2 '>
                        <Link to="/allproducts" className='text-purple-300 cursor-pointer hover:scale-125 text-lg no-underline '>Products</Link>
                        <Link to="/createproduct" className='text-purple-300 cursor-pointer hover:scale-125 text-lg no-underline'>Create Product</Link>
                        <Link to="/details" className='text-purple-300 cursor-pointer hover:scale-125 text-lg no-underline'>Product Details</Link>
                       
                    </ul>
                    
            </div>
                <div className='my-2 flex items-center'>
                {/* <input type="text" placeholder='Search' className='w-48 rounded-lg bg-slate-200 pl-4 text-lg outline-none focus:ring-purple-500 focus:bg-white' /> */}
               
                    
                
                    <Link to="/"><button className='bg-purple-300 text-purple-600 hover:bg-purple-900 hover:text-purple-300 px-3 py-1 my-2 mx-4 rounded-lg font-bold' >Logout</button></Link>
                    <button className='bg-violet-500 text-xl font-semibold mr-4 rounded-full px-2 '>U</button>
           
                </div>
            </div>
    </>
  )
}

export default Navbar