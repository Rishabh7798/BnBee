import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to BNBEE, your trusted partner in planning your perfect getaway. At BNBEE, we understand the importance of finding the ideal place to relax, unwind, and create memorable experiences.</p>
          <p>BNBEE is dedicated to excellence in travel and hospitality. We continuously enhance our platform to provide a seamless and enjoyable booking experience. Whether you're planning a family vacation, a romantic retreat, or a business trip, BNBEE is here to guide you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at BNBEE is to make travel effortless and accessible for everyone. We aim to connect travelers with the best destinations and hotels, ensuring comfort, convenience, and unforgettable memories. Your next adventure starts with us!</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined booking process to save your time and effort.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE: </b>
          <p>Access the best hotels and top destinations all in one place.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p >Tailored recommendations to match your travel preferences.</p>
        </div>
      </div>


    </div>
  )
}

export default About
