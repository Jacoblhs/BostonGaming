import React from 'react'
import { FaStar } from 'react-icons/fa'

const About = () => {
  return (
    <>
    
    <section id='about' className='mt-20 bg-zinc-800 min-h-96'>
        <h2 className='uppercase font-bold text-4xl text-center pt-10 mb-2'>About</h2>
        <div className='flex justify-center items-center pb-4'>
            <hr className='w-1/12 h-0 border-y-2 rounded' />
            <FaStar className='mx-2 text-4xl' />
            <hr className='w-1/12 h-0 border-y-2 rounded'/>
        </div>
    </section>
    
    </>
  )
}

export default About