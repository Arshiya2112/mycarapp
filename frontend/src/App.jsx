import { Routes, Route, Navigate, Router } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AllProducts from "./pages/AllProducts"
import CreateProduct from "./pages/CreateProduct"
import ProductDetails from "./pages/ProductDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import EditProduct from "./components/EditProduct"



function App() {
  

  return (
    <>
    <Routes>
      
      
      <Route path="/" element={<Navigate to="/home"/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path="/allproducts" element={<AllProducts/>}/>
      <Route path="/createproduct" element={<CreateProduct/>}/>
      <Route path="/details" element={<ProductDetails/>}/>
      <Route path="/edit-product/:id" element={<EditProduct/>}/>
      </Route>
      
      
    </Routes>
    </>
  )
}

export default App
