import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader"
import styled from 'styled-components'
import Lottie from "lottie-react";
import { assets } from '../assets/assets';

function CheckoutLoader({LoaderTitle, verified,verifiedTitle}) {
  return (
    <HeaderContainer>

    <div className='contain'>
     {verified ? "": <div className='flex flex-col  w-[250px] h-[250px] rounded-full justify-center items-center'>

        <Lottie animationData={assets.bagl}/>
        <p className='text-[20px] text-white pb-5'>{LoaderTitle}</p>
        <PropagateLoader color='white' size={20}/>
      </div>}
    {verified &&  <div className='flex flex-col m-3 justify-center items-center p-10 bg-white rounded-2xl'>
        
      <Lottie animationData={assets.check} size={20}/>
        <p className='text-[20px] font-normal text-center text-green-500 '>{verifiedTitle}!</p>
        <p className='text-center text-[20px] font-light text-black pb-[-45px]'>We will be processing your order as soon <br/> as possible...!  🏃❤️</p>
      </div>}
    </div>
    </HeaderContainer>
  )
}

export default CheckoutLoader
const HeaderContainer = styled.div`
.contain{
    background-color: #000000cc;
    width: 100vw;
    overflow: hidden;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
}
`