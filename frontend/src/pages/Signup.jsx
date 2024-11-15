import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { BottomWarning } from '../components/BottomWarning'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import API from "../utils/api.js"

const Signup = () => {

  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  

    const handleClick = () => {
        navigate("/")
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData,
      [name] : value,
     }));
     console.log(formData);
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields required!");
      return;
    }
    try {
      const response = await API.post("/users/signup", formData);
      if(response.status===201) {
        alert("Profile Created");
        navigate("/allproducts");
      }
    }
    catch(error) {
      setError(error.response?.data?.message || "Error occurred during signup");
      navigate('/');
    }
  };

  

  return (
    <div>
    <div className='bg-purple-800 text-white flex justify-between'>
            <div className='font-bold px-4 py-2 cursor-pointer my-2 text-2xl' onClick={handleClick}>ManageMyCars</div>
                <div className='my-2'>
                    
                    <Link to="/login"><button className='bg-white text-purple-600 hover:bg-purple-900 hover:text-purple-700 px-3 py-1 my-2 mx-4 rounded-lg font-bold' >Login</button></Link>
           
                </div>
     </div>
    <form >
    <div className='h-full bg-slate-300 flex justify-center'>
      <div className='flex flex-col justify-center py-20'>
        <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-6'>
          <Heading label={"Sign up"}/>
          <SubHeading label={"Enter your information to create a profile"}/>
          {error && <p className='text-red-500'>{error}</p>}
          <InputBox
            placeholder="Enter First Name"
            label={"First Name"}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputBox
            placeholder="Enter Last Name"
            label={"Last Name"}
            name="lastName"
            value={formData.lastName}
            // required
            type="text"
            onChange={handleChange}/>
          <InputBox
            placeholder="Enter Email Id"
            label={"Email"}
            name="email"
            value={formData.email}
            // required
            type="email"
            onChange={handleChange}/>
          <div className='relative'>
          <InputBox
            type='password'
            placeholder="Enter Password"
            label={"Password"}
            name="password"
            // required
            value={formData.password}
            onChange={handleChange}/>
          </div>
          <div className='pt-4'>
            <Button label={"Sign up"} onClick={handleSubmit}  />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Login"}
            to={"/login"}/>
        </div>
      </div>
    </div>
    </form>
    <Footer/>
   </div>
  )
}

export default Signup