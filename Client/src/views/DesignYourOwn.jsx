import React from 'react'
import { FaStar } from "react-icons/fa";

const DesignYourOwn = () => {
  return (
    <>
    
    <section id='designyourown' className='mt-20'>
        <h2 className='uppercase font-bold text-4xl text-center mt-4 mb-2'>Design your own rig!</h2>
        <div className='flex justify-center items-center mb-4'>
            <hr className='w-1/12 h-0 border-y-2 rounded' />
            <FaStar className='mx-2 text-4xl' />
            <hr className='w-1/12 h-0 border-y-2 rounded'/>
        </div>

        <div className='w-8/12 m-auto min-h-96 bg-gray-400 rounded'></div>
    </section>
    
    </>
  )
}

export default DesignYourOwn