import React, { useEffect } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import Aos from "aos"
function Uniform() {
    useEffect(() => {
        Aos.init({ duration: 800 });
      }, []);
  return (
    <div className='my-[90px]'>
        <div className='grid grid-cols-1 s1050:grid-cols-2 '>
            <img src='https://images.ctfassets.net/635jp660g7e4/5Chmyigp7cwCeArtGJtsIH/0e1951c0f66bb071dfd95337755f9369/AITW_January_Ecomm_HP_TU_Section.jpg?fm=webp&q=75&w=1200' alt='' className='h-full w-full'/>
            <div className='bg-[#F8EDE3] '>
            <div className='flex flex-col gap-4 p-11' data-aos="zoom-in">
                <p className='font-normal'>2025 ESSENTIALS</p>
                <h3 className='text-[55px] font-lyon leading-none'>The ultimate<br/> travel uniform</h3>
                <p className='font-light'>Travel effortlessly everywhere with a perfectly coordinated system of suitcases and bags. Easy to pack, easy to carry, and made to move with you no matter where the journey takes you.</p>
            </div>
            <div className='flex justify-center pb-10' data-aos="zoom-in">

            <NavLink to="/collection" className='flex cursor-pointer flex-col items-center'>
                <img src="https://images.ctfassets.net/635jp660g7e4/42JUhFNo2r4fn2EOhUUM0x/eaa59a6e68e70e9a2ea33f35b9067cf1/PDP_Flex_Tango_BCO_Cart.png?fm=webp&q=75&w=640" alt='' className='w-[400px] s1050:w-[300px]'/>
                <p className='flex items-center gap-1'>SHOP SUITCASES <FaArrowRightLong/></p>
            </NavLink>
            <NavLink to="/collection" className='flex flex-col cursor-pointer items-center'>
                <img src="https://images.ctfassets.net/635jp660g7e4/4Y1zDORtRvupzQ5QiA9X0R/a9a59468a47d9a2a4214d7c5329342a9/PDP_EverywhereBag_Standard_Navy_Cart.png?fm=webp&q=75&w=640" alt='' className='w-[400px] s1050:w-[300px]'/>
                <p className='flex items-center gap-1'>SHOP SUITCASES <FaArrowRightLong/></p>
            </NavLink>
            </div>

            </div>
        </div>
        <div className='grid grid-cols-1 s1050:grid-cols-2 '>
            <div  className='bg-[#F8EDE3] order-2 lg:order-1 flex justify-center items-center'>
            <div className='flex flex-col gap-4 p-11' data-aos="zoom-in">
                <p className='font-normal'>2025 ESSENTIALS</p>
                <h3 className='text-[45px] lg:text-[55px] font-lyon leading-snug'>Up to ₦20,000 off any three suitcases (coupon code)</h3>
                <p className='font-light'>Jet-set in style. Save up to $100 on any combination of suitcases—all styles, all colors, all sizes. Buy two and save $50, buy three and save $100..</p>
            <p className='flex font-medium text-[17px] lg:text-[20px] items-center gap-2 mt-2 animate-bounce'>SHOP SETS <FaArrowRightLong/></p>
            </div>


            </div>
            <img  className='order-1 lg:order-2' src='https://images.ctfassets.net/635jp660g7e4/1U9iBqqFnD54I9cognMxTP/f1583bae24aae6e1e60cea3adf4983cd/HOLIDAY_LAUNCH_ECOMM_SECONDARY_1x1.jpg?fm=webp&q=75&w=1200' alt=''/>

        </div>
    </div>
  )
}

export default Uniform