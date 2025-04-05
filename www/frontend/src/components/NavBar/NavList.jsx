import React from 'react'
import { NavLink } from 'react-router-dom'

const NavList = () => {
  

  return (
    <ul className='hidden md:flex gap-5  text-gray-50 text-xs font-semibold z-[999]' >
      <NavLink to='/' className='flex lg:lg:text-[15px]  md:text-[12px] font-normal text-black flex-col items-center gap-1'>
        <p>HOME</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>
      <NavLink to='/collection' className='flex lg:text-[15px] md:text-[12px] text-black font-normal flex-col items-center gap-1'>
        <p>ALL COLLECTION</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>

      <div className='group relative'>
        <NavLink to='/shop/luggage' className='font-normal lg:text-[15px] md:text-[12px] text-black flex flex-col items-center gap-1'>
          <p className='hover:text-gray-300 hover:border-b-2 duration-200'>LUGGAGE</p>
          {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
        </NavLink>
      
      </div>
      <div className='group relative'>
        <NavLink to='/shop/bags' className='font-normal lg:text-[15px] md:text-[12px] text-black flex flex-col items-center gap-1'>
          <p >BACKPACKS</p>
          {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
        </NavLink>
     
      </div>
      <div className='group relative'>
        <NavLink to='/shop/accessories' className='font-normal lg:text-[15px] md:text-[12px] text-black flex flex-col items-center gap-1'>
          <p className='hover:text-gray-300  duration-200'>ACCESSORIES</p>
          {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
        </NavLink>
      
      </div>
     

    
      <NavLink to='/about' className='font-normal lg:text-[15px] md:text-[12px] text-black flex flex-col items-center gap-1'>
        <p>ABOUT</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>
      <NavLink to='/contact' className='font-normal lg:text-[15px] md:text-[12px] text-black flex flex-col items-center gap-1'>
        <p>CONTACT</p>
        {/* <hr className='w-full border-none h-[1.5px] bg-goldPrimary hidden' /> */}
      </NavLink>

    </ul>
  )
}

export default NavList