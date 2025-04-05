import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoChevronBackSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";


const NavSmall = ({ visible, setVisible }) => {
  return (
    <div className={`absolute top-0 left-0 bottom-0 h-screen z-[9999] overflow-hidden bg-white transition-all ${visible ? 'w-[80vw]' : 'w-0'}`}>

      <div className='flex flex-col mx-5 text-gray-600'>
        <div onClick={() => setVisible(false)} className='flex items-center gap-1 pt-6 text-[20px] font-semibold p-3 cursor-pointer'>
          

          <RxCross2 className='' size={35}/>
        </div>
        <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b mt-5' to='/' >HOME</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/collection'>ALL COLLECTION</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/shop/luggage'>LUGGAGE</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b' to='/shop/bags'>BAG</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b' to='/shop/accessories'>ACCESSORIES</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b' to='/about' >ABOUT</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b' to='/contact'>CONTACT</NavLink>
      </div>
    </div>
  )
}

export default NavSmall