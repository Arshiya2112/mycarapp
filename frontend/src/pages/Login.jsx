import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { BottomWarning } from '../components/BottomWarning'
import { Button } from '../components/Button'
import Footer from '../components/Footer'
import API from "../utils/api.js"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/users/login", { email, password });
            localStorage.setItem('token', data.token);
            alert("Logged in successfully");
            navigate('/allproducts');
        } catch (err) {
            console.error('Login Error : ', err);
            alert('Error logging in, try again');
        }
    };

  return (
    <div>
        <div className='bg-purple-800 text-white flex justify-between'>
            <div className='font-bold px-4 py-2 cursor-pointer my-2 text-2xl'>ManageMyCars</div>
                <div className='my-2'>
                    
                    <Link to="/signup"><button className='bg-white text-purple-600 hover:bg-purple-900 hover:text-purple-700 px-3 py-1 my-2 mx-4 rounded-lg font-bold' >Signup</button></Link>
           
                </div>
            </div>
            <form onSubmit={handleLogin}>
            <div className='bg-slate-300 h-screen flex justify-center'>
                <div className='flex flex-col justify-center'>
                    <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-4'>
                        <Heading label={"Login"}/>
                        <SubHeading label={"Enter your credentials"}/>
                        <InputBox
                            placeholder="Enter your email"
                            label={"Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        <InputBox
                            type='password'
                            placeholder="Enter your password"
                            label={"Password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        
                        <div className='pt-4 mt-3'>
                            <Button
                                type="submit"
                                label={"Login"}
                                onClick={handleLogin}/>
                        </div>
                        <BottomWarning
                            label={"Don't have an account?"}
                            buttonText={"Sign up"}
                            to={"/signup"}/>
                    </div>
                </div>
            </div>
            </form>
        
            
            <Footer/>
            
    </div>
  )
}

export default Login