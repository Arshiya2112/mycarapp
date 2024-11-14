import React from 'react'
import carmain from "../assets/carmain.jpg"
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }
  return (
    <div >
        <div className='bg-purple-800 text-white flex justify-between'>
            <div className='font-bold px-4 py-2 cursor-pointer my-2 text-2xl' onClick={handleClick}>ManageMyCars</div>
                <div className='my-2'>
                    <Link to="/login"><button className='bg-white text-purple-600 hover:text-purple-700 hover:bg-purple-900 px-3 py-1 my-2 mx-4 rounded-lg font-bold ' >Login</button></Link>
                    <Link to="/signup"><button className='bg-white text-purple-600 hover:bg-purple-900 hover:text-purple-700 px-3 py-1 my-2 mx-4 rounded-lg font-bold' >Signup</button></Link>
           
                </div>
            </div>
        <div className='flex justify-between items-center my-4'>
            <div className='w-1/2 mb-5 mt-3'>
                <img src={carmain} alt="" />
            </div>
            <div className='w-1/2 mb-5 mt-3 pl-20'>
                <h1 className='text-4xl font-bold mb-9 mt-20 text-purple-800'>ManageMyCars</h1>
                <span className='text-md font-md text-purple-600'>Your one stop solution to manage all your cars at a single click! <br />With simple tools to create, add, update, delete the products, our platform allows users to easily update their products. We ensure a smooth and efficient experience, giving you full control over your vehicle listings at any time!</span>
            </div>
            </div>
            <Footer/>
    </div>
  )
}

export default Home