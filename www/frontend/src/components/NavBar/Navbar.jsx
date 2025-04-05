import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import NavList from './NavList'
import Logo from './Logo'
import NavSmall from './NavSmall'
import TopBar from './TopBar'

import { IoMdCart } from "react-icons/io";
import { CiUser } from "react-icons/ci";

import { IoIosSearch } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import SearchBar from '../SearchBar'
import { BsFillBagFill } from "react-icons/bs";
import { BsBag } from "react-icons/bs"
import Aos from "aos"



const Navbar = ({ showSearch, setShowSearch }) => {

  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);


  const { getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    setLastScrollTop(scrollTop)
  };

  useEffect(() => {
    getCartCount()
  }, [])
  

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  return (
    <div className={`flex flex-col bg-white w-full fixed shadow-md z-[99] transition-transform duration-300 ease-in-out ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
      <TopBar />
      <Logo />

      {/*  ------------- Social Icons ----------------- */}
      <div className='flex items-center justify-between p-2 sm:p-3 px-5 lg:px-10 lg:py-4 font-medium bg-white'>
        <div onClick={() => setVisible(true)} className='cursor-pointer pl-2 text-black flex md:hidden text-2xl'>
          <MdOutlineMenu />
        </div>
        <NavLink to="/" className='text-[19px] font-normal bg-[#232323] w-[100px] flex justify-center text-white p-1 hidden md:flex gap-3 cursor-pointer '>
    
          <p className='tracking-widest'>TICAZ</p>
        </NavLink>

        {/* -------------- Menu List ------------------- */}
        <NavList />
           <NavLink to="/" className='text-[19px] font-normal bg-[#232323] w-[100px] md:hidden flex justify-center text-white p-1 md:flex gap-3 cursor-pointer '>
    
          <p className='tracking-widest'>TICAZ</p>
        </NavLink>

        {/* ---------------- Cart, Search & Proile ----------------- */}
        <div className='flex gap-1 items-center'>
          <div onClick={() => setShowSearch(true)} className='cursor-pointer hidden lg:block text-black text-xl pr-2'>
            <CiSearch size={24}/>
          </div>
          <div className='group relative  md:block'>
            <div className='text-black text-xl cursor-pointer' onClick={() => token ? null : navigate('/login')}>
              <CiUser size={22}/>
            </div>
            {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-[99]'>
              <div className='flex flex-col gap-2 w-36 py-4 px-2 bg-[#015c40] text-white rounded'>
                <p className='cursor-pointer border-b pb-1 hover:text-black'> My Profile</p>
                <p onClick={()=> navigate('/orders')} className='cursor-pointer border-b pb-1 hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black' >Logout</p>
                {localStorage.getItem('auth-token') ? <p onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }} className='cursor-pointer hover:text-black'>Logout </p> : ''}
              </div>
            </div>}
          </div>

          <Link to='/cart' className='relative pl-2'>
            <div className='text-black text-xl'>
              <BsBag />
              
            </div>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[red] text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </Link>
        </div>


        {/* ------------- Navbar for Small Screens --------------- */}

        <NavSmall visible={visible} setVisible={setVisible} />
      </div>
    </div>
  )
}

export default Navbar