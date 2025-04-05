import React from 'react';
import { assets } from '../assets/assets';
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({name, rating, desc, image}) => {
  return (
    <div className=" flex flex-col justify-between p-5 lg:py-12 gap-3 rounded-md shadow-lg w-full h-full overflow-hidden">
        <div className="flex gap-1">
        
          </div>
        <p className="text-[19px] lg:text-sm text-white font-normal leading-relaxed">
          {desc}
        </p>

        {/* <hr className="my-3" /> */}

      
          <div className="text-white font-medium">
           {name.toUpperCase()}
          </div>
    </div>
  );
};

export default TestimonialCard;
