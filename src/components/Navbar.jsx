import React,{useState} from 'react'
import '../index.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
    
  return (
   <>
   <nav className='nav fixed top-0 left-0 w-full text-white flex md:justify-around items-center p-[40px] justify-between '>
    <div>
        <h1 className="text-2xl cursor-pointer">OP&Sons Limited</h1>
    </div>

    <div>
        <ul className='md:flex gap-[50px] text-sm hidden cursor-pointer'>
        </ul>
    </div>
    <div>
    {/* <button className="text-2xl md:block hidden cursor-pointer">Connect Wallet</button> */}
    <appkit-button />
    </div>

   </nav>
   <ToastContainer theme="dark" position="top-right" />
   </>
  )
}

export default Navbar