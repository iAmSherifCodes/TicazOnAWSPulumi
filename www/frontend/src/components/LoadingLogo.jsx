import React from 'react';
import { assets } from '../assets/assets';
import styled from "styled-components"
const LoadingLogo = () => {
  return (
    <LoaderLogo>

    <div className=" flex items-center justify-center w-screen min-h-screen bg-gray-100">
      <div className="zoom-container relative w-72 h-72">
        <img
          src={assets.ticazlogo}
          alt="Logo"
          className="w-full h-full object-contain animate-fade-in "
        />
      </div>
    </div>
    </LoaderLogo>
  );
};

export default LoadingLogo;

const LoaderLogo = styled.div`

  .zoom-container img {

    animation: zoom 0.6s infinite alternate;
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
  
`