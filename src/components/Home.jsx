import React from 'react'
import img1 from '../assets/Icosahedron (1).png'
import img2 from "../assets/Icosahedron.png"

const Home = () => {
  return (
    <div className='text-white text-sm mt-[100px] flex flex-col items-center justify-center   '>
    <div>
    <div>
             
            </div>
            <div className='relative'>
            <img src={img1} width={180} height={350} alt="icon" className='overflow-hidden absolute -top-[30px] -left-[50px] z-1' ></img>
              <h1 className='md:text-8xl text-center mt-[60px] z-5 text-5xl'>Secure Your Business <br/>Transactions with Multisig Confidence </h1>
              <p className="text-2xl mt-[30px] text-center ">The official platform of OP&Sons Limited, designed to ensure that all critical business transactions are <br/>securely approved by key decision-makers</p>
            </div>
            <div className='absolute right-0 top-[350px] overflow-hidden'>
            <img src={img2} width={350} height={350} alt="icon" className='overflow-hidden' ></img>
            </div>
    </div>
           
          
          </div>
  )
}

export default Home