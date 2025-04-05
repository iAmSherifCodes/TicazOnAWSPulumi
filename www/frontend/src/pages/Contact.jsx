import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import SignupEmail from '../components/SignupEmail'

const Contact = () => {
  return (
    <div className='px-5 pt-[125px]'>
      <div className='text-center text-2xl pt-10 '>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img src={assets.ticazlogo2} className='w-full md:max-w-[480px] py-16 px-8 bg-[#232323]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>24 Union Homes Lagos Island Lagos State</p>
          <p className='text-gray-500'>WhatsApp : 07031709846 || 08027861511 <br /> teeteelayo@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Ticaz Luggage</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm cursor-not-allowed hover:bg-[#cba035a6] hover:border-opacity-0 hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact