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

        <div className='w-8/12 m-auto flex justify-evenly mt-10'>

        <div className='w-1/2 mx-1 rounded'>
          <h3 className='font-bold text-2xl text-center'>Pick your gear</h3>
          <div className='bg-zinc-600 rounded mt-2 p-2'>CPU</div>
          <div className='bg-zinc-600 rounded my-1.5 p-2'>Motherboard</div>
          <div className='bg-zinc-600 rounded my-1.5 p-2'>Memory</div>
          <div className='bg-zinc-600 rounded my-1.5 p-2'>Storage</div>
          <div className='bg-zinc-600 rounded my-1.5 p-2'>Video Card</div>
          <div className='bg-zinc-600 rounded my-1.5 p-2'>Case</div>
          <div className='bg-zinc-600 rounded mt-1.5 p-2'>Power<br/>Supply</div>
        </div>

        <div className='w-1/2 mx-1 rounded'>
          <h3 className='font-bold text-2xl text-center'>Summary</h3>

          <div className='bg-white text-black rounded mt-2 p-1'>

            <div className='flex justify-between border-b-2'>
              <p className='place-self-center'>CPU</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>

            <div className='flex justify-between mt-2 border-b-2'>
              <p className='place-self-center'>Motherboard</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>

            <div className='flex justify-between mt-2 border-b-2'>
              <p className='place-self-center'>Memory</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>

            <div className='flex justify-between mt-2 border-b-2'>
              <p className='place-self-center'>Storage</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>

            <div className='flex justify-between mt-2 border-b-2'>
              <p className='place-self-center'>Video Card</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>

            <div className='flex justify-between mt-2 border-b-2'>
              <p className='place-self-center'>Case</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>

            <div className='flex justify-between mt-2 border-b-2'>
              <p className='place-self-center'>Power Supply</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>

            <div className='flex justify-between mt-2 border-b-2'>
              <p className='place-self-center font-bold'>Total</p>
              <p className='bg-black text-white rounded p-1'>$0</p>
            </div>
            
          </div>

        </div>

        </div>
    </section>
    
    </>
  )
}

export default DesignYourOwn