import React from 'react'
import { FaStar } from "react-icons/fa";

const Products = () => {
  return (
    <>
    
    <section id='products'>
        <h2 className='uppercase font-bold text-4xl text-center mt-4 mb-2'>Products</h2>
        <div className='flex justify-center items-center mb-4'>
            <hr className='w-1/12 h-0 border-y-2 rounded' />
            <FaStar className='mx-2 text-4xl' />
            <hr className='w-1/12 h-0 border-y-2 rounded'/>
        </div>

        <div className='flex flex-wrap w-8/12 m-auto justify-between'>
            <div className="w-1/4 h-56 bg-zinc-800 rounded mr-4 my-4"></div>
            <div className="w-1/4 h-56 bg-zinc-800 rounded mx-4 my-4"></div>
            <div className="w-1/4 h-56 bg-zinc-800 rounded ml-4 my-4"></div>
            <div className="w-1/4 h-56 bg-zinc-800 rounded mr-4 my-4"></div>
            <div className="w-1/4 h-56 bg-zinc-800 rounded mx-4 my-4"></div>
            <div className="w-1/4 h-56 bg-zinc-800 rounded ml-4 my-4"></div>
        </div>
    </section>
    
    </>
  )
}

export default Products